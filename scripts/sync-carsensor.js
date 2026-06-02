#!/usr/bin/env node
"use strict";

/*
 * sync-carsensor.js
 * ------------------------------------------------------------------
 * カーセンサーの自社店舗在庫一覧を読み取り、HPの data/cars.json を同期する。
 *
 *  - 新しく載った車      … 追加し listedAt を記録（フロントで NEW バッジ表示）
 *  - 掲載が消えた車      … 削除せず sold=true に（フロントで SOLD OUT 表示）
 *  - 価格/走行距離など   … カーセンサーの値で更新
 *  - 写真                … カーセンサー掲載写真(メイン1枚)を取り込み、本番へ再ホスト
 *
 * 反映は既存の cgi/admin.cgi の save / upload エンドポイントを利用（FTP不要）。
 *
 * 環境変数:
 *   CARSENSOR_SHOP_URL   在庫一覧URL（既定: 大阪支店）
 *   KOTOKOTO_CGI_URL     本番 admin.cgi のURL  例) https://example.com/cgi/admin.cgi
 *   KOTOKOTO_DATA_URL    本番 cars.json のURL  例) https://example.com/data/cars.json
 *   KOTOKOTO_ADMIN_KEY   admin.cgi の管理キー
 *   MAX_CARS             取り込み上限（既定 20）
 *   NEW_DAYS             NEWバッジを出す日数（既定 14）
 *   USER_AGENT           取得時のUA
 *   DRY_RUN=1 / --dry    本番へ保存せず、差分とプレビューJSONを出力するだけ
 *   WRITE_LOCAL=1        DRY_RUN時もローカル data/cars.json を書き換える
 *   REPLACE_SAMPLE=1     csIdを持たない初期サンプル車を最終結果から除外する
 * ------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const ROOT = path.resolve(__dirname, "..");
const LOCAL_DATA = path.join(ROOT, "data", "cars.json");

const SHOP_URL =
  process.env.CARSENSOR_SHOP_URL ||
  "https://www.carsensor.net/shop/osaka/325141001/stocklist/";
const CGI_URL = process.env.KOTOKOTO_CGI_URL || "";
const DATA_URL = process.env.KOTOKOTO_DATA_URL || "";
const ADMIN_KEY = process.env.KOTOKOTO_ADMIN_KEY || "";
const MAX_CARS = Number(process.env.MAX_CARS || 20);
const NEW_DAYS = Number(process.env.NEW_DAYS || 14);
const REPLACE_SAMPLE = process.env.REPLACE_SAMPLE === "1";
const WRITE_LOCAL = process.env.WRITE_LOCAL === "1";
const UA =
  process.env.USER_AGENT ||
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const DRY_RUN =
  process.argv.includes("--dry") ||
  process.env.DRY_RUN === "1" ||
  !CGI_URL ||
  !ADMIN_KEY;

const ORIGIN = "https://www.carsensor.net";
const now = () => new Date().toISOString();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(...a) {
  console.log(...a);
}

async function fetchText(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ja,en;q=0.8" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.text();
    } catch (e) {
      if (i === tries) throw e;
      await sleep(1500 * i);
    }
  }
}

/* ---------- helpers ---------- */

function cleanText(s) {
  return String(s || "")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// "ホワイトホワイトホワイト" のように同一文字列が繰り返されている場合は1つに畳む
function dedupeRepeat(s) {
  s = cleanText(s);
  const n = s.length;
  for (let len = 1; len <= n / 2; len++) {
    if (n % len === 0 && s.slice(0, len).repeat(n / len) === s) return s.slice(0, len);
  }
  return s;
}

// タイトルからグレードを抽出（キャッチコピーを除去し、先頭の数語に絞る）
function splitNameGrade(title) {
  const t = cleanText(title).split("|")[0].split("｜")[0];
  const parts = t.split(" ").filter(Boolean);
  const name = parts.shift() || t;
  const grade = parts.slice(0, 4).join(" ");
  return { name, grade };
}

// カーセンサーのボディタイプ表記を、サイトの分類へ寄せる
function normalizeBody(raw) {
  const s = cleanText(raw);
  if (/ミニバン|ワンボックス/.test(s)) return "ミニバン"; // 「ミニバン」を先に確定（バン誤判定回避）
  if (/トラック|ダンプ|パネルバン|キャブ|平床|商用|貨物|(?<!ミニ)バン/.test(s)) return "商用車";
  if (/軽/.test(s)) return "軽自動車";
  if (/SUV|クロカン|クロスカントリー/i.test(s)) return "SUV";
  if (/セダン/.test(s)) return "セダン";
  if (/コンパクト|ハッチバック/.test(s)) return "コンパクト";
  if (/ステーションワゴン|ワゴン/.test(s)) return "ステーションワゴン";
  if (/クーペ/.test(s)) return "クーペ";
  if (/オープン|カブリオレ|ロードスター/.test(s)) return "オープン";
  return s || "その他";
}

// 装備一覧から「商用車（トラック・バン）」かどうかを判定
function isCommercial(features) {
  return (features || []).some((f) => /ボディタイプ：|積載可能量|車両総重量|平床|高床|低床|三方開/.test(f));
}

// 写真URLを高解像度(L)に正規化
function toLargePhoto(url) {
  if (!url) return "";
  let u = url.startsWith("//") ? "https:" + url : url;
  u = u.split("?")[0];
  u = u.replace(/_(\d{3})[MS]\.JPG$/i, "_$1L.JPG");
  return u;
}

function pricePair(main, sub) {
  const m = cleanText(main).replace(/[^\d.]/g, "");
  const s = cleanText(sub).replace(/[^\d.]/g, "");
  if (!m) return 0;
  return Number(m + (s ? s : ""));
}

/* ---------- list page ---------- */

function parseList(html) {
  const $ = cheerio.load(html);
  const cars = [];
  $(".caset.js_stock_list_cassette, .js_stock_list_cassette").each((_, el) => {
    const $el = $(el);
    const idAttr = $el.attr("id") || "";
    const csId = idAttr.replace(/_cas$/i, "").trim();
    if (!csId) return;

    const maker = cleanText($el.find(".casetMedia__body__maker").first().text());
    const title = cleanText($el.find(".casetMedia__body__title a").first().text());
    const specPs = $el.find(".casetMedia__body__spec > p");
    const bodyRaw = cleanText($(specPs.get(0)).text());
    const mission = cleanText($(specPs.get(1)).text());
    const colorShort = dedupeRepeat($(specPs.get(2)).clone().children().remove().end().text());

    const priceTotal = pricePair(
      $el.find(".totalPrice__price__main").first().text(),
      $el.find(".totalPrice__price__sub").first().text()
    );
    const basePrice = pricePair(
      $el.find(".basePrice__price__main").first().text(),
      $el.find(".basePrice__price__sub").first().text()
    );

    // spec boxes
    const spec = {};
    $el.find(".specWrap__box").each((__, box) => {
      const $box = $(box);
      const key = cleanText($box.find(".specWrap__box__title").text());
      const num = cleanText($box.find(".specWrap__box__num").text());
      const ps = $box.find("p").map((i2, p) => cleanText($(p).text())).get();
      const tail = ps.filter((t) => t && t !== key && t !== num);
      spec[key] = { num, text: tail.join(" ") };
    });
    const year = Number((spec["年式"]?.num || "0").replace(/[^\d]/g, "")) || 0;
    const mileage = Number(spec["走行距離"]?.num || 0) || 0;
    const displacement = spec["排気量"]?.num
      ? spec["排気量"].num.replace(/[^\d]/g, "") + "cc"
      : "";
    const inspection = cleanText(spec["車検有無"]?.text || "");

    // main photo from this block
    const blockHtml = $.html($el);
    const m = blockHtml.match(/ccsrpcma\.carsensor\.net\/CSphoto\/[^\s"'\\]+?_\d{3}[MLS]?\.JPG/i);
    const photo = m ? toLargePhoto("//" + m[0]) : "";

    // name / grade split (full-width space separated)
    const { name, grade } = splitNameGrade(title);

    cars.push({
      csId,
      maker,
      name,
      grade,
      bodyRaw,
      body: normalizeBody(bodyRaw),
      mission,
      color: colorShort,
      year,
      mileage,
      price: priceTotal || basePrice || 0,
      basePrice,
      displacement,
      inspection,
      photo,
      detailUrl: ORIGIN + "/usedcar/detail/" + csId + "/index.html",
    });
  });
  return cars;
}

/* ---------- detail page ---------- */

function parseDetail(html) {
  const $ = cheerio.load(html);
  const table = {};
  $(".defaultTable__table tr").each((_, tr) => {
    const cells = $(tr).find("th,td");
    for (let i = 0; i + 1 < cells.length; i += 2) {
      const k = cleanText($(cells.get(i)).clone().children("a").remove().end().text());
      const v = cleanText($(cells.get(i + 1)).text());
      if (k) table[k] = v;
    }
  });

  const fuel = table["エンジン種別"] || "";
  const seats = Number((table["乗車定員"] || "").replace(/[^\d]/g, "")) || 0;
  const color = dedupeRepeat(table["色"] || "");

  const features = [];
  $(".equipmentList__item--active").each((_, li) => {
    const t = cleanText($(li).clone().children("a").remove().end().text());
    if (t && !features.includes(t)) features.push(t);
  });

  // main photo (highest quality available statically)
  let photo =
    $("#js-mainPhoto").attr("data-photo") ||
    $("#js-mainPhoto").attr("src") ||
    "";
  photo = toLargePhoto(photo);

  return { fuel, seats, color, features, photo, body: table["ボディタイプ"] || "" };
}

/* ---------- photo gallery ---------- */

// 1枚の写真URLから、その車の連番写真(_001L.._00NL)を全部見つけて返す
async function collectPhotos(sampleUrl, max = 20) {
  if (!sampleUrl) return [];
  const m = sampleUrl.match(/^(.*\/)([A-Z0-9]+)_\d{3}[A-Z]?\.JPG$/i);
  if (!m) return [sampleUrl];
  const [, dir, base] = m;
  const urls = [];
  for (let i = 1; i <= max; i++) {
    const n = String(i).padStart(3, "0");
    const url = `${dir}${base}_${n}L.JPG`;
    try {
      const r = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA, Referer: ORIGIN } });
      if (r.ok) urls.push(url);
      else if (urls.length) break; // 連番が途切れたら終了
      else if (i >= 3) break; // 先頭から見つからなければ諦める
    } catch (e) {
      if (urls.length) break;
    }
  }
  return urls.length ? urls : [sampleUrl];
}

/* ---------- image re-host via existing CGI ---------- */

// 複数のカーセンサー写真をDLし、既存CGIで本番へ再ホスト（1リクエストでまとめて）
async function uploadPhotos(carId, photoUrls) {
  const fd = new FormData();
  fd.append("carId", carId);
  let count = 0;
  for (let i = 0; i < photoUrls.length; i++) {
    const res = await fetch(photoUrls[i], { headers: { "User-Agent": UA, Referer: ORIGIN } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    fd.append("photos", new Blob([buf], { type: "image/jpeg" }), `carsensor-${i + 1}.jpg`);
    count++;
  }
  if (!count) throw new Error("写真を取得できませんでした");
  const up = await fetch(CGI_URL + "?action=upload", {
    method: "POST",
    headers: { "X-Kotokoto-Admin-Key": ADMIN_KEY },
    body: fd,
  });
  const txt = await up.text();
  if (!up.ok) throw new Error("upload failed: " + txt);
  const data = JSON.parse(txt);
  return Array.isArray(data.paths) ? data.paths : [];
}

/* ---------- load current cars ---------- */

async function loadCurrent() {
  if (DATA_URL) {
    try {
      const txt = await fetchText(DATA_URL);
      const rows = JSON.parse(txt);
      if (Array.isArray(rows)) return rows;
    } catch (e) {
      log("! 本番cars.json取得失敗、ローカルを使用:", e.message);
    }
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_DATA, "utf8"));
  } catch {
    return [];
  }
}

/* ---------- merge ---------- */

function buildCar(scr, detail, prev) {
  const dispNum = parseInt((scr.displacement || "").replace(/[^\d]/g, ""), 10) || 0;
  let body = scr.body || normalizeBody(detail.body);
  if (dispNum && dispNum <= 660) body = "軽自動車"; // 軽は排気量で判定
  // トラック・バンは装備情報から判定して「商用車」に寄せる（軽トラ含む）
  if (isCommercial(detail.features) || /商用車/.test(normalizeBody(detail.body))) body = "商用車";
  const merged = {
    id: prev?.id || scr.csId,
    csId: scr.csId,
    published: prev ? prev.published !== false : true,
    sold: false,
    maker: scr.maker,
    name: scr.name,
    grade: scr.grade,
    year: scr.year,
    mileage: scr.mileage,
    price: scr.price,
    mission: scr.mission,
    fuel: detail.fuel || prev?.fuel || "",
    color: detail.color || scr.color || prev?.color || "",
    displacement: scr.displacement || prev?.displacement || "",
    inspection: scr.inspection || prev?.inspection || "",
    body,
    seats: detail.seats || prev?.seats || 5,
    tags: prev?.tags?.length ? prev.tags : buildTags({ ...scr, body }, detail),
    features: detail.features.length ? detail.features : prev?.features || [],
    note: prev?.note || "",
    images: Array.isArray(prev?.images) ? prev.images : [],
    listedAt: prev?.listedAt || now(),
    syncedAt: now(),
    soldAt: null,
  };
  return merged;
}

function buildTags(scr, detail) {
  const t = [];
  if (scr.body) t.push(scr.body);
  if (detail.fuel && /ハイブリッド|電気|EV|PHV|ディーゼル/.test(detail.fuel)) t.push(detail.fuel);
  if (scr.mileage && scr.mileage <= 3) t.push("低走行");
  return t.slice(0, 3);
}

/* ---------- main ---------- */

async function main() {
  log("=== カーセンサー同期 ===", DRY_RUN ? "[DRY-RUN]" : "[本番反映]");
  log("店舗:", SHOP_URL);

  const listHtml = await fetchText(SHOP_URL);
  let scraped = parseList(listHtml);
  log("一覧から取得:", scraped.length, "台");
  if (scraped.length > MAX_CARS) scraped = scraped.slice(0, MAX_CARS);

  // detail pages
  const details = {};
  for (const car of scraped) {
    try {
      const dHtml = await fetchText(car.detailUrl);
      details[car.csId] = parseDetail(dHtml);
    } catch (e) {
      log("! 詳細取得失敗", car.csId, e.message);
      details[car.csId] = { fuel: "", seats: 0, color: "", features: [], photo: "", body: "" };
    }
    await sleep(800); // 控えめに
  }

  const current = await loadCurrent();
  const byCs = new Map();
  for (const c of current) if (c.csId) byCs.set(c.csId, c);

  const scrapedIds = new Set(scraped.map((c) => c.csId));
  const result = [];
  const added = [];
  const updated = [];
  const soldNow = [];

  // synced cars (new + existing-from-carsensor)
  for (const scr of scraped) {
    const prev = byCs.get(scr.csId);
    if (prev && prev.manual) {
      result.push(prev); // 完全手動管理は触らない
      continue;
    }
    const detail = details[scr.csId];
    const car = buildCar(scr, detail, prev);

    // 画像: 既存があれば保持。無ければ全枚数を取り込み
    if (!car.images.length && (detail.photo || scr.photo)) {
      const gallery = await collectPhotos(detail.photo || scr.photo);
      if (DRY_RUN) {
        car.images = gallery; // dryではホットリンクでプレビュー
      } else {
        try {
          car.images = await uploadPhotos(car.id, gallery);
        } catch (e) {
          log("! 画像取り込み失敗", car.id, e.message);
          car.images = gallery;
        }
      }
      log(`  ${car.id}: 画像 ${car.images.length} 枚`);
    }

    if (prev) updated.push(car.id);
    else added.push(car.id);
    result.push(car);
  }

  // 既存のカーセンサー由来で今回消えた車 → SOLD
  for (const c of current) {
    if (!c.csId) {
      // サンプル/手動車（csId無し）
      if (!REPLACE_SAMPLE) result.push(c);
      continue;
    }
    if (scrapedIds.has(c.csId)) continue; // 既に処理済み
    if (c.manual) {
      result.push(c);
      continue;
    }
    const sold = { ...c, sold: true, soldAt: c.soldAt || now(), syncedAt: now() };
    soldNow.push(c.id);
    result.push(sold);
  }

  // 並び: 販売中(NEW優先) → SOLD
  result.sort((a, b) => {
    if (!!a.sold !== !!b.sold) return a.sold ? 1 : -1;
    return new Date(b.listedAt || 0) - new Date(a.listedAt || 0);
  });

  log("--- 差分 ---");
  log("追加:", added.length, added.join(", "));
  log("更新:", updated.length);
  log("SOLD化:", soldNow.length, soldNow.join(", "));
  log("合計:", result.length, "台");

  const json = JSON.stringify(result, null, 2);

  if (DRY_RUN) {
    const preview = path.join(ROOT, "tmp_cars_preview.json");
    fs.writeFileSync(preview, json, "utf8");
    log("プレビュー出力:", preview);
    if (WRITE_LOCAL) {
      fs.writeFileSync(LOCAL_DATA, json, "utf8");
      log("ローカル data/cars.json も更新しました");
    }
    return;
  }

  // 本番保存（既存CGI）
  const save = await fetch(CGI_URL + "?action=save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Kotokoto-Admin-Key": ADMIN_KEY,
    },
    body: json,
  });
  const stxt = await save.text();
  if (!save.ok) throw new Error("save失敗: " + stxt);
  log("本番へ保存しました:", stxt);

  // リポジトリにもバックアップ（GitHub Actionsがコミット）
  fs.writeFileSync(LOCAL_DATA, json, "utf8");
  log("ローカル data/cars.json を更新（コミット用）");
}

main().catch((e) => {
  console.error("同期エラー:", e);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * GitHub Actions Secrets 登録スクリプト
 *
 * 使い方:
 *   node scripts/setup-github-secrets.js <GitHub_PAT> <ADMIN_KEY>
 *
 * 例:
 *   node scripts/setup-github-secrets.js ghp_xxxx sVAjfrS9xxxx
 *
 * PAT作成手順（スマホ可）:
 *   https://github.com/settings/tokens/new
 *   → Note: kotokoto-secrets
 *   → Expiration: 30 days
 *   → Scopes: ✅ repo にチェック
 *   → Generate token → コピー
 *
 * ADMIN_KEY: Claudeから受け取ったパスワードを入力
 */
const https  = require("https");
const sodium = require("libsodium-wrappers");

const OWNER    = "kotorinu";
const REPO     = "kotokotogaisya";
const PAT      = process.argv[2];
const ADMINKEY = process.argv[3];

if (!PAT || !ADMINKEY) {
  console.error("使い方: node scripts/setup-github-secrets.js <PAT> <ADMIN_KEY>");
  process.exit(1);
}

const SECRETS = {
  KOTOKOTO_ADMIN_KEY:  ADMINKEY,
  KOTOKOTO_CGI_URL:    "http://kotoko-gaisya.com/cgi/admin.cgi",
  KOTOKOTO_DATA_URL:   "http://kotoko-gaisya.com/data/cars.json",
  CARSENSOR_SHOP_URL:  "https://www.carsensor.net/shop/osaka/325141001/stocklist/",
};

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: "api.github.com", path, method,
      headers: {
        "Authorization": `Bearer ${PAT}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "kotokoto-setup",
        ...(data ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } : {}),
      },
    }, (res) => {
      let buf = "";
      res.on("data", d => buf += d);
      res.on("end", () => resolve({ status: res.statusCode, body: buf ? JSON.parse(buf) : null }));
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  await sodium.ready;
  console.log("GitHub Secrets を登録しています...\n");

  const keyRes = await api("GET", `/repos/${OWNER}/${REPO}/actions/secrets/public-key`);
  if (keyRes.status !== 200) {
    console.error("❌ リポジトリへのアクセス失敗。PATにrepoスコープがあるか確認してください。");
    process.exit(1);
  }
  const { key_id, key } = keyRes.body;

  for (const [name, value] of Object.entries(SECRETS)) {
    const binKey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
    const binMsg = sodium.from_string(value);
    const enc    = sodium.crypto_box_seal(binMsg, binKey);
    const encrypted_value = sodium.to_base64(enc, sodium.base64_variants.ORIGINAL);
    const res = await api("PUT", `/repos/${OWNER}/${REPO}/actions/secrets/${name}`, { encrypted_value, key_id });
    console.log((res.status === 201 || res.status === 204) ? `✅ ${name}` : `❌ ${name} (status ${res.status})`);
  }
  console.log("\n✅ 完了！GitHub Actions が毎日自動で在庫を更新します。");
}

main().catch(e => { console.error("エラー:", e.message); process.exit(1); });

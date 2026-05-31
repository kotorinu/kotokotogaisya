// pages-cars.jsx — vehicle list + detail
const { useState: useStateC } = React;

function CarCard({ car, go }) {
  const image = Array.isArray(car.images) && car.images.length ? car.images[0] : "";
  return (
    <div className="car" onClick={() => go("car", { id: car.id })}>
      <div className="pic">
        <Ph src={image} label="画像準備中" className={image ? "" : "ph--empty"} style={{ width: "100%", height: "100%" }} alt={`${car.maker} ${car.name}`} />
        <span className="badge">{car.year}年式</span>
        <span className="heart"><Icon.heart /></span>
      </div>
      <div className="info">
        <div className="mk">{car.maker}</div>
        <h3>{car.name}</h3>
        <div className="grade">{car.grade}</div>
        <div className="specrow">
          <div><span>走行</span>{fmtMileage(car.mileage)}</div>
          <div><span>年式</span>{car.year}年</div>
          <div><span>車検</span>{car.inspection.replace("年", ".").replace("月", "")}</div>
        </div>
        <div className="price">
          <div>
            <span className="n serif">{car.price}<span className="u">万円</span></span>
          </div>
          <span className="view">詳細を見る ›</span>
        </div>
      </div>
    </div>
  );
}

function CarsPage({ go }) {
  const [filter, setFilter] = useStateC("すべて");
  const [sort, setSort] = useStateC("おすすめ");

  let list = (window.PUBLIC_CARS || CARS).filter((c) => filter === "すべて" || c.body === filter);
  if (sort === "価格が安い") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "価格が高い") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "走行が少ない") list = [...list].sort((a, b) => a.mileage - b.mileage);
  if (sort === "年式が新しい") list = [...list].sort((a, b) => b.year - a.year);

  return (
    <div className="fade">
      <section className="section--tight wrap" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <Eyebrow en="VEHICLES" ja="車両情報" />
        <h1 className="serif" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 18 }}>車両情報</h1>
        <p className="lead" style={{ color: "var(--ink-soft)", marginTop: 14, maxWidth: "52ch" }}>
          状態の良い厳選車両をご用意しています。気になる車両はお気軽にお問い合わせください。試乗・現車確認も歓迎です。
        </p>
        <div className="feed-note" style={{ marginTop: 22, marginBottom: 8 }}>
          <span className="dot"></span>
          カーセンサー／グーネット連携で在庫を自動更新（※デモ画面ではサンプル車両を表示）
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 40 }}>
        <div className="toolbar">
          <div className="chips">
            {BODY_TYPES.map((b) => (
              <button key={b} className={"chip" + (filter === b ? " on" : "")} onClick={() => setFilter(b)}>{b}</button>
            ))}
          </div>
          <div className="select">
            <span>並び替え</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>おすすめ</option>
              <option>価格が安い</option>
              <option>価格が高い</option>
              <option>走行が少ない</option>
              <option>年式が新しい</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 18, letterSpacing: ".03em" }}>
          {list.length}台の車両が見つかりました
        </div>

        <div className="cars">
          {list.map((c) => <CarCard key={c.id} car={c} go={go} />)}
        </div>
      </section>

      <Band go={go} />
    </div>
  );
}

function CarDetail({ go, id }) {
  const cars = window.PUBLIC_CARS || CARS;
  const car = cars.find((c) => c.id === id) || cars[0] || CARS[0];
  const [active, setActive] = useStateC(0);
  const images = Array.isArray(car.images) ? car.images : [];
  const thumbs = images.length ? images : ["正面", "後方", "内装", "メーター", "エンジン"];

  const rows = [
    ["メーカー", car.maker],
    ["車名 / グレード", car.name + "　" + car.grade],
    ["年式", car.year + "年"],
    ["走行距離", fmtMileage(car.mileage)],
    ["車検", car.inspection],
    ["ミッション", car.mission],
    ["燃料", car.fuel],
    ["排気量", car.displacement],
    ["乗車定員", car.seats + "名"],
    ["ボディタイプ", car.body],
    ["ボディカラー", car.color],
  ];

  return (
    <div className="fade">
      <section className="section wrap" style={{ paddingTop: 40 }}>
        <div className="crumb">
          <a onClick={() => go("home")}>ホーム</a><span>›</span>
          <a onClick={() => go("cars")}>車両情報</a><span>›</span>
          <span style={{ color: "var(--ink-soft)" }}>{car.maker} {car.name}</span>
        </div>

        <div className="detail">
          {/* gallery */}
          <div className="gallery">
            <Ph className={"main " + (images.length ? "" : "ph--empty")} src={images[active]} label={images.length ? "" : "画像準備中 / " + thumbs[active]} style={{ width: "100%", height: "100%" }} alt={`${car.maker} ${car.name} 車両写真`} />
            <div className="thumbs">
              {thumbs.map((t, i) => (
                <div key={t} onClick={() => setActive(i)} className={active === i ? "on" : ""}>
                  <Ph src={images[i]} label={images.length ? "" : t} className={images.length ? "" : "ph--empty"} style={{ width: "100%", height: "100%" }} alt={`${car.maker} ${car.name} サムネイル`} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ fontSize: 19, marginBottom: 14 }}>この車両について</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>{car.note}</p>
            </div>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ fontSize: 19, marginBottom: 16 }}>主な装備</h3>
              <div className="equip">
                {car.features.map((f) => <span key={f}>{f}</span>)}
              </div>
            </div>
          </div>

          {/* panel */}
          <div className="dpanel">
            <div className="mk">{car.maker}</div>
            <h1>{car.name}</h1>
            <div className="grade">{car.grade}</div>
            <div className="tags">
              {car.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="priceblock">
              <div>
                <div className="lab">支払総額の目安</div>
                <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>車両本体価格</div>
              </div>
              <div className="n serif">{car.price}<span className="u">万円</span></div>
            </div>
            <table className="spectable">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}><th>{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="dcta">
              <a className="btn btn--solid" style={{ flex: 1, justifyContent: "center" }} onClick={() => go("contact")}>この車両を問い合わせる<Icon.arrow /></a>
            </div>
            <a className="btn btn--ghost" style={{ marginTop: 12, width: "100%", justifyContent: "center" }} onClick={() => go("cars")}>‹ 一覧に戻る</a>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="section--tight wrap">
        <SHead en="OTHER CARS" ja="ほかの車両" title="ほかの在庫車両"
          action={<a className="btn btn--line" onClick={() => go("cars")}>在庫一覧へ <Icon.arrow /></a>} />
        <div className="cars">
          {cars.filter((c) => c.id !== car.id).slice(0, 3).map((c) => <CarCard key={c.id} car={c} go={go} />)}
        </div>
      </section>

      <Band go={go} />
    </div>
  );
}

Object.assign(window, { CarCard, CarsPage, CarDetail });

// pages-home.jsx — integrated top page
function HomePage({ go }) {
  return (
    <div className="fade">
      {/* hero */}
      <section className="hero">
        <div className="wrap">
          <div>
            <Eyebrow en="KOTOKOTO INC." ja="自動車 × DX" />
            <h1 style={{ marginTop: 24, fontWeight: "600", fontSize: "60px" }}>
              まじめに、 コツコツ。<br />
              <span className="em">“こと”</span>を、<br />　やさしく前へ。
            </h1>
            <p className="lead" style={{ maxWidth: "500px", width: "100%" }}>
              ことこと株式会社は、大阪・寝屋川を拠点に
              <b>
「良質な車両販売」</b>と<b>「中小企業のためのDX支援」</b>の
              二つの事業を展開しています。誠実な対応と確かな技術で、
              地域の事業に寄り添います。
            </p>
            <div className="cta-row">
              <a className="btn btn--solid" onClick={() => go("cars")}>車両を探す<Icon.arrow /></a>
              <a className="btn btn--ghost" onClick={() => go("dx")}>DX支援を見る</a>
            </div>
            <div className="stats">
              <div>
                <div className="n serif">2<span style={{ fontSize: 16 }}>事業</span></div>
                <div className="l">車両販売・DX支援</div>
              </div>
              <div>
                <div className="n serif">寝屋川</div>
                <div className="l">大阪・北河内エリア</div>
              </div>
              <div>
                <div className="n serif">2025</div>
                <div className="l">Established</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <Ph src={SITE_ASSETS.hero} alt="車両販売とDX支援を表すショールームのメインビジュアル" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </section>

      {/* two business */}
      <section className="section wrap">
        <SHead en="BUSINESS" ja="事業内容"
        title="二つの軸で、事業を前へ。"
        lead="“モノ”と“仕組み”の両面から。一台の車も、一つの業務改善も、同じ誠実さでお手伝いします。" />
        
        <div className="biz-grid">
          <div className="biz" onClick={() => go("cars")}>
            <Ph className="pic" src={SITE_ASSETS.businessVehicles} alt="清潔な車両販売スペース" />
            <div className="body">
              <div className="no serif">01 — VEHICLES</div>
              <h3>車両販売</h3>
              <div className="sub">良質な一台を、適正価格で。</div>
              <p>軽自動車から輸入車まで、状態の良い中古車を厳選してご用意。在庫情報は車両情報ページからご覧いただけます。</p>
              <div className="go">在庫を見る<Icon.arrow /></div>
            </div>
          </div>
          <div className="biz" onClick={() => go("dx")}>
            <Ph className="pic" src={SITE_ASSETS.businessDx} alt="DX支援を表すデスクとダッシュボード" />
            <div className="body">
              <div className="no serif">02 — DX SUPPORT</div>
              <h3>DX支援</h3>
              <div className="sub">中小企業の業務を、AIで軽く。</div>
              <p>AIチャットボット・業務自動化・Web/EC・LP・ホームページ制作まで。小さく始めて、ていねいに育てます。</p>
              <div className="go">支援内容を見る<Icon.arrow /></div>
            </div>
          </div>
        </div>
      </section>

      {/* stance / values */}
      <section className="section--tight wrap">
        <div className="values">
          <div className="value">
            <div className="ic"><Icon.heart /></div>
            <h3>誠実な対応</h3>
            <p>大げさに売らない、必要なことを正直に。長くお付き合いいただける関係を第一に考えます。</p>
          </div>
          <div className="value">
            <div className="ic"><Icon.car /></div>
            <h3>確かな目利き</h3>
            <p>状態・記録・相場を見極め、自信を持っておすすめできる車両だけを仕入れています。</p>
          </div>
          <div className="value">
            <div className="ic"><Icon.chip /></div>
            <h3>続く伴走</h3>
            <p>納車後も、導入後も。困ったときに相談できる、地域の身近な存在であり続けます。</p>
          </div>
        </div>
      </section>

      {/* featured cars */}
      <section className="section wrap" style={{ paddingTop: 40 }}>
        <SHead
          en="PICK UP" ja="おすすめ車両"
          title="今月のおすすめ車両"
          action={<a className="btn btn--line" onClick={() => go("cars")}>在庫一覧へ <Icon.arrow /></a>} />
        
        <div className="cars">
          {(window.PUBLIC_CARS || CARS).slice(0, 3).map((c) => <CarCard key={c.id} car={c} go={go} />)}
        </div>
        <div className="feed-note">
          <span className="dot"></span>
          在庫情報はカーセンサー／グーネット連携で随時更新されます（※デモ画面ではサンプルを表示しています）
        </div>
      </section>

      {/* DX preview strip */}
      <section className="band" style={{ background: "var(--accent-ink)" }}>
        <div className="wrap" style={{ padding: "84px 32px" }}>
          <div style={{ maxWidth: 760, width: "100%" }}>
            <Eyebrow en="DX SUPPORT" ja="DX支援" light />
            <h2 style={{ marginTop: 18, color: "#fff", fontSize: "clamp(26px,3vw,38px)" }}>「人手が足りない」
  を、仕組みで補う。
            </h2>
            <p style={{ color: "rgba(255,255,255,.72)", marginTop: 16, fontSize: 15 }}>
              AIと自動化で、毎日の手間を減らす。 Web制作で、伝わる入り口をつくる。<br />御社の“ちょうどいいDX”を、無理のない一歩からご提案します。
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30, height: "96px", flexFlow: "wrap" }}>
            {SERVICES.map((s) =>
            <span key={s.id} style={{ fontSize: 13, color: "#fff", border: "1px solid rgba(255,255,255,.26)", padding: "9px 16px", borderRadius: 999, letterSpacing: ".02em" }}>
                {s.title}
              </span>
            )}
          </div>
          <div style={{ marginTop: 30 }}>
            <a className="btn btn--solid" style={{ background: "#fff", color: "var(--accent-ink)" }} onClick={() => go("dx")}>DX支援の詳細へ<Icon.arrow /></a>
          </div>
        </div>
      </section>

      <Band go={go} />
    </div>);

}

window.HomePage = HomePage;

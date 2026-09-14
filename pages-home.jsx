// pages-home.jsx — top page
function HomePage({ go }) {
  return (
    <div className="fade">
      {/* hero */}
      <section className="hero">
        <div className="wrap">
          <div>
            <Eyebrow en="KOTOKOTO INC." ja="中古車販売" />
            <h1 style={{ marginTop: 24, fontWeight: "600", fontSize: "clamp(38px,4.4vw,60px)" }}>
              <span className="hero-pc">まじめに、<br />　コツコツ。<br /><span className="em">“こと”</span>を、<br /><span className="nowrap">やさしく前へ。</span></span>
              <span className="hero-sp">まじめにコツコツ。<br /><span className="nowrap"><span className="em">“こと”</span>を、やさしく前へ。</span></span>
            </h1>
            <p className="lead" style={{ maxWidth: "500px", width: "100%" }}>
              ことこと株式会社は、大阪・寝屋川を拠点に
              <b>「良質な中古車の販売」</b>を行っています。
              誠実な対応と確かな目利きで、
              地域の皆さまのカーライフに寄り添います。
            </p>
            <div className="cta-row">
              <a className="btn btn--solid" onClick={() => go("cars")}>車両を探す<Icon.arrow /></a>
              <a className="btn btn--ghost" onClick={() => go("company")}>会社概要を見る</a>
            </div>
            <div className="stats">
              <div>
                <div className="n serif">寝屋川</div>
                <div className="l">大阪府寝屋川市</div>
              </div>
              <div>
                <div className="n serif">毎日</div>
                <div className="l">在庫を更新</div>
              </div>
              <div>
                <div className="n serif">2025</div>
                <div className="l">Established</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <Ph src={SITE_ASSETS.hero} alt="清潔な車両販売スペース" style={{ width: "100%", height: "100%" }} />
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
            <div className="ic"><Icon.hands /></div>
            <h3>続くお付き合い</h3>
            <p>納車後も、困ったときに相談できる、地域の身近な存在であり続けます。</p>
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
          在庫は毎日更新しています。気になるお車はお気軽にお問い合わせください。
        </div>
      </section>

      <Band go={go} />
    </div>);

}

window.HomePage = HomePage;

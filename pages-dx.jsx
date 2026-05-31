// pages-dx.jsx — DX support page
function DXPage({ go }) {
  return (
    <div className="fade">
      {/* hero */}
      <section className="hero" style={{ borderBottom: "1px solid var(--line-soft)" }}>
        <div className="wrap" style={{ gridTemplateColumns: "1.05fr .95fr" }}>
          <div>
            <Eyebrow en="DX SUPPORT" ja="DX支援" />
            <h1 style={{ marginTop: 24, fontSize: "clamp(32px,4vw,52px)" }}>
              “ちょうどいいDX”を、<br />無理のない一歩から。
            </h1>
            <p className="lead">
              AIと自動化で毎日の手間を減らし、Web制作で伝わる入り口をつくる。
              中小・小規模事業者の現場に合わせて、<b>小さく始めて、ていねいに育てる</b>DXをご支援します。
              オンラインで全国対応が可能です。
            </p>
            <div className="cta-row">
              <a className="btn btn--solid" onClick={() => go("contact")}>相談してみる<Icon.arrow /></a>
              <a className="btn btn--ghost" href="#flow">進め方を見る</a>
            </div>
          </div>
          <div className="hero-visual" style={{ aspectRatio: "4/5" }}>
            <Ph src={SITE_ASSETS.dxHero} alt="DX支援を表すダッシュボードとデスク" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </section>

      {/* services list */}
      <section className="section wrap">
        <SHead en="SERVICES" ja="支援内容" title="できること"
          lead="必要なものを、必要なだけ。一つからでも、組み合わせでも承ります。" />
        <div className="svc-list">
          {SERVICES.map((s) => (
            <div className="svc" key={s.id}>
              <div className="no serif">{s.no}</div>
              <div>
                <div className="en">{s.en}</div>
                <h3>{s.title}</h3>
                <div className="lead">{s.lead}</div>
                <p>{s.desc}</p>
              </div>
              <div className="pts">
                {s.points.map((p) => <span key={p}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* flow */}
      <section className="section--tight wrap" id="flow">
        <SHead en="FLOW" ja="進め方" title="ご相談から運用まで"
          lead="いきなり大きく作りません。効果を確かめながら、段階的に広げていきます。" />
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.no}>
              <div className="no serif">{s.no}</div>
              <div className="bar"></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* works */}
      <section className="section wrap">
        <SHead en="WORKS" ja="取り組み事例" title="制作・導入の事例"
          lead="自社サイトの内製や在庫自動更新など、まず自分たちで試したことを、御社にもお届けします。" />
        <div className="works">
          {WORKS.map((w, i) => (
            <div className="work" key={w.title}>
              <Ph className="pic" src={[SITE_ASSETS.workHomepage, SITE_ASSETS.workInventory, SITE_ASSETS.workChatbot][i] || SITE_ASSETS.workAutomation} alt={w.title} />
              <div className="b">
                <div className="tag">{w.tag}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Band go={go} />
    </div>
  );
}

window.DXPage = DXPage;

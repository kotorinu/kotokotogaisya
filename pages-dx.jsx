// pages-dx.jsx — DX support page
function DXPage({ go }) {
  return (
    <div className="fade">
      {/* hero */}
      <section className="hero" style={{ borderBottom: "1px solid var(--line-soft)" }}>
        <div className="wrap">
          <div>
            <Eyebrow en="DX SUPPORT" ja="DX支援" />
            <h1 style={{ marginTop: 24, fontSize: "clamp(30px,3.4vw,46px)", lineHeight: 1.4 }}>
              <span style={{ whiteSpace: "nowrap" }}>AI活用・業務効率化を、</span><br />
              <span style={{ whiteSpace: "nowrap" }}>無理のない一歩から。</span>
            </h1>
            <p className="lead">
              AIチャットボット導入・業務自動化・業務効率化・ホームページ制作まで。
              中小・小規模事業者の現場に合わせた<b>AIコンサル・DX支援</b>を、
              大阪から全国対応でご提供します。<b>小さく始めて、ていねいに育てる</b>が私たちのスタイルです。
            </p>
            <div className="cta-row">
              <a className="btn btn--solid" onClick={() => go("contact")}>相談してみる<Icon.arrow /></a>
              <a className="btn btn--ghost" href="#flow">進め方を見る</a>
            </div>
          </div>
          <div className="hero-visual">
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

      {/* 伴走支援 */}
      <section className="section--tight wrap">
        <SHead en="PARTNERSHIP" ja="伴走支援" title="つくって終わり、にしません"
          lead="導入したAIや仕組みは、使われてこそ価値になります。御社に合ったAIの活用方法やDXの進め方を、公開・導入のあとも一緒に考え、改善し続けます。" />
        <div className="values">
          <div className="value">
            <h3>あなた専用の使い方</h3>
            <p>業種・体制・お困りごとに合わせて、御社にちょうどいいAI活用とDXの形を一緒に設計します。</p>
          </div>
          <div className="value">
            <h3>運用しながら改善</h3>
            <p>導入して終わりではなく、数字と現場の声を見ながら、無理のないペースで育てていきます。</p>
          </div>
          <div className="value">
            <h3>気軽に相談できる距離</h3>
            <p>「これってできる？」の一言から。専門用語ぬきで、伴走者としてやさしくお応えします。</p>
          </div>
        </div>
      </section>

      <Band go={go} />
    </div>
  );
}

window.DXPage = DXPage;

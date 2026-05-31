// ui.jsx — shared UI primitives for the Kotokoto site.
const { useState, useEffect, useRef } = React;

/* ---- placeholder image (striped, with monospace label) ---- */
function Ph({ label, dark, className = "", style, src, alt }) {
  if (src) {
    return (
      <figure className={"ph ph--image " + className} style={style}>
        <img src={src} alt={alt || label || ""} loading="lazy" />
      </figure>
    );
  }
  return (
    <div className={"ph " + (dark ? "ph--dark " : "") + className} style={style}>
      <span className="tag">{label}</span>
    </div>);

}

/* ---- tiny line icons (simple strokes only) ---- */
const Icon = {
  arrow: (p) =>
  <svg className="arw" width="15" height="15" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  car: (p) =>
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" {...p}>
      <path d="M5 20l2.4-7.2A3 3 0 0 1 10.2 11h13.6a3 3 0 0 1 2.8 1.8L29 20M5 20h24M5 20v4h3v-2M29 20v4h-3v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="23.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>,

  chip: (p) =>
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" {...p}>
      <rect x="10" y="10" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14.5" y="14.5" width="5" height="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 10V6M20 10V6M14 28v-4M20 28v-4M10 14H6M10 20H6M28 14h-4M28 20h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  hands: (p) =>
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" {...p}>
      <path d="M6 22l5 4 9-2 8-6c1-1 0-2.6-1.5-2.2L20 19M6 22V13M6 22l-2 1M20 19l-5-1.5c-1.6-.5-2.4-1-4-1H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9c1.5-2 5-2 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  heart: (p) =>
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 13.5S2.5 10 2.5 6.2A2.7 2.7 0 0 1 8 5a2.7 2.7 0 0 1 5.5 1.2C13.5 10 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>

};

/* ---- header ---- */
function Header({ route, go }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
  { id: "home", ja: "ホーム", en: "HOME" },
  { id: "cars", ja: "車両情報", en: "VEHICLES" },
  { id: "dx", ja: "DX支援", en: "DX SUPPORT" },
  { id: "company", ja: "会社概要", en: "COMPANY" }];
  const navTo = (id) => {
    setMenuOpen(false);
    go(id);
  };

  return (
    <React.Fragment>
      <div className="topbar">
        <div className="wrap">
          <span className="muted">大阪府寝屋川市黒原橘町4-1</span>
          <span><b>TEL 072-814-9416</b> <span className="muted">／ 受付 9:00–18:00（日祝休）</span></span>
        </div>
      </div>
      <header className="site">
        <div className="wrap">
          <div className="brand" onClick={() => navTo("home")}>
            <div className="mark"><span>こ</span></div>
            <div>
              <div className="name">ことこと株式会社</div>
              <div className="en">KOTOKOTO INC.</div>
            </div>
          </div>
          <nav className="main">
            {links.map((l) =>
            <a key={l.id} className={route.name === l.id ? "active" : ""} onClick={() => navTo(l.id)}>
                {l.ja}<span className="en">{l.en}</span>
              </a>
            )}
          </nav>
          <div className="nav-cta">
            <a className="btn btn--solid" onClick={() => navTo("contact")}>お問い合わせ<Icon.arrow /></a>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="メニューを開く" aria-expanded={menuOpen}>
            <svg width="20" height="14" viewBox="0 0 20 14"><path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </header>
      <div className={"drawer-backdrop" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen(false)}></div>
      <aside className={"mobile-drawer" + (menuOpen ? " open" : "")} aria-hidden={!menuOpen}>
        <div className="drawer-head">
          <div>
            <div className="name">ことこと株式会社</div>
            <div className="en">KOTOKOTO INC.</div>
          </div>
          <button onClick={() => setMenuOpen(false)} aria-label="メニューを閉じる">×</button>
        </div>
        <nav>
          {links.map((l) =>
          <a key={l.id} className={route.name === l.id ? "active" : ""} onClick={() => navTo(l.id)}>
            <span>{l.ja}</span><small>{l.en}</small>
          </a>
          )}
          <a onClick={() => navTo("contact")}><span>お問い合わせ</span><small>CONTACT</small></a>
        </nav>
        <div className="drawer-info">
          <b>TEL 072-814-9416</b>
          <span>受付 9:00–18:00（日祝休）</span>
        </div>
      </aside>
    </React.Fragment>);

}

/* ---- eyebrow ---- */
function Eyebrow({ en, ja, light }) {
  return (
    <div className="eyebrow" style={light ? { color: "rgba(255,255,255,.7)" } : null}>
      {en}{ja ? <span className="ja">{ja}</span> : null}
    </div>);

}

/* ---- CTA band ---- */
function Band({ go }) {
  return (
    <section className="band">
      <div className="wrap">
        <div>
          <Eyebrow en="CONTACT" ja="お問い合わせ" />
          <h2 style={{ marginTop: 18 }}>まずは、お気軽にご相談を。</h2>
          <p>車両のこと、業務のDXのこと。小さなお困りごとからで構いません。<br />御社に合った無理のないご提案をいたします。</p>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a className="btn btn--solid" onClick={() => go("contact")}>相談してみる<Icon.arrow /></a>
          <a className="btn btn--ghost" onClick={() => go("cars")}>在庫を見る</a>
        </div>
      </div>
    </section>);

}

/* ---- footer ---- */
function Footer({ go }) {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="top">
          <div className="fbrand">
            <div className="name">ことこと株式会社</div>
            <p>まじめに、コツコツ。良質な車両販売と、中小企業のためのDX支援。大阪・寝屋川から、地域の事業に寄り添います。</p>
          </div>
          <div className="fcol">
            <h4>事業</h4>
            <a onClick={() => go("cars")}>車両情報</a>
            <a onClick={() => go("dx")}>DX支援</a>
          </div>
          <div className="fcol">
            <h4>会社</h4>
            <a onClick={() => go("company")}>会社概要</a>
            <a onClick={() => go("contact")}>お問い合わせ</a>
          </div>
          <div className="fcol">
            <h4>所在地</h4>
            <a>大阪府寝屋川市<br />黒原橘町4-1</a>
            <a>TEL 072-814-9416</a>
          </div>
        </div>
        <div className="legal">
          <span>© 2025 Kotokoto Inc. All rights reserved.</span>
          <span style={{ display: "flex", gap: 20 }}>
            <a>プライバシーポリシー</a>
            <a>特定商取引法に基づく表記</a>
          </span>
        </div>
      </div>
    </footer>);

}

/* ---- generic section heading ---- */
function SHead({ en, ja, title, lead, action }) {
  return (
    <div className="shead">
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <Eyebrow en={en} ja={ja} />
        <h2 style={{ marginTop: 16 }}>{title}</h2>
        {lead ? <p className="lead" style={{ maxWidth: "900px", width: "100%" }}>{lead}</p> : null}
      </div>
      {action}
    </div>);

}

function fmtMileage(m) {return m + "万km";}

Object.assign(window, { Ph, Icon, Header, Footer, Eyebrow, Band, SHead, fmtMileage });

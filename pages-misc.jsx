// pages-misc.jsx — company profile + contact
function CompanyPage({ go }) {
  const profile = [
    ["商号", "ことこと株式会社（Kotokoto Inc.）"],
    ["所在地", "〒572-0000　大阪府寝屋川市黒原橘町4-1"],
    ["設立", "2025年"],
    ["事業内容", "中古自動車の販売／DX支援（AIチャットボット・業務自動化・Web・EC・LP・ホームページ制作）"],
    ["電話", "072-814-9416（受付 9:00–18:00／日祝休）"],
  ];
  return (
    <div className="fade">
      <section className="section wrap" style={{ paddingTop: 56 }}>
        <Eyebrow en="COMPANY" ja="会社概要" />
        <h1 className="serif" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 18 }}>会社概要</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 56, marginTop: 48, alignItems: "start" }} className="company-split">
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 8 }}>まじめに、コツコツ。</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: "54ch" }}>
              社名の「ことこと」には、煮込み料理のように、時間をかけてていねいに育てるという思いを込めています。
              派手さよりも、確かさを。一台の車も、一つの業務改善も、お客様の暮らしと仕事をやさしく前へ進める“こと”だと考えています。
            </p>
            <table className="cprofile" style={{ marginTop: 34 }}>
              <tbody>
                {profile.map(([k, v]) => (
                  <tr key={k}><th>{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Ph className="access" src={SITE_ASSETS.company} alt="ことこと株式会社の店舗イメージ" style={{ width: "100%" }} />
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.9 }}>
              <b style={{ fontFamily: "var(--display)" }}>アクセス</b><br />
              大阪府寝屋川市黒原橘町4-1<br />
              お車でお越しの際は事前にご連絡ください。
            </div>
          </div>
        </div>
      </section>

      <Band go={go} />
    </div>
  );
}

function ContactPage({ go }) {
  const [type, setType] = React.useState("車両について");
  const [sent, setSent] = React.useState(false);

  return (
    <div className="fade">
      <section className="section wrap" style={{ paddingTop: 56 }}>
        <Eyebrow en="CONTACT" ja="お問い合わせ" />
        <h1 className="serif" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 18 }}>お問い合わせ</h1>
        <p className="lead" style={{ color: "var(--ink-soft)", marginTop: 14, maxWidth: "52ch" }}>
          車両のご相談、DX支援のご依頼、その他お問い合わせはこちらから。2営業日以内にご返信いたします。
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr .42fr", gap: 56, marginTop: 44, alignItems: "start" }} className="company-split">
          {sent ? (
            <div style={{ border: "1px solid var(--line)", background: "var(--paper)", padding: "56px 40px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, margin: "0 auto 20px", borderRadius: 999, background: "var(--accent-wash)", display: "grid", placeItems: "center", color: "var(--accent-ink)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 style={{ fontSize: 24 }}>送信しました</h2>
              <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 14 }}>お問い合わせありがとうございます。<br />担当者より折り返しご連絡いたします。</p>
              <a className="btn btn--ghost" style={{ marginTop: 26 }} onClick={() => go("home")}>ホームに戻る</a>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo(0, 0); }}>
              <div className="formgrid">
                <div className="field full">
                  <label>お問い合わせ種別</label>
                  <div className="chips">
                    {["車両について", "DX支援について", "その他"].map((t) => (
                      <button type="button" key={t} className={"chip" + (type === t ? " on" : "")} onClick={() => setType(t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="field"><label>お名前 <span className="req">必須</span></label><input required placeholder="山田 太郎" /></div>
                <div className="field"><label>会社名</label><input placeholder="株式会社〇〇" /></div>
                <div className="field"><label>メールアドレス <span className="req">必須</span></label><input type="email" required placeholder="example@mail.com" /></div>
                <div className="field"><label>電話番号</label><input placeholder="090-0000-0000" /></div>
                <div className="field full"><label>お問い合わせ内容 <span className="req">必須</span></label><textarea required placeholder="ご相談内容をご記入ください。"></textarea></div>
              </div>
              <button type="submit" className="btn btn--solid" style={{ marginTop: 24 }}>送信する<Icon.arrow /></button>
            </form>
          )}

          <aside>
            <div style={{ border: "1px solid var(--line)", background: "var(--paper)", padding: "28px 26px" }}>
              <h3 style={{ fontSize: 18, marginBottom: 16 }}>お電話でのご相談</h3>
              <div className="serif" style={{ fontSize: 28, color: "var(--accent-ink)" }}>072-814-9416</div>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>受付 9:00–18:00（日祝休）</p>
              <hr className="divider" style={{ margin: "22px 0" }} />
              <h4 style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--ink-faint)", marginBottom: 10 }}>所在地</h4>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.9 }}>大阪府寝屋川市<br />黒原橘町4-1</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CompanyPage, ContactPage });

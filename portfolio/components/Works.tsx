import Reveal from "./Reveal";

const WORKS = [
  { title: "書類自動生成テンプレ（デモ）",  tag: "業務効率化", note: "見積〜領収まで連動するスプレッドシートの実装サンプル。" },
  { title: "個人事業主向けLP（デモ）",       tag: "LP制作",     note: "サービス紹介＋問い合わせ動線を1ページで完結。" },
  { title: "コーポレートサイト（デモ）",     tag: "Web制作",    note: "Next.js＋Tailwindで構築した軽量サイト。" },
];

export default function Works() {
  return (
    <section id="works" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Works</p>
          <h2 className="section-title">制作実績・デモギャラリー</h2>
          <p className="section-lead">
            実際の制作物・デモのサンプルです。守秘の都合で一部は抽象化しています。
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} delay={80 + i * 70}>
              <div className="group card overflow-hidden p-0">
                {/* サムネイル枠（実画像はここにnext/imageで差し替え） */}
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                      {w.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{w.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "ヒアリング（無料）",    desc: "今困っている事務作業、業務の流れ、現状ツールをお聞きします。30〜45分。" },
  { n: "02", title: "小さく設計・お見積り",   desc: "「まず1か月で効果が出る範囲」に絞って、設計と料金を提示します。" },
  { n: "03", title: "構築・導入",             desc: "1〜2週間で初期版を構築。実際の案件で使いながら微調整します。" },
  { n: "04", title: "改善・横展開",           desc: "馴染んだら、必要に応じて他業務（LP・LINE・AI活用など）も整えていきます。" },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Process</p>
          <h2 className="section-title">導入の流れ</h2>
          <p className="section-lead">
            最初から大きく作らず、小さく入れて、馴染ませて、必要なら広げる。
          </p>
        </Reveal>

        <ol className="mt-12 grid md:grid-cols-4 gap-5 relative">
          {/* 接続線（PC） */}
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-slate-200 z-0" />

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={80 + i * 80}>
              <li className="relative z-10">
                {/* ステップバッジ */}
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold mb-5 shadow-md">
                  {s.n}
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <a href="#contact" className="btn-primary">
              まずは無料ヒアリングを予約する →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

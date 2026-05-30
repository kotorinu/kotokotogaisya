import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-slate-900 pt-32 md:pt-44 pb-24 md:pb-32 px-6 overflow-hidden"
    >
      {/* 背景の薄いアクセント */}
      <div className="absolute inset-0 pointer-events-none animate-subtle-pulse">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="container-narrow relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-teal-400 font-semibold">
            <span className="w-4 h-px bg-teal-500" />
            For Small Business Owners
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] text-white break-keep">
            小規模事業者の事務や集客の詰まりを、
            <span className="text-teal-400">AIと仕組みで小さく整える。</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl break-keep">
            見積書・請求書・納品書・領収書の作成に毎月何時間も使っていませんか？
            一度の入力で書類が出来上がる仕組みを、あなたの現場に合わせて小さく導入します。
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="btn-primary">
              無料で相談してみる →
            </a>
            <a href="#case" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 text-slate-200 font-medium px-7 py-3.5 text-sm transition hover:bg-slate-800">
              導入事例を見る
            </a>
          </div>
        </Reveal>

        {/* 対応サービスのタグ */}
        <Reveal delay={340}>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            {[
              "書類自動生成・業務整理",
              "Webサイト制作",
              "LP制作",
              "LINE導線整備",
              "AIエージェント構築",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

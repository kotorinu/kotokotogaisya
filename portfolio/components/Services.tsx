import Reveal from "./Reveal";

const SECONDARY = [
  { title: "Webサイト制作",       desc: "コーポレートサイト・小規模事業者向けの「信頼されるサイト」を制作。",                      icon: "🌐" },
  { title: "LP制作",              desc: "1サービスを売るためのランディングページ。問い合わせ動線まで設計。",                       icon: "🎯" },
  { title: "チャットボット付きHP", desc: "問い合わせ前の質問に24時間応えるAIチャット付きサイト。",                                  icon: "💬" },
  { title: "LINE導線整備",        desc: "公式LINEを集客から予約までつながる導線に設計し直します。",                                icon: "📱" },
  { title: "業務効率化支援",       desc: "日々の手作業を棚卸しして、自動化できるところから小さく整えます。",                       icon: "⚙️" },
];

const CONSULT = [
  "AIエージェント構築",
  "営業用ポートフォリオサイト制作",
  "AIを使った社内業務の整理・半自動化",
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Services</p>
          <h2 className="section-title">
            まずは小さく導入し、<br className="hidden md:inline" />必要なら周辺まで整える。
          </h2>
          <p className="section-lead">
            主役は「書類自動生成・業務整理パック」。そこを起点に、Webサイト・LINE・AI活用など必要な領域を順番に整えていきます。
          </p>
        </Reveal>

        {/* 主役サービス */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl border-2 border-teal-200 bg-teal-50 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block text-xs tracking-widest uppercase text-teal-700 font-bold border border-teal-300 rounded-full px-3 py-1 bg-white">
                主役サービス
              </span>
              <span className="text-xs text-teal-600 font-medium">↑ まずここから相談してください</span>
            </div>

            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-slate-900">
              小規模事業者向け<br className="md:hidden" />書類自動生成・業務整理パック
            </h3>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              見積書・請求書・納品書・領収書を"入力1回"でまとめて生成。
              スプレッドシート / GAS / AIを組み合わせて、属人化していた事務作業を整理します。
              テンプレ販売ではなく、あなたの業務に合わせて少しずつ調整できる仕組みでお渡しします。
            </p>

            <ul className="mt-6 grid md:grid-cols-2 gap-3">
              {[
                "見積書→請求書→納品書→領収書を自動連携",
                "1社1テンプレで作るので現場に馴染む",
                "属人化していた事務作業の棚卸しもセット",
                "導入後の小さな修正も柔軟に対応",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-teal-500 text-base">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#case" className="btn-primary">導入事例を見る →</a>
              <a href="#contact" className="btn-ghost">自分のケースで相談する</a>
            </div>
          </div>
        </Reveal>

        {/* 関連サービス */}
        <Reveal delay={180}>
          <div className="mt-14 flex items-center gap-3">
            <h3 className="text-sm tracking-widest uppercase text-slate-400 font-semibold">
              関連サービス
            </h3>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            書類自動化のあと、次に整えたいところも一緒に進められます。
          </p>
        </Reveal>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECONDARY.map((s, i) => (
            <Reveal key={s.title} delay={80 + i * 50}>
              <div className="card h-full">
                <span className="text-2xl">{s.icon}</span>
                <h4 className="mt-4 text-base font-bold text-slate-900">{s.title}</h4>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 相談ベース */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <h3 className="text-xs tracking-widest uppercase text-slate-400 font-semibold">
              相談ベース対応
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              まずヒアリングしてから内容・料金を決めます。
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {CONSULT.map((c) => (
                <li key={c} className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

const SKILLS = [
  "Next.js / React",
  "TypeScript",
  "Google Apps Script",
  "スプレッドシート設計",
  "AI活用設計（GPT / Claude）",
  "LP / Webサイト制作",
  "業務フロー整理",
  "LINE Messaging API",
];

export default function Profile() {
  return (
    <section id="profile" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Profile</p>
          <h2 className="section-title">プロフィール</h2>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-5 gap-8 items-start">
          {/* 左カード */}
          <Reveal delay={100} className="md:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-card">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                KO
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">緒方 琴音 / Kotone Ogata</h3>
              <p className="mt-1 text-sm text-slate-500">ITエンジニア（業務効率化・AI活用設計）</p>

              <div className="mt-6">
                <p className="text-xs tracking-widest uppercase text-slate-400 font-semibold mb-3">Skills</p>
                <ul className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <li key={s} className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* 右テキスト */}
          <Reveal delay={160} className="md:col-span-3">
            <div className="space-y-7">
              <div>
                <h3 className="text-xs tracking-widest uppercase text-teal-600 font-semibold mb-3">経歴</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  ITエンジニアとして業務システム・Web開発に従事しながら、小規模事業者の事務作業をAIと仕組みで小さく整える支援を行っています。
                  「テクノロジーですごいことをする」より、「目の前の現場が、ちょっとラクになる」ことを大事にしています。
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-widest uppercase text-teal-600 font-semibold mb-3">得意なこと</h3>
                <ul className="space-y-2">
                  {[
                    "属人化していた事務作業を、再現可能な仕組みに整理する",
                    "「全部AIにする」ではなく、人とAIの役割分担を設計する",
                    "現場に馴染むサイズで導入し、必要に応じて広げる",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-teal-500 mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-5">
                <h3 className="text-xs tracking-widest uppercase text-teal-700 font-semibold mb-2">想い</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  小規模事業者は、本業のかたわらで事務・集客・経理まで自分でやっています。
                  そこに"ちょうどいい仕組み"を一緒に作ることで、本来やりたい仕事に時間を戻す。
                  それが、私がこの仕事をしている理由です。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

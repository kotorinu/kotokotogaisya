import Reveal from "./Reveal";

const MAIN_CASE = {
  industry: "1人社長 / 制作・受注業",
  title: "見積から領収書まで、1回の入力で全部出る仕組みに",
  problem:
    "毎月の見積書・請求書・納品書・領収書を1件ずつ手作業で作っており、月15時間以上を事務に取られていた。テンプレもバラバラで誤記や送り漏れも発生。",
  solution:
    "案件情報を1か所に入力するだけで、見積→請求→納品→領収まで連動する仕組みを構築。スプレッドシート＋GAS＋AI補助でPDF化と命名規則も自動化。",
  result: [
    "事務時間が月15時間→月2時間程度に圧縮",
    "どの書類を出したかが一覧で見える化",
    "急な見積依頼にもその場で対応できるように",
  ],
};

const SUB_CASES = [
  {
    industry: "個人事業主 / コンサル",
    problem: "毎月の請求書発行と送付が属人化",
    result: "請求書テンプレを統一・自動生成化",
  },
  {
    industry: "小規模店舗",
    problem: "LINE公式の友だちを集客に活かせていない",
    result: "予約までの導線をLINEで設計し直し（相談ベース）",
  },
];

export default function CaseStudies() {
  return (
    <section id="case" className="section-alt">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Case Study</p>
          <h2 className="section-title">
            主役の事例：書類自動生成パック<br className="hidden md:inline" />導入ストーリー
          </h2>
          <p className="section-lead">
            「自分の現場でも本当に動くのか？」が一番気になるところ。実際の使われ方をそのままお見せします。
          </p>
        </Reveal>

        {/* メイン事例 */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-card overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* 左：業種＋タイトル */}
              <div className="md:col-span-2 p-8 md:p-10 bg-slate-900 text-white border-b md:border-b-0 md:border-r border-slate-700">
                <span className="text-xs tracking-widest uppercase text-teal-400 font-semibold">業種</span>
                <p className="mt-2 text-slate-200 text-sm font-medium">{MAIN_CASE.industry}</p>
                <h3 className="mt-6 text-xl md:text-2xl font-bold leading-snug">
                  {MAIN_CASE.title}
                </h3>
              </div>

              {/* 右：詳細 */}
              <div className="md:col-span-3 p-8 md:p-10 space-y-6">
                <div>
                  <p className="text-xs tracking-widest uppercase text-slate-400 font-semibold">課題</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{MAIN_CASE.problem}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-slate-400 font-semibold">やったこと</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{MAIN_CASE.solution}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-teal-600 font-semibold">結果</p>
                  <ul className="mt-2 space-y-2">
                    {MAIN_CASE.result.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                        <span className="mt-1 text-teal-500">▸</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* サブ事例 */}
        <Reveal delay={180}>
          <div className="mt-12 flex items-center gap-3">
            <h3 className="text-sm tracking-widest uppercase text-slate-400 font-semibold">その他の事例</h3>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
        </Reveal>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {SUB_CASES.map((c, i) => (
            <Reveal key={c.industry} delay={100 + i * 80}>
              <div className="card h-full">
                <p className="text-xs tracking-widest uppercase text-teal-600 font-semibold">{c.industry}</p>
                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">課題：</span>{c.problem}
                </p>
                <p className="mt-1.5 text-sm text-slate-700 font-medium">
                  <span className="text-teal-600">成果：</span>{c.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

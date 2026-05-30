import Reveal from "./Reveal";

const VOICES = [
  {
    quote: "請求書を毎月20件くらい作っていたのが、ほぼ自動になりました。事務時間が明らかに減って、本業に集中できています。",
    name:  "1人社長 Aさん",
    role:  "制作業",
  },
  {
    quote: "「とりあえずAI」ではなく、私の業務を見てから提案してくれたのが安心でした。スプレッドシートだけで完結する形にしてくれたのもありがたい。",
    name:  "個人事業主 Bさん",
    role:  "コンサル",
  },
  {
    quote: "業務の流れを一緒に整理してくれて、何を仕組み化するべきかが見えるようになりました。導入後の修正にもすぐ対応してくれます。",
    name:  "店舗オーナー Cさん",
    role:  "小売",
  },
];

export default function Testimonials() {
  return (
    <section className="section-alt">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Voices</p>
          <h2 className="section-title">お客様の声</h2>
          <p className="section-lead">
            「自分の現場に馴染んだ」「事務時間が減った」という声をいただいています。
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {VOICES.map((v, i) => (
            <Reveal key={v.name} delay={80 + i * 80}>
              <div className="card h-full flex flex-col">
                {/* 大きな引用符 */}
                <span className="text-4xl font-serif text-teal-400 leading-none">"</span>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed flex-1">
                  {v.quote}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                    {v.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                    <p className="text-xs text-slate-400">{v.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

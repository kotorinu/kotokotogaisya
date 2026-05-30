"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "ITに詳しくないのですが、相談できますか？",
    a: "もちろん大丈夫です。むしろ「ITが苦手な小規模事業者」が一番のお客様です。専門用語を使わず、現場に合わせて少しずつ進めます。",
  },
  {
    q: "費用はどのくらいかかりますか？",
    a: "ヒアリングのうえお見積りします。書類自動生成パックは、初期構築と月次の小さな改善をセットで提示することが多いです。まずは無料相談で目安をお伝えします。",
  },
  {
    q: "どのくらいの期間で導入できますか？",
    a: "書類自動生成パックの初期版は、ヒアリングから1〜2週間が目安です。最初は最小構成でリリースして、運用しながら整えていきます。",
  },
  {
    q: "今のスプレッドシートやExcelを活かしたいのですが",
    a: "むしろそのほうが現場に馴染みます。新しいツールに乗り換えるのではなく、いま使っているものを土台に仕組み化するのが基本方針です。",
  },
  {
    q: "AIエージェントの構築や、もっと踏み込んだ自動化もお願いできますか？",
    a: "可能ですが、いきなり大きな自動化より、まず手の届く範囲で効果を出すことを優先しています。相談ベースで対応します。",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-alt">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-title">よくあるご質問</h2>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={60 + i * 50}>
                <div className={`border-b border-slate-200 ${isOpen ? "bg-white rounded-xl mb-1" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-4 py-5 flex items-start gap-4 group hover:bg-slate-50 rounded-xl transition"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-sm font-bold mt-0.5 transition ${isOpen ? "text-teal-600" : "text-slate-300"}`}>
                      Q.
                    </span>
                    <span className="flex-1 text-sm md:text-base font-medium text-slate-800 group-hover:text-slate-900">
                      {f.q}
                    </span>
                    <span className={`text-slate-400 text-lg font-light transition-transform mt-0.5 ${isOpen ? "rotate-45" : ""}`} aria-hidden>
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-600 leading-relaxed px-4 pl-12">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

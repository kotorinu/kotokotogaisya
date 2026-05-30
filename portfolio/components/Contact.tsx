"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 本番：Formspree / Resend / EmailJS などに差し替え
    setSent(true);
  };

  return (
    <section id="contact" className="section-alt">
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">まずは、現状をきかせてください。</h2>
          <p className="section-lead">
            「これって相談していいのかな？」くらいの段階で大丈夫です。
            無料ヒアリングで、現状の整理だけでも一緒にやらせてください。
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-5 gap-8">
          {/* フォーム */}
          <Reveal delay={100} className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-slate-200 bg-white shadow-card p-7 md:p-9 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">お名前</label>
                <input
                  required type="text" name="name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">メールアドレス</label>
                <input
                  required type="email" name="email"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">相談内容</label>
                <textarea
                  required name="message" rows={5}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition resize-none"
                  placeholder="例：請求書の作成に毎月時間がかかっていて困っています。"
                />
              </div>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                {sent ? "✓ 送信しました！" : "送信する →"}
              </button>

              {sent && (
                <p className="text-xs text-slate-400">※ デモ送信です。本番ではAPI連携してください。</p>
              )}
            </form>
          </Reveal>

          {/* サイドinfo */}
          <Reveal delay={180} className="md:col-span-2">
            <div className="space-y-4">
              <div className="card">
                <p className="text-xs tracking-widest uppercase text-teal-600 font-semibold mb-3">メール</p>
                <a
                  href="mailto:koto.tama.yellow@gmail.com"
                  className="text-sm text-slate-900 font-medium hover:text-teal-600 transition break-all"
                >
                  koto.tama.yellow@gmail.com
                </a>
              </div>

              <div className="card">
                <p className="text-xs tracking-widest uppercase text-teal-600 font-semibold mb-3">SNS</p>
                <ul className="space-y-2 text-sm">
                  {/* SNSは実URLに差し替え */}
                  <li><a href="#" className="text-slate-700 hover:text-teal-600 transition">𝕏 (Twitter) →</a></li>
                  <li><a href="#" className="text-slate-700 hover:text-teal-600 transition">Note →</a></li>
                  <li><a href="#" className="text-slate-700 hover:text-teal-600 transition">LINE公式 →</a></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
                <p className="text-xs text-slate-500 leading-relaxed">
                  押し売りはしません。相談内容を聞いて、こちらでお力になれそうな範囲だけご案内します。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

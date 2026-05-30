"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#services", label: "サービス" },
  { href: "#case",     label: "事例" },
  { href: "#process",  label: "進め方" },
  { href: "#faq",      label: "FAQ" },
  { href: "#profile",  label: "プロフィール" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-all ${
        scrolled ? "border-b border-slate-200 shadow-sm" : ""
      }`}
    >
      <div className="container-narrow flex items-center justify-between py-4 px-6">
        {/* ロゴ */}
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-teal-500 group-hover:scale-125 transition" />
          <span className="text-slate-900 font-bold tracking-tight">
            Kotone Ogata
          </span>
        </a>

        {/* PCナビ */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-500 hover:text-slate-900 transition font-medium"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary !py-2 !px-5 text-sm">
            お問い合わせ
          </a>
        </nav>

        {/* SPナビ */}
        <a href="#contact" className="md:hidden text-sm text-teal-600 font-semibold">
          お問い合わせ →
        </a>
      </div>
    </header>
  );
}

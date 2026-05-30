export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 px-6 text-center">
      <div className="container-narrow flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <p className="text-white font-bold">Kotone Ogata</p>
        </div>
        <p className="text-sm text-slate-400">
          小規模事業者の事務や集客の詰まりを、AIと仕組みで小さく整える
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <a href="#services" className="hover:text-slate-300 transition">サービス</a>
          <span>·</span>
          <a href="#case" className="hover:text-slate-300 transition">事例</a>
          <span>·</span>
          <a href="#contact" className="hover:text-slate-300 transition">お問い合わせ</a>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          © {new Date().getFullYear()} Kotone Ogata. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

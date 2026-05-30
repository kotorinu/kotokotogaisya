import Reveal from "./Reveal";

const STATS = [
  { value: "月15時間+", label: "削減した事務作業時間（1社あたり目安）" },
  { value: "1〜2週間",  label: "書類自動生成パックの初期構築リードタイム" },
  { value: "100%",     label: "ヒアリング〜設計〜納品まで一貫対応" },
];

export default function Stats() {
  return (
    <section className="bg-teal-600 py-16 px-6">
      <div className="container-narrow">
        <Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">{s.value}</p>
                <p className="mt-3 text-sm text-teal-100 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

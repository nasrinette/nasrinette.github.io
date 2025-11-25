export function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-8 border-2 border-light-gray text-center transition-all duration-300 hover:border-burgundy hover:-translate-y-1 hover:shadow-lg">
          <div className="font-display text-4xl font-black text-burgundy leading-none mb-2">
            {stat.number}
          </div>
          <div className="font-semibold text-dark-gray mb-1 text-sm">
            {stat.label}
          </div>
          {stat.note && (
            <div className="text-sm text-gray italic">
              {stat.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ResultsGrid({ results }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {results.map((result, i) => (
        <div
          key={i}
          className={`bg-white p-8 border-2 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            result.highlight
              ? 'border-burgundy border-3 bg-gradient-to-br from-burgundy/5 to-brown/5'
              : 'border-light-gray'
          }`}
        >
          <div className="font-display text-5xl font-black text-burgundy leading-none mb-3">
            {result.metric}
          </div>
          <div className="font-semibold text-base mb-4 text-dark-gray">
            {result.label}
          </div>
          {result.insight && (
            <div className="text-sm leading-relaxed opacity-80 text-dark-gray">
              {result.insight}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function TransformationBox({ before, after }) {
  return (
    <div className="bg-gradient-to-br from-burgundy/5 to-brown/5 border-2 border-burgundy p-10 my-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center mb-8">
        <div className="text-center opacity-70">
          <div className="text-sm uppercase tracking-wider font-semibold mb-2">
            {before.label}
          </div>
          <div className="font-display text-6xl font-black text-burgundy leading-none my-2">
            {before.number}
          </div>
          <div className="text-sm opacity-70 mt-2">
            {before.note}
          </div>
        </div>
        <div className="text-5xl text-burgundy font-bold text-center md:rotate-0 rotate-90">
          →
        </div>
        <div className="text-center">
          <div className="text-sm uppercase tracking-wider font-semibold mb-2">
            {after.label}
          </div>
          <div className="font-display text-6xl font-black text-burgundy leading-none my-2">
            {after.number}
          </div>
          <div className="text-sm opacity-70 mt-2">
            {after.note}
          </div>
        </div>
      </div>
    </div>
  );
}

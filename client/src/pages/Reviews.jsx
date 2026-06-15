import SectionHeading from '../components/SectionHeading';

const reviewMetrics = [
  { label: 'Emotion', score: 9.2 },
  { label: 'Creativity', score: 8.8 },
  { label: 'Rhythm', score: 8.4 },
  { label: 'Imagery', score: 9.0 },
];

function Reviews() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Reviews" subtitle="AI insight for your verse" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-6 rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Review Categories</p>
          {reviewMetrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-border bg-background/90 p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted">{metric.label}</p>
                <span className="text-2xl font-semibold text-text">{metric.score}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-primary" style={{ width: `${metric.score * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[2rem] border border-border bg-background/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">AI Analysis</p>
          <h2 className="mt-4 text-3xl font-semibold text-text">Tone, symbol, and rhythm insights</h2>
          <p className="mt-4 leading-7 text-muted">KavyaKosh provides review signals for each poem, calling out emotional depth, imagery balance, and readability for modern poetic audiences.</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-border bg-surface/80 p-5">
              <p className="font-semibold text-text">Reviewer suggestion</p>
              <p className="mt-2 text-sm text-muted">Add a strong visual anchor early on and let the closing stanza land with a sharper emotional beat.</p>
            </div>
            <div className="rounded-3xl border border-border bg-surface/80 p-5">
              <p className="font-semibold text-text">Improve rhythm</p>
              <p className="mt-2 text-sm text-muted">Try alternating short and long lines to increase flow and tension in the middle section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;

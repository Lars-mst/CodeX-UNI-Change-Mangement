export default function ProgressBar({ value, max, label }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="text-slate-500">{value} / {max}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-health-teal transition-all" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

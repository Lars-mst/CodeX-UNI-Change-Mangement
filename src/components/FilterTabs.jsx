export default function FilterTabs({ items, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto p-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`focus-ring shrink-0 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            active === item
              ? "border-ink bg-ink text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:bg-slate-50 hover:text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

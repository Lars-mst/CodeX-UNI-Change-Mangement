export default function FilterTabs({ items, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`focus-ring shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            active === item
              ? "bg-ink text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

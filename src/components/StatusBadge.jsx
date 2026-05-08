import { statusStyles } from "../data/platform.js";

export default function StatusBadge({ children }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[children] ?? "bg-slate-100 text-slate-700"}`}>
      {children}
    </span>
  );
}

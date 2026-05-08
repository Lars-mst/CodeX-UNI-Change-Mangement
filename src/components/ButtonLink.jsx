import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-health-teal text-white hover:bg-teal-700",
    dark: "bg-ink text-white hover:bg-slate-800",
    light: "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50"
  };

  return (
    <Link
      to={to}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";

const toneStyles = {
  teal: "bg-mist-green text-health-teal",
  green: "bg-green-50 text-green-700",
  blue: "bg-soft-blue text-sky-700",
  coral: "bg-rose-50 text-rose-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-700"
};

export default function HubCard({
  item,
  to,
  title,
  text,
  meta,
  cta = "Öffnen",
  favorite,
  onFavorite,
  children
}) {
  const Icon = item?.icon;
  const target = to ?? item?.to;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:border-teal-200">
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <span className={`grid h-11 w-11 place-items-center rounded-lg ${toneStyles[item.tone] ?? toneStyles.teal}`}>
            <Icon size={22} />
          </span>
        ) : null}
        {onFavorite ? (
          <button
            type="button"
            aria-label={favorite ? "Favorit entfernen" : "Favorit speichern"}
            onClick={onFavorite}
            className={`focus-ring grid h-9 w-9 place-items-center rounded-lg border ${
              favorite ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-400 hover:text-rose-500"
            }`}
          >
            <Heart size={17} fill={favorite ? "currentColor" : "none"} />
          </button>
        ) : null}
      </div>
      {meta ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-health-teal">{meta}</p> : null}
      <h3 className="mt-2 text-lg font-bold text-ink">{title ?? item?.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text ?? item?.text ?? item?.description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
      {target ? (
        <Link
          to={target}
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-health-teal hover:text-teal-700"
        >
          {cta ?? item?.cta}
          <ArrowRight size={16} />
        </Link>
      ) : null}
    </article>
  );
}

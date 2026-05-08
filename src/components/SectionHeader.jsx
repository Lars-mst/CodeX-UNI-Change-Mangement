export default function SectionHeader({ eyebrow, title, text, action }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-normal text-ink sm:text-3xl">{title}</h2>
        {text ? <p className="mt-3 text-base leading-7 text-slate-600">{text}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

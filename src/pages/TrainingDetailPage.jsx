import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { trainings } from "../data/platform.js";

export default function TrainingDetailPage() {
  const { slug } = useParams();
  const training = trainings.find((item) => item.slug === slug);

  if (!training) {
    return (
      <section className="page-shell section-pad">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold">Schulung nicht gefunden</h1>
          <ButtonLink to="/schulungen" className="mt-5">Zur Schulungsübersicht</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell section-pad">
      <Link
        to="/schulungen"
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal"
      >
        <ArrowLeft size={17} />
        Zur Schulungsübersicht
      </Link>

      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1fr_340px] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">
            {training.category} · {training.provider}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{training.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{training.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {training.outcomes.map((outcome) => (
              <p key={outcome} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 size={16} className="text-health-teal" />
                {outcome}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/schulungen">{training.requiresApproval ? "Genehmigung anfragen" : "Schulung starten"}</ButtonLink>
            <ButtonLink to="/profil" variant="light">Profil ansehen</ButtonLink>
          </div>
        </div>

        <aside className="rounded-lg bg-slate-50 p-5">
          <StatusBadge>{training.status}</StatusBadge>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <p className="rounded-lg bg-white p-3"><strong>{training.points}</strong> Punkte</p>
            <p className="rounded-lg bg-white p-3"><strong>{training.duration}</strong> Dauer</p>
            {training.requiresApproval ? (
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-amber-900">
                <ShieldCheck size={17} className="mt-0.5" />
                Diese Schulung wird durch die Führungskraft genehmigt.
              </p>
            ) : (
              <p className="rounded-lg bg-mist-green p-3 text-teal-900">Direkt startbar ohne Genehmigung.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

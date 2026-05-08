import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  MessageCircle,
  Sparkles,
  Trophy
} from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import HubCard from "../components/HubCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import avatarImage from "../assets/ava-benefit-assistant.jpg";
import {
  benefitOffers,
  communityActivities,
  healthOffers,
  hubModules,
  pointsProfile,
  trainings,
  userProfile
} from "../data/platform.js";

export default function HomePage({ onChatOpen }) {
  const topBenefits = benefitOffers.filter((benefit) => benefit.featured).slice(0, 3);
  const currentHealth = healthOffers.slice(0, 3);
  const upcomingActivities = communityActivities.slice(0, 3);
  const recommendedTraining = trainings.find((training) => training.slug === "ki-im-arbeitsalltag");

  return (
    <>
      <section className="page-shell grid gap-8 pb-10 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:pt-12">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-lg bg-mist-green px-3 py-1.5 text-sm font-semibold text-teal-800">
            <Sparkles size={16} />
            Zentrales Anreizsystem für Mitarbeitende
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            Unser 4-Säulen-Anreizsystem
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Hallo {userProfile.name.split(" ")[0]}, hier findest du BeWell, Schulungen & Punkte, Ermäßigungen sowie Communities & Freizeitgruppen.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/bewell">BeWell entdecken</ButtonLink>
            <button
              type="button"
              onClick={onChatOpen}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <MessageCircle size={17} />
              Ava fragen
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [userProfile.points, "Punkte"],
              [userProfile.bookedEvents.length, "gebuchte Events"],
              [userProfile.communities.length, "Communities"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
                <p className="text-2xl font-bold text-health-teal">{value}</p>
                <p className="mt-1 text-sm text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <img
                src={avatarImage}
                alt="Ava, digitaler Benefit-Assistent"
                className="h-20 w-20 shrink-0 rounded-full object-cover object-[50%_38%] ring-4 ring-teal-100"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-health-teal">KI-Assistent</p>
                <h2 className="mt-1 text-xl font-bold text-ink">Ava führt dich durch alle vier Säulen.</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {["Check-up buchen", "Punkte erklären", "Rabatt finden", "Community wählen"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={onChatOpen}
                  className="focus-ring rounded-lg bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-mist-green hover:text-teal-800"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-ink p-5 text-white shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-health-teal">
                <Trophy size={22} />
              </span>
              <div>
                <h2 className="font-bold">Schulungsfortschritt</h2>
                <p className="text-sm text-slate-200">{pointsProfile.level}</p>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-white/10 p-4">
              <ProgressBar value={pointsProfile.current} max={pointsProfile.yearlyGoal} label="Jahresziel" />
            </div>
            {recommendedTraining ? (
              <Link
                to="/schulungen"
                className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-white"
              >
                {recommendedTraining.title} starten
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        </aside>
      </section>

      <section className="border-y border-slate-200 bg-white/70 section-pad">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Vier Säulen"
            title="Klar strukturiert, schnell nutzbar"
            text="Die Startseite zeigt nur die wichtigsten Einstiege. Details öffnen sich über Unterseiten, Filter und Buchungsdialoge."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {hubModules.map((module) => (
              <HubCard key={module.title} item={module} cta="Mehr erfahren">
                <div className="grid gap-2">
                  {module.status ? (
                    <span className="w-fit rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                      {module.status}
                    </span>
                  ) : null}
                  {module.highlights.map((highlight) => (
                    <p key={highlight} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-health-teal" />
                      {highlight}
                    </p>
                  ))}
                </div>
              </HubCard>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <SectionHeader
              eyebrow="Empfohlen"
              title="Persönliche Empfehlungen"
              text="Kompakte Vorschläge auf Basis deiner Interessen und aktuellen Aktionen."
              action={<ButtonLink to="/profil" variant="light">Profil ansehen</ButtonLink>}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {topBenefits.map((benefit) => (
                <HubCard
                  key={benefit.slug}
                  item={benefit}
                  to={`/ermaessigungen/${benefit.slug}`}
                  meta={benefit.category}
                  cta="Angebot nutzen"
                >
                  <p className="text-sm font-bold text-ink">{benefit.advantage}</p>
                  <p className="mt-1 text-xs text-slate-500">{benefit.region}</p>
                </HubCard>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Aktuell"
              title="BeWell & Communities"
              text="Nur die nächsten relevanten Termine aus Säule 1 und Säule 4, damit das Dashboard ruhig bleibt."
            />
            <div className="grid gap-3">
              {currentHealth.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Link
                    key={offer.slug}
                    to={`/bewell/${offer.slug}`}
                    className="focus-ring flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft hover:border-teal-200"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mist-green text-health-teal">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{offer.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">{offer.description}</span>
                    </span>
                  </Link>
                );
              })}
              {upcomingActivities.map((event) => (
                <Link
                  key={event.slug}
                  to={event.detailPath}
                  className="focus-ring flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft hover:border-teal-200"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-soft-blue text-sky-700">
                    {event.category === "Gesundheit" ? <HeartPulse size={20} /> : <CalendarDays size={20} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{event.title}</span>
                    <span className="text-sm text-slate-600">{event.date} · {event.place}</span>
                  </span>
                  <CheckCircle2 className="ml-auto text-health-teal" size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

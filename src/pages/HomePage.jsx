import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  HeartPulse,
  Info,
  MessageCircle,
  Sparkles,
  Trophy,
  X
} from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import HubCard from "../components/HubCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import avatarImage from "../assets/avaAvatar.js";
import {
  benefitOffers,
  communityActivities,
  healthOffers,
  hubModules,
  pointsProfile,
  userProfile
} from "../data/platform.js";

export default function HomePage({ onChatOpen, currentPoints = pointsProfile.current }) {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const topBenefits = benefitOffers.filter((benefit) => benefit.featured).slice(0, 3);
  const currentHealth = healthOffers.slice(0, 3);
  const upcomingActivities = communityActivities.slice(0, 3);

  return (
    <>
      <section className="page-shell grid gap-8 pb-10 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:pt-12">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-lg bg-mist-green px-3 py-1.5 text-sm font-semibold text-teal-800">
              <Sparkles size={16} />
              Zentrales Anreizsystem für Mitarbeitende
            </p>
            <button
              type="button"
              onClick={() => setDisclaimerOpen(true)}
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-teal-200 hover:text-health-teal"
            >
              <Info size={14} />
              Disclaimer
            </button>
          </div>
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
              [currentPoints, "Punkte"],
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
              <span className="relative h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-teal-200 via-sky-200 to-violet-200 p-1 shadow-sm ring-4 ring-teal-100">
                <img
                  src={avatarImage}
                  alt="Ava, digitaler Benefit-Assistent"
                  className="h-full w-full rounded-full object-cover object-[50%_38%]"
                />
                <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-ink text-white ring-2 ring-white">
                  <Sparkles size={14} />
                </span>
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-health-teal">KI-Assistent</p>
                <h2 className="mt-1 text-xl font-bold text-ink">Ava führt dich durch alle vier Säulen.</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {["Check-up buchen", "Punkte erklären", "Ermäßigungen finden", "Community wählen"].map((label) => (
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

          <div className="rounded-lg border border-teal-100 bg-gradient-to-br from-mist-green via-white to-teal-50 p-5 text-ink shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-health-teal text-white shadow-sm">
                <Trophy size={22} />
              </span>
              <div>
                <h2 className="font-bold">Schulungsfortschritt</h2>
                <p className="text-sm text-slate-600">{pointsProfile.level}</p>
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-teal-100 bg-white/80 p-4">
              <ProgressBar value={currentPoints} max={pointsProfile.yearlyGoal} label="Jahresziel" />
            </div>
          </div>
        </aside>
      </section>

      <section className="border-y border-slate-200 bg-white/70 section-pad">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Vier Säulen"
            title="Klar strukturiert, schnell nutzbar"
            text="Wähle direkt eine der vier Säulen und springe in die passenden Unterbereiche."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {hubModules.map((module) => (
              <HubCard key={module.title} item={module} cta="Mehr erfahren" balanced>
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
              {topBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <a
                    key={benefit.slug}
                    href={benefit.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:border-teal-200"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist-green text-health-teal">
                      <Icon size={22} />
                    </span>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-health-teal">
                      {benefit.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-ink">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
                    <p className="mt-4 text-sm font-bold text-ink">{benefit.advantage}</p>
                    <p className="mt-1 text-xs text-slate-500">{benefit.region}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-health-teal">
                      Anbieter öffnen
                      <ExternalLink size={16} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Aktuell"
              title="Aktuelle Angebote & Termine"
              text="Hier findest du aktuelle Angebote, Gesundheitstermine und Aktionen."
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

      {disclaimerOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
          <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-health-teal">Weitere Informationen</p>
                <h2 id="disclaimer-title" className="mt-2 text-2xl font-bold text-ink">Disclaimer</h2>
              </div>
              <button
                type="button"
                onClick={() => setDisclaimerOpen(false)}
                className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-ink"
                aria-label="Disclaimer schließen"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Diese Website wurde ausschließlich im Rahmen eines universitären Projekts erstellt. Es handelt sich um ein fiktives Konzept, das lediglich zu Demonstrations- und Präsentationszwecken dient und nicht für den realen oder kommerziellen Einsatz konzipiert ist.
              </p>
              <p>
                Alle dargestellten Inhalte, Funktionen und Designs sind Teil eines studentischen Projektkonzepts. Eine vollständige oder teilweise Übernahme, Nachahmung oder Nutzung des Konzepts mit wesentlicher Ähnlichkeit ist ohne ausdrückliche Zustimmung nicht gestattet. Bei unberechtigter Nutzung oder Kopie behalten wir uns rechtliche Schritte vor.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDisclaimerOpen(false)}
              className="focus-ring mt-6 w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Verstanden
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

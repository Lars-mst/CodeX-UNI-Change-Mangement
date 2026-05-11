import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Crown, Gem, Medal, ShieldCheck, Sparkles } from "lucide-react";
import FilterTabs from "../components/FilterTabs.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import profileImage from "../assets/karin-mueller-profile.jpg";
import {
  leaderboard,
  pointsProfile,
  rewards,
  trainingCategories,
  trainings
} from "../data/platform.js";

const tabs = ["Schulungen", "Punkte & Leaderboard"];

const leagueTiers = [
  { name: "Bronze-Liga", short: "Bronze", min: 0, icon: Medal, frame: "linear-gradient(135deg, #a16207, #d97706, #92400e)" },
  { name: "Silber-Liga", short: "Silber", min: 250, icon: ShieldCheck, frame: "linear-gradient(135deg, #94a3b8, #e2e8f0, #64748b)" },
  { name: "Gold-Liga", short: "Gold", min: 500, icon: Crown, frame: "conic-gradient(from 20deg, #92400e, #facc15, #fef3c7, #d97706, #92400e)" },
  { name: "Platin-Liga", short: "Platin", min: 800, icon: Sparkles, frame: "conic-gradient(from 45deg, #0f766e, #ccfbf1, #94a3b8, #e0f2fe, #0f766e)" },
  { name: "Diamant-Liga", short: "Diamant", min: 1200, icon: Gem, frame: "conic-gradient(from 90deg, #4f46e5, #22d3ee, #f0f9ff, #a78bfa, #4f46e5)" }
];

function getLeague(points) {
  return leagueTiers.reduce((current, tier) => (points >= tier.min ? tier : current), leagueTiers[0]);
}

function createAvatarDataUri(avatar) {
  const config = {
    tone: "female",
    skin: "#e7b98f",
    hair: "#3f2a22",
    shirt: "#0f766e",
    accent: "#ccfbf1",
    bg: "#f8fafc",
    bg2: avatar?.accent ?? "#e0f2fe",
    jacket: avatar?.shirt ?? "#0f766e",
    collar: "#ffffff",
    ...avatar
  };
  const hairShape = config.tone === "male"
    ? `<path d="M27 41c1.8-14.5 13.5-24.5 29.5-21.5 11.5 2.2 17 11 14.5 25.8-8.3-7.8-27.4-10.2-44-4.3Z" fill="${config.hair}"/>
       <path d="M29 39c7.5-10 24.5-12 35.5-4.5" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.18"/>`
    : config.curls
      ? `<circle cx="31" cy="43" r="14.5" fill="${config.hair}"/><circle cx="46" cy="32" r="18.5" fill="${config.hair}"/><circle cx="64" cy="43" r="15" fill="${config.hair}"/>
         <circle cx="31" cy="42" r="5" fill="#ffffff" opacity="0.12"/><circle cx="58" cy="32" r="5.5" fill="#ffffff" opacity="0.1"/>`
      : `<path d="M24.5 49c0-20.5 10.8-34 24-34s23.5 13.5 23.5 34c0 20-9.5 32.5-23.8 32.5S24.5 69 24.5 49Z" fill="${config.hair}"/>
         <path d="M33 24c6-5.8 19-7 28.5.5" fill="none" stroke="#ffffff" stroke-width="1.3" opacity="0.16"/>`;
  const beardShape = config.beard
    ? `<path d="M34 54c3 12 9 18 14 18s12-6 15-18c-8 5-20 5-29 0Z" fill="${config.hair}" opacity="0.88"/>`
    : "";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <radialGradient id="portraitBg" cx="32%" cy="22%" r="82%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="46%" stop-color="${config.bg}"/>
          <stop offset="100%" stop-color="${config.bg2}"/>
        </radialGradient>
        <linearGradient id="jacket" x1="18" x2="78" y1="66" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${config.jacket}"/>
          <stop offset="100%" stop-color="${config.shirt}"/>
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#portraitBg)"/>
      <circle cx="22" cy="25" r="13" fill="#ffffff" opacity="0.34"/>
      <circle cx="78" cy="22" r="9" fill="${config.accent}" opacity="0.35"/>
      <path d="M14 96c4.2-20.5 18.8-32.5 34-32.5S77.8 75.5 82 96H14Z" fill="url(#jacket)" filter="url(#softShadow)"/>
      <path d="M35 67l13 15 13-15-13-4-13 4Z" fill="${config.collar}"/>
      <path d="M34 69l-5 27h38l-5-27-14 13-14-13Z" fill="${config.accent}" opacity="0.58"/>
      ${hairShape}
      <ellipse cx="48" cy="47" rx="18.5" ry="20.5" fill="${config.skin}" filter="url(#softShadow)"/>
      <circle cx="29.7" cy="49" r="4.5" fill="${config.skin}"/>
      <circle cx="66.3" cy="49" r="4.5" fill="${config.skin}"/>
      <path d="M36 39c4-2.1 7.5-2 10 .3" fill="none" stroke="${config.hair}" stroke-width="2" stroke-linecap="round" opacity="0.82"/>
      <path d="M51 39.3c3-2.2 6.8-2.3 10.5-.2" fill="none" stroke="${config.hair}" stroke-width="2" stroke-linecap="round" opacity="0.82"/>
      ${beardShape}
      <ellipse cx="41" cy="45" rx="2.1" ry="2.4" fill="#0f172a"/>
      <ellipse cx="55" cy="45" rx="2.1" ry="2.4" fill="#0f172a"/>
      <circle cx="41.8" cy="44.1" r="0.6" fill="#ffffff"/>
      <circle cx="55.8" cy="44.1" r="0.6" fill="#ffffff"/>
      <path d="M48 46.5c-.4 4-1.7 7-3.6 8.7 1.7 1.1 4.5 1.2 6.5.2" fill="none" stroke="#9a5b3d" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M42 58c3.8 4 9.2 4 13 0" fill="none" stroke="#7c2d12" stroke-width="2.3" stroke-linecap="round"/>
      <circle cx="36" cy="52" r="3.5" fill="#fda4af" opacity="0.22"/>
      <circle cx="60" cy="52" r="3.5" fill="#fda4af" opacity="0.22"/>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getAvatarSource(person) {
  return person.name === "Karin Müller" ? profileImage : person.avatar?.photo ?? createAvatarDataUri(person.avatar);
}

function getLeaderboardRowClass(index, isCurrentUser = false) {
  if (isCurrentUser) {
    return "border-teal-600 bg-teal-50 ring-2 ring-teal-700/25 shadow-[0_14px_34px_rgba(15,118,110,0.16)]";
  }

  if (index === 0) {
    return "border-amber-200 bg-gradient-to-r from-amber-50 via-white to-yellow-50 shadow-[0_14px_34px_rgba(217,119,6,0.14)]";
  }

  if (index === 1) {
    return "border-slate-300 bg-gradient-to-r from-slate-100 via-white to-slate-50 shadow-[0_12px_30px_rgba(100,116,139,0.12)]";
  }

  if (index === 2) {
    return "border-orange-200 bg-gradient-to-r from-orange-50 via-white to-amber-50 shadow-[0_12px_30px_rgba(180,83,9,0.1)]";
  }

  return "border-slate-200 bg-slate-50";
}

function getRankBadgeClass(index) {
  if (index === 0) return "bg-amber-100 text-amber-800 ring-1 ring-amber-200";
  if (index === 1) return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
  if (index === 2) return "bg-orange-100 text-orange-800 ring-1 ring-orange-200";
  return "bg-white text-slate-500 ring-1 ring-slate-200";
}

export default function TrainingPage({ currentPoints = pointsProfile.current }) {
  const [activeTab, setActiveTab] = useState("Schulungen");
  const [category, setCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [leaderboardView, setLeaderboardView] = useState("Personen");

  const filteredTrainings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return trainings.filter((training) => {
      const matchesCategory = category === "Alle" || training.category === category;
      const haystack = `${training.title} ${training.category} ${training.provider} ${training.description}`.toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);

  const currentLeague = getLeague(currentPoints);
  const pointsDelta = Math.max(0, currentPoints - pointsProfile.current);
  const sortedPeople = useMemo(
    () =>
      leaderboard.people
        .map((person) => (person.name === "Karin Müller" ? { ...person, points: currentPoints } : person))
        .sort((first, second) => second.points - first.points),
    [currentPoints]
  );
  const sortedDepartments = useMemo(
    () =>
      leaderboard.departments
        .map((department) =>
          department.name === "Operations" ? { ...department, points: department.points + pointsDelta } : department
        )
        .sort((first, second) => second.points - first.points),
    [pointsDelta]
  );

  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Säule 2"
        title="Digitales Schulungsangebot mit Punktesystem"
        text="Partnerkurse, Punkte, Meilensteine und Genehmigungen fördern Entwicklung ohne Wettbewerbsdruck."
      />

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <FilterTabs items={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "Schulungen" ? (
        <>
          <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <div className="grid gap-4">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Schulung, Anbieter oder Thema suchen"
                className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none"
              />
              <FilterTabs items={trainingCategories} active={category} onChange={setCategory} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredTrainings.map((training) => {
              return (
                <article key={training.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-health-teal">
                        {training.category} · {training.provider}
                      </p>
                      <h2 className="mt-2 text-lg font-bold text-ink">{training.title}</h2>
                    </div>
                    <StatusBadge>{training.status}</StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{training.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {training.points} Punkte
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {training.duration}
                    </span>
                    {training.requiresApproval ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                        Führungskraft-Genehmigung
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {training.outcomes.map((outcome) => (
                      <p key={outcome} className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                        {outcome}
                      </p>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      to={`/schulungen/${training.slug}`}
                      className="focus-ring inline-flex items-center justify-center rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
                    >
                      Schulung öffnen
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : null}

      {activeTab === "Punkte & Leaderboard" ? (
        <div className="grid gap-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-ink">Liga-System & Meilensteine</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Schulungen bringen Punkte, Punkte schalten neue Ligen und Meilensteine frei. Je nach erreichter Liga erhält das Profilbild eine andere Umrandung, sodass der Fortschritt sichtbar wird. Persönliche Einlösungen bleiben im Profilbereich.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {leagueTiers.map((tier) => {
                const Icon = tier.icon;
                const reached = currentPoints >= tier.min;
                const isCurrent = currentLeague.name === tier.name;

                return (
                  <article
                    key={tier.name}
                    className={`rounded-lg border p-5 ${
                      isCurrent
                        ? "border-amber-200 bg-amber-50"
                        : reached
                          ? "border-teal-100 bg-mist-green"
                          : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-20 w-20 shrink-0 rounded-full p-1.5" style={{ background: tier.frame }}>
                        <span className="grid h-full w-full place-items-center rounded-full bg-white">
                          <Icon size={28} className="text-ink" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">{tier.name}</h3>
                        <p className="mt-1 text-base text-slate-500">ab {tier.min} Punkten</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-ink">Belohnungen</h3>
                <Link
                  to="/profil"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 sm:w-auto"
                >
                  Jetzt Einlösen
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((reward) => {
                  const Icon = reward.icon;

                  return (
                    <article key={reward.title} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-700">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h4 className="font-bold text-ink">{reward.title}</h4>
                        <p className="mt-1 text-sm text-slate-500">{reward.points} Punkte</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-health-teal">Leaderboard</p>
                <h2 className="mt-1 text-xl font-bold text-ink">Rangliste nach Punkten</h2>
              </div>
              <div className="inline-grid w-full grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1 sm:w-auto">
                {["Personen", "Abteilungen"].map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setLeaderboardView(view)}
                    className={`focus-ring rounded-md px-4 py-2 text-sm font-bold transition ${
                      leaderboardView === view
                        ? "bg-health-teal text-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-ink"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {leaderboardView === "Personen"
                ? sortedPeople.map((person, index) => {
                    const personLeague = getLeague(person.points);

                    return (
                      <article
                        key={person.name}
                        className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border px-4 py-3 ${getLeaderboardRowClass(index, person.name === "Karin Müller")}`}
                      >
                        <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${getRankBadgeClass(index)}`}>
                          {index + 1}.
                        </span>
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="h-14 w-14 shrink-0 rounded-full p-1 shadow-sm"
                            style={{ background: personLeague.frame }}
                            title={personLeague.name}
                          >
                            <span className="grid h-full w-full place-items-center rounded-full bg-white">
                              <img
                                src={getAvatarSource(person)}
                                alt={person.name}
                                onError={(event) => {
                                  if (person.name === "Karin Müller" || !person.avatar) return;

                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = createAvatarDataUri(person.avatar);
                                }}
                                className="h-11 w-11 rounded-full object-cover"
                              />
                            </span>
                          </div>
                          <h3 className="truncate font-bold text-ink">{person.name}</h3>
                        </div>
                        <p className="text-right text-sm font-bold text-health-teal">{person.points} Punkte</p>
                      </article>
                    );
                  })
                : sortedDepartments.map((department, index) => (
                    <article
                      key={department.name}
                      className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border px-4 py-3 ${getLeaderboardRowClass(index)}`}
                    >
                      <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${getRankBadgeClass(index)}`}>
                        {index + 1}.
                      </span>
                      <h3 className="truncate font-bold text-ink">{department.name}</h3>
                      <p className="text-right text-sm font-bold text-health-teal">{department.points} Punkte</p>
                    </article>
                  ))}
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}

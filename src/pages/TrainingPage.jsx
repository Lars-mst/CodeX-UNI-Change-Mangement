import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Award, CheckCircle2, Gift, ShieldCheck, Trophy } from "lucide-react";
import FilterTabs from "../components/FilterTabs.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import {
  leaderboard,
  pointsProfile,
  rewardMilestones,
  rewards,
  trainingCategories,
  trainings
} from "../data/platform.js";

const tabs = ["Schulungen", "Punkte", "Leaderboard"];

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("Schulungen");
  const [category, setCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("Alle");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [pointsFilter, setPointsFilter] = useState("Alle");
  const [trainingState, setTrainingState] = useState(
    Object.fromEntries(trainings.map((training) => [training.slug, training.status]))
  );
  const [redeemed, setRedeemed] = useState([]);
  const [anonymousLeaderboard, setAnonymousLeaderboard] = useState(false);

  const providers = ["Alle", ...new Set(trainings.map((training) => training.provider))];
  const statuses = ["Alle", "verfügbar", "beantragt", "genehmigt", "abgeschlossen", "abgelehnt"];
  const pointBands = ["Alle", "bis 100", "101-160", "ab 161"];

  const filteredTrainings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return trainings.filter((training) => {
      const matchesCategory = category === "Alle" || training.category === category;
      const matchesProvider = provider === "Alle" || training.provider === provider;
      const currentStatus = trainingState[training.slug];
      const matchesStatus = statusFilter === "Alle" || currentStatus === statusFilter;
      const matchesPoints =
        pointsFilter === "Alle" ||
        (pointsFilter === "bis 100" && training.points <= 100) ||
        (pointsFilter === "101-160" && training.points >= 101 && training.points <= 160) ||
        (pointsFilter === "ab 161" && training.points >= 161);
      const haystack = `${training.title} ${training.category} ${training.provider} ${training.description}`.toLowerCase();

      return matchesCategory && matchesProvider && matchesStatus && matchesPoints && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, pointsFilter, provider, query, statusFilter, trainingState]);

  const completedExtraPoints = trainings
    .filter((training) => trainingState[training.slug] === "abgeschlossen" && training.status !== "abgeschlossen")
    .reduce((sum, training) => sum + training.points, 0);
  const currentPoints = pointsProfile.current + completedExtraPoints - redeemed.reduce((sum, reward) => sum + reward.points, 0);

  const updateTraining = (training) => {
    const current = trainingState[training.slug];
    const next =
      current === "verfügbar" && training.requiresApproval
        ? "beantragt"
        : current === "beantragt"
          ? "genehmigt"
          : current === "genehmigt" || (current === "verfügbar" && !training.requiresApproval)
            ? "abgeschlossen"
            : current;

    setTrainingState((state) => ({ ...state, [training.slug]: next }));
  };

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
              <div className="grid gap-3 md:grid-cols-3">
                <select
                  value={provider}
                  onChange={(event) => setProvider(event.target.value)}
                  className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  {providers.map((item) => <option key={item}>{item}</option>)}
                </select>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  {statuses.map((item) => <option key={item}>{item}</option>)}
                </select>
                <select
                  value={pointsFilter}
                  onChange={(event) => setPointsFilter(event.target.value)}
                  className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  {pointBands.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredTrainings.map((training) => {
              const status = trainingState[training.slug];
              const actionLabel =
                status === "verfügbar" && training.requiresApproval
                  ? "Genehmigung anfragen"
                  : status === "beantragt"
                    ? "Genehmigung simulieren"
                    : status === "verfügbar" && !training.requiresApproval
                      ? "Schulung starten"
                      : status === "genehmigt"
                        ? "Abschließen"
                      : "Abgeschlossen";

              return (
                <article key={training.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-health-teal">
                        {training.category} · {training.provider}
                      </p>
                      <h2 className="mt-2 text-lg font-bold text-ink">{training.title}</h2>
                    </div>
                    <StatusBadge>{status}</StatusBadge>
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
                    <button
                      type="button"
                      disabled={status === "abgeschlossen" || status === "abgelehnt"}
                      onClick={() => updateTraining(training)}
                      className="focus-ring rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {actionLabel}
                    </button>
                    <Link
                      to={`/schulungen/${training.slug}`}
                      className="focus-ring inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-ink ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                      Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : null}

      {activeTab === "Punkte" ? (
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist-green text-health-teal">
                <Trophy size={22} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">{currentPoints} Punkte</h2>
                <p className="text-sm text-slate-600">{pointsProfile.level}</p>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar value={Math.max(currentPoints, 0)} max={pointsProfile.yearlyGoal} label="Fortschritt Jahresziel" />
            </div>
            <div className="mt-6">
              <h3 className="mb-3 font-bold text-ink">Meilensteine</h3>
              <div className="grid gap-2">
                {rewardMilestones.map((milestone) => (
                  <div key={milestone.title} className="rounded-lg bg-slate-50 p-3">
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-ink">{milestone.title}</span>
                      <span className="text-slate-500">{milestone.points} Punkte</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-health-teal"
                        style={{ width: `${Math.min(100, Math.round((currentPoints / milestone.points) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {pointsProfile.history.map((entry) => (
                <p key={entry.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <span>{entry.label}</span>
                  <span className="font-bold text-ink">{entry.points} · {entry.date}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-bold text-ink">Belohnungen einlösen</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {rewards.map((reward) => {
                const Icon = reward.icon;
                const isRedeemed = redeemed.some((item) => item.title === reward.title);
                return (
                  <article key={reward.title} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-amber-700">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-bold text-ink">{reward.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{reward.points} Punkte</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={currentPoints < reward.points || isRedeemed}
                      onClick={() => setRedeemed((current) => [...current, reward])}
                      className="focus-ring mt-4 w-full rounded-lg bg-ink px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {isRedeemed ? "Eingelöst" : "Einlösen"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "Leaderboard" ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-health-teal" size={22} />
              <div>
                <h2 className="text-lg font-bold text-ink">Anerkennung statt Druck</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Teilnahme ist freiwillig. Namen können anonymisiert werden; sichtbar wird Expertise, nicht Wettbewerb.
                </p>
              </div>
            </div>
            <label className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={anonymousLeaderboard}
                onChange={(event) => setAnonymousLeaderboard(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-health-teal"
              />
              anonymisierte Anzeige verwenden
            </label>
            <div className="mt-5 grid gap-3">
              {leaderboard.people.map((person, index) => (
                <article key={person.name} className="rounded-lg bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-ink">{anonymousLeaderboard ? `Mitarbeitende:r ${index + 1}` : person.name}</h3>
                    <span className="rounded-full bg-mist-green px-2.5 py-1 text-xs font-bold text-teal-800">
                      {person.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{person.note}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-health-teal">
                    {person.points} Punkte · {person.area}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <Award size={20} />
              Team-Ranking
            </h2>
            <div className="mt-4 grid gap-3">
              {leaderboard.teams.map((team) => (
                <div key={team.name} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-bold text-ink">Team {team.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{team.completed} Schulungen · {team.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
              <Gift className="mb-2" size={18} />
              Badges wie Automation Expert, Health Champion oder Digital Pro werden aus Lernpfaden abgeleitet.
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

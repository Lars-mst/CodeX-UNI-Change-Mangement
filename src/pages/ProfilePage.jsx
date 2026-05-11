import { useMemo, useState } from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  Gift,
  Medal,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Trophy,
  Users,
  X
} from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { loadStoredCalendarEntries, removeStoredCalendarEntry, saveStoredCalendarEntries } from "../data/calendar.js";
import { pointsProfile, rewards, trainings, userProfile } from "../data/platform.js";
import profileImage from "../assets/karin-mueller-profile.jpg";

const leagueTiers = [
  {
    name: "Bronze-Liga",
    min: 0,
    icon: Medal,
    frame: "linear-gradient(135deg, #a16207, #d97706, #92400e)",
    badge: "bg-amber-100 text-amber-900",
    text: "text-amber-800",
    short: "Bronze"
  },
  {
    name: "Silber-Liga",
    min: 250,
    icon: ShieldCheck,
    frame: "linear-gradient(135deg, #94a3b8, #e2e8f0, #64748b)",
    badge: "bg-slate-100 text-slate-700",
    text: "text-slate-700",
    short: "Silber"
  },
  {
    name: "Gold-Liga",
    min: 500,
    icon: Crown,
    frame: "conic-gradient(from 20deg, #92400e, #facc15, #fef3c7, #d97706, #92400e)",
    badge: "bg-amber-100 text-amber-900",
    text: "text-amber-700",
    short: "Gold"
  },
  {
    name: "Platin-Liga",
    min: 800,
    icon: Sparkles,
    frame: "conic-gradient(from 45deg, #0f766e, #ccfbf1, #94a3b8, #e0f2fe, #0f766e)",
    badge: "bg-teal-50 text-teal-800",
    text: "text-teal-700",
    short: "Platin"
  },
  {
    name: "Diamant-Liga",
    min: 1200,
    icon: Gem,
    frame: "conic-gradient(from 90deg, #4f46e5, #22d3ee, #f0f9ff, #a78bfa, #4f46e5)",
    badge: "bg-indigo-50 text-indigo-800",
    text: "text-indigo-700",
    short: "Diamant"
  }
];

function getLeague(points) {
  return leagueTiers.reduce((current, tier) => (points >= tier.min ? tier : current), leagueTiers[0]);
}

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const monthFormatter = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" });
const shortDateFormatter = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "short" });

const calendarEntryTypes = [
  { value: "Termin", tone: "bg-cyan-500" },
  { value: "BeWell", tone: "bg-emerald-500" },
  { value: "Event", tone: "bg-amber-500" },
  { value: "Lernen", tone: "bg-health-teal" },
  { value: "Ausflug", tone: "bg-indigo-500" }
];

const durationOptions = [
  { value: 30, label: "30 Min." },
  { value: 45, label: "45 Min." },
  { value: 60, label: "1 Std." },
  { value: 90, label: "1,5 Std." },
  { value: 120, label: "2 Std." },
  { value: 180, label: "3 Std." }
];

const dayHours = Array.from({ length: 24 }, (_, hour) => hour);

function formatCalendarDay(day) {
  return String(day).padStart(2, "0");
}

function getTodayDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameMonth(firstDate, secondDate) {
  return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth();
}

function getDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function getDateFromKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildInitialCalendarEntries() {
  const today = getTodayDate();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dateKeyForDay = (day) => getDateKey(new Date(year, month, day));

  const baseEntries = [
    { id: "calendar-sustainable-office", date: dateKeyForDay(2), title: "Sustainable Office", startTime: "10:00", durationMinutes: 60, meta: "90 Punkte · abgeschlossen", tone: "bg-health-teal" },
    { id: "calendar-digital-tandem", date: dateKeyForDay(9), title: "Digitalisierung-Tandem", startTime: "09:30", durationMinutes: 45, meta: "Termin", tone: "bg-cyan-500" },
    { id: "calendar-ernaehrungsberatung", date: dateKeyForDay(14), title: "Ernährungsberatung", startTime: "14:00", durationMinutes: 60, meta: "BeWell · gebucht", tone: "bg-emerald-500" },
    { id: "calendar-ki-workshop", date: dateKeyForDay(18), title: "KI & Arbeit Workshop", startTime: "13:00", durationMinutes: 90, meta: "Event · angemeldet", tone: "bg-amber-500" },
    { id: "calendar-wandertag", date: dateKeyForDay(24), title: "Wandertag", startTime: "08:30", durationMinutes: 180, meta: "Company-Ausflug · geplant", tone: "bg-indigo-500" }
  ];
  const storedEntries = loadStoredCalendarEntries();
  const mergedEntries = new Map(baseEntries.map((entry) => [entry.id, entry]));
  storedEntries.forEach((entry) => mergedEntries.set(entry.id, entry));

  return [...mergedEntries.values()];
}

function buildMonthCells(displayedMonth, entriesByDate) {
  const firstDay = getMonthStart(displayedMonth);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: mondayOffset }, (_, index) => ({ key: `empty-start-${index}`, date: null, dateKey: null, day: null, entries: [] })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1);
      const dateKey = getDateKey(date);
      return { key: dateKey, date, dateKey, day: index + 1, entries: entriesByDate[dateKey] ?? [] };
    })
  ];
  const trailingCells = (7 - (cells.length % 7)) % 7;

  return [
    ...cells,
    ...Array.from({ length: trailingCells }, (_, index) => ({ key: `empty-end-${index}`, date: null, dateKey: null, day: null, entries: [] }))
  ];
}

function formatHour(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function getEntryStartTime(entry) {
  if (entry.startTime) return entry.startTime;
  const timeMatch = entry.meta.match(/(\d{1,2}):\d{2}/);
  return timeMatch ? timeMatch[0] : "09:00";
}

function getEntryHour(entry) {
  return Number(getEntryStartTime(entry).split(":")[0]);
}

function addMinutesToTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} Min.`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} Std. ${rest} Min.` : `${hours} Std.`;
}

function formatEntryMeta(entry) {
  const startTime = getEntryStartTime(entry);
  const durationMinutes = entry.durationMinutes ?? 60;
  return `${startTime} - ${addMinutesToTime(startTime, durationMinutes)} · ${formatDuration(durationMinutes)} · ${entry.meta}`;
}

export default function ProfilePage({ currentPoints = pointsProfile.current, creditedTrainingSlugs = [] }) {
  const todayDate = useMemo(() => getTodayDate(), []);
  const todayKey = useMemo(() => getDateKey(todayDate), [todayDate]);
  const initialRedeemedRewards = userProfile.redeemedRewards;
  const [redeemedRewards, setRedeemedRewards] = useState(initialRedeemedRewards);
  const [calendarEntries, setCalendarEntries] = useState(() => buildInitialCalendarEntries());
  const [displayedMonth, setDisplayedMonth] = useState(() => getMonthStart(todayDate));
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(null);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryType, setNewEntryType] = useState("Termin");
  const [newEntryTime, setNewEntryTime] = useState("09:00");
  const [newEntryDuration, setNewEntryDuration] = useState("60");
  const rewardOptions = useMemo(() => [...rewards].sort((a, b) => a.points - b.points), []);
  const creditedTrainingHistory = useMemo(
    () =>
      creditedTrainingSlugs
        .map((slug) => trainings.find((training) => training.slug === slug))
        .filter(Boolean)
        .map((training) => ({
          label: `${training.title} gestartet`,
          points: training.points,
          date: "Heute"
        })),
    [creditedTrainingSlugs]
  );
  const pointHistoryEntries = useMemo(() => {
    const creditedLabels = new Set(creditedTrainingHistory.map((entry) => entry.label));
    return [
      ...creditedTrainingHistory,
      ...pointsProfile.history.filter((entry) => !creditedLabels.has(entry.label))
    ];
  }, [creditedTrainingHistory]);

  const spentThisSession = useMemo(
    () =>
      rewardOptions
        .filter((reward) => redeemedRewards.includes(reward.title) && !initialRedeemedRewards.includes(reward.title))
        .reduce((sum, reward) => sum + reward.points, 0),
    [initialRedeemedRewards, redeemedRewards, rewardOptions]
  );

  const availablePoints = Math.max(0, currentPoints - spentThisSession);
  const currentLeague = getLeague(availablePoints);
  const LeagueIcon = currentLeague.icon;
  const nextLeague = leagueTiers.find((tier) => tier.min > availablePoints);
  const leagueBase = currentLeague.min;
  const leagueTarget = nextLeague?.min ?? Math.max(pointsProfile.yearlyGoal, availablePoints);
  const leagueRange = Math.max(1, leagueTarget - leagueBase);
  const leagueProgress = nextLeague
    ? Math.min(100, Math.max(0, Math.round(((availablePoints - leagueBase) / leagueRange) * 100)))
    : 100;
  const yearlyProgress = Math.min(100, Math.round((availablePoints / pointsProfile.yearlyGoal) * 100));

  const redeemReward = (reward) => {
    if (availablePoints < reward.points || redeemedRewards.includes(reward.title)) return;
    setRedeemedRewards((current) => [...current, reward.title]);
  };

  const entriesByDate = useMemo(
    () =>
      calendarEntries.reduce((groupedEntries, entry) => {
        groupedEntries[entry.date] = [...(groupedEntries[entry.date] ?? []), entry];
        return groupedEntries;
      }, {}),
    [calendarEntries]
  );

  const calendarCells = useMemo(
    () => buildMonthCells(displayedMonth, entriesByDate),
    [displayedMonth, entriesByDate]
  );

  const selectedDateObject = useMemo(() => getDateFromKey(selectedDate), [selectedDate]);
  const displayedMonthEntries = useMemo(
    () => calendarEntries.filter((entry) => isSameMonth(getDateFromKey(entry.date), displayedMonth)),
    [calendarEntries, displayedMonth]
  );
  const selectedDayEntries = entriesByDate[selectedDate] ?? [];
  const selectedEntriesByHour = useMemo(
    () =>
      selectedDayEntries.reduce((groupedEntries, entry) => {
        const hour = getEntryHour(entry);
        groupedEntries[hour] = [...(groupedEntries[hour] ?? []), entry];
        return groupedEntries;
      }, {}),
    [selectedDayEntries]
  );
  const upcomingEntries = useMemo(
    () =>
      [...displayedMonthEntries].sort(
        (firstEntry, secondEntry) => getDateFromKey(firstEntry.date) - getDateFromKey(secondEntry.date)
      ),
    [displayedMonthEntries]
  );

  const selectMonth = (monthDate) => {
    const nextMonth = getMonthStart(monthDate);
    setDisplayedMonth(nextMonth);
    setSelectedDate(isSameMonth(nextMonth, todayDate) ? todayKey : getDateKey(nextMonth));
  };

  const openDayDetail = (dateKey) => {
    if (!dateKey) return;
    setSelectedDate(dateKey);
    setCalendarModalOpen(true);
  };

  const deleteCalendarEntry = (entryId) => {
    setCalendarEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
    removeStoredCalendarEntry(entryId);
  };

  const createCalendarEntry = (event) => {
    event.preventDefault();
    const title = newEntryTitle.trim();
    if (!title) return;

    const selectedType = calendarEntryTypes.find((type) => type.value === newEntryType) ?? calendarEntryTypes[0];
    const newEntry = {
      id: `calendar-entry-${Date.now()}`,
      date: selectedDate,
      title,
      startTime: newEntryTime,
      durationMinutes: Number(newEntryDuration),
      meta: newEntryType,
      tone: selectedType.tone
    };
    setCalendarEntries((currentEntries) => [...currentEntries, newEntry]);
    saveStoredCalendarEntries([...loadStoredCalendarEntries(), newEntry]);
    setNewEntryTitle("");
  };

  const bookedOverviewItems = useMemo(
    () => {
      const storedBewellBookings = calendarEntries
        .filter((entry) => entry.source === "bewell")
        .map((entry) => ({
          title: entry.title,
          meta: `${entry.startTime} · ${entry.meta}`,
          icon: CalendarDays,
          tone: "bg-emerald-500"
        }));

      return [
        ...userProfile.bookedHealthOffers.map((title) => ({
          title,
          meta: "BeWell · gebucht",
          icon: CalendarDays,
          tone: "bg-emerald-500"
        })),
        ...storedBewellBookings,
        ...userProfile.bookedEvents.map((title) => ({
          title,
          meta: "Event · angemeldet",
          icon: CalendarDays,
          tone: "bg-amber-500"
        }))
      ];
    },
    [calendarEntries]
  );
  const communityOverviewItems = useMemo(
    () =>
      userProfile.communities.map((title) => ({
        title,
        meta: "Community · aktiv",
        icon: Users,
        tone: "bg-cyan-500"
      })),
    []
  );
  const rewardOverviewItems = useMemo(
    () =>
      redeemedRewards.map((title) => {
        const reward = rewardOptions.find((option) => option.title === title);
        return {
          title,
          meta: reward ? `${reward.points} Punkte · eingelöst` : "Eingelöst",
          icon: reward?.icon ?? Gift,
          tone: "bg-amber-500"
        };
      }),
    [redeemedRewards, rewardOptions]
  );
  const profileSummaryCards = useMemo(
    () => [
      {
        id: "bookings",
        label: "Gebuchte Angebote",
        value: bookedOverviewItems.length,
        icon: CalendarDays,
        title: "Gebuchte Angebote",
        text: "Diese Angebote und Termine sind aktuell für Karin Müller vorgemerkt.",
        items: bookedOverviewItems
      },
      {
        id: "communities",
        label: "Aktive Communities",
        value: communityOverviewItems.length,
        icon: Users,
        title: "Aktive Communities",
        text: "In diesen Communities und Gruppen ist Karin Müller derzeit aktiv.",
        items: communityOverviewItems
      },
      {
        id: "rewards",
        label: "Belohnungen",
        value: rewardOverviewItems.length,
        icon: Gift,
        title: "Eingelöste Belohnungen",
        text: "Diese Belohnungen wurden bereits freigeschaltet oder eingelöst.",
        items: rewardOverviewItems
      }
    ],
    [bookedOverviewItems, communityOverviewItems, rewardOverviewItems]
  );
  const activeProfileSummary = profileSummaryCards.find((card) => card.id === profileModal);

  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Profil"
        title="Karin Müllers Benefit-Zentrale"
        text="Persönliche Aktivitäten, Punkte und Belohnungen sind hier gebündelt."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="grid content-start gap-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 rounded-full p-1.5 shadow-lg" style={{ background: currentLeague.frame }}>
                <div className="rounded-full bg-white p-1">
                  <img
                    src={profileImage}
                    alt="Karin Müller"
                    className="h-24 w-24 rounded-full object-cover object-[50%_35%]"
                  />
                </div>
                <span className={`absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-2 border-white shadow-md ${currentLeague.badge}`}>
                  <LeagueIcon size={18} />
                </span>
              </div>
              <div className="min-w-0 pt-1">
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-bold ${currentLeague.badge}`}>
                  <LeagueIcon size={14} />
                  {currentLeague.name}
                </span>
                <h1 className="mt-3 text-2xl font-bold text-ink">{userProfile.name}</h1>
                <p className="mt-1 text-slate-600">{userProfile.department}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <span key={interest} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {interest}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-teal-100 bg-gradient-to-br from-mist-green via-white to-teal-50 p-4 text-ink">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-health-teal shadow-sm ring-1 ring-teal-100">
                  <Trophy size={22} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold">{availablePoints} Punkte verfügbar</h2>
                  <p className="text-sm text-slate-600">{pointsProfile.level}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-teal-100 bg-white/80 p-3">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">Jahresziel</span>
                  <span className="text-slate-600">{availablePoints} / {pointsProfile.yearlyGoal}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-health-teal transition-all"
                    style={{ width: `${yearlyProgress}%` }}
                  />
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-amber-100 bg-white/80 p-3">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Liga-Fortschritt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${currentLeague.badge}`}>
                    {currentLeague.short}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${leagueProgress}%`, background: currentLeague.frame }}
                    />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                    {nextLeague?.short ?? "Max"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-teal-100 bg-white p-5 shadow-soft">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-health-teal">Liga-System</p>
              <h2 className="mt-1 font-bold text-ink">So entwickelt sich dein Profilrahmen</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Mache Schulungen, bilde dich weiter, sammle Punkte und erreiche neue Ligen. Der Rahmen um dein Profilbild
              wird automatisch hochwertiger, sobald du die nächste Punkteschwelle erreichst.
            </p>
            <div className="mt-5 grid gap-3">
              {leagueTiers.map((tier) => {
                const Icon = tier.icon;
                const reached = availablePoints >= tier.min;
                const isCurrent = currentLeague.name === tier.name;
                const isNext = nextLeague?.name === tier.name;

                return (
                  <article
                    key={tier.name}
                    title={`${tier.name}: Profilrahmen ab ${tier.min} Punkten`}
                    className={`group relative flex items-center gap-3 rounded-lg border p-3 transition ${
                      isCurrent
                        ? "border-amber-200 bg-amber-50"
                        : reached
                          ? "border-teal-100 bg-mist-green"
                          : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0 rounded-full p-1 shadow-sm" style={{ background: tier.frame }}>
                      <div className="grid h-full w-full place-items-center rounded-full bg-white">
                        <Icon size={18} className={tier.text} />
                      </div>
                      {isCurrent ? (
                        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                          <CheckCircle2 size={12} />
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-ink">{tier.name}</h3>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          isCurrent
                            ? "bg-amber-100 text-amber-900"
                            : reached
                              ? "bg-teal-50 text-teal-800"
                              : "bg-white text-slate-500"
                        }`}>
                          {isCurrent ? "Aktuell" : reached ? "Erreicht" : isNext ? "Nächste" : "Gesperrt"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Profilrahmen ab {tier.min} Punkten</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {profileSummaryCards.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setProfileModal(item.id)}
                  className="focus-ring rounded-lg border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-health-teal hover:shadow-lg"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-mist-green text-health-teal">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-2xl font-bold text-ink">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                </button>
              );
            })}
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-health-teal">Punkte & Belohnungen</p>
                <h2 className="mt-1 text-xl font-bold text-ink">Punkte im Profil einlösen</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Hier werden Belohnungen freigeschaltet und eingelöst. Bereits genutzte Belohnungen bleiben sichtbar.
                </p>
              </div>
              <div className="w-fit rounded-lg border border-teal-100 bg-gradient-to-br from-mist-green via-white to-amber-50 p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full p-1"
                    style={{ background: `conic-gradient(#0f9f96 ${yearlyProgress * 3.6}deg, #e2e8f0 0deg)` }}
                  >
                    <div className="grid h-full w-full place-items-center rounded-full bg-white text-health-teal">
                      <Sparkles size={18} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-none text-ink">{availablePoints}</p>
                    <p className="mt-1 text-xs font-bold text-slate-600">Punkte verfügbar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rewardOptions.map((reward) => {
                const Icon = reward.icon;
                const isRedeemed = redeemedRewards.includes(reward.title);
                const canRedeem = availablePoints >= reward.points && !isRedeemed;

                return (
                  <article
                    key={reward.title}
                    className={`flex min-h-[150px] flex-col rounded-lg border p-4 ${
                      isRedeemed ? "border-teal-100 bg-mist-green" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-amber-700">
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-ink">{reward.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{reward.points} Punkte</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <button
                        type="button"
                        disabled={!canRedeem}
                        onClick={() => redeemReward(reward)}
                        className="focus-ring w-full rounded-lg bg-ink px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {isRedeemed ? "Eingelöst" : "Einlösen"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-health-teal">Aktivitäts-Dashboard</p>
                <h2 className="mt-1 text-xl font-bold text-ink">Kalender, Abschlüsse und nächste Schritte</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => selectMonth(addMonths(displayedMonth, -1))}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-ink"
                  aria-label="Vorheriger Monat"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                  <CalendarDays size={17} />
                  {monthFormatter.format(displayedMonth)}
                </span>
                <button
                  type="button"
                  onClick={() => selectMonth(addMonths(displayedMonth, 1))}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-ink"
                  aria-label="Nächster Monat"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => selectMonth(todayDate)}
                  className="focus-ring rounded-lg border border-teal-100 bg-mist-green px-3 py-2 text-sm font-bold text-teal-800 transition hover:bg-teal-50"
                >
                  Heute
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-ink">Monatskalender</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                    {displayedMonthEntries.length} Einträge
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-2">
                  {calendarCells.map((cell) => {
                    const isToday = cell.dateKey === todayKey;
                    const isSelected = cell.dateKey === selectedDate;

                    return (
                      <button
                        key={cell.key}
                        type="button"
                        disabled={!cell.dateKey}
                        onClick={() => openDayDetail(cell.dateKey)}
                        className={`min-h-14 rounded-lg border p-2 text-left text-sm transition ${
                          cell.dateKey
                            ? "bg-white text-ink hover:border-health-teal hover:bg-mist-green"
                            : "cursor-default border-transparent"
                        } ${
                          isToday ? "border-health-teal ring-2 ring-health-teal/20" : "border-slate-200"
                        } ${
                          isSelected ? "border-ink bg-white shadow-sm ring-2 ring-ink/10" : ""
                        }`}
                      >
                        {cell.day ? (
                          <>
                            <span className="font-semibold">{cell.day}</span>
                            {isToday ? (
                              <span className="ml-1 rounded-full bg-health-teal px-1.5 py-0.5 text-[10px] font-bold text-white">
                                Heute
                              </span>
                            ) : null}
                            {cell.entries.length ? (
                              <div className="mt-3 flex gap-1">
                                {cell.entries.slice(0, 3).map((entry) => (
                                  <span key={entry.id} className={`h-1.5 w-1.5 rounded-full ${entry.tone}`} />
                                ))}
                                {cell.entries.length > 3 ? (
                                  <span className="text-[10px] font-bold text-slate-500">+{cell.entries.length - 3}</span>
                                ) : null}
                              </div>
                            ) : null}
                          </>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-ink">Tagesübersicht</h3>
                  <span className="rounded-full bg-mist-green px-2.5 py-1 text-xs font-bold text-teal-800">
                    {shortDateFormatter.format(selectedDateObject)}
                  </span>
                </div>
                <div className="mt-3 grid max-h-44 gap-2 overflow-y-auto pr-1">
                  {selectedDayEntries.length ? (
                    selectedDayEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                        <span className={`h-8 w-1 rounded-full ${entry.tone}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-ink">{entry.title}</p>
                          <p className="mt-0.5 text-xs text-slate-600">{formatEntryMeta(entry)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteCalendarEntry(entry.id)}
                          className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-rose-600"
                          aria-label={`${entry.title} entfernen`}
                          title="Entfernen"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Keine Einträge an diesem Tag.</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openDayDetail(selectedDate)}
                  className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-bold text-white"
                >
                  <Plus size={16} />
                  Tag öffnen
                </button>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-ink">Nächste Einträge</h4>
                  <div className="mt-2 grid max-h-36 gap-2 overflow-y-auto pr-1">
                    {upcomingEntries.length ? upcomingEntries.map((entry) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => openDayDetail(entry.date)}
                        className="focus-ring flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-left transition hover:bg-mist-green"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-sm font-bold text-ink shadow-sm">
                          {formatCalendarDay(getDateFromKey(entry.date).getDate())}
                        </span>
                        <span className={`h-8 w-1 rounded-full ${entry.tone}`} />
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-bold text-ink">{entry.title}</span>
                          <span className="block truncate text-[11px] text-slate-500">{formatEntryMeta(entry)}</span>
                        </span>
                      </button>
                    )) : (
                      <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Keine Einträge in diesem Monat.</p>
                    )}
                  </div>
                </div>
              </article>
            </div>

            <article className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Award size={19} />
                Letzte Abschlüsse & Punkte
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {pointHistoryEntries.map((entry) => (
                  <div key={entry.label} className="rounded-lg bg-white p-3 text-sm shadow-sm">
                    <span className="inline-flex rounded-full bg-mist-green px-2 py-0.5 text-xs font-bold text-teal-800">
                      {entry.date}
                    </span>
                    <p className="mt-3 min-h-10 font-semibold text-ink">{entry.label}</p>
                    <p className="mt-2 text-lg font-bold text-health-teal">{entry.points} Punkte</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>

      {calendarModalOpen ? (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-ink/45 px-4 py-6 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-6xl items-center justify-center">
            <div className="w-full max-h-[92vh] overflow-hidden rounded-lg bg-white shadow-2xl">
              <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-health-teal">Kalendertag</p>
                  <h2 className="mt-1 text-2xl font-bold text-ink">Tagesplan {fullDateFormatter.format(selectedDateObject)}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Termine, Buchungen und neue Einträge in einer kompakten 24-Stunden-Ansicht.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCalendarModalOpen(false)}
                  className="focus-ring grid h-10 w-10 place-items-center self-end rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-ink sm:self-start"
                  aria-label="Kalenderdialog schließen"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid max-h-[calc(92vh-116px)] gap-5 overflow-y-auto p-5 lg:grid-cols-[1.35fr_0.65fr]">
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-bold text-ink">24-Stunden-Kalender</h3>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                      {selectedDayEntries.length} Einträge
                    </span>
                  </div>
                  <div className="max-h-[58vh] overflow-y-auto rounded-lg border border-slate-200 bg-white">
                    {dayHours.map((hour) => {
                      const entriesForHour = selectedEntriesByHour[hour] ?? [];

                      return (
                        <div key={hour} className="grid min-h-12 grid-cols-[64px_1fr] border-b border-slate-100 last:border-b-0">
                          <div className="bg-slate-50 px-3 py-3 text-xs font-bold text-slate-500">
                            {formatHour(hour)}
                          </div>
                          <div className="px-3 py-2">
                            {entriesForHour.length ? (
                              <div className="grid gap-2">
                                {entriesForHour.map((entry) => (
                                  <div
                                    key={entry.id}
                                    className="flex items-center gap-3 rounded-lg border border-teal-100 bg-mist-green px-3 py-2"
                                  >
                                    <span className={`h-8 w-1 rounded-full ${entry.tone}`} />
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-bold text-ink">{entry.title}</p>
                                      <p className="mt-0.5 text-xs text-slate-600">{formatEntryMeta(entry)}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => deleteCalendarEntry(entry.id)}
                                      className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-white hover:text-rose-600"
                                      aria-label={`${entry.title} entfernen`}
                                      title="Entfernen"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-300">frei</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>

                <aside className="grid content-start gap-4">
                  <article className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-ink">Einträge am Tag</h3>
                      <span className="rounded-full bg-mist-green px-2.5 py-1 text-xs font-bold text-teal-800">
                        {shortDateFormatter.format(selectedDateObject)}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2">
                      {selectedDayEntries.length ? (
                        selectedDayEntries.map((entry) => (
                          <div key={entry.id} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                            <span className={`h-8 w-1 rounded-full ${entry.tone}`} />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-ink">{entry.title}</p>
                              <p className="mt-0.5 text-xs text-slate-600">{formatEntryMeta(entry)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteCalendarEntry(entry.id)}
                              className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-rose-600"
                              aria-label={`${entry.title} entfernen`}
                              title="Entfernen"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Noch keine Einträge für diesen Tag.</p>
                      )}
                    </div>
                  </article>

                  <form onSubmit={createCalendarEntry} className="rounded-lg border border-teal-100 bg-gradient-to-br from-mist-green via-white to-teal-50 p-4">
                    <h3 className="font-bold text-ink">Eintrag erstellen</h3>
                    <input
                      value={newEntryTitle}
                      onChange={(event) => setNewEntryTitle(event.target.value)}
                      placeholder="Titel"
                      className="focus-ring mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <label className="grid gap-1 text-xs font-bold text-slate-500">
                        Start
                        <input
                          type="time"
                          value={newEntryTime}
                          onChange={(event) => setNewEntryTime(event.target.value)}
                          className="focus-ring rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-normal text-ink"
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-bold text-slate-500">
                        Dauer
                        <select
                          value={newEntryDuration}
                          onChange={(event) => setNewEntryDuration(event.target.value)}
                          className="focus-ring rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-normal text-ink"
                        >
                          {durationOptions.map((duration) => (
                            <option key={duration.value} value={duration.value}>
                              {duration.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1 text-xs font-bold text-slate-500">
                        Art
                        <select
                          value={newEntryType}
                          onChange={(event) => setNewEntryType(event.target.value)}
                          className="focus-ring rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-normal text-ink"
                        >
                          {calendarEntryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.value}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-bold text-white"
                    >
                      <Plus size={16} />
                      Hinzufügen
                    </button>
                  </form>
                </aside>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeProfileSummary ? (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-ink/45 px-4 py-6 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center">
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-health-teal">Profilübersicht</p>
                  <h2 className="mt-1 text-2xl font-bold text-ink">{activeProfileSummary.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{activeProfileSummary.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileModal(null)}
                  className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-ink"
                  aria-label="Profilübersicht schließen"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-3 p-5">
                {activeProfileSummary.items.length ? (
                  activeProfileSummary.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <article key={`${activeProfileSummary.id}-${item.title}-${item.meta}`} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-health-teal shadow-sm">
                          <ItemIcon size={20} />
                        </span>
                        <span className={`h-9 w-1 rounded-full ${item.tone}`} />
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-ink">{item.title}</h3>
                          <p className="mt-0.5 text-sm text-slate-600">{item.meta}</p>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Noch keine Einträge vorhanden.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

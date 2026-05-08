import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, Heart, MapPin, QrCode, Repeat2, ShoppingBag, Ticket } from "lucide-react";
import FilterTabs from "../components/FilterTabs.jsx";
import HubCard from "../components/HubCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { communities, communityActivities, communityActivityCategories, tandemCategories } from "../data/platform.js";

const tabs = ["Communities", "Digitale Tandems", "Events & Ausflüge", "Tauschbörse"];

const swapItems = [
  { title: "Ergonomie-Maus", type: "Verkaufen", text: "Sehr guter Zustand, Abholung am Campus." },
  { title: "Konzertticket weitergeben", type: "Tauschen", text: "Tausch gegen Kulturabend-Ticket möglich." },
  { title: "Kinderfahrrad", type: "Kaufen", text: "Gesucht im Eltern-Netzwerk, regionaler Austausch." }
];

export default function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState("Communities");
  const [joined, setJoined] = useState(["digital-ai"]);
  const [selectedTandem, setSelectedTandem] = useState(null);
  const [bookedTandem, setBookedTandem] = useState("");
  const [activityCategory, setActivityCategory] = useState("Alle");
  const [bookedActivities, setBookedActivities] = useState(["gesundheitstag-2026"]);
  const [activityFavorites, setActivityFavorites] = useState([]);

  const filteredActivities = useMemo(
    () =>
      communityActivities.filter(
        (activity) => activityCategory === "Alle" || activity.category === activityCategory
      ),
    [activityCategory]
  );

  const toggleActivityFavorite = (slug) => {
    setActivityFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  };

  const bookActivity = (activity) => {
    const bookingKey = activity.seats <= 0 ? `${activity.slug}-waitlist` : activity.slug;
    setBookedActivities((current) => [...new Set([...current, bookingKey])]);
  };

  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Säule 4"
        title="Communities & Freizeitgruppen"
        text="Freizeitclubs, digitale Stammtische, Erfahrungsaustausch, Tandems, Company-Ausflüge und eine einfache interne Tauschbörse."
      />

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <FilterTabs items={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "Communities" ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {communities.map((community) => {
            const isJoined = joined.includes(community.slug);
            return (
              <HubCard key={community.slug} item={community} meta={`${community.members} Mitglieder`} cta={null}>
                <div className="grid gap-3">
                  <p className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                    Nächstes Treffen: <strong>{community.nextMeet}</strong>
                  </p>
                  <p className="rounded-lg bg-mist-green p-3 text-sm leading-6 text-teal-900">
                    {community.announcement}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setJoined((current) =>
                        current.includes(community.slug)
                          ? current.filter((item) => item !== community.slug)
                          : [...current, community.slug]
                      )
                    }
                    className="focus-ring rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
                  >
                    {isJoined ? "Beigetreten" : "Community beitreten"}
                  </button>
                </div>
              </HubCard>
            );
          })}
        </div>
      ) : null}

      {activeTab === "Digitale Tandems" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5 md:grid-cols-2">
            {tandemCategories.map((tandem) => (
              <HubCard key={tandem.slug} item={tandem} meta={tandem.category} cta={null}>
                <p className="text-sm leading-6 text-slate-600">
                  Vorschlag: <strong>{tandem.match}</strong> · {tandem.reason}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTandem(tandem);
                    setBookedTandem("");
                  }}
                  className="focus-ring mt-4 rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
                >
                  Tandem finden
                </button>
              </HubCard>
            ))}
          </div>
          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-bold text-ink">Matching-Simulation</h2>
            {selectedTandem ? (
              <div className="mt-4">
                <p className="font-semibold text-ink">{selectedTandem.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{selectedTandem.match} {selectedTandem.reason}</p>
                <div className="mt-4 grid gap-2">
                  {selectedTandem.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setBookedTandem(slot)}
                      className={`focus-ring rounded-lg border px-3 py-2 text-left text-sm font-semibold ${
                        bookedTandem === slot ? "border-health-teal bg-mist-green text-teal-800" : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {bookedTandem ? (
                  <p className="mt-4 flex items-center gap-2 rounded-lg bg-mist-green p-3 text-sm font-bold text-teal-800">
                    <CheckCircle2 size={17} />
                    Termin gebucht: {bookedTandem}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Ava kann später Profil, Interessen und Kalenderdaten für echte Matching-Vorschläge nutzen.
              </p>
            )}
          </aside>
        </div>
      ) : null}

      {activeTab === "Events & Ausflüge" ? (
        <>
          <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <FilterTabs
              items={communityActivityCategories}
              active={activityCategory}
              onChange={setActivityCategory}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon ?? CalendarDays;
              const isBooked = bookedActivities.includes(activity.slug);
              const isWaitlist = bookedActivities.includes(`${activity.slug}-waitlist`) || activity.status === "Warteliste";
              const isFavorite = activityFavorites.includes(activity.slug);

              return (
                <article key={`${activity.kind}-${activity.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist-green text-health-teal">
                      <Icon size={22} />
                    </span>
                    <button
                      type="button"
                      aria-label={isFavorite ? "Aus Favoriten entfernen" : "Als Favorit speichern"}
                      onClick={() => toggleActivityFavorite(activity.slug)}
                      className={`focus-ring grid h-9 w-9 place-items-center rounded-lg border ${
                        isFavorite ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-400 hover:text-rose-500"
                      }`}
                    >
                      <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <StatusBadge>{isBooked ? "angemeldet" : isWaitlist ? "Warteliste" : activity.status}</StatusBadge>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {activity.kind}
                    </span>
                    {activity.exclusive ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">Exklusiv</span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-ink">{activity.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{activity.description}</p>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2"><CalendarDays size={16} />{activity.date}</p>
                    <p className="flex items-center gap-2"><MapPin size={16} />{activity.place}</p>
                    <p className="flex items-center gap-2"><Ticket size={16} />{activity.seats > 0 ? `${activity.seats} Plätze verfügbar` : "Warteliste aktiv"}</p>
                  </div>
                  {isBooked ? (
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-ink">
                      <QrCode size={24} className="text-health-teal" />
                      Digitales Ticket simuliert
                    </div>
                  ) : null}
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => bookActivity(activity)}
                      className="focus-ring rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
                    >
                      {activity.seats <= 0 ? "Auf Warteliste" : "Anmelden"}
                    </button>
                    <Link
                      to={activity.detailPath}
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

      {activeTab === "Tauschbörse" ? (
        <div className="grid gap-5 md:grid-cols-3">
          {swapItems.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-mist-green text-health-teal">
                  {item.type === "Tauschen" ? <Repeat2 size={20} /> : <ShoppingBag size={20} />}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{item.type}</span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              <button type="button" className="focus-ring mt-5 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white">
                Kontakt anfragen
              </button>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, QrCode, Ticket } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { companyTrips, exclusiveEvents } from "../data/platform.js";

export default function EventDetailPage({ type = "event" }) {
  const { slug } = useParams();
  const source = type === "trip" ? companyTrips : exclusiveEvents;
  const event = source.find((item) => item.slug === slug);
  const [booked, setBooked] = useState(false);

  if (!event) {
    return (
      <section className="page-shell section-pad">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold">Event nicht gefunden</h1>
          <ButtonLink to="/communities" className="mt-5">Zur Community-Übersicht</ButtonLink>
        </div>
      </section>
    );
  }

  const Icon = event.icon ?? CalendarDays;

  return (
    <section className="page-shell section-pad">
      <Link to="/communities" className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal">
        <ArrowLeft size={17} />
        Zur Community-Übersicht
      </Link>
      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1fr_340px] lg:p-8">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-mist-green text-health-teal">
            <Icon size={28} />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">{event.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{event.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{event.description}</p>
        </div>
        <aside className="rounded-lg bg-slate-50 p-5">
          <StatusBadge>{booked ? "angemeldet" : event.status}</StatusBadge>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <p className="flex items-center gap-2"><CalendarDays size={16} />{event.date}</p>
            <p className="flex items-center gap-2"><MapPin size={16} />{event.place}</p>
            <p className="flex items-center gap-2"><Ticket size={16} />{event.seats > 0 ? `${event.seats} Plätze verfügbar` : "Warteliste aktiv"}</p>
          </div>
          <button
            type="button"
            onClick={() => setBooked(true)}
            className="focus-ring mt-5 w-full rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-700"
          >
            {event.seats <= 0 ? "Auf Warteliste setzen" : "Anmelden"}
          </button>
          {booked ? (
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-bold text-ink">
              <QrCode size={24} className="text-health-teal" />
              Digitales Ticket simuliert
            </p>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

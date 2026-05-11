import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarCheck, CheckCircle2, Clock } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import { buildOfferSlotOptions, upsertStoredCalendarEntry } from "../data/calendar.js";
import { healthOffers } from "../data/platform.js";

export default function HealthDetailPage() {
  const { slug } = useParams();
  const offer = healthOffers.find((item) => item.slug === slug);
  const slotOptions = useMemo(() => (offer ? buildOfferSlotOptions(offer) : []), [offer]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [booked, setBooked] = useState(false);

  if (!offer) {
    return (
      <section className="page-shell section-pad">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold">Gesundheitsangebot nicht gefunden</h1>
          <ButtonLink to="/bewell" className="mt-5">Zur Übersicht</ButtonLink>
        </div>
      </section>
    );
  }

  const Icon = offer.icon;
  const selectedSlot = slotOptions.find((slot) => slot.id === selectedSlotId);
  const defaultDuration = slotOptions[0]?.durationMinutes ?? offer.durationMinutes ?? 45;

  const bookSelectedSlot = () => {
    if (!selectedSlot) return;

    upsertStoredCalendarEntry({
      id: `bewell-booking-${offer.slug}`,
      source: "bewell",
      offerSlug: offer.slug,
      date: selectedSlot.dateKey,
      title: offer.title,
      startTime: selectedSlot.startTime,
      durationMinutes: selectedSlot.durationMinutes,
      meta: `BeWell · ${offer.category}`,
      tone: "bg-emerald-500",
      contact: offer.contact
    });
    setBooked(true);
  };

  return (
    <section className="page-shell section-pad">
      <Link
        to="/bewell"
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal"
      >
        <ArrowLeft size={17} />
        Zur BeWell-Übersicht
      </Link>

      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[minmax(0,1fr)_340px] lg:p-8">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-mist-green text-health-teal">
            <Icon size={28} />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">{offer.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{offer.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{offer.description}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">{offer.details}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Kategorie", offer.category],
              ["Dauer", `${defaultDuration} Min.`],
              ["Termine", `${slotOptions.length} Vorschläge`],
              ["Kontakt", offer.contact]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-health-teal">{label}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-soft-blue p-4 text-sm leading-6 text-slate-700">
            Hinweis: Dieses Angebot ersetzt keine medizinische Diagnose. Bei Beschwerden bitte medizinisches Fachpersonal einbeziehen.
          </div>
        </div>

        <aside className="rounded-lg bg-slate-50 p-4 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-bold text-ink">
              <CalendarCheck size={18} />
              Terminbuchung
            </h2>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
              {slotOptions.length} Termine
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            {slotOptions.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => {
                  setSelectedSlotId(slot.id);
                  setBooked(false);
                }}
                className={`focus-ring rounded-lg border px-3 py-2 text-left text-sm font-semibold ${
                  selectedSlotId === slot.id
                    ? "border-health-teal bg-mist-green text-teal-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-200"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span>{slot.label}</span>
                  <span className="text-xs font-bold text-slate-500">{slot.durationMinutes} Min.</span>
                </span>
                <span className="mt-0.5 block text-xs font-medium text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </span>
              </button>
            ))}
          </div>
          {selectedSlot ? (
            <div className="mt-3 rounded-lg border border-teal-100 bg-white p-3 text-sm">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-health-teal">Auswahl</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                <Clock size={16} className="text-health-teal" />
                {selectedSlot.label} · {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
            </div>
          ) : null}
          <button
            type="button"
            disabled={!selectedSlot}
            onClick={bookSelectedSlot}
            className="focus-ring mt-4 w-full rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Termin buchen
          </button>
          {booked ? (
            <div className="mt-3 rounded-lg border border-teal-100 bg-mist-green p-3 text-sm text-teal-900">
              <p className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={17} />
                Termin erfolgreich gebucht
              </p>
              <Link
                to="/profil"
                className="focus-ring mt-2 inline-flex rounded-lg text-sm font-bold text-health-teal hover:text-teal-700"
              >
                Profilkalender ansehen
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

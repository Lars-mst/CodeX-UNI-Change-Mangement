import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarCheck, UserRound } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import { healthOffers } from "../data/platform.js";

export default function HealthDetailPage() {
  const { slug } = useParams();
  const offer = healthOffers.find((item) => item.slug === slug);
  const [selectedSlot, setSelectedSlot] = useState("");
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

  return (
    <section className="page-shell section-pad">
      <Link
        to="/bewell"
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal"
      >
        <ArrowLeft size={17} />
        Zur BeWell-Übersicht
      </Link>

      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1fr_360px] lg:p-8">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-mist-green text-health-teal">
            <Icon size={28} />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">{offer.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{offer.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{offer.description}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">{offer.details}</p>
          <div className="mt-6 rounded-lg bg-soft-blue p-4 text-sm leading-6 text-slate-700">
            Hinweis: Dieses Angebot ersetzt keine medizinische Diagnose. Bei Beschwerden bitte medizinisches Fachpersonal einbeziehen.
          </div>
        </div>

        <aside className="rounded-lg bg-slate-50 p-5">
          <h2 className="flex items-center gap-2 font-bold text-ink">
            <CalendarCheck size={18} />
            Terminbuchung
          </h2>
          <div className="mt-4 grid gap-2">
            {offer.slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  setSelectedSlot(slot);
                  setBooked(false);
                }}
                className={`focus-ring rounded-lg border px-3 py-2 text-left text-sm font-semibold ${
                  selectedSlot === slot
                    ? "border-health-teal bg-mist-green text-teal-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-200"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!selectedSlot}
            onClick={() => setBooked(true)}
            className="focus-ring mt-4 w-full rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Termin buchen
          </button>
          {booked ? (
            <p className="mt-3 rounded-lg bg-mist-green p-3 text-sm font-semibold text-teal-800">
              Gebucht: {selectedSlot}. Kalenderintegration simuliert.
            </p>
          ) : null}
          <div className="mt-5 rounded-lg bg-white p-4 text-sm text-slate-600">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <UserRound size={17} />
              Ansprechpartner
            </p>
            <p className="mt-2 leading-6">{offer.contact}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

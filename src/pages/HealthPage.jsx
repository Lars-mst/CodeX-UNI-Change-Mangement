import { useMemo, useState } from "react";
import FilterTabs from "../components/FilterTabs.jsx";
import HubCard from "../components/HubCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { buildOfferSlotOptions } from "../data/calendar.js";
import { healthCategories, healthOffers } from "../data/platform.js";

export default function HealthPage() {
  const [category, setCategory] = useState("Alle");
  const [query, setQuery] = useState("");

  const filteredOffers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return healthOffers.filter((offer) => {
      const matchesCategory = category === "Alle" || offer.category === category;
      const haystack = `${offer.title} ${offer.category} ${offer.description} ${offer.contact}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <>
      <section className="page-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">Säule 1 · BeWell</p>
            <h1 className="text-4xl font-bold tracking-normal text-ink sm:text-5xl">
              Gesundheitsangebot BeWell
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Check-up, Ergonomie, mentale Gesundheit, Bewegung und Beratung sind buchbar, klar beschrieben und mit Ansprechpartnern verbunden.
            </p>
          </div>
          <div className="rounded-lg border border-sky-100 bg-soft-blue p-5">
            <h2 className="text-lg font-bold text-ink">Wichtiger Hinweis</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Die Plattform und Ava stellen keine medizinischen Diagnosen. Bei Beschwerden, akuten Symptomen oder Unsicherheit wende dich bitte an medizinisches Fachpersonal.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Gesundheitsangebot oder Ansprechpartner suchen"
              className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none"
            />
            <FilterTabs items={healthCategories} active={category} onChange={setCategory} />
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredOffers.map((offer) => {
            const visibleSlots = buildOfferSlotOptions(offer)
              .slice(0, 2)
              .map((slot) => slot.label)
              .join(", ");

            return (
              <HubCard
                key={offer.slug}
                item={offer}
                to={`/bewell/${offer.slug}`}
                meta={offer.category}
                cta="Termin buchen"
              >
                <p className="text-sm font-semibold text-ink">Freie Slots: {visibleSlots}</p>
                <p className="mt-1 text-xs text-slate-500">{offer.contact}</p>
              </HubCard>
            );
          })}
        </div>
      </section>
    </>
  );
}

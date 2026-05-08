import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FilterTabs from "../components/FilterTabs.jsx";
import HubCard from "../components/HubCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { benefitCategories, benefitOffers } from "../data/platform.js";

function useFavorites(key) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "[]");
    } catch {
      return [];
    }
  });

  const toggleFavorite = (slug) => {
    setFavorites((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [favorites, toggleFavorite];
}

export default function BenefitsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle");
  const [region, setRegion] = useState("Alle Regionen");
  const [favorites, toggleFavorite] = useFavorites("benefit-hub-offer-favorites");
  const regions = ["Alle Regionen", ...new Set(benefitOffers.map((offer) => offer.region))];

  const filteredOffers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return benefitOffers.filter((offer) => {
      const matchesCategory = category === "Alle" || offer.category === category;
      const matchesRegion = region === "Alle Regionen" || offer.region === region;
      const haystack = `${offer.title} ${offer.category} ${offer.provider} ${offer.description} ${offer.region}`.toLowerCase();
      return matchesCategory && matchesRegion && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query, region]);

  const regionalOffers = benefitOffers.filter((offer) => offer.region.toLowerCase().includes("regional"));
  const popularOffers = benefitOffers.filter((offer) => offer.featured).slice(0, 4);

  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Säule 3"
        title="Ermäßigungen & Rabattaktionen"
        text="Regionale Anbieter, Fitnessstudios, Gastronomie, Reisen, Kultur, Mobilität und Freizeitvorteile auf einen Blick."
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Benefit, Anbieter oder Region suchen"
            className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none"
          />
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <FilterTabs items={benefitCategories} active={category} onChange={setCategory} />
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      {regionalOffers.length ? (
        <div className="mt-8 rounded-lg border border-teal-100 bg-mist-green p-5">
          <h2 className="text-lg font-bold text-ink">Regionale Angebote in deiner Nähe</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {regionalOffers.slice(0, 3).map((offer) => (
              <HubCard
                key={offer.slug}
                item={offer}
                to={`/ermaessigungen/${offer.slug}`}
                meta={offer.provider}
                cta={offer.cta}
                favorite={favorites.includes(offer.slug)}
                onFavorite={() => toggleFavorite(offer.slug)}
              >
                <p className="text-sm font-bold text-ink">{offer.advantage}</p>
              </HubCard>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-bold text-ink">Beliebte Angebote</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {popularOffers.map((offer) => (
            <Link
              key={offer.slug}
              to={`/ermaessigungen/${offer.slug}`}
              className="focus-ring rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-700 hover:bg-mist-green hover:text-teal-800"
            >
              {offer.title}
              <span className="mt-1 block text-xs text-slate-500">{offer.advantage}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredOffers.map((offer) => (
          <HubCard
            key={offer.slug}
            item={offer}
            to={`/ermaessigungen/${offer.slug}`}
            meta={`${offer.category} · ${offer.provider}`}
            cta={offer.cta}
            favorite={favorites.includes(offer.slug)}
            onFavorite={() => toggleFavorite(offer.slug)}
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {offer.advantage}
              </span>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                {offer.region}
              </span>
            </div>
          </HubCard>
        ))}
      </div>

      {!filteredOffers.length ? (
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h2 className="text-xl font-bold">Keine passenden Benefits gefunden</h2>
          <p className="mt-2 text-slate-600">Passe Suche oder Filter an, um weitere Angebote zu sehen.</p>
        </div>
      ) : null}
    </section>
  );
}

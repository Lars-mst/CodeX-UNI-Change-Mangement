import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Heart, Search } from "lucide-react";
import FilterTabs from "../components/FilterTabs.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { benefitCategories, benefitOffers } from "../data/platform.js";

function mixOffersByCategory(offers) {
  const categories = benefitCategories.filter((item) => item !== "Alle");
  const grouped = categories.map((item) => offers.filter((offer) => offer.category === item));
  const uncategorized = offers.filter((offer) => !categories.includes(offer.category));
  const mixed = [];
  let index = 0;

  while (grouped.some((items) => index < items.length)) {
    grouped.forEach((items) => {
      if (items[index]) {
        mixed.push(items[index]);
      }
    });
    index += 1;
  }

  return [...mixed, ...uncategorized];
}

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

function OfferCard({ offer, favorite, onFavorite }) {
  const Icon = offer.icon;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-teal-200">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist-green text-health-teal">
          <Icon size={22} />
        </span>
        <button
          type="button"
          aria-label={favorite ? "Favorit entfernen" : "Favorit speichern"}
          onClick={onFavorite}
          className={`focus-ring grid h-9 w-9 place-items-center rounded-lg border ${
            favorite ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-400 hover:text-rose-500"
          }`}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
          {offer.category}
        </span>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
          {offer.region}
        </span>
      </div>

      <h2 className="mt-3 text-lg font-bold text-ink">{offer.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{offer.description}</p>

      <div className="mt-auto pt-5">
        <div className="flex min-h-7 flex-wrap items-start gap-2">
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
            {offer.advantage}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
            {offer.provider}
          </span>
        </div>

        <a
          href={offer.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-health-teal hover:text-teal-700"
        >
          {offer.cta}
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

export default function BenefitsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle");
  const [favorites, toggleFavorite] = useFavorites("benefit-hub-offer-favorites");

  const filteredOffers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return benefitOffers.filter((offer) => {
      const matchesCategory = category === "Alle" || offer.category === category;
      const haystack = `${offer.title} ${offer.category} ${offer.provider} ${offer.description} ${offer.region}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);
  const visibleOffers = useMemo(() => mixOffersByCategory(filteredOffers), [filteredOffers]);

  const regionalOffers = benefitOffers.filter((offer) => offer.region.toLowerCase().includes("regional"));
  const popularOffers = benefitOffers.filter((offer) => offer.featured).slice(0, 4);

  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Säule 3"
        title="Ermäßigungen & Rabattaktionen"
        text="Regionale Anbieter, Fitnessstudios, Restaurants, Reisen, Kultur, Weiterbildung, Mobilität und Freizeitvorteile auf einen Blick."
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="grid gap-4">
          <label className="focus-within:ring-health-teal flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 focus-within:ring-2">
            <Search size={20} className="text-slate-400" />
            <span className="sr-only">Benefit suchen</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Benefit, Anbieter oder Region suchen"
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="grid gap-3">
            <FilterTabs items={benefitCategories} active={category} onChange={setCategory} />
          </div>
        </div>
      </div>

      {regionalOffers.length ? (
        <div className="mt-8 rounded-lg border border-teal-100 bg-mist-green p-5">
          <h2 className="text-lg font-bold text-ink">Regionale Angebote in deiner Nähe</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {regionalOffers.slice(0, 3).map((offer) => (
              <OfferCard
                key={offer.slug}
                offer={offer}
                favorite={favorites.includes(offer.slug)}
                onFavorite={() => toggleFavorite(offer.slug)}
              />
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
        {visibleOffers.map((offer) => (
          <OfferCard
            key={offer.slug}
            offer={offer}
            favorite={favorites.includes(offer.slug)}
            onFavorite={() => toggleFavorite(offer.slug)}
          />
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

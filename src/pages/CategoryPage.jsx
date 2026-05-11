import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import { benefitOffers } from "../data/platform.js";

export default function CategoryPage() {
  const { slug } = useParams();
  const offer = benefitOffers.find((item) => item.slug === slug);

  if (!offer) {
    return (
      <section className="page-shell section-pad">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold">Rabattaktion nicht gefunden</h1>
          <p className="mt-2 text-slate-600">Das gewünschte Angebot ist nicht verfügbar.</p>
          <ButtonLink to="/ermaessigungen" className="mt-5">Zur Übersicht</ButtonLink>
        </div>
      </section>
    );
  }

  const Icon = offer.icon;

  return (
    <section className="page-shell section-pad">
      <Link
        to="/ermaessigungen"
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal"
      >
        <ArrowLeft size={17} />
        Zur Übersicht Ermäßigungen
      </Link>

      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1fr_340px] lg:p-8">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-mist-green text-health-teal">
            <Icon size={28} />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">
            {offer.category} · {offer.provider}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-ink sm:text-4xl">{offer.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{offer.description}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{offer.details}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={offer.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-health-teal px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              {offer.cta}
              <ExternalLink size={16} />
            </a>
            <ButtonLink to="/ermaessigungen" variant="light">Weitere Angebote</ButtonLink>
          </div>
        </div>

        <aside className="rounded-lg bg-slate-50 p-5">
          <h2 className="font-bold text-ink">Vorteil auf einen Blick</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-health-teal" />
              {offer.advantage}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={17} className="text-health-teal" />
              {offer.region}
            </p>
            <p className="rounded-lg bg-white p-3 leading-6">
              Anbieter: <strong>{offer.provider}</strong>
            </p>
            <p className="rounded-lg bg-white p-3 leading-6">
              Externer Link: <strong>{new URL(offer.externalUrl).hostname.replace("www.", "")}</strong>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

import {
  benefitOffers,
  communities,
  communityActivities,
  healthOffers,
  pointsProfile,
  rewards,
  tandemCategories,
  trainings
} from "./platform.js";

export const assistantSuggestions = [
  "Welche Fitness-Vorteile gibt es?",
  "Wie funktioniert das Punktesystem?",
  "Kannst du ein Tandem vorschlagen?",
  "Welche Events & Ausflüge gibt es?"
];

const normalize = (value) =>
  value
    .toLowerCase()
    .replaceAll("ß", "ss")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesKeyword = (message, keyword) => {
  const normalizedKeyword = normalize(keyword);

  if (normalizedKeyword.length <= 3) {
    return new RegExp(`(^|\\s)${escapeRegex(normalizedKeyword)}(?=\\s|$|[!?.,])`).test(message);
  }

  return message.includes(normalizedKeyword);
};

const hasAny = (message, keywords) => keywords.some((keyword) => matchesKeyword(message, keyword));

const highlight = (label, title, text) => ({ label, title, text });

const benefitHighlights = (categoryOrSlug) =>
  benefitOffers
    .filter((offer) => offer.category === categoryOrSlug || offer.slug === categoryOrSlug)
    .slice(0, 3)
    .map((offer) => highlight(offer.advantage, offer.title, `${offer.provider} · ${offer.region}`));

const healthHighlights = (categoryOrSlug) =>
  healthOffers
    .filter((offer) => offer.category === categoryOrSlug || offer.slug === categoryOrSlug)
    .slice(0, 3)
    .map((offer) => highlight(offer.category, offer.title, offer.description));

const eventHighlights = communityActivities.slice(0, 3).map((event) =>
  highlight(event.date, event.title, `${event.kind} · ${event.place}`)
);

const trainingHighlights = trainings.slice(0, 3).map((training) =>
  highlight(`${training.points} Punkte`, training.title, `${training.provider} · ${training.status}`)
);

const baseActions = {
  benefits: { label: "Ermäßigungen öffnen", to: "/ermaessigungen" },
  health: { label: "BeWell öffnen", to: "/bewell" },
  trainings: { label: "Schulungen öffnen", to: "/schulungen" },
  communities: { label: "Communities öffnen", to: "/communities" },
  tandems: { label: "Tandem finden", to: "/communities" },
  events: { label: "Freizeit & Ausflüge öffnen", to: "/communities" },
  profile: { label: "Profil ansehen", to: "/profil" }
};

const greetingKeywords = ["hallo", "hi", "hey", "guten morgen", "guten tag", "guten abend", "start"];
const medicalComplaintKeywords = [
  "schmerz",
  "beschwerde",
  "symptom",
  "diagnose",
  "fieber",
  "krank",
  "akut",
  "notfall",
  "verletzung",
  "therapie",
  "medikament",
  "behandlung"
];

const rules = [
  {
    mood: "supportive",
    keywords: ["reise", "reisen", "hotel", "urlaub", "wellness"],
    title: "Ich habe Reisevorteile für dich gefunden.",
    text: "Im Benefit-Bereich findest du vergünstigte Kurzreisen, Gesundheitshotels und Reiseangebote für Mitarbeitende.",
    actions: [{ label: "Reiseangebote anzeigen", to: "/ermaessigungen/city-relax-reisen" }, baseActions.benefits],
    highlights: benefitHighlights("Reisen"),
    prompts: ["Gibt es regionale Angebote?", "Welche Corporate Benefits gibt es?"]
  },
  {
    mood: "supportive",
    keywords: ["kultur", "musical", "konzert", "museum", "theater", "tickets"],
    title: "Kulturangebote sind im Benefit-Bereich gebündelt.",
    text: "Du findest Musicals, Konzerte, Museen und Kulturabende mit besonderen Konditionen.",
    actions: [{ label: "Kulturpass öffnen", to: "/ermaessigungen/kulturpass-musicals" }, baseActions.communities],
    highlights: benefitHighlights("Kultur"),
    prompts: ["Welche Events stehen an?", "Gibt es Kultur-Communities?"]
  },
  {
    mood: "supportive",
    keywords: ["fitness", "studio", "fitnessstudio", "bewegung", "sport", "ruckentraining", "rueckentraining", "ruecken"],
    title: "Für Fitness gibt es Benefits und Gesundheitsprogramme.",
    text: "Du kannst den FitPlus-Zuschuss nutzen oder direkt passende Programme wie Rückentraining und Fitnessprogramm buchen.",
    actions: [{ label: "Fitness-Benefit", to: "/ermaessigungen/fitplus-studio" }, { label: "Fitnessprogramme", to: "/bewell" }],
    highlights: [...benefitHighlights("Fitness"), ...healthHighlights("Bewegung")].slice(0, 3),
    prompts: ["Wie buche ich Rückentraining?", "Gibt es einen Fitnesszuschuss?"]
  },
  {
    mood: "careful",
    keywords: ["gesundheit", "vorsorge", "check", "impfung", "blutabnahme", "massage", "praevention", "pravention"],
    title: "Ich zeige dir passende BeWell-Angebote.",
    text: "In BeWell findest du Check-up, Ergonomie-Beratung, Massagen, Impfberatung, Blutabnahme, Bewegung und Ansprechpartner. Die Plattform ersetzt keine medizinische Diagnose.",
    actions: [baseActions.health, { label: "Check-up buchen", to: "/bewell/vorsorge-check" }],
    highlights: healthOffers.slice(0, 3).map((offer) => highlight(offer.category, offer.title, offer.slots[0])),
    prompts: ["Welche Slots sind frei?", "Wer ist Ansprechpartner?"]
  },
  {
    mood: "careful",
    keywords: ["stress", "mental", "belastung", "burnout", "achtsamkeit", "schlaf", "resilienz"],
    title: "Mentale Gesundheit ist ein wichtiger Bereich.",
    text: "Du findest vertrauliche Erstberatung, Stressprävention und Achtsamkeitsformate. Bei akuter Belastung wende dich bitte zusätzlich an medizinisches oder psychologisches Fachpersonal.",
    actions: [{ label: "Mentale Angebote", to: "/bewell/mental-health-session" }, baseActions.communities],
    highlights: healthHighlights("Mentale Gesundheit"),
    prompts: ["Sind Beratungen vertraulich?", "Gibt es einen Mental Health Circle?"]
  },
  {
    mood: "supportive",
    keywords: ["ernahrung", "ernaehrung", "essen", "restaurant", "kantine", "food", "nutrition", "lunch"],
    title: "Für Ernährung gibt es mehrere passende Angebote.",
    text: "Du findest Ernährungsberatung, Healthy Box, Restaurantvorteile und die Food & Nutrition Community.",
    actions: [{ label: "Ernährungsberatung", to: "/bewell/ernaehrungsberatung" }, { label: "Restaurant-Benefit", to: "/ermaessigungen/regional-restaurant-card" }],
    highlights: [...benefitHighlights("Gastronomie"), ...healthHighlights("Ernährung")].slice(0, 3),
    prompts: ["Gibt es gute Restaurants in der Nähe?", "Welche Ernährungskurse gibt es?"]
  },
  {
    mood: "supportive",
    keywords: ["familie", "kind", "kinder", "pflege", "eltern", "work-life", "work life", "betreuung"],
    title: "Ich leite dich zum Eltern-Netzwerk und passenden Communities.",
    text: "Familien- und Pflegefragen sind im 4-Säulen-System bei Communities & Freizeitgruppen gebündelt, inklusive Eltern-Netzwerk, Austausch und Tandem-Optionen.",
    actions: [baseActions.communities, baseActions.tandems],
    highlights: communities
      .filter((community) => ["Familie", "Gesundheit"].includes(community.category))
      .slice(0, 3)
      .map((community) => highlight(`${community.members} Mitglieder`, community.title, community.nextMeet)),
    prompts: ["Gibt es ein Eltern-Netzwerk?", "Kann Ava ein Tandem vorschlagen?"]
  },
  {
    mood: "supportive",
    keywords: ["rabatt", "corporate", "vergünstigung", "verguenstigung", "shopping", "regional", "partner"],
    title: "Corporate und regionale Benefits findest du zentral.",
    text: "Du kannst nach Kategorie filtern, Favoriten speichern und regionale Vorteile besonders schnell öffnen.",
    actions: [baseActions.benefits, { label: "Regionale Angebote", to: "/ermaessigungen/markt-apotheke-regional" }],
    highlights: [...benefitHighlights("Freizeit"), ...benefitHighlights("Regionale Angebote")].slice(0, 3),
    prompts: ["Welche Rabatte gibt es?", "Welche Restaurants sind Partner?"]
  },
  {
    mood: "supportive",
    keywords: ["mobilitat", "mobilitaet", "jobrad", "fahrrad", "ticket", "opnv", "oepnv", "pendeln"],
    title: "Mobilitätsangebote sind im Benefit-Bereich gebündelt.",
    text: "Jobrad, Deutschlandticket-Zuschuss und Pendlerberatung sind als Mobilitätspaket verfügbar.",
    actions: [{ label: "Mobilität öffnen", to: "/ermaessigungen/jobrad-mobilitaet" }, baseActions.benefits],
    highlights: benefitHighlights("Mobilität"),
    prompts: ["Wie funktioniert Jobrad?", "Gibt es einen Ticketzuschuss?"]
  },
  {
    mood: "supportive",
    keywords: ["schulung", "schulungen", "weiterbildung", "lernen", "kurs", "training", "partneranbieter"],
    title: "Der Schulungsbereich erklärt Kurse, Status und Punkte.",
    text: "Du findest Partnerkurse nach Kategorie, Punktewerte und den Genehmigungsstatus. Einige Kurse brauchen eine Führungskraft-Freigabe.",
    actions: [baseActions.trainings, { label: "Punkte ansehen", to: "/schulungen" }],
    highlights: trainingHighlights,
    prompts: ["Wie funktioniert die Genehmigung?", "Welche Belohnungen gibt es?"]
  },
  {
    mood: "route",
    keywords: ["punkte", "punktestand", "belohnung", "einlösen", "einloesen", "urlaubstag", "bonus", "gutschein"],
    title: `Du hast aktuell ${pointsProfile.current} Punkte im Mock-Profil.`,
    text: "Punkte entstehen durch relevante Schulungen. Du kannst sie gegen Belohnungen wie Kantinengutschein, Fitnesszuschuss oder Eventticket einlösen.",
    actions: [baseActions.trainings, baseActions.profile],
    highlights: rewards.slice(0, 3).map((reward) => highlight(`${reward.points} Punkte`, reward.title, "Belohnung einlösbar im Schulungsbereich")),
    prompts: ["Welche Schulung bringt viele Punkte?", "Was kann ich einlösen?"]
  },
  {
    mood: "clarify",
    keywords: ["chef", "fuhrungskraft", "fuehrungskraft", "genehmigung", "freigabe", "beantragen", "abgelehnt"],
    title: "Genehmigungen laufen im Mock-Prozess über die Führungskraft.",
    text: "Bei relevanten Schulungen kannst du eine Genehmigung anfragen. Danach wird der Status beantragt, genehmigt oder abgelehnt simuliert.",
    actions: [baseActions.trainings],
    highlights: trainings.filter((training) => training.requiresApproval).slice(0, 3).map((training) => highlight(training.status, training.title, `${training.points} Punkte`)),
    prompts: ["Welche Kurse brauchen Freigabe?", "Wie sammle ich Punkte?"]
  },
  {
    mood: "supportive",
    keywords: ["community", "communities", "gruppe", "laufgruppe", "yoga", "circle", "netzwerk"],
    title: "Communities verbinden Angebote mit Austausch.",
    text: "Du kannst Gruppen wie Laufgruppe, Yoga, Mental Health Circle, Eltern-Netzwerk oder Digital & AI Community beitreten.",
    actions: [baseActions.communities, baseActions.tandems],
    highlights: communities.slice(0, 3).map((community) => highlight(`${community.members} Mitglieder`, community.title, community.nextMeet)),
    prompts: ["Gibt es eine Laufgruppe?", "Welche Community passt zu Digitalisierung?"]
  },
  {
    mood: "route",
    keywords: ["tandem", "matching", "mentor", "mentoring", "austausch", "onboarding", "sprache"],
    title: "Ich kann ein digitales Tandem vorschlagen.",
    text: "Tandems gibt es für Karriere, Digitalisierung, Gesundheit, Sprache, Onboarding und Führung. Termine werden simuliert mit Kalenderbestätigung.",
    actions: [baseActions.tandems, baseActions.profile],
    highlights: tandemCategories.slice(0, 3).map((tandem) => highlight(tandem.category, tandem.title, tandem.match)),
    prompts: ["Finde ein Digitalisierung-Tandem", "Welche Termine sind frei?"]
  },
  {
    mood: "route",
    keywords: ["event", "events", "gesundheitstag", "workshop", "vortrag", "ausflug", "wandertag", "restaurantbesuch", "firmenlauf", "ticket"],
    title: "Ich habe passende Events und Ausflüge gefunden.",
    text: "Events, Company-Ausflüge, Wartelisten, Buchungen und digitale Tickets sind jetzt direkt in der Säule Communities & Freizeitgruppen gebündelt.",
    actions: [baseActions.events, { label: "Gesundheitstag öffnen", to: "/communities/events/gesundheitstag-2026" }],
    highlights: eventHighlights,
    prompts: ["Welche Ausflüge gibt es?", "Kann ich ein Ticket buchen?"]
  },
  {
    mood: "supportive",
    keywords: ["profil", "meine", "gebucht", "favorit", "favoriten", "punktestand"],
    title: "Dein Profil bündelt persönliche Aktivitäten.",
    text: "Dort findest du Punkte, gebuchte Events, favorisierte Benefits, Communities, Tandems und eingelöste Belohnungen.",
    actions: [baseActions.profile, baseActions.benefits],
    highlights: [
      highlight("Profil", "Persönlicher Überblick", "Events, Benefits, Schulungen und Tandems"),
      highlight("Punkte", `${pointsProfile.current} Punkte`, pointsProfile.level)
    ],
    prompts: ["Welche Events habe ich gebucht?", "Welche Benefits sind favorisiert?"]
  }
];

function isGreetingOnly(message) {
  return greetingKeywords.some((keyword) => message === normalize(keyword));
}

export function generateAssistantResponse(userMessage) {
  const rawMessage = userMessage.trim();
  const message = normalize(rawMessage);

  if (!message || isGreetingOnly(message)) {
    return {
      mood: "welcome",
      title: "Hallo, ich bin Ava, dein Benefit-Assistent.",
      text:
        "Ich helfe dir bei BeWell, Schulungen & Punkten, Ermäßigungen sowie Communities mit Tandems, Events und Ausflügen. Wähle einen Vorschlag oder frage frei.",
      actions: [baseActions.benefits, baseActions.health, baseActions.trainings, baseActions.events],
      prompts: assistantSuggestions
    };
  }

  if (hasAny(message, medicalComplaintKeywords)) {
    return {
      mood: "careful",
      title: "Danke, dass du das ansprichst.",
      text:
        "Ich kann dir passende interne Gesundheitsangebote zeigen, stelle aber keine medizinischen Diagnosen. Bei Beschwerden, akuten Symptomen oder Unsicherheit wende dich bitte an medizinisches Fachpersonal.",
      actions: [baseActions.health, { label: "Mentale Erstberatung", to: "/bewell/mental-health-session" }],
      highlights: healthOffers.slice(0, 3).map((offer) => highlight(offer.category, offer.title, offer.contact)),
      prompts: ["Welche Gesundheitsangebote gibt es?", "Wer ist Ansprechpartner?"]
    };
  }

  const matchedRule = rules.find((rule) => hasAny(message, rule.keywords));

  if (matchedRule) {
    return matchedRule;
  }

  return {
    mood: "clarify",
    title: "Ich bin mir noch nicht ganz sicher, was du suchst.",
    text:
      "Meinst du Benefits, Gesundheit, Schulungen, Punkte, Communities, Tandems oder Events? Ich kann dich direkt zum passenden Bereich führen.",
    actions: [baseActions.benefits, baseActions.health, baseActions.trainings, baseActions.tandems],
    prompts: assistantSuggestions
  };
}

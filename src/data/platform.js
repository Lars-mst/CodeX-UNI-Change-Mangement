import {
  Activity,
  Award,
  Baby,
  Bike,
  Brain,
  Briefcase,
  Building2,
  Droplets,
  Dumbbell,
  Gift,
  GraduationCap,
  HeartPulse,
  Languages,
  Laptop,
  Leaf,
  MapPin,
  Music,
  Percent,
  Plane,
  Salad,
  Settings,
  Stethoscope,
  Syringe,
  Ticket,
  Trophy,
  Users,
  Utensils
} from "lucide-react";

export const hubModules = [
  {
    title: "Gesundheitsangebot BeWell",
    text: "Check-ups, Beratung, Prävention und buchbare Gesundheitsangebote.",
    to: "/bewell",
    cta: "BeWell öffnen",
    icon: HeartPulse,
    tone: "green",
    status: "Für dich empfohlen",
    highlights: ["jährlicher Check-up", "Mental Health", "Massagen & Impfungen"]
  },
  {
    title: "Digitales Schulungsangebot mit Punktesystem",
    text: "Partnerkurse, Genehmigungen, Punkte, Meilensteine und Anerkennung.",
    to: "/schulungen",
    cta: "Schulung starten",
    icon: GraduationCap,
    tone: "blue",
    status: "Beliebt",
    highlights: ["Punkte sammeln", "Meilensteine", "Leadership Approval"]
  },
  {
    title: "Ermäßigungen & Rabattaktionen",
    text: "Regionale Anbieter, Fitness, Reisen, Kultur und Restaurants.",
    to: "/ermaessigungen",
    cta: "Rabatte ansehen",
    icon: Percent,
    tone: "teal",
    status: "Neu",
    highlights: ["regionale Partner", "Fitnessrabatte", "Kultur & Reisen"]
  },
  {
    title: "Communities & Freizeitgruppen",
    text: "Clubs, digitale Stammtische, Tandems, Ausflüge und Tauschbörse.",
    to: "/communities",
    cta: "Community beitreten",
    icon: Users,
    tone: "coral",
    status: "Aktiv",
    highlights: ["Freizeitclubs", "digitale Tandems", "Company-Ausflüge"]
  }
];

export const benefitCategories = [
  "Alle",
  "Reisen",
  "Kultur",
  "Fitness",
  "Restaurants",
  "Ernährung",
  "Weiterbildung",
  "Regionale Angebote",
  "Mobilität",
  "Freizeit"
];

export const benefitOffers = [
  {
    slug: "bahn-citytrip",
    title: "Bahn Citytrip Vorteil",
    category: "Reisen",
    provider: "Deutsche Bahn",
    advantage: "Sparpreis-Check",
    description: "Bahnreisen, Citytrips und kombinierte Reiseangebote für nachhaltige Kurzurlaube.",
    details: "Ideal für Wochenendtrips, Dienstreiseverlängerungen und entspannte Bahnreisen innerhalb Deutschlands.",
    region: "Deutschlandweit",
    featured: true,
    icon: Plane,
    cta: "Anbieter öffnen",
    externalUrl: "https://www.bahn.de/"
  },
  {
    slug: "lufthansa-flugvorteil",
    title: "Lufthansa Flugvorteil",
    category: "Reisen",
    provider: "Lufthansa",
    advantage: "flexible Flugangebote",
    description: "Flugangebote für private Reisen, internationale Besuche und längere Wochenenden.",
    details: "Passend für Mitarbeitende, die Reiseoptionen mit verlässlicher Airline-Abwicklung suchen.",
    region: "International",
    featured: false,
    icon: Plane,
    cta: "Flüge ansehen",
    externalUrl: "https://www.lufthansa.com/de/de/homepage"
  },
  {
    slug: "aida-kreuzfahrt",
    title: "AIDA Auszeit",
    category: "Reisen",
    provider: "AIDA",
    advantage: "Aktionsreisen",
    description: "Kreuzfahrten und Erholungsreisen als besondere Auszeit für Mitarbeitende.",
    details: "Geeignet für längere Urlaube, Wellness-Auszeiten und gemeinsame Reisen mit Begleitpersonen.",
    region: "Europa & weltweit",
    featured: false,
    icon: Plane,
    cta: "Reisen entdecken",
    externalUrl: "https://www.aida.de/"
  },
  {
    slug: "center-parcs-familienauszeit",
    title: "Center Parcs Familienauszeit",
    category: "Reisen",
    provider: "Center Parcs",
    advantage: "Familienangebote",
    description: "Ferienparks in der Natur für Familien, Freundeskreise und entspannte Kurzurlaube.",
    details: "Besonders passend für Mitarbeitende, die regionale Erholung und Aktivitäten verbinden möchten.",
    region: "Deutschland & Nachbarländer",
    featured: true,
    icon: Leaf,
    cta: "Parks ansehen",
    externalUrl: "https://www.centerparcs.de/"
  },
  {
    slug: "eventim-kultur",
    title: "Eventim Kulturpass",
    category: "Kultur",
    provider: "Eventim",
    advantage: "Ticketaktionen",
    description: "Konzerte, Comedy, Sport- und Kulturveranstaltungen mit großer Angebotsauswahl.",
    details: "Mitarbeitende finden hier schnell passende Veranstaltungen für Abende, Wochenenden und Teamideen.",
    region: "Deutschlandweit",
    featured: true,
    icon: Music,
    cta: "Tickets ansehen",
    externalUrl: "https://www.eventim.de/"
  },
  {
    slug: "stage-musicals",
    title: "Stage Musicalabende",
    category: "Kultur",
    provider: "Stage Entertainment",
    advantage: "Show-Angebote",
    description: "Musicals und Shows für Kulturabende, Ausflüge und besondere Anlässe.",
    details: "Gute Ergänzung zu internen Kultur-Communities und gemeinsamen Teamabenden.",
    region: "Ausgewählte Städte",
    featured: false,
    icon: Music,
    cta: "Shows öffnen",
    externalUrl: "https://www.stage-entertainment.de/"
  },
  {
    slug: "museum-berlin",
    title: "Museumsimpuls Berlin",
    category: "Kultur",
    provider: "Staatliche Museen zu Berlin",
    advantage: "Kulturprogramm",
    description: "Museumsbesuche, Ausstellungen und inspirierende Kulturformate für Teams und Einzelpersonen.",
    details: "Geeignet für regionale Kulturaktionen und ruhige Auszeiten nach der Arbeit.",
    region: "Berlin",
    featured: false,
    icon: Building2,
    cta: "Museum besuchen",
    externalUrl: "https://www.smb.museum/"
  },
  {
    slug: "urban-sports-club",
    title: "Urban Sports Club",
    category: "Fitness",
    provider: "Urban Sports Club",
    advantage: "Multi-Sport Zugang",
    description: "Flexible Sport-, Yoga-, Schwimm- und Wellnessangebote bei vielen Partnern.",
    details: "Passend für Mitarbeitende, die unterschiedliche Studios und Kurse ausprobieren möchten.",
    region: "Viele Städte",
    featured: true,
    icon: Dumbbell,
    cta: "Sportangebot öffnen",
    externalUrl: "https://urbansportsclub.com/de"
  },
  {
    slug: "egym-wellpass",
    title: "EGYM Wellpass",
    category: "Fitness",
    provider: "EGYM Wellpass",
    advantage: "Corporate Fitness",
    description: "Firmenfitness, Wellness und digitale Angebote als flexible Gesundheitsleistung.",
    details: "Für Unternehmen und Mitarbeitende geeignet, die Fitness und Prävention verbinden möchten.",
    region: "Deutschlandweit",
    featured: true,
    icon: Dumbbell,
    cta: "Wellpass ansehen",
    externalUrl: "https://egym-wellpass.com/"
  },
  {
    slug: "fitx-training",
    title: "FitX Studioangebot",
    category: "Fitness",
    provider: "FitX",
    advantage: "Studio & Kurse",
    description: "Fitnessstudios mit Kursen, Trainingsflächen und flexiblen Öffnungszeiten.",
    details: "Eine realistische Option für Mitarbeitende, die regelmäßig in festen Studios trainieren möchten.",
    region: "Viele Standorte",
    featured: false,
    icon: Dumbbell,
    cta: "Studios finden",
    externalUrl: "https://www.fitx.de/"
  },
  {
    slug: "decathlon-sportausruestung",
    title: "Decathlon Sportausrüstung",
    category: "Fitness",
    provider: "Decathlon",
    advantage: "Sportartikel",
    description: "Ausrüstung für Laufen, Yoga, Outdoor, Teamsport und aktive Freizeit.",
    details: "Hilfreich für Mitarbeitende, die Community-Sportgruppen oder Firmenläufe nutzen.",
    region: "Online & Filialen",
    featured: false,
    icon: Trophy,
    cta: "Ausrüstung ansehen",
    externalUrl: "https://www.decathlon.de/"
  },
  {
    slug: "hellofresh-kochbox",
    title: "HelloFresh Kochbox",
    category: "Ernährung",
    provider: "HelloFresh",
    advantage: "Kochbox-Angebote",
    description: "Vorportionierte Zutaten und abwechslungsreiche Rezepte für Alltag und Homeoffice.",
    details: "Gut geeignet für Mitarbeitende, die gesunde Mahlzeiten planbarer machen möchten.",
    region: "Lieferung nach Hause",
    featured: true,
    icon: Salad,
    cta: "Kochbox ansehen",
    externalUrl: "https://www.hellofresh.de/"
  },
  {
    slug: "koro-snacks",
    title: "KoRo Snackvorteil",
    category: "Ernährung",
    provider: "KoRo",
    advantage: "Großpackungen & Snacks",
    description: "Nüsse, Snacks, Frühstück und Vorratsprodukte für Büro und Zuhause.",
    details: "Eine praktische Ergänzung für gesündere Snackroutinen und Teamküchen.",
    region: "Online",
    featured: false,
    icon: Salad,
    cta: "Snacks öffnen",
    externalUrl: "https://www.korodrogerie.de/"
  },
  {
    slug: "edeka-frische",
    title: "EDEKA Frischeimpuls",
    category: "Ernährung",
    provider: "EDEKA",
    advantage: "Lebensmittel & Rezepte",
    description: "Lebensmittel, Rezeptideen und frische Zutaten für alltagstaugliche Ernährung.",
    details: "Passt zu Ernährungsberatung, Meal Prep und gesunden Routinen im Arbeitsalltag.",
    region: "Regional & online",
    featured: false,
    icon: Salad,
    cta: "Inspiration öffnen",
    externalUrl: "https://www.edeka.de/"
  },
  {
    slug: "regional-restaurant-card",
    title: "OpenTable Restaurantfinder",
    category: "Restaurants",
    provider: "OpenTable",
    advantage: "Reservierungen",
    description: "Restaurantreservierungen für Teamlunch, Abendessen und besondere Anlässe.",
    details: "Hilft Mitarbeitenden, gute Restaurants in der Nähe oder auf Reisen zu finden.",
    region: "Deutschland & international",
    featured: true,
    icon: Utensils,
    cta: "Restaurants suchen",
    externalUrl: "https://www.opentable.de/"
  },
  {
    slug: "thefork-restaurantangebote",
    title: "TheFork Restaurantangebote",
    category: "Restaurants",
    provider: "TheFork",
    advantage: "Restaurantaktionen",
    description: "Reservierungen und wechselnde Restaurantangebote für private und teambezogene Anlässe.",
    details: "Eine gute Option für regionale Gastronomie, Business Lunches und After-Work-Treffen.",
    region: "Ausgewählte Städte",
    featured: false,
    icon: Utensils,
    cta: "Angebote öffnen",
    externalUrl: "https://www.thefork.de/"
  },
  {
    slug: "losteria-teamabend",
    title: "L'Osteria Teamabend",
    category: "Restaurants",
    provider: "L'Osteria",
    advantage: "Restaurantbesuch",
    description: "Pizza, Pasta und unkomplizierte Teamabende in vielen Städten.",
    details: "Passend für gemeinsame Restaurantbesuche nach Workshops, Gesundheitstagen oder Teammeetings.",
    region: "Viele Standorte",
    featured: false,
    icon: Utensils,
    cta: "Restaurant finden",
    externalUrl: "https://losteria.net/de/"
  },
  {
    slug: "doctolib-terminservice",
    title: "Doctolib Terminservice",
    category: "Regionale Angebote",
    provider: "Doctolib",
    advantage: "Terminübersicht",
    description: "Online-Terminbuchung bei Ärztinnen, Ärzten und Therapeutinnen oder Therapeuten.",
    details: "Die Plattform bleibt informativ; medizinische Fragen gehören weiterhin zu Fachpersonal.",
    region: "Regional verfügbar",
    featured: true,
    icon: MapPin,
    cta: "Termine suchen",
    externalUrl: "https://www.doctolib.de/"
  },
  {
    slug: "dm-drogerie",
    title: "dm Gesundheits- und Pflegeartikel",
    category: "Regionale Angebote",
    provider: "dm",
    advantage: "Drogerie & Pflege",
    description: "Pflege-, Gesundheits-, Ernährungs- und Alltagsprodukte online oder in der Filiale.",
    details: "Eine niedrigschwellige regionale Ergänzung zu Gesundheitstagen und Präventionsangeboten.",
    region: "Online & Filialen",
    featured: false,
    icon: MapPin,
    cta: "dm öffnen",
    externalUrl: "https://www.dm.de/"
  },
  {
    slug: "aponet-apotheken",
    title: "Apotheken vor Ort",
    category: "Regionale Angebote",
    provider: "aponet.de",
    advantage: "Apothekenfinder",
    description: "Informationen rund um Apotheken, Notdienste und regionale Gesundheitsversorgung.",
    details: "Als Orientierung für lokale Services gedacht, nicht als medizinische Beratung.",
    region: "Regional verfügbar",
    featured: false,
    icon: MapPin,
    cta: "Apotheken finden",
    externalUrl: "https://www.aponet.de/"
  },
  {
    slug: "jobrad-leasing",
    title: "JobRad Leasing",
    category: "Mobilität",
    provider: "JobRad",
    advantage: "Dienstrad-Leasing",
    description: "Fahrrad- und E-Bike-Leasing als gesunder Mobilitätsbenefit.",
    details: "Stärkt Bewegung im Alltag und passt gut zu Nachhaltigkeits- und Gesundheitszielen.",
    region: "Deutschlandweit",
    featured: true,
    icon: Bike,
    cta: "JobRad ansehen",
    externalUrl: "https://www.jobrad.org/"
  },
  {
    slug: "deutschlandticket",
    title: "Deutschlandticket",
    category: "Mobilität",
    provider: "Deutsche Bahn",
    advantage: "ÖPNV-Abo",
    description: "Deutschlandweite Mobilität im Nahverkehr für Pendeln und Freizeit.",
    details: "Ein sinnvoller Mobilitätsbaustein für Mitarbeitende mit regelmäßigen Wegen.",
    region: "Deutschlandweit",
    featured: false,
    icon: Bike,
    cta: "Ticket ansehen",
    externalUrl: "https://www.bahn.de/angebot/regio/deutschland-ticket"
  },
  {
    slug: "europa-park-freizeit",
    title: "Europa-Park Freizeitangebot",
    category: "Freizeit",
    provider: "Europa-Park",
    advantage: "Freizeit & Kurzurlaub",
    description: "Freizeitpark, Wasserwelt, Events und Übernachtungen für gemeinsame Auszeiten.",
    details: "Als Freizeitimpuls für Teams, Familien und kurze Erholungsphasen geeignet.",
    region: "Rust & Umgebung",
    featured: false,
    icon: Ticket,
    cta: "Freizeit öffnen",
    externalUrl: "https://www.europapark.de/de"
  },
  {
    slug: "booking-wellness-kurztrip",
    title: "Booking.com Wellness-Kurztrip",
    category: "Reisen",
    provider: "Booking.com",
    advantage: "25% Sonderrabatt",
    description: "Hotels, Apartments und Wellness-Unterkünfte für kurze Erholungstage nach intensiven Projektphasen.",
    details: "Als Angebot für Mitarbeitende gedacht, die flexible Reiseoptionen und einfache Buchung kombinieren möchten.",
    region: "Deutschland & Europa",
    featured: false,
    icon: Plane,
    cta: "Reiseoptionen öffnen",
    externalUrl: "https://www.booking.com/"
  },
  {
    slug: "flixbus-weekend",
    title: "FlixBus Wochenendtrip",
    category: "Reisen",
    provider: "FlixBus",
    advantage: "35% Sonderrabatt",
    description: "Bus- und Bahnverbindungen für preisbewusste Kurztrips, Kulturwochenenden und regionale Ausflüge.",
    details: "Geeignet für Mitarbeitende, die unkompliziert und flexibel zu Freizeit- oder Kulturzielen reisen möchten.",
    region: "Europaweit",
    featured: false,
    icon: Plane,
    cta: "Verbindungen ansehen",
    externalUrl: "https://www.flixbus.de/"
  },
  {
    slug: "expedia-hotelpaket",
    title: "Expedia Hotelpaket",
    category: "Reisen",
    provider: "Expedia",
    advantage: "30% Sonderrabatt",
    description: "Hotel- und Flugpakete für private Reisen, verlängerte Wochenenden und entspannte Auszeiten.",
    details: "Das Angebot ergänzt bestehende Reisevorteile um kombinierbare Paketoptionen.",
    region: "International",
    featured: false,
    icon: Plane,
    cta: "Pakete entdecken",
    externalUrl: "https://www.expedia.de/"
  },
  {
    slug: "getyourguide-kulturerlebnis",
    title: "GetYourGuide Kulturerlebnis",
    category: "Kultur",
    provider: "GetYourGuide",
    advantage: "20% Sonderrabatt",
    description: "Geführte Touren, Museumsbesuche und besondere Aktivitäten für Städte- und Kulturtrips.",
    details: "Passend für Teams, Kultur-Communities oder Mitarbeitende, die neue Orte entdecken möchten.",
    region: "Deutschland & weltweit",
    featured: false,
    icon: Music,
    cta: "Erlebnisse öffnen",
    externalUrl: "https://www.getyourguide.de/"
  },
  {
    slug: "cinestar-kinoabend",
    title: "CineStar Kinoabend",
    category: "Kultur",
    provider: "CineStar",
    advantage: "18% Sonderrabatt",
    description: "Kinobesuche für entspannte Abende, kleine Teamaktionen und Kulturpausen nach der Arbeit.",
    details: "Ein niedrigschwelliger Kulturbenefit für Einzelpersonen, Tandems oder Freizeitgruppen.",
    region: "Viele Standorte",
    featured: false,
    icon: Ticket,
    cta: "Kino finden",
    externalUrl: "https://www.cinestar.de/"
  },
  {
    slug: "gymondo-homefitness",
    title: "Gymondo Home-Fitness",
    category: "Fitness",
    provider: "Gymondo",
    advantage: "55% Sonderrabatt",
    description: "Digitale Trainingsprogramme für Kraft, Beweglichkeit und gesunde Routinen im Homeoffice.",
    details: "Ideal für Mitarbeitende, die unabhängig von festen Studiozeiten trainieren möchten.",
    region: "Online",
    featured: false,
    icon: Dumbbell,
    cta: "Training öffnen",
    externalUrl: "https://www.gymondo.com/"
  },
  {
    slug: "fitnessfirst-training",
    title: "Fitness First Training",
    category: "Fitness",
    provider: "Fitness First",
    advantage: "25% Sonderrabatt",
    description: "Studiozugang, Kurse und Trainingsflächen für regelmäßige Bewegung im Alltag.",
    details: "Als Ergänzung zu BeWell-Programmen und internen Sportgruppen geeignet.",
    region: "Viele Städte",
    featured: false,
    icon: Dumbbell,
    cta: "Studios ansehen",
    externalUrl: "https://www.fitnessfirst.de/"
  },
  {
    slug: "mcfit-flex-training",
    title: "McFIT Flex-Training",
    category: "Fitness",
    provider: "McFIT",
    advantage: "20% Sonderrabatt",
    description: "Flexible Fitnessstudio-Option für Mitarbeitende, die eigenständig und regelmäßig trainieren möchten.",
    details: "Gut geeignet für Einsteigerinnen und Einsteiger sowie Fortgeschrittene mit klarer Trainingsroutine.",
    region: "Deutschlandweit",
    featured: false,
    icon: Trophy,
    cta: "Studios finden",
    externalUrl: "https://www.mcfit.com/de/"
  },
  {
    slug: "nu3-ernaehrung",
    title: "nu3 Ernährungsimpuls",
    category: "Ernährung",
    provider: "nu3",
    advantage: "30% Sonderrabatt",
    description: "Ernährungsprodukte, Snacks und Rezeptideen für bewusste Routinen im Büro und Zuhause.",
    details: "Passt zu Ernährungsberatung, Meal Prep und gesunden Pausen im Arbeitsalltag.",
    region: "Online",
    featured: false,
    icon: Salad,
    cta: "Ernährung ansehen",
    externalUrl: "https://www.nu3.de/"
  },
  {
    slug: "toogoodtogo-food",
    title: "Too Good To Go Food Saver",
    category: "Ernährung",
    provider: "Too Good To Go",
    advantage: "15% Sonderrabatt",
    description: "Lebensmittel retten und günstige Überraschungspakete bei lokalen Partnern entdecken.",
    details: "Verbindet bewusste Ernährung, Nachhaltigkeit und regionale Angebote in einer einfachen App.",
    region: "Regional verfügbar",
    featured: false,
    icon: Leaf,
    cta: "App öffnen",
    externalUrl: "https://www.toogoodtogo.com/de"
  },
  {
    slug: "dean-david-lunch",
    title: "dean&david Lunchvorteil",
    category: "Restaurants",
    provider: "dean&david",
    advantage: "18% Sonderrabatt",
    description: "Salate, Bowls und schnelle Mittagsoptionen für gesunde Pausen im Arbeitsalltag.",
    details: "Ein passender Restaurantvorteil für Mitarbeitende, die frische Lunchoptionen suchen.",
    region: "Viele Städte",
    featured: false,
    icon: Utensils,
    cta: "Standorte ansehen",
    externalUrl: "https://deananddavid.de/"
  },
  {
    slug: "vapiano-teamlunch",
    title: "Vapiano Teamlunch",
    category: "Restaurants",
    provider: "Vapiano",
    advantage: "15% Sonderrabatt",
    description: "Unkomplizierte Restaurantoption für Teamlunch, After-Work und gemeinsame Pausen.",
    details: "Geeignet für kleine Gruppen, Communities oder lockere Abteilungsrunden.",
    region: "Ausgewählte Städte",
    featured: false,
    icon: Utensils,
    cta: "Restaurant öffnen",
    externalUrl: "https://www.vapiano.de/"
  },
  {
    slug: "linkedin-learning-skillpass",
    title: "LinkedIn Learning Skillpass",
    category: "Weiterbildung",
    provider: "LinkedIn Learning",
    advantage: "45% Sonderrabatt",
    description: "Onlinekurse für digitale Kompetenzen, Kommunikation, Führung und persönliche Entwicklung.",
    details: "Ergänzt das interne Punktesystem um externe Lernimpulse und flexible Selbstlernformate.",
    region: "Online",
    featured: false,
    icon: Laptop,
    cta: "Kurse ansehen",
    externalUrl: "https://www.linkedin.com/learning/"
  },
  {
    slug: "coursera-certificate",
    title: "Coursera Zertifikatskurse",
    category: "Weiterbildung",
    provider: "Coursera",
    advantage: "35% Sonderrabatt",
    description: "Zertifikatskurse, Onlineprogramme und berufliche Lernpfade von internationalen Partnern.",
    details: "Gut geeignet für Mitarbeitende, die vertiefende externe Lernangebote nutzen möchten.",
    region: "Online",
    featured: false,
    icon: GraduationCap,
    cta: "Lernpfade öffnen",
    externalUrl: "https://www.coursera.org/"
  },
  {
    slug: "udemy-aktionskurse",
    title: "Udemy Aktionskurse",
    category: "Weiterbildung",
    provider: "Udemy",
    advantage: "65% Sonderrabatt",
    description: "Praxisnahe Onlinekurse zu Software, Business, Produktivität und beruflicher Entwicklung.",
    details: "Ein flexibles Weiterbildungsangebot für Mitarbeitende mit konkreten Lernzielen.",
    region: "Online",
    featured: false,
    icon: Briefcase,
    cta: "Kurse öffnen",
    externalUrl: "https://www.udemy.com/"
  },
  {
    slug: "babbel-sprachtraining",
    title: "Babbel Sprachtraining",
    category: "Weiterbildung",
    provider: "Babbel",
    advantage: "40% Sonderrabatt",
    description: "Digitale Sprachkurse für internationale Zusammenarbeit, Reisen und persönliche Entwicklung.",
    details: "Passt zu Tandems, Onboarding und Teams mit internationaler Kommunikation.",
    region: "Online",
    featured: false,
    icon: Languages,
    cta: "Sprachen lernen",
    externalUrl: "https://de.babbel.com/"
  },
  {
    slug: "mydays-erlebnis",
    title: "mydays Erlebnisgutschein",
    category: "Freizeit",
    provider: "mydays",
    advantage: "40% Sonderrabatt",
    description: "Erlebnisse, Auszeiten und Freizeitideen für Mitarbeitende, Tandems oder kleine Teams.",
    details: "Eine attraktive Ergänzung zu Company-Ausflügen und regionalen Freizeitgruppen.",
    region: "Deutschlandweit",
    featured: false,
    icon: Gift,
    cta: "Erlebnisse ansehen",
    externalUrl: "https://www.mydays.de/"
  },
  {
    slug: "jochen-schweizer-action",
    title: "Jochen Schweizer Freizeitimpuls",
    category: "Freizeit",
    provider: "Jochen Schweizer",
    advantage: "30% Sonderrabatt",
    description: "Freizeit- und Erlebnisangebote für besondere Ausflüge, Teamideen und aktive Wochenenden.",
    details: "Passend für Communities, Freizeitclubs und gemeinsame Aktivitäten außerhalb des Büros.",
    region: "Deutschlandweit",
    featured: false,
    icon: Ticket,
    cta: "Erlebnisse öffnen",
    externalUrl: "https://www.jochen-schweizer.de/"
  },
  {
    slug: "therme-erding-auszeit",
    title: "Therme Erding Auszeit",
    category: "Freizeit",
    provider: "Therme Erding",
    advantage: "25% Sonderrabatt",
    description: "Wellness, Entspannung und Erholung als regionaler Freizeitbenefit.",
    details: "Geeignet für Mitarbeitende, die Gesundheit, Regeneration und Freizeit verbinden möchten.",
    region: "Regional Bayern",
    featured: false,
    icon: HeartPulse,
    cta: "Auszeit planen",
    externalUrl: "https://www.therme-erding.de/"
  },
  {
    slug: "komoot-outdoor",
    title: "Komoot Outdoor-Routen",
    category: "Regionale Angebote",
    provider: "Komoot",
    advantage: "20% Sonderrabatt",
    description: "Routenplanung für Wanderungen, Fahrradtouren und aktive Pausen in der Region.",
    details: "Stärkt Bewegung, regionale Freizeitideen und Community-Aktivitäten wie Lauf- oder Wandergruppen.",
    region: "Regional & online",
    featured: false,
    icon: MapPin,
    cta: "Routen planen",
    externalUrl: "https://www.komoot.com/de-de"
  }
];

export const healthCategories = [
  "Alle",
  "Prävention",
  "Mentale Gesundheit",
  "Bewegung",
  "Beratung"
];

export const healthOffers = [
  {
    slug: "vorsorge-check",
    title: "Jährlicher Gesundheits-Check-up",
    category: "Prävention",
    description: "Kurzer Gesundheitscheck mit Blutdruck, Risiko-Screening und persönlicher Empfehlung.",
    details: "Geeignet als niedrigschwelliger Einstieg in Präventionsangebote. Der Termin ersetzt keine ärztliche Diagnose.",
    contact: "Anna Keller, Betriebliches Gesundheitsmanagement",
    slots: ["Mo 09:30", "Di 11:00", "Do 14:30"],
    icon: Stethoscope
  },
  {
    slug: "ergonomie-beratung",
    title: "Ergonomie-Beratung",
    category: "Beratung",
    description: "Individuelle Beratung zu Arbeitsplatz, Haltung und gesunder Arbeitsumgebung.",
    details: "Die Ergonomie-Beratung kann im Büro oder remote stattfinden und endet mit konkreten Empfehlungen.",
    contact: "BGM Team",
    slots: ["Mo 10:30", "Mi 13:00", "Do 09:30"],
    icon: Activity
  },
  {
    slug: "massage-mobil",
    title: "Massagen",
    category: "Bewegung",
    description: "20-minütige Schulter- und Nackenmassage am Campus.",
    details: "Ideal für kurze Regenerationstage. Buchung erfolgt in festen Zeitfenstern.",
    contact: "BGM Team",
    slots: ["Mi 10:00", "Mi 10:30", "Mi 11:00"],
    icon: Activity
  },
  {
    slug: "impfberatung",
    title: "Impfberatung",
    category: "Prävention",
    description: "Saisonale Orientierung zu Impfungen und Vorsorgeoptionen.",
    details: "Die Beratung informiert allgemein und verweist bei medizinischen Fragen an Fachpersonal.",
    contact: "Medical Partner Desk",
    slots: ["Fr 09:00", "Fr 10:00"],
    icon: Syringe
  },
  {
    slug: "blutabnahme",
    title: "Blutabnahme Aktionstag",
    category: "Prävention",
    description: "Optionale Laborwerte im Rahmen des Gesundheitstags.",
    details: "Vorabinformationen zur Vorbereitung werden nach der Buchung bereitgestellt.",
    contact: "Gesundheitstag Team",
    slots: ["21. Mai 08:30", "21. Mai 09:00", "21. Mai 09:30"],
    icon: Droplets
  },
  {
    slug: "fitness-programm",
    title: "8-Wochen Fitnessprogramm",
    category: "Bewegung",
    description: "Hybridprogramm mit Trainingsplan, kurzen Live-Sessions und Fortschrittscheck.",
    details: "Das Programm ist für unterschiedliche Fitnesslevel geeignet.",
    contact: "Jonas Brandt, Fitness-Koordination",
    slots: ["Start 03. Juni", "Start 17. Juni"],
    icon: Dumbbell
  },
  {
    slug: "ernaehrungsberatung",
    title: "Ernährungsberatung",
    category: "Beratung",
    description: "Individuelle Beratung zu alltagstauglichen Routinen, Schichtarbeit und Energielevel.",
    details: "Die Beratung ist vertraulich und kann digital oder vor Ort stattfinden.",
    contact: "Laura Stein, Ernährungsberatung",
    slots: ["Di 13:00", "Do 09:00", "Do 15:00"],
    icon: Salad
  },
  {
    slug: "mental-health-session",
    title: "Mentale Gesundheit Erstberatung",
    category: "Mentale Gesundheit",
    description: "Vertrauliche Erstberatung für Belastung, Stress und Orientierung.",
    details: "Bei akuten Beschwerden bitte zusätzlich medizinisches oder psychologisches Fachpersonal kontaktieren.",
    contact: "Dr. Mira Hoffmann",
    slots: ["Mo 15:00", "Mi 12:00"],
    icon: Brain
  },
  {
    slug: "stresspraevention",
    title: "Stressprävention kompakt",
    category: "Mentale Gesundheit",
    description: "Workshop zu Fokus, Pausen, Schlaf und Umgang mit Druck.",
    details: "Praktische Methoden für Arbeitsalltag und Erholung.",
    contact: "Mental Health Circle",
    slots: ["12. Juni 12:15", "14. Juni 09:00"],
    icon: HeartPulse
  },
  {
    slug: "rueckentraining",
    title: "Rückentraining",
    category: "Bewegung",
    description: "Präventionskurs für Rücken, Schultern und Nacken.",
    details: "Für Büro, Pflege, mobile Arbeit und Teams geeignet.",
    contact: "FitPlus Trainerteam",
    slots: ["Montags 16:00", "Donnerstags 08:00"],
    icon: Activity
  },
  {
    slug: "sehtest-screening",
    title: "Sehtest & Bildschirmarbeitsplatz",
    category: "Prävention",
    description: "Kurzer Sehtest mit Hinweisen für Bildschirmarbeit und Pausengestaltung.",
    details: "Das Screening unterstützt die Orientierung rund um Sehkomfort, Licht und ergonomische Bildschirmnutzung.",
    contact: "Medical Partner Desk",
    slots: ["Di 09:30", "Di 10:30", "Mi 14:00"],
    icon: Stethoscope
  },
  {
    slug: "hautcheck-beratung",
    title: "Hautcheck-Beratung",
    category: "Prävention",
    description: "Informationsangebot zu Hautschutz, Sonnenschutz und Vorsorgeoptionen.",
    details: "Die Beratung informiert allgemein und ersetzt keine fachärztliche Untersuchung oder Diagnose.",
    contact: "Gesundheitstag Team",
    slots: ["22. Mai 10:00", "22. Mai 11:30", "22. Mai 13:00"],
    icon: HeartPulse
  },
  {
    slug: "schlafcoaching",
    title: "Schlafcoaching",
    category: "Mentale Gesundheit",
    description: "Kurzberatung zu Schlafroutinen, Erholung und gesunden Pausen im Arbeitsalltag.",
    details: "Das Coaching liefert alltagstaugliche Impulse für Regeneration, Fokus und Energielevel.",
    contact: "Dr. Mira Hoffmann",
    slots: ["Mo 16:00", "Mi 08:30", "Fr 12:00"],
    icon: Brain
  },
  {
    slug: "achtsamkeitspause",
    title: "Achtsamkeitspause",
    category: "Mentale Gesundheit",
    description: "Geführte 25-Minuten-Session für Atemtechnik, Fokus und kurze mentale Entlastung.",
    details: "Die Session ist niedrigschwellig und eignet sich als kurzer Impuls zwischen Meetings.",
    contact: "Mental Health Circle",
    slots: ["Dienstags 12:15", "Donnerstags 12:15"],
    icon: HeartPulse
  },
  {
    slug: "yoga-mobility",
    title: "Yoga & Mobility",
    category: "Bewegung",
    description: "Sanfte Einheit für Beweglichkeit, Atmung und Ausgleich nach langen Arbeitstagen.",
    details: "Geeignet für Einsteigerinnen und Einsteiger. Matten werden vor Ort bereitgestellt.",
    contact: "FitPlus Trainerteam",
    slots: ["Mo 17:00", "Mi 07:45", "Fr 13:00"],
    icon: Activity
  },
  {
    slug: "laufanalyse",
    title: "Laufanalyse & Bewegungscheck",
    category: "Bewegung",
    description: "Kurzer Bewegungscheck mit Impulsen für Laufgruppe, Firmenlauf und Alltagstraining.",
    details: "Das Angebot unterstützt gesunde Bewegung und verweist bei Beschwerden an Fachpersonal.",
    contact: "Jonas Brandt, Fitness-Koordination",
    slots: ["Di 16:30", "Do 17:00", "Sa 10:00"],
    icon: Dumbbell
  },
  {
    slug: "physio-sprechstunde",
    title: "Physio-Sprechstunde",
    category: "Beratung",
    description: "Kurze Orientierung zu Bewegung, Mobilisation und Prävention bei typischen Belastungen.",
    details: "Die Sprechstunde gibt allgemeine Empfehlungen und ersetzt keine medizinische Behandlung.",
    contact: "BGM Team",
    slots: ["Mo 13:30", "Mi 15:30", "Do 11:00"],
    icon: Activity
  },
  {
    slug: "gesundheitslotsen",
    title: "Gesundheitslotsen-Sprechstunde",
    category: "Beratung",
    description: "Persönliche Orientierung, welches BeWell-Angebot zur aktuellen Situation passt.",
    details: "Die Gesundheitslotsen helfen bei Auswahl, Buchung und Weiterleitung zu passenden Ansprechpartnern.",
    contact: "Anna Keller, Betriebliches Gesundheitsmanagement",
    slots: ["Di 12:00", "Do 10:00", "Fr 09:30"],
    icon: HeartPulse
  }
];

export const trainingCategories = [
  "Alle",
  "Digitalisierung",
  "Automatisierung",
  "Gesundheit",
  "Führung",
  "Nachhaltigkeit",
  "Arbeitssicherheit",
  "Kommunikation",
  "Projektmanagement"
];

export const trainings = [
  {
    slug: "ki-im-arbeitsalltag",
    title: "KI im Arbeitsalltag",
    category: "Digitalisierung",
    provider: "Digital Health Academy",
    points: 120,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Praxisnaher Einstieg in sichere KI-Nutzung, Prompts und Automatisierungsideen.",
    outcomes: ["KI-Grundlagen", "Datenschutz", "Anwendungsfälle"]
  },
  {
    slug: "automation-basics",
    title: "Automation Basics",
    category: "Automatisierung",
    provider: "Process Lab",
    points: 180,
    duration: "5 h",
    status: "genehmigt",
    requiresApproval: true,
    description: "Automatisierungspotenziale erkennen und einfache Workflows dokumentieren.",
    outcomes: ["Prozessblick", "No-Code Workflows", "Priorisierung"]
  },
  {
    slug: "mental-health-first-aid",
    title: "Mental Health First Aid",
    category: "Gesundheit",
    provider: "Care Institute",
    points: 160,
    duration: "4 h",
    status: "beantragt",
    requiresApproval: true,
    description: "Sensibilisierung für mentale Belastung und sichere Weiterleitung an Hilfeangebote.",
    outcomes: ["Warnsignale", "Gesprächsführung", "Weiterleitung"]
  },
  {
    slug: "leadership-essentials",
    title: "Leadership Essentials",
    category: "Führung",
    provider: "People Growth Partner",
    points: 220,
    duration: "2 Tage",
    status: "verfügbar",
    requiresApproval: true,
    description: "Grundlagen für wirksame, gesunde und klare Führung.",
    outcomes: ["Feedback", "Prioritäten", "Teamgesundheit"]
  },
  {
    slug: "sustainable-office",
    title: "Sustainable Office",
    category: "Nachhaltigkeit",
    provider: "Green Skills",
    points: 90,
    duration: "2 h",
    status: "abgeschlossen",
    requiresApproval: false,
    description: "Konkrete Hebel für nachhaltige Routinen in Büro, Einkauf und Events.",
    outcomes: ["Ressourcen", "Mobilität", "Teamideen"]
  },
  {
    slug: "arbeitssicherheit-refresh",
    title: "Arbeitssicherheit Refresh",
    category: "Arbeitssicherheit",
    provider: "Safety Partner",
    points: 80,
    duration: "90 min",
    status: "verfügbar",
    requiresApproval: false,
    description: "Aktualisierung zentraler Sicherheitsroutinen im Arbeitsalltag.",
    outcomes: ["Sicherheit", "Meldewege", "Prävention"]
  },
  {
    slug: "kommunikation-kompakt",
    title: "Kommunikation kompakt",
    category: "Kommunikation",
    provider: "People Growth Partner",
    points: 110,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Klare Gesprächsführung, Feedback und Abstimmung in hybriden Teams.",
    outcomes: ["Feedback", "Moderation", "Konfliktklärung"]
  },
  {
    slug: "projektmanagement-praxis",
    title: "Projektmanagement Praxis",
    category: "Projektmanagement",
    provider: "Process Lab",
    points: 150,
    duration: "4 h",
    status: "verfügbar",
    requiresApproval: true,
    description: "Priorisieren, planen und Projekte mit klaren Rollen umsetzen.",
    outcomes: ["Planung", "Risiken", "Stakeholder"]
  },
  {
    slug: "datenkompetenz-dashboard",
    title: "Datenkompetenz & Dashboard Basics",
    category: "Digitalisierung",
    provider: "Digital Health Academy",
    points: 140,
    duration: "4 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Kennzahlen verstehen, Daten sauber interpretieren und einfache Dashboards lesen.",
    outcomes: ["Datenqualität", "Kennzahlen", "Visualisierung"]
  },
  {
    slug: "datenschutz-gesundheitsdaten",
    title: "Datenschutz im Gesundheitskontext",
    category: "Digitalisierung",
    provider: "Compliance Campus",
    points: 130,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Sicherer Umgang mit sensiblen Informationen, Einwilligungen und internen Prozessen.",
    outcomes: ["DSGVO", "Gesundheitsdaten", "Sichere Ablage"]
  },
  {
    slug: "rpa-fachbereiche",
    title: "RPA für Fachbereiche",
    category: "Automatisierung",
    provider: "Process Lab",
    points: 210,
    duration: "1 Tag",
    status: "verfügbar",
    requiresApproval: true,
    description: "Wiederkehrende Aufgaben analysieren und Automatisierungsideen fachlich vorbereiten.",
    outcomes: ["Prozessanalyse", "Bots", "Business Case"]
  },
  {
    slug: "workflow-design",
    title: "Workflow Design mit No-Code Tools",
    category: "Automatisierung",
    provider: "Automation Studio",
    points: 190,
    duration: "6 h",
    status: "verfügbar",
    requiresApproval: true,
    description: "Digitale Workflows modellieren, Freigaben abbilden und einfache Automationen planen.",
    outcomes: ["No-Code", "Freigaben", "Prototyping"]
  },
  {
    slug: "resilienz-selbstmanagement",
    title: "Resilienz & Selbstmanagement",
    category: "Gesundheit",
    provider: "Care Institute",
    points: 120,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Praktische Methoden für Priorisierung, Erholung und stabilen Umgang mit Belastung.",
    outcomes: ["Resilienz", "Pausen", "Energielevel"]
  },
  {
    slug: "gesund-fuehren",
    title: "Gesund führen",
    category: "Führung",
    provider: "People Growth Partner",
    points: 230,
    duration: "1 Tag",
    status: "verfügbar",
    requiresApproval: true,
    description: "Führungskräfte lernen, Belastung früh zu erkennen und gesunde Teamroutinen zu stärken.",
    outcomes: ["Teamgesundheit", "Gespräche", "Prävention"]
  },
  {
    slug: "change-management",
    title: "Change Management kompakt",
    category: "Führung",
    provider: "People Growth Partner",
    points: 180,
    duration: "5 h",
    status: "beantragt",
    requiresApproval: true,
    description: "Veränderungen verständlich begleiten, Widerstände einordnen und Orientierung geben.",
    outcomes: ["Change Story", "Stakeholder", "Kommunikation"]
  },
  {
    slug: "nachhaltige-beschaffung",
    title: "Nachhaltige Beschaffung",
    category: "Nachhaltigkeit",
    provider: "Green Skills",
    points: 115,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Kriterien für Lieferanten, Materialien und regionale Partnerangebote professionell bewerten.",
    outcomes: ["Lieferanten", "Kriterien", "Regionale Partner"]
  },
  {
    slug: "klimafreundliche-mobilitaet",
    title: "Klimafreundliche Mobilität im Arbeitsalltag",
    category: "Nachhaltigkeit",
    provider: "Green Skills",
    points: 95,
    duration: "2 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Mobilitätsoptionen vergleichen und nachhaltige Pendel- und Dienstreiseroutinen entwickeln.",
    outcomes: ["Mobilität", "CO2", "Dienstreisen"]
  },
  {
    slug: "brandschutz-evakuierung",
    title: "Brandschutz & Evakuierung",
    category: "Arbeitssicherheit",
    provider: "Safety Partner",
    points: 70,
    duration: "90 min",
    status: "verfügbar",
    requiresApproval: false,
    description: "Auffrischung zu Verhalten im Notfall, Sammelpunkten und sicherer Evakuierung.",
    outcomes: ["Notfallwege", "Sammelpunkte", "Verhalten"]
  },
  {
    slug: "ergonomie-office",
    title: "Ergonomie im digitalen Office",
    category: "Arbeitssicherheit",
    provider: "Safety Partner",
    points: 85,
    duration: "2 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Arbeitsplatz, Bildschirmhöhe und Routinen für gesundes hybrides Arbeiten verbessern.",
    outcomes: ["Arbeitsplatz", "Pausen", "Hybridarbeit"]
  },
  {
    slug: "praesentation-storytelling",
    title: "Präsentation & Storytelling",
    category: "Kommunikation",
    provider: "People Growth Partner",
    points: 125,
    duration: "4 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Komplexe Inhalte klar strukturieren und überzeugend für unterschiedliche Zielgruppen präsentieren.",
    outcomes: ["Storyline", "Visualisierung", "Auftritt"]
  },
  {
    slug: "barrierefreie-kommunikation",
    title: "Barrierefreie Kommunikation",
    category: "Kommunikation",
    provider: "Inclusion Academy",
    points: 100,
    duration: "3 h",
    status: "verfügbar",
    requiresApproval: false,
    description: "Texte, Meetings und digitale Inhalte verständlicher und zugänglicher gestalten.",
    outcomes: ["Plain Language", "Meetings", "Zugänglichkeit"]
  },
  {
    slug: "agile-projektsteuerung",
    title: "Agile Projektsteuerung",
    category: "Projektmanagement",
    provider: "Process Lab",
    points: 170,
    duration: "5 h",
    status: "verfügbar",
    requiresApproval: true,
    description: "Agile Methoden sinnvoll einsetzen, Fortschritt sichtbar machen und Rollen klären.",
    outcomes: ["Kanban", "Rollen", "Review"]
  }
];

export const pointsProfile = {
  current: 640,
  yearlyGoal: 5000,
  level: "Learning Contributor",
  history: [
    { label: "Sustainable Office abgeschlossen", points: 90, date: "02. Mai" },
    { label: "Automation Basics genehmigt", points: 0, date: "26. Apr." },
    { label: "KI im Arbeitsalltag gestartet", points: 40, date: "18. Apr." }
  ]
};

export const rewards = [
  { title: "Essensgutschein Kantine", points: 150, icon: Utensils },
  { title: "Fitnesszuschuss", points: 300, icon: Dumbbell },
  { title: "Eventticket", points: 450, icon: Ticket },
  { title: "Regionaler Partnergutschein", points: 500, icon: MapPin },
  { title: "Zusätzlicher Urlaubstag", points: 1200, icon: Award },
  { title: "Bonuszahlung", points: 1500, icon: Gift }
];

export const rewardMilestones = [
  { points: 150, title: "Kantinengutschein" },
  { points: 300, title: "Fitnesszuschuss" },
  { points: 450, title: "Eventticket" },
  { points: 1200, title: "zusätzlicher Urlaubstag" },
  { points: 1500, title: "Bonuszahlung" }
];

export const leaderboard = {
  people: [
    { name: "Anna Keller", department: "Operations", area: "Automatisierung", points: 920, badge: "Automation Expert", avatar: { photo: "https://randomuser.me/api/portraits/women/68.jpg", tone: "female", skin: "#f0c8a8", hair: "#5f3728", shirt: "#0f766e", accent: "#99f6e4", bg: "#ecfeff" }, note: "ist jetzt Expertin im Bereich Automatisierung." },
    { name: "Max Richter", department: "IT & Digital", area: "Digitalisierung", points: 840, badge: "Digital Pro", avatar: { photo: "https://randomuser.me/api/portraits/men/32.jpg", tone: "male", skin: "#e7b98f", hair: "#3f2a22", shirt: "#2563eb", accent: "#bfdbfe", bg: "#eff6ff", beard: true }, note: "baut aktuell starkes Wissen im Bereich Digitalisierung auf." },
    { name: "Sophie Neumann", department: "People & Culture", area: "Gesundheit", points: 790, badge: "Health Champion", avatar: { photo: "https://randomuser.me/api/portraits/women/44.jpg", tone: "female", skin: "#d9a77f", hair: "#2f211c", shirt: "#c026d3", accent: "#f5d0fe", bg: "#fdf4ff", curls: true }, note: "ist Top-Lernende im Bereich Gesundheit." },
    { name: "Karin Müller", department: "Operations", area: "Kommunikation", points: 640, badge: "Learning Contributor", note: "entwickelt ihre Kompetenzen kontinuierlich weiter." },
    { name: "Jonas Becker", department: "Finance", area: "Projektmanagement", points: 610, badge: "Project Pro", avatar: { photo: "https://randomuser.me/api/portraits/men/75.jpg", tone: "male", skin: "#c98f67", hair: "#1f2937", shirt: "#334155", accent: "#cbd5e1", bg: "#f8fafc" }, note: "stärkt aktuell Planung und Stakeholder-Kommunikation." },
    { name: "Mira Hoffmann", department: "BGM", area: "Gesundheit", points: 580, badge: "Care Guide", avatar: { photo: "https://randomuser.me/api/portraits/women/65.jpg", tone: "female", skin: "#b87958", hair: "#171717", shirt: "#0891b2", accent: "#bae6fd", bg: "#f0f9ff" }, note: "teilt viel Wissen zu Prävention und mentaler Gesundheit." },
    { name: "Lena Schneider", department: "Customer Service", area: "Kommunikation", points: 520, badge: "Communication Builder", avatar: { photo: "https://randomuser.me/api/portraits/women/22.jpg", tone: "female", skin: "#f1c7a8", hair: "#c0842d", shirt: "#ea580c", accent: "#fed7aa", bg: "#fff7ed" }, note: "baut starke Kompetenzen in Gesprächsführung auf." },
    { name: "Tim Wagner", department: "Facility", area: "Arbeitssicherheit", points: 470, badge: "Safety Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/45.jpg", tone: "male", skin: "#efc19d", hair: "#7c4a2d", shirt: "#475569", accent: "#e2e8f0", bg: "#f1f5f9" }, note: "setzt wichtige Impulse für sichere Arbeitsroutinen." },
    { name: "David Fischer", department: "Legal & Compliance", area: "Datenschutz", points: 600, badge: "Compliance Pro", avatar: { photo: "https://randomuser.me/api/portraits/men/76.jpg", tone: "male", skin: "#d6a57c", hair: "#2b211d", shirt: "#1d4ed8", accent: "#dbeafe", bg: "#eff6ff", beard: true }, note: "vertieft Wissen zu Datenschutz und sicheren Prozessen." },
    { name: "Laura Wagner", department: "Marketing & Kommunikation", area: "Kommunikation", points: 560, badge: "Storytelling Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/48.jpg", tone: "female", skin: "#efc4a2", hair: "#7c2d12", shirt: "#be123c", accent: "#ffe4e6", bg: "#fff1f2" }, note: "stärkt klare interne Kommunikation und Storytelling." },
    { name: "Emre Yilmaz", department: "IT & Digital", area: "Digitalisierung", points: 545, badge: "Data Builder", avatar: { photo: "https://randomuser.me/api/portraits/men/36.jpg", tone: "male", skin: "#c6865a", hair: "#111827", shirt: "#0e7490", accent: "#cffafe", bg: "#ecfeff" }, note: "baut Kompetenzen in Datenqualität und Automatisierung auf." },
    { name: "Julia Schmitt", department: "Forschung & Innovation", area: "Nachhaltigkeit", points: 505, badge: "Innovation Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/79.jpg", tone: "female", skin: "#f0c7a4", hair: "#4a2f25", shirt: "#15803d", accent: "#dcfce7", bg: "#f0fdf4", curls: true }, note: "verbindet Innovation mit nachhaltiger Produktentwicklung." },
    { name: "Felix Braun", department: "Operations", area: "Projektmanagement", points: 480, badge: "Process Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/85.jpg", tone: "male", skin: "#e8b78e", hair: "#5b341f", shirt: "#7c3aed", accent: "#ede9fe", bg: "#f5f3ff" }, note: "arbeitet an klaren Rollen und stabilen Projektabläufen." },
    { name: "Nora Weber", department: "People & Culture", area: "Führung", points: 455, badge: "People Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/50.jpg", tone: "female", skin: "#d9a27c", hair: "#3f241a", shirt: "#db2777", accent: "#fce7f3", bg: "#fdf2f8" }, note: "entwickelt Wissen zu gesunder Führung und Feedback." },
    { name: "Omar Haddad", department: "Finance", area: "Automatisierung", points: 430, badge: "Automation Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/54.jpg", tone: "male", skin: "#b8754e", hair: "#18181b", shirt: "#0f766e", accent: "#ccfbf1", bg: "#f0fdfa", beard: true }, note: "identifiziert Automatisierungspotenziale in Finanzprozessen." },
    { name: "Katharina Wolf", department: "BGM", area: "Gesundheit", points: 405, badge: "Health Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/33.jpg", tone: "female", skin: "#f2c6a4", hair: "#9a3412", shirt: "#059669", accent: "#bbf7d0", bg: "#f0fdf4" }, note: "arbeitet an Präventionswissen und gesunden Routinen." },
    { name: "Leon Krüger", department: "Customer Service", area: "Kommunikation", points: 390, badge: "Service Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/61.jpg", tone: "male", skin: "#e2aa83", hair: "#27272a", shirt: "#0369a1", accent: "#bae6fd", bg: "#f0f9ff" }, note: "stärkt Gesprächsführung und souveräne Eskalation." },
    { name: "Amelie Roth", department: "Marketing & Kommunikation", area: "Digitalisierung", points: 360, badge: "Digital Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/72.jpg", tone: "female", skin: "#f1c9ab", hair: "#6b2f1a", shirt: "#c2410c", accent: "#ffedd5", bg: "#fff7ed", curls: true }, note: "lernt digitale Tools für Kampagnen und Zusammenarbeit." },
    { name: "Tobias Meyer", department: "Facility", area: "Arbeitssicherheit", points: 335, badge: "Safety Builder", avatar: { photo: "https://randomuser.me/api/portraits/men/49.jpg", tone: "male", skin: "#d89d73", hair: "#3f2a20", shirt: "#7f1d1d", accent: "#fecaca", bg: "#fef2f2" }, note: "aktualisiert Sicherheitsroutinen und Meldewege." },
    { name: "Farah Özdemir", department: "Legal & Compliance", area: "Kommunikation", points: 310, badge: "Clarity Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/71.jpg", tone: "female", skin: "#c98f67", hair: "#111827", shirt: "#9333ea", accent: "#f3e8ff", bg: "#faf5ff" }, note: "übersetzt komplexe Vorgaben in klare Kommunikation." },
    { name: "Patrick Hoffmann", department: "Forschung & Innovation", area: "Nachhaltigkeit", points: 285, badge: "Sustainability Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/89.jpg", tone: "male", skin: "#efbd96", hair: "#6b3f25", shirt: "#166534", accent: "#dcfce7", bg: "#f0fdf4", beard: true }, note: "sammelt Wissen zu nachhaltigen Innovationsprozessen." },
    { name: "Nele Bauer", department: "People & Culture", area: "Gesundheit", points: 260, badge: "Care Learner", avatar: { photo: "https://randomuser.me/api/portraits/women/31.jpg", tone: "female", skin: "#f0c3a1", hair: "#92400e", shirt: "#0d9488", accent: "#ccfbf1", bg: "#f0fdfa" }, note: "verbindet Lernimpulse mit mentaler Gesundheit." },
    { name: "Simon Klein", department: "Legal & Compliance", area: "Arbeitssicherheit", points: 225, badge: "Risk Learner", avatar: { photo: "https://randomuser.me/api/portraits/men/41.jpg", tone: "male", skin: "#e6b28a", hair: "#1f2937", shirt: "#581c87", accent: "#e9d5ff", bg: "#faf5ff" }, note: "baut Grundlagen zu Risikobewertung und Compliance aus." }
  ],
  departments: [
    { name: "Operations", points: 3260, completed: 24, badge: "Learning Driver", note: "führt aktuell bei Lernpunkten und Automatisierungsthemen." },
    { name: "IT & Digital", points: 2980, completed: 21, badge: "Digital Powerhouse", note: "stark bei Digitalisierung, Datenschutz und KI-Anwendungen." },
    { name: "Finance", points: 2620, completed: 18, badge: "Project Excellence", note: "punktet besonders in Projektmanagement und Prozessklarheit." },
    { name: "People & Culture", points: 2380, completed: 17, badge: "Health & Growth", note: "setzt den Fokus auf Gesundheit, Führung und Kommunikation." },
    { name: "Customer Service", points: 2110, completed: 15, badge: "Communication Focus", note: "entwickelt sichtbar Kompetenzen in Kundendialog und Zusammenarbeit." },
    { name: "Facility", points: 1760, completed: 13, badge: "Safety Champion", note: "stark bei Arbeitssicherheit, Brandschutz und Ergonomie." },
    { name: "Legal & Compliance", points: 1540, completed: 12, badge: "Risk & Clarity", note: "stark bei Datenschutz, Compliance und klaren Prozessen." },
    { name: "Marketing & Kommunikation", points: 1320, completed: 10, badge: "Communication Growth", note: "entwickelt digitale Kommunikation und Storytelling weiter." },
    { name: "Forschung & Innovation", points: 1190, completed: 9, badge: "Innovation Builder", note: "punktet bei Nachhaltigkeit, Produktideen und Zukunftsthemen." }
  ],
  teams: [
    { name: "Finance", completed: 18, note: "starke Lernroutine im Team" },
    { name: "Operations", completed: 14, note: "viel Aktivität bei Arbeitssicherheit" },
    { name: "People & Culture", completed: 11, note: "Fokus auf Gesundheit und Führung" }
  ]
};

export const communities = [
  {
    slug: "laufgruppe",
    title: "Laufgruppe",
    category: "Gesundheit",
    members: 48,
    nextMeet: "Mittwoch, 17:30",
    description: "Gemeinsame entspannte Läufe rund um den Campus.",
    announcement: "Nächster Firmenlauf: Teamshirts werden vorbereitet.",
    icon: Activity
  },
  {
    slug: "yoga-gruppe",
    title: "Yoga-Gruppe",
    category: "Gesundheit",
    members: 36,
    nextMeet: "Dienstag, 07:45",
    description: "Kurze Sessions vor Arbeitsbeginn und digitale Abendtermine.",
    announcement: "Neue Anfänger-Session startet im Juni.",
    icon: HeartPulse
  },
  {
    slug: "mental-health-circle",
    title: "Mental Health Circle",
    category: "Mental",
    members: 29,
    nextMeet: "Freitag, 12:15",
    description: "Vertraulicher Austausch, Impulse und Peer-Support.",
    announcement: "Impuls zu gesunden Grenzen im Arbeitsalltag.",
    icon: Brain
  },
  {
    slug: "eltern-netzwerk",
    title: "Eltern-Netzwerk",
    category: "Familie",
    members: 57,
    nextMeet: "Monatlich hybrid",
    description: "Austausch zu Betreuung, Pflege, Schule und Wiedereinstieg.",
    announcement: "Mentoring für Rückkehr aus Elternzeit verfügbar.",
    icon: Baby
  },
  {
    slug: "nachhaltigkeit",
    title: "Nachhaltigkeits-Community",
    category: "Nachhaltigkeit",
    members: 41,
    nextMeet: "Donnerstag, 13:00",
    description: "Ideen für nachhaltige Events, Mobilität und Büroalltag.",
    announcement: "Ideensammlung für Green Office Week ist offen.",
    icon: Leaf
  },
  {
    slug: "digital-ai",
    title: "Digital & AI Community",
    category: "Digitalisierung",
    members: 73,
    nextMeet: "Alle zwei Wochen",
    description: "Praxisnahe Tools, Automatisierung und verantwortungsvolle KI.",
    announcement: "Nächster Austausch: KI für Wissensmanagement.",
    icon: Laptop
  },
  {
    slug: "kultur-community",
    title: "Kultur-Community",
    category: "Kultur",
    members: 31,
    nextMeet: "Nächster Kulturabend",
    description: "Gemeinsame Konzert-, Museum- und Musicalbesuche.",
    announcement: "Musicalkontingent für Juli ist reserviert.",
    icon: Music
  },
  {
    slug: "food-nutrition",
    title: "Food & Nutrition Community",
    category: "Ernährung",
    members: 44,
    nextMeet: "Freitag Lunch",
    description: "Rezepte, Kantinenfeedback und gesunde Lunch-Routinen.",
    announcement: "Meal-Prep Austausch nächste Woche.",
    icon: Salad
  }
];

export const tandemCategories = [
  {
    slug: "karriere",
    title: "Karriere-Tandem",
    category: "Karriere",
    match: "Mira aus People Development",
    reason: "passt zu deinem Interesse an Führung und Entwicklung.",
    slots: ["Di 10:00", "Do 15:30"],
    icon: Briefcase
  },
  {
    slug: "digitalisierung",
    title: "Digitalisierung-Tandem",
    category: "Digitalisierung",
    match: "Lukas aus Operations",
    reason: "arbeitet an Automatisierung und Wissensmanagement.",
    slots: ["Mo 14:00", "Mi 09:30"],
    icon: Laptop
  },
  {
    slug: "gesundheit",
    title: "Gesundheits-Tandem",
    category: "Gesundheit",
    match: "Nora aus dem Health Circle",
    reason: "teilt Erfahrungen zu Routinen, Pausen und Fitness.",
    slots: ["Fr 11:00", "Fr 13:00"],
    icon: HeartPulse
  },
  {
    slug: "sprache",
    title: "Sprach-Tandem",
    category: "Sprache",
    match: "Elena aus Customer Care",
    reason: "sucht Austausch zu Deutsch/Englisch im Arbeitskontext.",
    slots: ["Di 12:30", "Do 12:30"],
    icon: Languages
  },
  {
    slug: "onboarding",
    title: "Onboarding-Tandem",
    category: "Onboarding",
    match: "Sam aus deinem Standort",
    reason: "kennt lokale Abläufe und wichtige Kontakte.",
    slots: ["Mo 09:00", "Mi 16:00"],
    icon: Users
  },
  {
    slug: "fuehrung",
    title: "Führungs-Tandem",
    category: "Führung",
    match: "Jonas aus Product",
    reason: "moderiert Peer-Austausch zu gesunder Führung.",
    slots: ["Do 11:30", "Fr 10:00"],
    icon: Settings
  }
];

export const exclusiveEvents = [
  {
    slug: "gesundheitstag-2026",
    title: "Exklusiver Gesundheitstag 2026",
    category: "Gesundheit",
    date: "21. Mai 2026",
    place: "Campus Atrium",
    seats: 42,
    status: "verfügbar",
    exclusive: true,
    description: "Checks, Vorträge, Ernährungsspecials und Kurzberatungen.",
    icon: HeartPulse
  },
  {
    slug: "ki-workshop",
    title: "KI & Arbeit Workshop",
    category: "Workshop",
    date: "08. Juni 2026",
    place: "Learning Space",
    seats: 12,
    status: "verfügbar",
    exclusive: true,
    description: "Praxisnahes Arbeiten mit KI im geschützten Rahmen.",
    icon: Laptop
  },
  {
    slug: "networking-breakfast",
    title: "Networking Breakfast",
    category: "Networking",
    date: "19. Juni 2026",
    place: "Kantine",
    seats: 0,
    status: "Warteliste",
    exclusive: false,
    description: "Austausch über Teams hinweg mit kurzen Impulsen.",
    icon: Users
  },
  {
    slug: "fitness-challenge",
    title: "Fitness Challenge",
    category: "Fitness",
    date: "01. Juli 2026",
    place: "App-basiert",
    seats: 120,
    status: "verfügbar",
    exclusive: true,
    description: "Team-Challenge mit freiwilliger Teilnahme und kleinen Anerkennungen.",
    icon: Trophy
  }
];

export const companyTrips = [
  {
    slug: "wandertag",
    title: "Wandertag",
    category: "Natur",
    date: "14. Juni 2026",
    place: "Grunewald",
    seats: 8,
    status: "Noch wenige Plätze verfügbar",
    description: "Entspannter Ausflug mit optionaler Gesundheitsroute.",
    icon: Leaf
  },
  {
    slug: "restaurantbesuch",
    title: "Gemeinsamer Restaurantbesuch",
    category: "Kulinarik",
    date: "28. Juni 2026",
    place: "Regionaler Partner",
    seats: 16,
    status: "verfügbar",
    description: "Abend bei einem lokalen Benefit-Partner mit gesundem Menü.",
    icon: Utensils
  },
  {
    slug: "kulturabend",
    title: "Kulturabend",
    category: "Kultur",
    date: "10. Juli 2026",
    place: "Stadtmuseum",
    seats: 0,
    status: "Warteliste",
    description: "Führung und gemeinsamer Ausklang.",
    icon: Building2
  },
  {
    slug: "firmenlauf",
    title: "Firmenlauf",
    category: "Sport",
    date: "24. Juli 2026",
    place: "Innenstadt",
    seats: 22,
    status: "verfügbar",
    description: "Freiwilliger Lauf mit Community-Treffpunkt.",
    icon: Activity
  },
  {
    slug: "musicalbesuch",
    title: "Musicalbesuch",
    category: "Kultur",
    date: "08. August 2026",
    place: "Theater am Hafen",
    seats: 6,
    status: "Noch wenige Plätze verfügbar",
    description: "Gemeinsamer Abend mit Mitarbeitenden-Kontingent.",
    icon: Music
  },
  {
    slug: "sportevent",
    title: "Sportevent",
    category: "Sport",
    date: "22. August 2026",
    place: "Arena",
    seats: 14,
    status: "verfügbar",
    description: "Team-Ausflug zu einem regionalen Sportevent.",
    icon: Trophy
  },
  {
    slug: "regionaler-gesundheitstag",
    title: "Regionaler Gesundheitstag",
    category: "Gesundheit",
    date: "05. September 2026",
    place: "Partnerklinik",
    seats: 18,
    status: "verfügbar",
    description: "Externer Gesundheitstag mit Vorträgen und kurzen Checks.",
    icon: HeartPulse
  },
  {
    slug: "networking-event",
    title: "Networking-Event",
    category: "Networking",
    date: "18. September 2026",
    place: "Campus Lounge",
    seats: 0,
    status: "Warteliste",
    description: "Austausch über Standorte und Teams hinweg.",
    icon: Users
  }
];

export const communityActivities = [
  ...exclusiveEvents.map((event) => ({
    ...event,
    kind: "Exklusives Event",
    detailPath: `/communities/events/${event.slug}`
  })),
  ...companyTrips.map((trip) => ({
    ...trip,
    kind: "Company-Ausflug",
    detailPath: `/communities/ausfluege/${trip.slug}`
  }))
];

export const communityActivityCategories = [
  "Alle",
  ...new Set(communityActivities.map((activity) => activity.category))
];

export const userProfile = {
  name: "Karin Müller",
  department: "Operations",
  interests: ["Gesundheit", "Digitalisierung", "Kultur", "Familie"],
  bookedHealthOffers: ["Jährlicher Gesundheits-Check-up", "Ernährungsberatung"],
  bookedEvents: ["Exklusiver Gesundheitstag 2026", "KI & Arbeit Workshop"],
  bookedTrips: ["Wandertag"],
  favoriteBenefits: ["OpenTable Restaurantfinder", "Urban Sports Club", "Bahn Citytrip Vorteil"],
  completedTrainings: ["Sustainable Office"],
  unlockedRewards: ["Kantinengutschein", "Fitnesszuschuss", "Eventticket"],
  redeemedRewards: ["Essensgutschein Kantine"],
  redeemedBenefits: ["Urban Sports Club"],
  communities: ["Digital & AI Community", "Food & Nutrition Community"],
  tandemAppointments: ["Digitalisierung-Tandem, Mi 09:30"],
  points: 640
};

export const partners = [
  "Deutsche Bahn",
  "Eventim",
  "Urban Sports Club",
  "OpenTable",
  "Digital Health Academy",
  "Care Institute",
  "Green Skills"
];

export const statusStyles = {
  verfügbar: "bg-mist-green text-teal-800",
  beantragt: "bg-amber-50 text-amber-800",
  genehmigt: "bg-sky-50 text-sky-800",
  gestartet: "bg-teal-50 text-teal-800",
  abgeschlossen: "bg-green-50 text-green-800",
  abgelehnt: "bg-rose-50 text-rose-800",
  angemeldet: "bg-teal-50 text-teal-800",
  Warteliste: "bg-amber-50 text-amber-800"
};

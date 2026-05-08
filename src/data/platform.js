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
    text: "Regionale Anbieter, Fitness, Reisen, Kultur und Gastronomie.",
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
  "Gastronomie",
  "Ernährung",
  "Regionale Angebote",
  "Mobilität",
  "Freizeit"
];

export const benefitOffers = [
  {
    slug: "city-relax-reisen",
    title: "City Relax Reisevorteil",
    category: "Reisen",
    provider: "UrbanStay Partnernetz",
    advantage: "bis 18% Rabatt",
    description: "Vergünstigte Kurzreisen und Gesundheitshotels für Mitarbeitende und Begleitpersonen.",
    details: "Der Vorteil gilt für ausgewählte Wochenenden, Wellnesshotels und Bahn-Hotel-Kombinationen.",
    region: "Deutschlandweit",
    featured: true,
    icon: Plane,
    cta: "Reisevorteil nutzen"
  },
  {
    slug: "kulturpass-musicals",
    title: "Kulturpass Musicals & Museen",
    category: "Kultur",
    provider: "CulturePlus",
    advantage: "2-für-1 Tickets",
    description: "Ausgewählte Musicals, Konzerte, Museen und Kulturabende zu Sonderkonditionen.",
    details: "Neue Kontingente werden monatlich freigeschaltet. Besonders geeignet für Teamabende.",
    region: "Regional & bundesweit",
    featured: true,
    icon: Music,
    cta: "Tickets ansehen"
  },
  {
    slug: "fitplus-studio",
    title: "FitPlus Verbund",
    category: "Fitness",
    provider: "FitPlus",
    advantage: "25 EUR Zuschuss/Monat",
    description: "Fitnessstudio-Zuschuss für Partnerstudios, Online-Kurse und Präventionsprogramme.",
    details: "Der Zuschuss kann mit internen Fitnessprogrammen kombiniert werden.",
    region: "Viele Standorte",
    featured: true,
    icon: Dumbbell,
    cta: "Studio auswählen"
  },
  {
    slug: "healthy-box",
    title: "Healthy Box",
    category: "Ernährung",
    provider: "FoodCare",
    advantage: "15% Rabatt",
    description: "Gesunde Snack- und Kochboxen mit Nährwertfokus für Büro und Homeoffice.",
    details: "Die Boxen sind monatlich kündbar und enthalten vegetarische sowie proteinreiche Optionen.",
    region: "Lieferung nach Hause",
    featured: false,
    icon: Salad,
    cta: "Box buchen"
  },
  {
    slug: "regional-restaurant-card",
    title: "Restaurantkarte Gesundheitspartner",
    category: "Gastronomie",
    provider: "LocalTaste",
    advantage: "10-20% Vorteil",
    description: "Gute Restaurants in der Umgebung mit gesunden Mittagsoptionen und Mitarbeiterkonditionen.",
    details: "Regionale Partner werden vom Benefit-Team kuratiert und quartalsweise aktualisiert.",
    region: "Besonders regional",
    featured: true,
    icon: Utensils,
    cta: "Restaurants öffnen"
  },
  {
    slug: "markt-apotheke-regional",
    title: "Regionale Apotheken- und Praxispartner",
    category: "Regionale Angebote",
    provider: "HealthLocal",
    advantage: "exklusive Aktionen",
    description: "Lokale Vorteile bei Apotheken, Physio-Praxen, Optik und Präventionspartnern.",
    details: "Regionale Angebote sind im Dashboard hervorgehoben, weil sie schnell nutzbar sind.",
    region: "Campus-Umgebung",
    featured: true,
    icon: MapPin,
    cta: "Regionale Angebote"
  },
  {
    slug: "jobrad-mobilitaet",
    title: "Jobrad & ÖPNV Paket",
    category: "Mobilität",
    provider: "Mobility Works",
    advantage: "Leasing + Ticketzuschuss",
    description: "Fahrrad-Leasing, Deutschlandticket-Zuschuss und Pendlerberatung aus einer Hand.",
    details: "Mitarbeitende können eine Mobilitätsoption pro Jahr aktiv wählen.",
    region: "Deutschlandweit",
    featured: false,
    icon: Bike,
    cta: "Mobilität wählen"
  },
  {
    slug: "corporate-shopping",
    title: "Corporate Benefits Portal",
    category: "Freizeit",
    provider: "Corporate Perks",
    advantage: "wechselnde Rabatte",
    description: "Technik, Reisen, Haushalt, Freizeit und Versicherungen in einem Angebotsportal.",
    details: "Neue Angebote erscheinen wöchentlich. Favoriten helfen beim Wiederfinden.",
    region: "Online",
    featured: false,
    icon: Percent,
    cta: "Portal öffnen"
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
  }
];

export const pointsProfile = {
  current: 640,
  yearlyGoal: 1000,
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
  { title: "Gesundheitsangebot kostenlos nutzen", points: 650, icon: HeartPulse },
  { title: "Bonuszahlung", points: 900, icon: Gift },
  { title: "Zusätzlicher Urlaubstag", points: 1200, icon: Award },
  { title: "Zusätzliche Bonuszahlung", points: 1500, icon: Gift }
];

export const rewardMilestones = [
  { points: 150, title: "Kantinengutschein" },
  { points: 300, title: "Fitnesszuschuss" },
  { points: 450, title: "Eventticket" },
  { points: 650, title: "kostenloses Gesundheitsangebot" },
  { points: 900, title: "Bonuszahlung" },
  { points: 1200, title: "zusätzlicher Urlaubstag" }
];

export const leaderboard = {
  people: [
    { name: "Anna K.", area: "Automatisierung", points: 920, badge: "Automation Expert", note: "ist jetzt Expertin im Bereich Automatisierung." },
    { name: "Max R.", area: "Digitalisierung", points: 840, badge: "Digital Pro", note: "baut aktuell starkes Wissen im Bereich Digitalisierung auf." },
    { name: "Sophie N.", area: "Gesundheit", points: 790, badge: "Health Champion", note: "ist Top-Lernende im Bereich Gesundheit." },
    { name: "Team Finance", area: "Team", points: 2210, badge: "Team Learning", note: "hat diesen Monat die meisten Schulungen abgeschlossen." }
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
  name: "Lena Hoffmann",
  department: "Operations",
  interests: ["Gesundheit", "Digitalisierung", "Kultur", "Familie"],
  bookedHealthOffers: ["Jährlicher Gesundheits-Check-up", "Ernährungsberatung"],
  bookedEvents: ["Exklusiver Gesundheitstag 2026", "KI & Arbeit Workshop"],
  bookedTrips: ["Wandertag"],
  favoriteBenefits: ["Restaurantkarte Gesundheitspartner", "FitPlus Verbund"],
  completedTrainings: ["Sustainable Office"],
  unlockedRewards: ["Kantinengutschein", "Fitnesszuschuss", "Eventticket"],
  redeemedRewards: ["Essensgutschein Kantine"],
  redeemedBenefits: ["FitPlus Verbund"],
  communities: ["Digital & AI Community", "Food & Nutrition Community"],
  tandemAppointments: ["Digitalisierung-Tandem, Mi 09:30"],
  points: 640
};

export const partners = [
  "UrbanStay Partnernetz",
  "CulturePlus",
  "FitPlus",
  "FoodCare",
  "Digital Health Academy",
  "Care Institute",
  "Green Skills"
];

export const statusStyles = {
  verfügbar: "bg-mist-green text-teal-800",
  beantragt: "bg-amber-50 text-amber-800",
  genehmigt: "bg-sky-50 text-sky-800",
  abgeschlossen: "bg-green-50 text-green-800",
  abgelehnt: "bg-rose-50 text-rose-800",
  angemeldet: "bg-teal-50 text-teal-800",
  Warteliste: "bg-amber-50 text-amber-800"
};

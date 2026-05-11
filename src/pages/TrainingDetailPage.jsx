import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, FileText, PlayCircle, ShieldCheck } from "lucide-react";
import ButtonLink from "../components/ButtonLink.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { trainings } from "../data/platform.js";

const categoryCopy = {
  Digitalisierung: "Der Lernpfad zeigt, wie digitale Werkzeuge im Arbeitsalltag sicher, nachvollziehbar und mit klarem Nutzen eingesetzt werden. Die Inhalte bleiben praxisnah und orientieren sich an typischen Situationen aus Verwaltung, Gesundheitsumfeld und interner Zusammenarbeit.",
  Automatisierung: "Die Schulung führt Schritt für Schritt durch Prozessblick, einfache Automatisierungsideen und sinnvolle Priorisierung. Der Fokus liegt darauf, wiederkehrende Aufgaben besser zu verstehen, ohne vorschnell technische Lösungen zu bauen.",
  Gesundheit: "Die Inhalte sensibilisieren für gesunde Routinen, Grenzen und verantwortungsvolle Weiterleitung. Medizinische Diagnosen sind nicht Bestandteil der Schulung; bei Beschwerden bleibt medizinisches Fachpersonal die richtige Anlaufstelle.",
  Führung: "Die Schulung verbindet klare Führung, gesunde Teamroutinen und gute Kommunikation. Führungskräfte erhalten konkrete Impulse, um Orientierung zu geben, Belastungen früh zu erkennen und Gespräche professionell zu führen.",
  Nachhaltigkeit: "Der Lernpfad macht Nachhaltigkeit im Arbeitsalltag greifbar: von Ressourcen über Mobilität bis zu Beschaffung und Events. Ziel ist ein realistischer Umgang mit kleinen, wirksamen Entscheidungen im Unternehmen.",
  Arbeitssicherheit: "Die Inhalte frischen wichtige Sicherheitsroutinen auf und machen konkrete Handlungen im Arbeitsalltag sichtbar. Kurze Beispiele helfen, Risiken früh zu erkennen und Meldewege sicher zu nutzen.",
  Kommunikation: "Die Schulung stärkt klare Sprache, strukturiertes Feedback und gelingende Abstimmung in hybriden Teams. Im Mittelpunkt stehen alltagstaugliche Gesprächssituationen und verständliche Zusammenarbeit.",
  Projektmanagement: "Der Kurs übersetzt Projektarbeit in konkrete Routinen: Ziele klären, Rollen sichtbar machen, Risiken einordnen und Fortschritt transparent halten. So entsteht mehr Orientierung ohne zusätzliche Komplexität."
};

function buildTrainingLessons(training) {
  const lessonTitles = training.outcomes.length > 0 ? training.outcomes : [training.category, training.provider, "Transfer"];

  return lessonTitles.map((outcome, index) => ({
    title: `${index + 1}. ${outcome}`,
    duration: index === 0 ? "18 min" : index === 1 ? "22 min" : "16 min",
    text:
      index === 0
        ? `Einstieg in ${outcome.toLowerCase()} mit Beispielen aus dem Arbeitsalltag und einer klaren Einordnung, warum dieses Thema für ${training.title} relevant ist.`
        : index === 1
          ? `Vertiefung mit typischen Situationen, kurzen Reflexionsfragen und konkreten Vorgehensweisen, die direkt in Teams nutzbar sind.`
          : `Transfer in die Praxis: Die wichtigsten Erkenntnisse werden zusammengeführt und in nächste Schritte für den eigenen Bereich übersetzt.`
  }));
}

function buildTrainingSummary(training) {
  const focus = training.outcomes.join(", ");
  const categoryText = categoryCopy[training.category] ?? "Die Schulung verbindet fachliche Orientierung mit konkreten Übungen für den Arbeitsalltag.";

  return `${training.description} ${categoryText} Inhaltlich geht es vor allem um ${focus}. Die Lerninhalte sind so aufgebaut, dass Mitarbeitende erst Orientierung bekommen, danach Beispiele sehen und am Ende konkrete nächste Schritte für den eigenen Arbeitsbereich ableiten können.`;
}

export default function TrainingDetailPage({ creditedTrainingSlugs = [], onTrainingStarted }) {
  const { slug } = useParams();
  const training = trainings.find((item) => item.slug === slug);
  const isTrainingCredited = training ? creditedTrainingSlugs.includes(training.slug) : false;
  const [processStatus, setProcessStatus] = useState(training?.status ?? "verfügbar");

  useEffect(() => {
    if (training) {
      setProcessStatus(isTrainingCredited ? "gestartet" : training.status);
    }
  }, [isTrainingCredited, training]);

  if (!training) {
    return (
      <section className="page-shell section-pad">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold">Schulung nicht gefunden</h1>
          <ButtonLink to="/schulungen" className="mt-5">Zur Schulungsübersicht</ButtonLink>
        </div>
      </section>
    );
  }

  const lessons = buildTrainingLessons(training);
  const summary = buildTrainingSummary(training);
  const totalVideoMinutes = lessons.reduce((sum, lesson) => sum + Number.parseInt(lesson.duration, 10), 0);
  const isWaitingForApproval = processStatus === "beantragt";
  const isStarted = processStatus === "gestartet" || isTrainingCredited;
  const isFinished = processStatus === "abgeschlossen";
  const isRejected = processStatus === "abgelehnt";
  const canStartDirectly = !training.requiresApproval || processStatus === "genehmigt";
  const primaryActionLabel = isWaitingForApproval
    ? "Genehmigung angefragt"
    : isStarted
      ? "Schulung gestartet"
      : isFinished
        ? "Schulung abgeschlossen"
        : isRejected
          ? "Schulung abgelehnt"
          : canStartDirectly
            ? "Schulung starten"
            : "Genehmigung anfragen";
  const primaryActionDisabled = isWaitingForApproval || isStarted || isFinished || isRejected;
  const processNote = isWaitingForApproval
    ? "Deine Anfrage ist an die Führungskraft gerichtet. Sobald sie genehmigt ist, erscheint hier der Start der Schulung."
    : isStarted
      ? `${training.points} Punkte wurden deinem Profil für diese Sitzung gutgeschrieben. Die Videomodule unten dienen hier als Vorschau des Lernpfads.`
      : training.requiresApproval && !canStartDirectly
        ? "Für diese Schulung ist vor dem Start eine Genehmigung durch die Führungskraft nötig."
        : "Diese Schulung kann direkt gestartet werden.";

  const handlePrimaryAction = () => {
    if (training.requiresApproval && processStatus === "verfügbar") {
      setProcessStatus("beantragt");
      return;
    }

    if (canStartDirectly) {
      setProcessStatus("gestartet");
      onTrainingStarted?.(training);
    }
  };

  return (
    <section className="page-shell section-pad">
      <Link
        to="/schulungen"
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-health-teal"
      >
        <ArrowLeft size={17} />
        Zur Schulungsübersicht
      </Link>

      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[minmax(0,1fr)_320px] lg:p-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-health-teal">
              {training.category} · {training.provider}
            </p>
            <StatusBadge>{processStatus}</StatusBadge>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{training.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">{summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {training.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 size={17} className="text-health-teal" />
                <p className="mt-3 text-sm font-bold text-ink">{outcome}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Kompaktes Lernziel mit Beispielen, Reflexion und Transfer in den Arbeitsalltag.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={primaryActionDisabled}
              onClick={handlePrimaryAction}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-health-teal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {primaryActionLabel}
            </button>
          </div>
        </div>

        <aside className="grid content-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <p className="rounded-lg bg-white p-3 text-sm text-slate-600">
              <span className="block text-lg font-bold text-ink">{training.points}</span>
              Punkte
            </p>
            <p className="rounded-lg bg-white p-3 text-sm text-slate-600">
              <span className="block text-lg font-bold text-ink">{training.duration}</span>
              Dauer
            </p>
          </div>
          <p className="flex items-start gap-2 rounded-lg bg-white p-3 text-sm text-slate-700">
            <BookOpen size={17} className="mt-0.5 text-health-teal" />
            {lessons.length} Videomodule · ca. {totalVideoMinutes} Minuten Vorschauinhalt
          </p>
          <p className="flex items-start gap-2 rounded-lg bg-white p-3 text-sm text-slate-700">
            <FileText size={17} className="mt-0.5 text-health-teal" />
            Begleittexte, Lernziele und Transferfragen sind in der Detailansicht vorbereitet.
          </p>
          <div>
            {training.requiresApproval ? (
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-amber-900">
                <ShieldCheck size={17} className="mt-0.5" />
                {processNote}
              </p>
            ) : (
              <p className="rounded-lg bg-mist-green p-3 text-sm text-teal-900">{processNote}</p>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-health-teal">Schulungsvorschau</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Video-Lernpfad</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <article className="overflow-hidden rounded-lg border border-slate-200 bg-ink text-white">
            <div className="relative aspect-video bg-[radial-gradient(circle_at_25%_20%,rgba(45,212,191,0.35),transparent_35%),linear-gradient(135deg,#0f172a,#164e63)]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur">
                  <PlayCircle size={44} className="text-white" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-ink from-[0%] via-ink/90 via-[34%] to-transparent to-[72%] p-5">
                <div className="w-full">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-100">Startmodul</p>
                  <h3 className="mt-1 text-xl font-bold">{lessons[0].title.replace(/^\d+\.\s/, "")}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">{lessons[0].text}</p>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-3">
            {lessons.map((lesson, index) => (
              <article
                key={lesson.title}
                className={`rounded-lg border p-4 ${
                  index === 0 ? "border-teal-200 bg-mist-green" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-ink">{lesson.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{lesson.text}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                    <Clock3 size={13} />
                    {lesson.duration}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

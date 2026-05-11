import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartPulse,
  HelpCircle,
  MessageCircle,
  Minimize2,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import avatarImage from "../assets/avaAvatar.js";
import { assistantSuggestions, generateAssistantResponse } from "../data/assistant.js";

const createInitialMessages = (currentPoints) => [
  {
    from: "assistant",
    ...generateAssistantResponse("hallo", { currentPoints })
  }
];

const createQuickTopics = (currentPoints) => [
  {
    label: "BeWell",
    message: {
      from: "assistant",
      mood: "careful",
      title: "BeWell bündelt deine Gesundheitsangebote.",
      text:
        "Hier findest du Check-ups, Beratung, Prävention, Bewegung und buchbare Termine. Ich kann dich direkt zur BeWell-Übersicht führen.",
      actions: [
        { label: "BeWell öffnen", to: "/bewell" },
        { label: "Check-up ansehen", to: "/bewell/vorsorge-check" }
      ],
      prompts: ["Welche Gesundheitsangebote gibt es?", "Kann ich einen Check-up buchen?"]
    }
  },
  {
    label: "Punkte",
    message: {
      from: "assistant",
      mood: "route",
      title: `Du hast aktuell ${currentPoints} Punkte.`,
      text:
        "Im Bereich Schulungen & Punkte siehst du Kurse, Genehmigungen, Ligen und Leaderboards. Beim Start einer Schulung werden die hinterlegten Punkte für diese Sitzung deinem Profil gutgeschrieben.",
      actions: [
        { label: "Schulungen & Punkte öffnen", to: "/schulungen" },
        { label: "Punkte im Profil einlösen", to: "/profil" }
      ],
      prompts: ["Wie funktioniert das Punktesystem?", "Welche Belohnungen gibt es?"]
    }
  },
  {
    label: "Rabatte",
    message: {
      from: "assistant",
      mood: "supportive",
      title: "Ermäßigungen und Rabattaktionen findest du in Säule 3.",
      text:
        "Dort kannst du Angebote aus Reisen, Kultur, Fitness, Ernährung, Restaurants, Weiterbildung und regionalen Partnern entdecken.",
      actions: [
        { label: "Ermäßigungen öffnen", to: "/ermaessigungen" },
        { label: "Regionale Angebote ansehen", to: "/ermaessigungen" }
      ],
      prompts: ["Welche Rabatte gibt es?", "Gibt es Fitness-Vorteile?"]
    }
  }
];

const moodStyles = {
  welcome: {
    ring: "ring-teal-100",
    badge: "bg-sun-amber text-ink",
    icon: Sparkles
  },
  supportive: {
    ring: "ring-green-100",
    badge: "bg-mist-green text-teal-800",
    icon: HeartPulse
  },
  clarify: {
    ring: "ring-amber-100",
    badge: "bg-amber-50 text-amber-800",
    icon: HelpCircle
  },
  careful: {
    ring: "ring-sky-100",
    badge: "bg-soft-blue text-sky-800",
    icon: ShieldCheck
  },
  route: {
    ring: "ring-rose-100",
    badge: "bg-rose-50 text-rose-800",
    icon: ArrowRight
  }
};

function AssistantAvatar({ mood = "supportive", size = "md" }) {
  const style = moodStyles[mood] ?? moodStyles.supportive;
  const Icon = style.icon;
  const sizes = {
    sm: "h-11 w-11",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <span
      className={`${sizes[size]} relative block shrink-0 rounded-full bg-gradient-to-br from-teal-200 via-sky-200 to-violet-200 p-0.5 shadow-sm ring-4 ${style.ring}`}
    >
      <img
        src={avatarImage}
        alt="Ava, digitaler Benefit-Assistent"
        className="h-full w-full rounded-full object-cover object-[50%_38%]"
      />
      <span className={`absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full ${style.badge}`}>
        <Icon size={13} />
      </span>
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <AssistantAvatar mood="supportive" size="sm" />
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-2 w-2 animate-pulse rounded-full bg-health-teal" />
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ message, onSuggestion }) {
  return (
    <div className="flex items-start gap-3">
      <AssistantAvatar mood={message.mood} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-bold text-ink">{message.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{message.text}</p>

          {message.highlights?.length ? (
            <div className="mt-4 grid gap-2">
              {message.highlights.map((item) => (
                <div key={`${item.label}-${item.title}`} className="rounded-lg bg-slate-50 p-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-health-teal">
                    {item.label}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {message.actions?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {message.actions.map((action) => (
                <Link
                  key={`${action.label}-${action.to}`}
                  to={action.to}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-mist-green px-3 py-2 text-xs font-bold text-teal-800 transition hover:bg-teal-100"
                >
                  {action.label}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {message.prompts?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.prompts.slice(0, 3).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSuggestion(prompt)}
                className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold leading-5 text-slate-600 transition hover:border-teal-200 hover:text-health-teal"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[82%] rounded-lg bg-health-teal px-3 py-2 text-sm leading-6 text-white shadow-sm">
        {text}
      </p>
    </div>
  );
}

export default function ChatWidget({ open, onOpenChange, currentPoints }) {
  const initialMessages = useMemo(() => createInitialMessages(currentPoints), [currentPoints]);
  const quickTopics = useMemo(() => createQuickTopics(currentPoints), [currentPoints]);
  const [messages, setMessages] = useState(() => initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  const visibleSuggestions = useMemo(() => {
    const lastAssistantMessage = [...messages].reverse().find((message) => message.from === "assistant");
    return lastAssistantMessage?.prompts?.length ? lastAssistantMessage.prompts : assistantSuggestions;
  }, [messages]);

  useEffect(() => {
    if (open) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, typing]);

  useEffect(
    () => () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
    },
    []
  );

  const ask = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }

    setMessages((current) => [...current, { from: "user", text: cleanText }]);
    setInput("");
    setTyping(true);
    onOpenChange(true);

    typingTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          from: "assistant",
          ...generateAssistantResponse(cleanText, { currentPoints })
        }
      ]);
      setTyping(false);
    }, 420);
  };

  const openQuickTopic = (topic) => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }

    setTyping(false);
    setMessages((current) => [...current, topic.message]);
    onOpenChange(true);
  };

  const resetChat = () => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }
    setTyping(false);
    setMessages(initialMessages);
    onOpenChange(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <section className="mb-3 flex h-[min(720px,calc(100vh-6rem))] w-[calc(100vw-2rem)] max-w-[440px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
          <header className="bg-ink p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <AssistantAvatar mood="welcome" size="lg" />
                <div>
                  <h2 className="text-base font-bold">Ava, dein Benefit-Assistent</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-200">
                    Führt dich durch BeWell, Punkte, Rabatte und Communities.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Chat minimieren"
                  onClick={() => onOpenChange(false)}
                  className="focus-ring grid h-8 w-8 place-items-center rounded-lg text-slate-200 hover:bg-white/10"
                >
                  <Minimize2 size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Chat schließen"
                  onClick={resetChat}
                  className="focus-ring grid h-8 w-8 place-items-center rounded-lg text-slate-200 hover:bg-white/10"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-200">
              {quickTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => openQuickTopic(topic)}
                  className="focus-ring rounded-lg bg-white/10 px-2 py-2 transition hover:bg-white/20 hover:text-white"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50 px-4 pb-4 pt-6">
            <div className="grid gap-4">
              {messages.map((message, index) =>
                message.from === "user" ? (
                  <UserMessage key={`user-${index}-${message.text}`} text={message.text} />
                ) : (
                  <AssistantMessage
                    key={`assistant-${index}-${message.title}`}
                    message={message}
                    onSuggestion={ask}
                  />
                )
              )}
              {typing ? <TypingIndicator /> : null}
              <div ref={messageEndRef} />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {visibleSuggestions.slice(0, 4).map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="focus-ring shrink-0 rounded-lg bg-mist-green px-3 py-2 text-left text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
                >
                  {question}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2"
            >
              <label className="sr-only" htmlFor="benefit-chat-input">
                Frage eingeben
              </label>
              <input
                id="benefit-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Frage zu BeWell, Punkten oder Rabatten"
                className="focus-ring min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                aria-label="Nachricht senden"
                className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-health-teal text-white transition hover:bg-teal-700"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      {!open ? (
        <button
          type="button"
          aria-label="Chat öffnen"
          data-testid="floating-chat-button"
          onClick={() => onOpenChange(true)}
          className="focus-ring inline-flex h-16 w-16 items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-ink shadow-2xl ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50 sm:h-auto sm:w-auto sm:rounded-lg sm:px-3 sm:py-2"
        >
          <AssistantAvatar mood="welcome" size="sm" />
          <span className="hidden pr-1 sm:inline">Ava fragen</span>
          <MessageCircle size={17} className="hidden text-health-teal sm:block" />
        </button>
      ) : null}
    </div>
  );
}

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartPulse, LogOut, Menu, MessageCircle, Search, UserRound, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "BeWell", to: "/bewell" },
  { label: "Schulungen & Punkte", to: "/schulungen" },
  { label: "Ermäßigungen", to: "/ermaessigungen" },
  { label: "Communities", to: "/communities" },
  { label: "Profil", to: "/profil" }
];

export default function Navbar({ authUser, onChatOpen, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-health-teal text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-100 hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-paper/90 backdrop-blur-xl">
      <nav className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="focus-ring flex items-center gap-3 rounded-lg" onClick={() => setMobileOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-health-teal text-white shadow-sm">
            <HeartPulse size={22} />
          </span>
          <span>
            <span className="block text-base font-bold leading-tight">Benefit Hub</span>
            <span className="block text-xs text-slate-500">Gesundheit & Mitarbeitende</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onChatOpen}
            className="focus-ring ml-2 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <MessageCircle size={17} />
            KI-Assistent
          </button>
          <div className="ml-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <UserRound size={16} className="text-health-teal" />
            {authUser?.name ?? "Gast"}
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-ink"
            aria-label="Abmelden"
            title="Abmelden"
          >
            <LogOut size={17} />
          </button>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm md:flex xl:hidden">
          <Search size={16} />
          <span>Benefits finden</span>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
          onClick={() => setMobileOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-ink shadow-sm xl:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-paper xl:hidden">
          <div className="page-shell grid gap-2 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onChatOpen();
              }}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle size={17} />
              KI-Assistent öffnen
            </button>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <span className="inline-flex items-center gap-2">
                <UserRound size={17} className="text-health-teal" />
                Angemeldet als {authUser?.name ?? "Gast"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
                className="focus-ring inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-ink"
              >
                <LogOut size={16} />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

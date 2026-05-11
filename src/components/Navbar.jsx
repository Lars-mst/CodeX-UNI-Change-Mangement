import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartPulse, LogOut, Menu, MessageCircle, Search, X } from "lucide-react";
import profileImage from "../assets/karin-mueller-profile.jpg";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "BeWell", to: "/bewell" },
  { label: "Schulungen & Punkte", to: "/schulungen" },
  { label: "Ermäßigungen", to: "/ermaessigungen" },
  { label: "Communities", to: "/communities" },
  { label: "Profil", to: "/profil" }
];

const profileFrame = "conic-gradient(from 20deg, #92400e, #facc15, #fef3c7, #d97706, #92400e)";

function ProfileNavAvatar() {
  return (
    <span className="ml-1 rounded-full p-0.5 shadow-sm" style={{ background: profileFrame }}>
      <img
        src={profileImage}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 rounded-full border border-white object-cover object-[50%_35%]"
      />
    </span>
  );
}

export default function Navbar({ onChatOpen, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
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
              <span>{item.label}</span>
              {item.to === "/profil" ? <ProfileNavAvatar /> : null}
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
                <span>{item.label}</span>
                {item.to === "/profil" ? <ProfileNavAvatar /> : null}
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
            <div className="flex items-center justify-end gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700">
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

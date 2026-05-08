import { useState } from "react";
import { HeartPulse, LockKeyhole, UserRound } from "lucide-react";

const guestCredentials = {
  username: "Gast",
  password: "Gast"
};

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("Gast");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === guestCredentials.username && password === guestCredentials.password) {
      setError("");
      onLogin({ name: "Gast", role: "Gastzugang" });
      return;
    }

    setError("Benutzername oder Passwort ist nicht korrekt.");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-10">
      <section className="w-full max-w-[440px] rounded-lg border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-health-teal text-white shadow-sm">
            <HeartPulse size={25} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-health-teal">Benefit Hub</p>
            <h1 className="text-2xl font-bold text-ink">Willkommen zurück</h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          Melde dich mit dem Gastzugang an, um das 4-Säulen-Anreizsystem zu öffnen.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            Benutzername
            <span className="focus-within:ring-health-teal flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:ring-2">
              <UserRound size={18} className="text-slate-400" />
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="w-full bg-transparent text-sm outline-none"
              />
            </span>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-ink">
            Passwort
            <span className="focus-within:ring-health-teal flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:ring-2">
              <LockKeyhole size={18} className="text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Passwort eingeben"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </span>
          </label>

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">{error}</p>
          ) : null}

          <button
            type="submit"
            className="focus-ring mt-2 rounded-lg bg-health-teal px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            Einloggen
          </button>
        </form>

      </section>
    </main>
  );
}

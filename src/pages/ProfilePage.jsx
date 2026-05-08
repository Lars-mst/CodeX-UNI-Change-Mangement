import { Award, CalendarDays, Gift, Heart, Handshake, Users } from "lucide-react";
import ProgressBar from "../components/ProgressBar.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { pointsProfile, userProfile } from "../data/platform.js";

const profileSections = [
  { title: "Gebuchte Gesundheitsangebote", items: userProfile.bookedHealthOffers, icon: CalendarDays },
  { title: "Abgeschlossene Schulungen", items: userProfile.completedTrainings, icon: Award },
  { title: "Freigeschaltete Belohnungen", items: userProfile.unlockedRewards, icon: Gift },
  { title: "Eingelöste Benefits", items: userProfile.redeemedBenefits, icon: Heart },
  { title: "Favorisierte Rabattaktionen", items: userProfile.favoriteBenefits, icon: Heart },
  { title: "Communities", items: userProfile.communities, icon: Users },
  { title: "Tandem-Termine", items: userProfile.tandemAppointments, icon: Handshake },
  { title: "Events & Company-Ausflüge", items: [...userProfile.bookedEvents, ...userProfile.bookedTrips], icon: CalendarDays }
];

export default function ProfilePage() {
  return (
    <section className="page-shell section-pad">
      <SectionHeader
        eyebrow="Profil"
        title="Deine Aktivitäten im Benefit Hub"
        text="Ein einfacher persönlicher Überblick, vorbereitet für spätere Login-, HR- und Kalenderanbindungen."
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="grid h-16 w-16 place-items-center rounded-lg bg-mist-green text-2xl font-bold text-health-teal">
            {userProfile.name.split(" ").map((part) => part[0]).join("")}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink">{userProfile.name}</h1>
          <p className="mt-1 text-slate-600">{userProfile.department}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {userProfile.interests.map((interest) => (
              <span key={interest} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {interest}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <ProgressBar value={userProfile.points} max={pointsProfile.yearlyGoal} label="Punkte" />
          </div>
        </aside>

        <div className="grid gap-5 md:grid-cols-2">
          {profileSections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-mist-green text-health-teal">
                    <Icon size={20} />
                  </span>
                  <h2 className="font-bold text-ink">{section.title}</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {section.items.map((item) => (
                    <p key={item} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

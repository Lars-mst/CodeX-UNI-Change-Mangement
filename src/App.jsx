import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import BenefitsPage from "./pages/BenefitsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import HealthPage from "./pages/HealthPage.jsx";
import HealthDetailPage from "./pages/HealthDetailPage.jsx";
import TrainingPage from "./pages/TrainingPage.jsx";
import TrainingDetailPage from "./pages/TrainingDetailPage.jsx";
import CommunitiesPage from "./pages/CommunitiesPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { pointsProfile } from "./data/platform.js";

const authStorageKey = "benefit-hub-auth-user";
const sessionProgressStorageKey = "benefit-hub-session-progress";

function readSessionProgress() {
  try {
    const storedProgress = JSON.parse(sessionStorage.getItem(sessionProgressStorageKey) ?? "null");

    return {
      points: Number.isFinite(storedProgress?.points) ? storedProgress.points : pointsProfile.current,
      creditedTrainingSlugs: Array.isArray(storedProgress?.creditedTrainingSlugs)
        ? storedProgress.creditedTrainingSlugs
        : []
    };
  } catch {
    return {
      points: pointsProfile.current,
      creditedTrainingSlugs: []
    };
  }
}

function saveSessionProgress(progress) {
  try {
    sessionStorage.setItem(sessionProgressStorageKey, JSON.stringify(progress));
  } catch {
    // Session storage may be unavailable in private or restricted browser contexts.
  }
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(readSessionProgress);
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem(authStorageKey) ?? "null");
      return storedUser ? { ...storedUser, name: "Karin Müller" } : null;
    } catch {
      return null;
    }
  });

  const handleTrainingStarted = (training) => {
    if (!training?.slug || !Number.isFinite(training.points)) return;

    setSessionProgress((currentProgress) => {
      if (currentProgress.creditedTrainingSlugs.includes(training.slug)) {
        return currentProgress;
      }

      const nextProgress = {
        points: currentProgress.points + training.points,
        creditedTrainingSlugs: [...currentProgress.creditedTrainingSlugs, training.slug]
      };

      saveSessionProgress(nextProgress);
      return nextProgress;
    });
  };

  const handleLogin = (user) => {
    localStorage.setItem(authStorageKey, JSON.stringify(user));
    setAuthUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem(authStorageKey);
    try {
      sessionStorage.removeItem(sessionProgressStorageKey);
    } catch {
      // Session storage may be unavailable in private or restricted browser contexts.
    }
    setSessionProgress({
      points: pointsProfile.current,
      creditedTrainingSlugs: []
    });
    setChatOpen(false);
    setAuthUser(null);
  };

  if (!authUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen text-ink">
      <ScrollToTop />
      <Navbar authUser={authUser} onChatOpen={() => setChatOpen(true)} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage onChatOpen={() => setChatOpen(true)} currentPoints={sessionProgress.points} />}
          />
          <Route path="/ermaessigungen" element={<BenefitsPage />} />
          <Route path="/ermaessigungen/:slug" element={<CategoryPage />} />
          <Route path="/bewell" element={<HealthPage />} />
          <Route path="/bewell/:slug" element={<HealthDetailPage />} />
          <Route path="/schulungen" element={<TrainingPage currentPoints={sessionProgress.points} />} />
          <Route
            path="/schulungen/:slug"
            element={
              <TrainingDetailPage
                creditedTrainingSlugs={sessionProgress.creditedTrainingSlugs}
                onTrainingStarted={handleTrainingStarted}
              />
            }
          />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/communities/events/:slug" element={<EventDetailPage />} />
          <Route path="/communities/ausfluege/:slug" element={<EventDetailPage type="trip" />} />
          <Route
            path="/profil"
            element={
              <ProfilePage
                currentPoints={sessionProgress.points}
                creditedTrainingSlugs={sessionProgress.creditedTrainingSlugs}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} currentPoints={sessionProgress.points} />
    </div>
  );
}

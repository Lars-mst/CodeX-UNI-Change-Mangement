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

const authStorageKey = "benefit-hub-auth-user";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(authStorageKey) ?? "null");
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    localStorage.setItem(authStorageKey, JSON.stringify(user));
    setAuthUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem(authStorageKey);
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
          <Route path="/" element={<HomePage onChatOpen={() => setChatOpen(true)} />} />
          <Route path="/ermaessigungen" element={<BenefitsPage />} />
          <Route path="/ermaessigungen/:slug" element={<CategoryPage />} />
          <Route path="/bewell" element={<HealthPage />} />
          <Route path="/bewell/:slug" element={<HealthDetailPage />} />
          <Route path="/schulungen" element={<TrainingPage />} />
          <Route path="/schulungen/:slug" element={<TrainingDetailPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/communities/events/:slug" element={<EventDetailPage />} />
          <Route path="/communities/ausfluege/:slug" element={<EventDetailPage type="trip" />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}

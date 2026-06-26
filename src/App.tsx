import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ClubsProvider } from './context/ClubsContext';
import { UserPrefsProvider } from './context/UserPrefsContext';
import { BottomNav } from './components/layout/BottomNav';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ClubProfilePage } from './pages/ClubProfilePage';
import { CreateClubPage, EditClubPage } from './pages/ClubFormPage';
import { SavedPage } from './pages/SavedPage';

function AppRoutes() {
  const location = useLocation();
  const hideNav = /^\/club\/[^/]+$/.test(location.pathname);

  return (
    <>
      <OnboardingModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreateClubPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile" element={<SavedPage />} />
        <Route path="/club/:id" element={<ClubProfilePage />} />
        <Route path="/club/:id/edit" element={<EditClubPage />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserPrefsProvider>
        <ClubsProvider>
          <AppRoutes />
        </ClubsProvider>
      </UserPrefsProvider>
    </BrowserRouter>
  );
}

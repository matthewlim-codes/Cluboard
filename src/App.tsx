import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ClubsProvider } from './context/ClubsContext';
import { BottomNav } from './components/layout/BottomNav';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ClubProfilePage } from './pages/ClubProfilePage';
import { CreateClubPage, EditClubPage } from './pages/ClubFormPage';
import { ProfilePage } from './pages/ProfilePage';

function AppRoutes() {
  const location = useLocation();
  const hideNav = /^\/club\/[^/]+$/.test(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreateClubPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
      <ClubsProvider>
        <AppRoutes />
      </ClubsProvider>
    </BrowserRouter>
  );
}

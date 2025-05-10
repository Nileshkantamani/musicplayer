import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/ui/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Browse } from './pages/Browse';
import { Library } from './pages/Library';
import Register from './pages/Register';
import { PlaylistDetail } from './pages/PlaylistDetail';
import { LikedSongs } from './pages/LikedSongs';
import { RecentlyPlayed } from './pages/RecentlyPlayed';
import { GenreDetail } from './pages/GenreDetail';
import { ArjitSingh } from './pages/ArjitSingh';
import { HoneySingh } from './pages/HoneySingh';
import { ShayesSoyal } from './pages/ShayesSoyal';
import { UditNarayan } from './pages/UditNarayan';
import { ARRahman } from './pages/ARRahman';
import { SonuNigam } from './pages/SonuNigam';
import { AllArtists } from './pages/AllArtists';
import { FocusTime } from './pages/FocusTime';
import { ChillEvening } from './pages/ChillEvening';
import { WorkoutMix } from './pages/WorkoutMix';
import { YourMix1 } from './pages/YourMix1';
import { HindiAlbums } from './pages/HindiAlbums';
import { HindiCollection } from './pages/HindiCollection';
import { AlbumCategories } from './pages/AlbumCategories';

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/login" 
                element={<Login />} 
              />
              
              <Route 
                path="/register" 
                element={<Register />} 
              />
              
              {/* Protected routes with Layout */}
              <Route 
                path="/" 
                element={
                  <Layout requireAuth>
                    <Home />
                  </Layout>
                } 
              />

              <Route 
                path="/your-mix-1" 
                element={
                  <Layout requireAuth>
                    <YourMix1 />
                  </Layout>
                } 
              />

              <Route 
                path="/focus" 
                element={
                  <Layout requireAuth>
                    <FocusTime />
                  </Layout>
                } 
              />

              <Route 
                path="/chill-evening" 
                element={
                  <Layout requireAuth>
                    <ChillEvening />
                  </Layout>
                } 
              />

              <Route 
                path="/workout-mix" 
                element={
                  <Layout requireAuth>
                    <WorkoutMix />
                  </Layout>
                } 
              />
              
              <Route 
                path="/browse" 
                element={
                  <Layout requireAuth>
                    <Browse />
                  </Layout>
                } 
              />
              
              <Route 
                path="/library" 
                element={
                  <Layout requireAuth>
                    <Library />
                  </Layout>
                } 
              />
              
              <Route 
                path="/liked-songs" 
                element={
                  <Layout requireAuth>
                    <LikedSongs />
                  </Layout>
                } 
              />
              
              <Route 
                path="/recently-played" 
                element={
                  <Layout requireAuth>
                    <RecentlyPlayed />
                  </Layout>
                } 
              />
              
              <Route 
                path="/genre/:genreId" 
                element={
                  <Layout requireAuth>
                    <GenreDetail />
                  </Layout>
                } 
              />
              
              <Route 
                path="/playlist/:playlistId" 
                element={
                  <Layout requireAuth>
                    <PlaylistDetail />
                  </Layout>
                } 
              />

              <Route 
                path="/artists" 
                element={
                  <Layout requireAuth>
                    <AllArtists />
                  </Layout>
                } 
              />
              
              <Route 
                path="/artist/arijit-singh" 
                element={
                  <Layout requireAuth>
                    <ArjitSingh />
                  </Layout>
                } 
              />
              
              <Route 
                path="/artist/honey-singh" 
                element={
                  <Layout requireAuth>
                    <HoneySingh />
                  </Layout>
                } 
              />
              
              <Route 
                path="/artist/shrey-singhal" 
                element={
                  <Layout requireAuth>
                    <ShayesSoyal />
                  </Layout>
                } 
              />

              <Route 
                path="/artist/udit-narayan" 
                element={
                  <Layout requireAuth>
                    <UditNarayan />
                  </Layout>
                } 
              />

              <Route 
                path="/artist/ar-rahman" 
                element={
                  <Layout requireAuth>
                    <ARRahman />
                  </Layout>
                } 
              />

              <Route 
                path="/artist/sonu-nigam" 
                element={
                  <Layout requireAuth>
                    <SonuNigam />
                  </Layout>
                } 
              />
              
              <Route 
                path="/hindi-albums" 
                element={
                  <Layout requireAuth>
                    <HindiAlbums />
                  </Layout>
                } 
              />
              
              <Route 
                path="/hindi-collection/:collectionId" 
                element={
                  <Layout requireAuth>
                    <HindiCollection />
                  </Layout>
                } 
              />
              
              <Route 
                path="/album-categories" 
                element={
                  <Layout requireAuth>
                    <AlbumCategories />
                  </Layout>
                } 
              />
              
              {/* Default route - redirect to home */}
              <Route 
                path="*" 
                element={
                  <Layout requireAuth>
                    <Home />
                  </Layout>
                } 
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;

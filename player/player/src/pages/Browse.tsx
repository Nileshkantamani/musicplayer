import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, MusicalNoteIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FireIcon, SparklesIcon, PlayIcon } from '@heroicons/react/24/solid';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Browse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { queue } = usePlayer();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Filter tracks based on search term
  const filteredTracks = queue.filter(
    track => 
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.album.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Categories for browse section
  const categories = [
    { id: 'pop', name: 'Pop', color: 'from-pink-500 to-rose-600', icon: '🎵' },
    { id: 'rock', name: 'Rock', color: 'from-blue-500 to-indigo-700', icon: '🎸' },
    { id: 'hip-hop', name: 'Hip-Hop', color: 'from-yellow-500 to-amber-700', icon: '🎤' },
    { id: 'indie', name: 'Indie', color: 'from-purple-500 to-purple-800', icon: '🪕' },
    { id: 'electronic', name: 'Electronic', color: 'from-cyan-500 to-blue-600', icon: '🎧' },
    { id: 'jazz', name: 'Jazz', color: 'from-emerald-500 to-teal-800', icon: '🎷' },
    { id: 'rnb', name: 'R&B', color: 'from-red-500 to-red-800', icon: '🎙️' },
    { id: 'classical', name: 'Classical', color: 'from-slate-500 to-slate-800', icon: '🎻' }
  ];
  
  // Get popular artists for the discovery section
  const popularArtists = Array.from(new Set(queue.map(track => track.artist))).slice(0, 6);
  
  // Add particle animation effect
  const [particles, setParticles] = useState<{ x: number, y: number, size: number, speed: number }[]>([]);
  
  useEffect(() => {
    // Create particles for background effect
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.3
    }));
    
    setParticles(newParticles);
  }, []);
  
  // Filter tracks by selected genre if any
  const genreFilteredTracks = selectedGenre 
    ? queue.filter(track => {
        // Safely check for genre property, treating it as potentially undefined
        const trackGenre = (track as any).genre;
        return trackGenre && trackGenre.toLowerCase() === selectedGenre.toLowerCase();
      }).slice(0, 8)
    : queue.slice(0, 8);
  
  return (
    <div className="pb-8 px-2 sm:px-0 fade-in">
      {/* Hero section */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-800 via-primary-800 to-purple-900 opacity-95"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, index) => (
            <div 
              key={index} 
              className="absolute rounded-full bg-white/30 backdrop-blur-sm"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                animation: `float ${10 / particle.speed}s infinite linear`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-16 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 slide-up">
                Discover New Music
              </h1>
              <p className="text-white/80 mt-3 text-sm sm:text-base max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.1s' }}>
                Explore trending tracks, browse by genre, or search for your favorite artists and songs
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative mx-auto max-w-2xl slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-white/60
                         focus:ring-2 focus:ring-white/30 focus:border-transparent shadow-xl"
                placeholder="Search for songs, artists or albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {searchTerm ? (
        // Search Results
        <div className="fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
              <MagnifyingGlassIcon className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Results for "{searchTerm}"
            </h2>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white"
            >
              Clear Search
            </button>
          </div>
          
          {filteredTracks.length === 0 ? (
            <div className="bg-white/50 dark:bg-dark-light/50 backdrop-blur-sm rounded-xl p-8 text-center border border-secondary-200/50 dark:border-secondary-700/30">
              <div className="w-16 h-16 mx-auto bg-secondary-100 dark:bg-secondary-800/50 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-secondary-400" />
              </div>
              <p className="text-secondary-600 dark:text-secondary-400 mb-2">
                No results found for "{searchTerm}"
              </p>
              <p className="text-sm text-secondary-500 dark:text-secondary-500">
                Try searching for something else or browse categories below
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
              {filteredTracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="slide-in hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <TrackCard
                    id={track.id}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    coverArt={track.coverArt}
                    audioSrc={track.audioSrc}
                    duration={track.duration}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Browse Categories
        <>
          {/* Popular Artists - New Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
                <FireIcon className="w-6 h-6 mr-2 text-orange-500" />
                Popular Artists
              </h2>
              <Link
                to="/artists"
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group"
              >
                View All <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="flex overflow-x-auto pb-4 space-x-5 no-scrollbar">
              {popularArtists.map((artist, index) => (
                <div 
                  key={artist}
                  className="flex-shrink-0 flex flex-col items-center slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden 
                              border-2 border-primary-500/40 shadow-lg hover:shadow-xl 
                              transform hover:scale-105 transition-all duration-300 mb-3 bg-secondary-100 dark:bg-secondary-800 group relative">
                    <img 
                      src={`https://picsum.photos/seed/${artist.replace(/\s/g, '')}/200`} 
                      alt={artist}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <span className="font-medium text-sm md:text-base text-secondary-900 dark:text-white text-center">{artist}</span>
                  <span className="text-xs text-secondary-500 dark:text-secondary-400">Artist</span>
                </div>
              ))}
            </div>
          </section>
        
          {/* Categories with enhanced UI */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
                <MusicalNoteIcon className="w-6 h-6 mr-2 text-primary-600" />
                Browse Genres
              </h2>
              <div className="flex gap-2">
                {selectedGenre && (
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className="text-sm text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-200 px-2 py-1"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 mb-6">
              {categories.map((category, index) => (
                <button 
                  key={category.id} 
                  onClick={() => setSelectedGenre(category.id === selectedGenre ? null : category.id)}
                  className={`relative rounded-xl overflow-hidden aspect-video group scale-in ${
                    selectedGenre === category.id ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl md:text-3xl mb-1">{category.icon}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
          
          {/* Genre-filtered or New Releases */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-amber-500" />
                {selectedGenre ? `${categories.find(c => c.id === selectedGenre)?.name} Tracks` : 'New Releases'}
              </h2>
              <Link 
                to={selectedGenre ? `/genre/${selectedGenre}` : '/new-releases'}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group"
              >
                View All <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genreFilteredTracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className="scale-in group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <TrackCard
                      id={track.id}
                      title={track.title}
                      artist={track.artist}
                      album={track.album}
                      coverArt={track.coverArt}
                      audioSrc={track.audioSrc}
                      duration={track.duration}
                      variant="grid"
                      showOptions={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 right-2 bg-primary-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <PlayIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Trending Now */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
                <FireIcon className="w-6 h-6 mr-2 text-red-500" />
                Trending Now
              </h2>
              <Button className="text-sm bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700
                             text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full border border-secondary-200 dark:border-secondary-700">
                Play All
              </Button>
            </div>
            
            <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
              {queue.slice(0, 5).map((track, index) => (
                <div 
                  key={track.id}
                  className="slide-in hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <TrackCard
                    id={track.id}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    coverArt={track.coverArt}
                    audioSrc={track.audioSrc}
                    duration={track.duration}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
      
      {/* Add @keyframes for the floating particles */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}; 
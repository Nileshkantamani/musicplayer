import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TrackCard } from '../components/cards/TrackCard';
import { usePlayer } from '../context/PlayerContext';
import { Button } from '../components/ui/Button';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

export const GenreDetail: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const { queue, play } = usePlayer();
  const headerRef = useRef<HTMLDivElement>(null);
  
  const genres = {
    'rock': { 
      name: 'Rock', 
      description: 'Rock music is characterized by a strong beat, simple chord structure, and often played loud with electric guitars.',
      color: 'from-red-700 to-orange-500',
      icon: '🎸'
    },
    'electronic': { 
      name: 'Electronic', 
      description: 'Electronic music is produced with electronic technology, often featuring synthesized sounds and electronic instruments.',
      color: 'from-purple-700 to-blue-500',
      icon: '🎧'
    },
    'jazz': { 
      name: 'Jazz', 
      description: 'Jazz is characterized by swing and blue notes, complex chords, and improvisation.',
      color: 'from-yellow-600 to-amber-500',
      icon: '🎷'
    },
    'classical': { 
      name: 'Classical', 
      description: 'Classical music is art music produced or rooted in the traditions of Western culture.',
      color: 'from-blue-700 to-cyan-500',
      icon: '🎻'
    },
    'hip-hop': { 
      name: 'Hip Hop', 
      description: 'Hip hop music consists of a stylized rhythmic music that often accompanies rapping.',
      color: 'from-emerald-700 to-green-500',
      icon: '🎤'
    }
  };
  
  const currentGenre = genreId ? genres[genreId as keyof typeof genres] : null;
  
  // Handle scroll effects for the header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.min(scrollPosition / 200, 0.8);
        headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        
        // Parallax effect
        if (scrollPosition < 400) {
          const scale = 1 + (scrollPosition * 0.0005);
          const translateY = scrollPosition * 0.2;
          const coverArtEl = headerRef.current.querySelector('.cover-art') as HTMLElement;
          if (coverArtEl) {
            coverArtEl.style.transform = `scale(${scale}) translateY(-${translateY}px)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const playGenreTracks = () => {
    if (queue.length > 0) {
      play(queue[0]);
    }
  };
  
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  if (!currentGenre) {
    return <div className="p-4 text-center">Genre not found</div>;
  }
  
  // Get a subset of tracks for this genre (simulated)
  const genreTracks = queue.slice(0, 10);
  
  return (
    <div className="pb-8 fade-in">
      <div 
        ref={headerRef}
        className={`bg-gradient-to-r ${currentGenre.color} rounded-xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center md:items-end gap-4 sm:gap-6 overflow-hidden relative`}
        style={{ minHeight: '180px', maxHeight: '280px' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="sound-pattern" patternUnits="userSpaceOnUse" width="10" height="20">
                <path d="M0,10 L2,5 L4,12 L6,3 L8,15 L10,8" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sound-pattern)" />
          </svg>
        </div>
        
        <div className="w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center z-10 cover-art overflow-hidden transform transition-transform duration-700 hover:scale-105">
          <span className="text-4xl sm:text-6xl">{currentGenre.icon}</span>
        </div>
        
        <div className="flex-1 z-10">
          <div className="slide-up text-center md:text-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-white/80 text-xs sm:text-sm font-medium">Genre</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1 mb-1 sm:mb-2">{currentGenre.name}</h2>
            <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">{currentGenre.description}</p>
          </div>
          <div className="flex justify-center md:justify-start space-x-2 sm:space-x-3 slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={playGenreTracks}
              disabled={genreTracks.length === 0}
              className="bg-white hover:bg-white/90 text-primary-900 hover:shadow-lg transform hover:-translate-y-1 transition-all text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
            >
              Play All
            </Button>
            
            <div className="relative">
              <Button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-transparent border border-white/30 text-white hover:bg-white/10 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
              >
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </Button>
              
              {showDropdown && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-dark-lighter shadow-lg rounded-md py-1 z-50 scale-in"
                >
                  <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                    Add to playlist
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                    Explore similar
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {genreTracks.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-white dark:bg-dark-light rounded-lg shadow-sm scale-in">
          <div className="text-4xl sm:text-6xl mb-4 mx-auto">{currentGenre.icon}</div>
          <h3 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white mb-2">No {currentGenre.name} tracks found</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 px-4 max-w-md mx-auto">
            We couldn't find any {currentGenre.name.toLowerCase()} tracks in our library. Check back later for updates.
          </p>
          <Button className="inline-flex hover:shadow-lg transform hover:-translate-y-1 transition-all">
            Browse Other Genres
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-light rounded-lg overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800 shadow-sm">
            {genreTracks.map((track, index) => (
              <div 
                key={track.id}
                className="slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
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
        </div>
      )}
    </div>
  );
}; 
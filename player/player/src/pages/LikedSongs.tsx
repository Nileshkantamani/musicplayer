import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const LikedSongs: React.FC = () => {
  const { queue, play } = usePlayer();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effects for the header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.min(scrollPosition / 200, 0.8);
        headerRef.current.style.background = `linear-gradient(to right, rgba(147, 51, 234, ${opacity}), rgba(220, 38, 38, ${opacity}))`;
        
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
  
  const playAllLikedSongs = () => {
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
  
  return (
    <div className="pb-8 fade-in">
      <div 
        ref={headerRef}
        className="bg-gradient-to-r from-primary-900 to-primary-600 rounded-xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center md:items-end gap-4 sm:gap-6 overflow-hidden relative"
        style={{ minHeight: '180px', maxHeight: '280px' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heart-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M5,2 C5,1 6,0 7,0 C8,0 9,1 9,2 C9,3 8,4 7,5 L5,7 L3,5 C2,4 1,3 1,2 C1,1 2,0 3,0 C4,0 5,1 5,2 Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heart-pattern)" />
          </svg>
        </div>
        
        <div className="w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0 bg-primary-800 rounded-lg shadow-lg flex items-center justify-center z-10 overflow-hidden cover-art transform transition-transform duration-700 hover:scale-105">
          <HeartIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white/80 pulse-light" />
        </div>
        
        <div className="flex-1 z-10">
          <div className="slide-up text-center md:text-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-white/80 text-xs sm:text-sm font-medium">Playlist</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1 mb-1 sm:mb-2">Liked Songs</h2>
            <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">{queue.length} songs</p>
          </div>
          <div className="flex justify-center md:justify-start space-x-2 sm:space-x-3 slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={playAllLikedSongs}
              disabled={queue.length === 0}
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
                    Download all
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
      
      {queue.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-white dark:bg-dark-light rounded-lg shadow-sm scale-in">
          <HeartIcon className="w-12 h-12 sm:w-16 sm:h-16 text-secondary-300 dark:text-secondary-700 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white mb-2">No liked songs yet</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 px-4 max-w-md mx-auto">
            You haven't liked any songs yet. Start exploring and like songs to build your collection.
          </p>
          <Link to="/browse">
            <Button className="inline-flex hover:shadow-lg transform hover:-translate-y-1 transition-all">
              Discover Music
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-light rounded-lg overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800 shadow-sm">
            {queue.map((track, index) => (
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
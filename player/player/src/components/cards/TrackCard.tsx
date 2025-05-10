import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { EllipsisHorizontalIcon, HeartIcon, ArrowDownTrayIcon, ShareIcon, PlusIcon, QueueListIcon, TrashIcon } from '@heroicons/react/24/outline';
import { usePlayer } from '../../context/PlayerContext';
import { TrackVisualizer } from '../player/TrackVisualizer';

interface TrackCardProps {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
  showOptions?: boolean;
  variant?: 'list' | 'grid';
}

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const TrackCard: React.FC<TrackCardProps> = ({
  id,
  title,
  artist,
  album,
  coverArt,
  audioSrc,
  duration,
  showOptions = true,
  variant = 'list',
}) => {
  const { currentTrack, isPlaying, play, playPause } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isCurrentTrack = currentTrack?.id === id;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      playPause();
    } else {
      play({
        id,
        title,
        artist,
        album: album || '',
        coverArt,
        audioSrc,
        duration,
      });
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Touch event handlers for better mobile experience
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Only trigger if it was a tap, not a scroll
    if (Math.abs(e.changedTouches[0].clientY - touchStartY) < 5) {
      if (isCurrentTrack) {
        playPause();
      } else {
        play({
          id,
          title,
          artist,
          album: album || '',
          coverArt,
          audioSrc,
          duration,
        });
      }
    }
  };
  
  if (variant === 'grid') {
    return (
      <div 
        className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-dark-light hover-scale hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative aspect-square overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={coverArt}
            alt={`${title} by ${artist}`}
            className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isCurrentTrack && isPlaying ? (
              <PauseIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            ) : (
              <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            )}
          </button>
          
          {isCurrentTrack && isPlaying && (
            <div className="absolute bottom-2 right-2">
              <TrackVisualizer isPlaying={true} variant="small" color="text-primary-400" />
            </div>
          )}

          {/* Always visible three-dot menu for grid view */}
          {showOptions && (
            <button
              onClick={toggleDropdown}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-100 hover:bg-black/70 transition-all duration-300"
            >
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>
          )}

          {/* Dropdown menu */}
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute top-10 right-2 w-40 bg-white dark:bg-dark-lighter shadow-lg rounded-md py-1 z-50 scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light"
                onClick={toggleLike}
              >
                <HeartIcon className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'Unlike' : 'Like'}
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                <QueueListIcon className="w-4 h-4 mr-2" />
                Add to queue
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add to playlist
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Download
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900 dark:text-white truncate text-sm sm:text-base">{title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">{artist}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className={`group flex items-center p-2 sm:p-3 rounded-md hover:bg-secondary-100 dark:hover:bg-dark-lighter transition-all duration-200 ${
        isCurrentTrack ? 'bg-secondary-100 dark:bg-dark-lighter border-l-4 border-primary-500' : 'border-l-4 border-transparent'
      } slide-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-4">
        <img
          src={coverArt}
          alt={`${title} by ${artist}`}
          className={`w-full h-full object-cover rounded-md transition-transform duration-500`}
        />
        <button
          onClick={handlePlayClick}
          className={`absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 bg-primary-600/90 rounded-full flex items-center justify-center transition-all duration-200 ${
            isHovered || (isCurrentTrack && isPlaying) || window.innerWidth < 768 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
        >
          {isCurrentTrack && isPlaying ? (
            <PauseIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <PlayIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          )}
        </button>
      </div>
      <div className="flex-grow min-w-0 mr-2">
        <div className="flex items-center">
          <h3 className="font-medium text-secondary-900 dark:text-white truncate text-sm sm:text-base">{title}</h3>
          {isCurrentTrack && isPlaying && (
            <div className="ml-2 hidden sm:block">
              <TrackVisualizer isPlaying={true} variant="small" />
            </div>
          )}
        </div>
        <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate">{artist}</p>
      </div>
      <div className="flex items-center space-x-2 ml-auto">
        <span className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400 hidden xs:inline-block">
          {formatDuration(duration)}
        </span>
        {showOptions && (
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="p-1.5 rounded-full bg-secondary-100 dark:bg-dark-lighter hover:bg-secondary-200 dark:hover:bg-dark-light transition-colors"
            >
              <EllipsisHorizontalIcon className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
            </button>
            
            {/* Mobile-friendly dropdown menu */}
            {showDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 top-full mt-1 w-40 sm:w-48 bg-white dark:bg-dark-lighter shadow-lg rounded-md py-1 z-50 scale-in"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light"
                  onClick={toggleLike}
                >
                  <HeartIcon className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isLiked ? 'Unlike' : 'Like'}
                </button>
                <button className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                  <QueueListIcon className="w-4 h-4 mr-2" />
                  Add to queue
                </button>
                <button className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add to playlist
                </button>
                <button className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-dark-light">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </button>
                <div className="border-t border-secondary-200 dark:border-secondary-700 my-1"></div>
                <button className="w-full flex items-center px-3 py-2 text-xs sm:text-sm text-left text-red-600 hover:bg-secondary-100 dark:hover:bg-dark-light">
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 
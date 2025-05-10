import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { formatDuration } from '../cards/TrackCard';
import { TrackVisualizer } from './TrackVisualizer';

import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import { 
  ArrowPathRoundedSquareIcon, 
  BackwardIcon, 
  ForwardIcon, 
  ArrowsRightLeftIcon,
  QueueListIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export const PlayerBar: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    playPause, 
    next, 
    previous, 
    volume, 
    setVolume, 
    progress, 
    duration, 
    seek, 
    isShuffleOn, 
    toggleShuffle, 
    repeatMode, 
    toggleRepeat 
  } = usePlayer();
  
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [isLiked, setIsLiked] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);
  
  // Remove animation effect for progress bar
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = 'none';
    }
  }, [isPlaying, progress]);
  
  const handleVolumeClick = () => {
    if (isMuted) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseFloat(e.target.value);
    seek(newPosition);
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };
  
  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-r from-secondary-100 to-white dark:from-dark dark:to-dark-light border-t border-secondary-200 dark:border-secondary-800 shadow-lg z-50 px-4 hidden md:flex items-center justify-center text-secondary-500 dark:text-secondary-400 slide-up">
        <div className="animate-pulse flex space-x-4 items-center">
          <div className="w-10 h-10 bg-secondary-300 dark:bg-secondary-700 rounded-md"></div>
          <div className="flex-1 space-y-2 max-w-md">
            <div className="h-4 bg-secondary-300 dark:bg-secondary-700 rounded w-3/4"></div>
            <div className="h-3 bg-secondary-300 dark:bg-secondary-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = ((progress / (duration || 1)) * 100).toFixed(2);

  // Full-screen mobile player view
  if (expandedView) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-dark z-50 flex flex-col p-4 fade-in md:hidden">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={toggleExpandedView}
            className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter"
          >
            <XMarkIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-300" />
          </button>
          <h2 className="text-lg font-semibold text-center text-secondary-900 dark:text-white">Now Playing</h2>
          <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter">
            <EllipsisHorizontalIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-300" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 rounded-lg overflow-hidden shadow-xl">
            <img
              src={currentTrack.coverArt}
              alt={`${currentTrack.title} by ${currentTrack.artist}`}
              className="w-full h-full object-cover"
            />
            {/* Remove animated visualizer when playing */}
            {false && isPlaying && (
              <div className="absolute bottom-3 right-3">
                <TrackVisualizer isPlaying={true} variant="medium" color="text-white" />
              </div>
            )}
          </div>
          
          <div className="w-full max-w-md text-center mb-8">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">{currentTrack.title}</h3>
            <p className="text-secondary-600 dark:text-secondary-300">{currentTrack.artist}</p>
          </div>
          
          <div className="w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs text-secondary-500 dark:text-secondary-400 w-9 text-right">
                {formatDuration(progress)}
              </span>
              <div className="flex-1 relative group">
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-2 bg-secondary-300 dark:bg-secondary-700 rounded-full appearance-none cursor-pointer accent-primary-600"
                />
                <div 
                  ref={progressBarRef}
                  className="absolute top-0 left-0 h-2 bg-primary-600 rounded-full pointer-events-none"
                  style={{ width: `${progressPercentage}%`, transition: 'none' }}
                />
              </div>
              <span className="text-xs text-secondary-500 dark:text-secondary-400 w-9">
                {formatDuration(duration)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={toggleShuffle}
                className={`p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter ${
                  isShuffleOn ? 'text-primary-600 dark:text-primary-500' : 'text-secondary-600 dark:text-secondary-400'
                }`}
              >
                <ArrowsRightLeftIcon className="w-6 h-6" />
              </button>
              <button 
                onClick={previous}
                className="p-3 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter text-secondary-600 dark:text-secondary-400"
              >
                <BackwardIcon className="w-7 h-7" />
              </button>
              <button 
                onClick={playPause}
                className="p-4 bg-primary-600 hover:bg-primary-700 rounded-full text-white"
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8" />
                ) : (
                  <PlayIcon className="w-8 h-8" />
                )}
              </button>
              <button 
                onClick={next}
                className="p-3 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter text-secondary-600 dark:text-secondary-400"
              >
                <ForwardIcon className="w-7 h-7" />
              </button>
              <button 
                onClick={toggleRepeat}
                className={`p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter ${
                  repeatMode !== 'off' ? 'text-primary-600 dark:text-primary-500' : 'text-secondary-600 dark:text-secondary-400'
                } relative`}
              >
                <ArrowPathRoundedSquareIcon className="w-6 h-6" />
                {repeatMode === 'one' && (
                  <span className="absolute -top-1 -right-1 text-xs bg-primary-600 text-white dark:text-white w-4 h-4 flex items-center justify-center rounded-full">
                    1
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={toggleLike}
                className={`p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter ${
                  isLiked ? 'text-red-500' : 'text-secondary-500 dark:text-secondary-400'
                }`}
              >
                <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <div className="relative flex items-center space-x-2">
                <button 
                  onClick={handleVolumeClick}
                  className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter text-secondary-600 dark:text-secondary-400"
                >
                  {isMuted || volume === 0 ? (
                    <SpeakerXMarkIcon className="w-6 h-6" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1.5 bg-secondary-300 dark:bg-secondary-700 rounded-full appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Normal player bar (mobile and desktop)
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-white/95 dark:bg-dark-light/95 backdrop-blur-md border-t border-secondary-200 dark:border-secondary-800 shadow-lg z-50 px-2 sm:px-4 flex items-center slide-up">
      {/* Mobile expand button */}
      <button 
        onClick={toggleExpandedView} 
        className="md:hidden mr-2 p-1.5 text-secondary-500 dark:text-secondary-400"
      >
        <ChevronUpIcon className="w-5 h-5" />
      </button>
      
      {/* Track Info */}
      <div className="flex items-center flex-1 md:w-1/4 md:flex-none min-w-0">
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 rounded-md overflow-hidden group">
          <img
            src={currentTrack.coverArt}
            alt={`${currentTrack.title} by ${currentTrack.artist}`}
            className="w-full h-full object-cover rounded-md"
          />
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isPlaying ? '' : ''}`}>
            <button 
              onClick={playPause}
              className="p-2 bg-white/90 hover:bg-white rounded-full text-primary-600"
            >
              {isPlaying ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {/* Remove animated visualizer when playing */}
          {false && isPlaying && (
            <div className="absolute bottom-0.5 right-0.5 hidden sm:block">
              <TrackVisualizer isPlaying={true} variant="small" />
            </div>
          )}
        </div>
        <div className="ml-2 sm:ml-3 truncate">
          <p className="font-medium text-secondary-900 dark:text-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-full">
            {currentTrack.title}
          </p>
          <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 truncate max-w-[120px] sm:max-w-full">
            {currentTrack.artist}
          </p>
        </div>
        <div className="ml-1 sm:ml-4 md:flex items-center hidden space-x-2">
          <button 
            className={`p-1.5 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 ${
              isLiked ? 'text-red-500' : 'text-secondary-500 dark:text-secondary-400'
            }`}
            onClick={toggleLike}
          >
            <HeartIcon className={`w-5 h-5 hover:scale-110 transition-transform ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Mobile Playback Controls */}
      <div className="flex items-center justify-end space-x-1 flex-1 md:hidden">
        <button 
          onClick={previous}
          className="p-1.5 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 text-secondary-600 dark:text-secondary-400"
        >
          <BackwardIcon className="w-5 h-5" />
        </button>
        <button 
          onClick={playPause}
          className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-all duration-300"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button>
        <button 
          onClick={next}
          className="p-1.5 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 text-secondary-600 dark:text-secondary-400"
        >
          <ForwardIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* Desktop Player Controls */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-1.5">
          <button 
            onClick={toggleShuffle}
            className={`p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter ${
              isShuffleOn ? 'text-primary-600 dark:text-primary-500' : 'text-secondary-600 dark:text-secondary-400'
            }`}
          >
            <ArrowsRightLeftIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={previous}
            className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter text-secondary-600 dark:text-secondary-400"
          >
            <BackwardIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={playPause}
            className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full text-white"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          <button 
            onClick={next}
            className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 text-secondary-600 dark:text-secondary-400 hover:scale-110"
          >
            <ForwardIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleRepeat}
            className={`p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 ${
              repeatMode !== 'off' ? 'text-primary-600 dark:text-primary-500 scale-110' : 'text-secondary-600 dark:text-secondary-400'
            } relative`}
          >
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 text-xs bg-primary-600 text-white dark:text-white w-4 h-4 flex items-center justify-center rounded-full">
                1
              </span>
            )}
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-secondary-500 dark:text-secondary-400 w-9 text-right">
            {formatDuration(progress)}
          </span>
          <div className="flex-1 relative group">
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-secondary-300 dark:bg-secondary-700 rounded-full appearance-none cursor-pointer accent-primary-600 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary-300 dark:bg-secondary-700 rounded-full pointer-events-none group-hover:h-2 transition-all"></div>
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 h-1.5 bg-primary-600 rounded-full pointer-events-none group-hover:h-2"
              style={{ width: `${progressPercentage}%`, transition: 'none' }}
            />
            <div 
              className="absolute top-0 h-1.5 w-3 h-3 bg-primary-600 rounded-full hidden group-hover:block"
              style={{ left: `calc(${progressPercentage}% - 1.5px)`, top: '-2px' }}
            />
          </div>
          <span className="text-xs text-secondary-500 dark:text-secondary-400 w-9">
            {formatDuration(duration)}
          </span>
        </div>
      </div>
      
      {/* Volume & Additional Controls */}
      <div className="hidden md:flex w-1/4 items-center justify-end space-x-3">
        <div className="relative">
          <button 
            onClick={handleVolumeClick}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
            className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 text-secondary-600 dark:text-secondary-400 hover:scale-110"
          >
            {isMuted || volume === 0 ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          
          {showVolumeSlider && (
            <div 
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-light shadow-lg rounded-lg p-3 w-24 bounce-in"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-secondary-300 dark:bg-secondary-700 rounded-full appearance-none cursor-pointer accent-primary-600"
              />
              <div className="text-center mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                {Math.round(volume * 100)}%
              </div>
            </div>
          )}
        </div>
        
        <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter transition-all duration-300 text-secondary-600 dark:text-secondary-400 hover:scale-110 hidden md:block">
          <QueueListIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 
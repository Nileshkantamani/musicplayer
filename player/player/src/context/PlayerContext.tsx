import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  playbackRate: number;
  isShuffleOn: boolean;
  repeatMode: 'off' | 'all' | 'one';
  queue: Track[];
  playPause: () => void;
  play: (track: Track) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  seek: (position: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setPlaybackRate: (rate: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Style',
    artist: 'Taylor Swift',
    album: '1989',
    coverArt: 'https://placehold.co/500x500/8b5cf6/FFFFFF?text=TS',
    audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
    duration: 235,
  },
  {
    id: '2',
    title: 'Better',
    artist: 'Khalid',
    album: 'Free Spirit',
    coverArt: 'https://placehold.co/500x500/4c1d95/FFFFFF?text=K',
    audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
    duration: 229,
  },
  {
    id: '3',
    title: 'Ghost',
    artist: 'Justin Bieber',
    album: 'Justice',
    coverArt: 'https://placehold.co/500x500/7c3aed/FFFFFF?text=JB',
    audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
    duration: 153,
  },
];

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    
    // Set up event listeners
    const audio = audioRef.current;
    
    // For throttling the timeupdate event
    let lastUpdateTime = 0;
    
    const updateProgress = () => {
      // Disable automatic progress updates completely
      // Progress will only update when user seeks
      return;
    };
    
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };
    
    const handleLoadedData = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadeddata', handleLoadedData);
    
    // Initial volume
    audio.volume = volume;
    
    return () => {
      // Clean up event listeners
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.pause();
    };
  }, [repeatMode]);
  
  // Update audio source when current track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioSrc;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);
  
  // Update playback state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Update playback rate when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);
  
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const play = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const pause = () => {
    setIsPlaying(false);
  };
  
  const next = () => {
    if (!currentTrack || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    
    if (isShuffleOn) {
      // Get random track (different from current)
      let randomIndex = Math.floor(Math.random() * queue.length);
      // Make sure we don't play the same track
      while (randomIndex === currentIndex && queue.length > 1) {
        randomIndex = Math.floor(Math.random() * queue.length);
      }
      setCurrentTrack(queue[randomIndex]);
    } else {
      // Play next track or first if at the end
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentTrack(queue[nextIndex]);
    }
  };
  
  const previous = () => {
    if (!currentTrack || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    
    // If at the beginning, go to the last track, otherwise go to previous
    const previousIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentTrack(queue[previousIndex]);
  };
  
  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };
  
  const seek = (position: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = position;
      setProgress(position);
    }
  };
  
  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };
  
  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };
  
  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
  };
  
  const addToQueue = (track: Track) => {
    setQueue(prevQueue => [...prevQueue, track]);
  };
  
  const removeFromQueue = (trackId: string) => {
    setQueue(prevQueue => prevQueue.filter(track => track.id !== trackId));
  };
  
  const clearQueue = () => {
    setQueue([]);
  };
  
  // Initialize queue with mock tracks
  useEffect(() => {
    setQueue(mockTracks);
    setCurrentTrack(mockTracks[0]);
  }, []);
  
  const value = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    playbackRate,
    isShuffleOn,
    repeatMode,
    queue,
    playPause,
    play,
    pause,
    next,
    previous,
    setVolume,
    seek,
    toggleShuffle,
    toggleRepeat,
    setPlaybackRate,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };
  
  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}; 
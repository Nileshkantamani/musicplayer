import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track } from '../types/Track';

type LikedSongsContextType = {
  likedSongs: Track[];
  isLiked: (trackId: string) => boolean;
  toggleLike: (track: Track) => void;
  addToLiked: (track: Track) => void;
  removeFromLiked: (trackId: string) => void;
  clearLiked: () => void;
  sortLikedSongs: (sortBy: 'title' | 'artist' | 'album' | 'dateAdded') => void;
  filterLikedSongs: (filter: { artist?: string; album?: string; genre?: string }) => Track[];
  searchLikedSongs: (query: string) => Track[];
  stats: {
    totalLiked: number;
    topArtists: { name: string; count: number }[];
    topGenres: { name: string; count: number }[];
  };
};

const LikedSongsContext = createContext<LikedSongsContextType | undefined>(undefined);

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (context === undefined) {
    throw new Error('useLikedSongs must be used within a LikedSongsProvider');
  }
  return context;
};

export const LikedSongsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [stats, setStats] = useState({
    totalLiked: 0,
    topArtists: [] as { name: string; count: number }[],
    topGenres: [] as { name: string; count: number }[],
  });

  // Load liked songs from localStorage on mount
  useEffect(() => {
    const savedLikedSongs = localStorage.getItem('likedSongs');
    if (savedLikedSongs) {
      try {
        setLikedSongs(JSON.parse(savedLikedSongs));
      } catch (error) {
        console.error('Failed to parse liked songs from localStorage:', error);
      }
    }
  }, []);

  // Save liked songs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    updateStats();
  }, [likedSongs]);

  // Update statistics whenever liked songs change
  const updateStats = () => {
    // Count artists
    const artistCounts: Record<string, number> = {};
    const genreCounts: Record<string, number> = {};

    likedSongs.forEach(track => {
      // Count artists
      if (artistCounts[track.artist]) {
        artistCounts[track.artist]++;
      } else {
        artistCounts[track.artist] = 1;
      }

      // Count genres (if available)
      if (track.genre) {
        if (genreCounts[track.genre]) {
          genreCounts[track.genre]++;
        } else {
          genreCounts[track.genre] = 1;
        }
      }
    });

    // Convert to arrays and sort
    const topArtists = Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topGenres = Object.entries(genreCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalLiked: likedSongs.length,
      topArtists,
      topGenres,
    });
  };

  const isLiked = (trackId: string): boolean => {
    return likedSongs.some(track => track.id === trackId);
  };

  const toggleLike = (track: Track) => {
    if (isLiked(track.id)) {
      removeFromLiked(track.id);
    } else {
      addToLiked(track);
    }
  };

  const addToLiked = (track: Track) => {
    // Add date added for sorting
    const trackWithDateAdded = {
      ...track,
      dateAdded: new Date().toISOString(),
    };
    setLikedSongs(prev => [...prev, trackWithDateAdded]);
  };

  const removeFromLiked = (trackId: string) => {
    setLikedSongs(prev => prev.filter(track => track.id !== trackId));
  };

  const clearLiked = () => {
    setLikedSongs([]);
  };

  const sortLikedSongs = (sortBy: 'title' | 'artist' | 'album' | 'dateAdded') => {
    const sorted = [...likedSongs];
    
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist':
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'album':
        sorted.sort((a, b) => (a.album || '').localeCompare(b.album || ''));
        break;
      case 'dateAdded':
        sorted.sort((a, b) => {
          const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
          const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
          return dateB - dateA; // Most recent first
        });
        break;
      default:
        break;
    }
    
    setLikedSongs(sorted);
  };

  const filterLikedSongs = (filter: { artist?: string; album?: string; genre?: string }): Track[] => {
    return likedSongs.filter(track => {
      let matches = true;
      
      if (filter.artist && track.artist !== filter.artist) {
        matches = false;
      }
      
      if (filter.album && track.album !== filter.album) {
        matches = false;
      }
      
      if (filter.genre && track.genre !== filter.genre) {
        matches = false;
      }
      
      return matches;
    });
  };

  const searchLikedSongs = (query: string): Track[] => {
    if (!query.trim()) return likedSongs;
    
    const lowerQuery = query.toLowerCase();
    return likedSongs.filter(track => 
      track.title.toLowerCase().includes(lowerQuery) ||
      track.artist.toLowerCase().includes(lowerQuery) ||
      (track.album && track.album.toLowerCase().includes(lowerQuery))
    );
  };

  const value = {
    likedSongs,
    isLiked,
    toggleLike,
    addToLiked,
    removeFromLiked,
    clearLiked,
    sortLikedSongs,
    filterLikedSongs,
    searchLikedSongs,
    stats,
  };

  return (
    <LikedSongsContext.Provider value={value}>
      {children}
    </LikedSongsContext.Provider>
  );
};

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  coverImage: string;
  tracks: PlaylistTrack[];
  createdAt: string;
  isPublic: boolean;
  owner: {
    id: number;
    name: string;
  };
};

export type PlaylistTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
  addedAt: string;
};

// Mock data
const mockPlaylists: Playlist[] = [
  {
    id: 'playlist1',
    name: 'My Favorite Songs',
    description: 'A collection of my all-time favorite tracks',
    coverImage: 'https://via.placeholder.com/300',
    tracks: [
      {
        id: '1',
        title: 'Style',
        artist: 'Taylor Swift',
        album: '1989',
        coverArt: 'https://via.placeholder.com/300',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 235,
        addedAt: '2023-01-15T08:30:00Z',
      },
      {
        id: '2',
        title: 'Better',
        artist: 'Khalid',
        album: 'Free Spirit',
        coverArt: 'https://via.placeholder.com/300',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 229,
        addedAt: '2023-02-20T14:45:00Z',
      },
    ],
    createdAt: '2023-01-01T12:00:00Z',
    isPublic: true,
    owner: {
      id: 1,
      name: 'Current User',
    },
  },
  {
    id: 'playlist2',
    name: 'Workout Mix',
    description: 'High energy tracks for workout sessions',
    coverImage: 'https://via.placeholder.com/300',
    tracks: [
      {
        id: '3',
        title: 'Ghost',
        artist: 'Justin Bieber',
        album: 'Justice',
        coverArt: 'https://via.placeholder.com/300',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 153,
        addedAt: '2023-03-10T09:20:00Z',
      },
    ],
    createdAt: '2023-02-15T18:30:00Z',
    isPublic: true,
    owner: {
      id: 1,
      name: 'Current User',
    },
  },
  {
    id: 'playlist3',
    name: 'Chill Vibes',
    description: 'Relaxing music for unwinding',
    coverImage: 'https://via.placeholder.com/300',
    tracks: [],
    createdAt: '2023-03-05T21:15:00Z',
    isPublic: false,
    owner: {
      id: 1,
      name: 'Current User',
    },
  },
];

export const usePlaylists = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user) {
        setPlaylists([]);
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo, set to mock data
        setPlaylists(mockPlaylists);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch playlists');
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [user]);

  // Create new playlist
  const createPlaylist = async (name: string, description?: string, isPublic = true) => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newPlaylist: Playlist = {
        id: `playlist-${Date.now()}`,
        name,
        description,
        coverImage: 'https://via.placeholder.com/300',
        tracks: [],
        createdAt: new Date().toISOString(),
        isPublic,
        owner: {
          id: user.id,
          name: user.username,
        },
      };

      setPlaylists(prev => [...prev, newPlaylist]);
      return newPlaylist;
    } catch (err) {
      setError('Failed to create playlist');
      return null;
    }
  };

  // Delete playlist
  const deletePlaylist = async (playlistId: string) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
      return true;
    } catch (err) {
      setError('Failed to delete playlist');
      return false;
    }
  };

  // Add track to playlist
  const addTrackToPlaylist = async (playlistId: string, track: Omit<PlaylistTrack, 'addedAt'>) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      const playlistTrack: PlaylistTrack = {
        ...track,
        addedAt: new Date().toISOString(),
      };

      setPlaylists(prev =>
        prev.map(playlist => {
          if (playlist.id === playlistId) {
            // Check if track already exists
            const exists = playlist.tracks.some(t => t.id === track.id);
            if (exists) {
              return playlist;
            }
            return {
              ...playlist,
              tracks: [...playlist.tracks, playlistTrack],
            };
          }
          return playlist;
        })
      );
      return true;
    } catch (err) {
      setError('Failed to add track to playlist');
      return false;
    }
  };

  // Remove track from playlist
  const removeTrackFromPlaylist = async (playlistId: string, trackId: string) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setPlaylists(prev =>
        prev.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              tracks: playlist.tracks.filter(track => track.id !== trackId),
            };
          }
          return playlist;
        })
      );
      return true;
    } catch (err) {
      setError('Failed to remove track from playlist');
      return false;
    }
  };

  // Update playlist details
  const updatePlaylist = async (
    playlistId: string,
    updates: Partial<Pick<Playlist, 'name' | 'description' | 'isPublic' | 'coverImage'>>
  ) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setPlaylists(prev =>
        prev.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              ...updates,
            };
          }
          return playlist;
        })
      );
      return true;
    } catch (err) {
      setError('Failed to update playlist');
      return false;
    }
  };

  // Get playlist by ID
  const getPlaylistById = (playlistId: string) => {
    return playlists.find(playlist => playlist.id === playlistId) || null;
  };

  return {
    playlists,
    isLoading,
    error,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    updatePlaylist,
    getPlaylistById,
  };
}; 
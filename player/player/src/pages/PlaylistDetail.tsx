import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylists } from '../hooks/usePlaylists';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { 
  PlayIcon, 
  PauseIcon, 
  ClockIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

export const PlaylistDetail: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { getPlaylistById, isLoading } = usePlaylists();
  const { currentTrack, isPlaying, playPause, play } = usePlayer();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(
    playlistId ? getPlaylistById(playlistId) : null
  );
  
  useEffect(() => {
    if (playlistId) {
      const fetchedPlaylist = getPlaylistById(playlistId);
      setPlaylist(fetchedPlaylist);
      
      if (!fetchedPlaylist && !isLoading) {
        // Playlist not found, redirect to home
        navigate('/', { replace: true });
      }
    }
  }, [playlistId, getPlaylistById, isLoading, navigate]);
  
  if (isLoading || !playlist) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const playlistDuration = playlist.tracks.reduce(
    (total, track) => total + track.duration,
    0
  );
  
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 
      ? `${hours} hr ${minutes} min` 
      : `${minutes} min`;
  };
  
  const handlePlayAll = () => {
    if (playlist.tracks.length === 0) return;
    
    const firstTrack = playlist.tracks[0];
    play({
      id: firstTrack.id,
      title: firstTrack.title,
      artist: firstTrack.artist,
      album: firstTrack.album,
      coverArt: firstTrack.coverArt,
      audioSrc: firstTrack.audioSrc,
      duration: firstTrack.duration,
    });
  };
  
  const isPlaylistPlaying = isPlaying && currentTrack && 
    playlist.tracks.some(track => track.id === currentTrack.id);
  
  return (
    <div>
      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row md:items-end gap-8 mb-8">
        <div className="w-48 h-48 flex-shrink-0 rounded-lg shadow-lg overflow-hidden bg-secondary-200 dark:bg-secondary-800">
          {playlist.tracks.length > 0 ? (
            <img
              src={playlist.coverImage || playlist.tracks[0].coverArt}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary-300 dark:bg-secondary-700">
              <MusicalNoteIcon className="w-16 h-16 text-secondary-500 dark:text-secondary-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
            Playlist
          </p>
          <h1 className="text-4xl font-bold mb-2 text-secondary-900 dark:text-white">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-secondary-600 dark:text-secondary-400 mb-3">
              {playlist.description}
            </p>
          )}
          <div className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center flex-wrap">
            <span className="font-medium text-secondary-900 dark:text-white mr-1">
              {playlist.owner.name}
            </span> • 
            <span className="mx-1">{playlist.tracks.length} songs,</span>
            <span className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {formatTotalDuration(playlistDuration)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={isPlaylistPlaying ? playPause : handlePlayAll}
          disabled={playlist.tracks.length === 0}
          className={`p-3 rounded-full text-white ${
            playlist.tracks.length === 0
              ? 'bg-primary-600/50 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isPlaylistPlaying && isPlaying ? (
            <PauseIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8" />
          )}
        </button>
        
        <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter">
          <HeartIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter">
          <ArrowDownTrayIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter">
          <ShareIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
        </button>
        
        <div className="relative ml-auto">
          <button className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter">
            <EllipsisHorizontalIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
          </button>
          {/* Dropdown menu could be added here */}
        </div>
      </div>
      
      {/* Tracks List */}
      <div className="bg-white dark:bg-dark-light rounded-lg shadow-sm overflow-hidden">
        {playlist.tracks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              This playlist is empty
            </p>
            <button className="btn btn-primary">
              Add Songs
            </button>
          </div>
        ) : (
          <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
            {playlist.tracks.map((track) => (
              <TrackCard
                key={track.id}
                id={track.id}
                title={track.title}
                artist={track.artist}
                album={track.album}
                coverArt={track.coverArt}
                audioSrc={track.audioSrc}
                duration={track.duration}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 
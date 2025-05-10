import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylists } from '../hooks/usePlaylists';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { 
  PlusIcon, 
  PlayIcon, 
  MusicalNoteIcon, 
  HeartIcon, 
  FireIcon, 
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { 
  MagnifyingGlassIcon, 
  QueueListIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';

export const Library: React.FC = () => {
  const { playlists, createPlaylist } = usePlaylists();
  const { queue, play } = usePlayer();
  const [activeTab, setActiveTab] = useState<'playlists' | 'tracks' | 'recent'>('playlists');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    
    await createPlaylist(newPlaylistName, newPlaylistDesc);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setIsCreatingPlaylist(false);
  };
  
  const playAllLikedSongs = () => {
    if (queue.length > 0) {
      play(queue[0]);
    }
  };
  
  // Filter playlists based on search term if any
  const filteredPlaylists = searchTerm 
    ? playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (playlist.description && playlist.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : playlists;
  
  // Get recent tracks - just for demo
  const recentTracks = [...queue].sort(() => Math.random() - 0.5).slice(0, 5);
  
  return (
    <div className="pb-8 px-2 sm:px-0 fade-in">
      {/* Hero section */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-primary-900 to-secondary-900 opacity-95"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-10 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-32 h-32 sm:w-36 sm:h-36 relative group">
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl 
                          transform transition-all duration-500 group-hover:scale-95 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QueueListIcon className="w-14 h-14 text-white/80" />
                </div>
              </div>
              
              <div className="absolute -right-2 -bottom-2 w-14 h-14 rounded-2xl bg-primary-600 shadow-lg flex items-center justify-center
                          transform transition-transform duration-300 group-hover:scale-110">
                <MusicalNoteIcon className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Your Library
              </h1>
              <p className="text-white/80 mt-2 sm:mt-3 text-sm sm:text-base max-w-xl">
                Access your playlists, liked songs, and recently played tracks all in one place
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <Button
                  onClick={() => setIsCreatingPlaylist(true)}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white
                           border border-white/20 text-sm px-4 py-2
                           hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Playlist
                </Button>
                <Button 
                  onClick={playAllLikedSongs}
                  disabled={queue.length === 0}
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2
                           hover:shadow-lg hover:shadow-primary-600/20 transform hover:-translate-y-1 transition-all flex items-center"
                >
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Play All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Tabs */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type="text"
              className="bg-white dark:bg-dark-light w-full pl-10 pr-4 py-2 rounded-xl border border-secondary-200 dark:border-secondary-700 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              placeholder="Search your library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-secondary-100 dark:bg-secondary-800 rounded-full p-1 self-stretch sm:self-center">
            <button
              onClick={() => setActiveTab('playlists')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'playlists'
                  ? 'bg-white dark:bg-secondary-700 text-primary-700 dark:text-white shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
              }`}
            >
              Playlists
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'tracks'
                  ? 'bg-white dark:bg-secondary-700 text-primary-700 dark:text-white shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
              }`}
            >
              Liked
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'recent'
                  ? 'bg-white dark:bg-secondary-700 text-primary-700 dark:text-white shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
              }`}
            >
              Recent
            </button>
          </div>
        </div>
      </div>
      
      {/* Create Playlist Form */}
      {isCreatingPlaylist && (
        <div className="bg-white dark:bg-dark-light rounded-xl p-6 mb-6 shadow-md backdrop-blur-sm border border-secondary-200/50 dark:border-secondary-700/30 slide-down">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Create New Playlist</h2>
            <button 
              onClick={() => setIsCreatingPlaylist(false)}
              className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="playlistName" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Playlist Name *
              </label>
              <input
                id="playlistName"
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="bg-secondary-50 dark:bg-secondary-800/50 w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="My Awesome Playlist"
              />
            </div>
            
            <div>
              <label htmlFor="playlistDesc" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="playlistDesc"
                value={newPlaylistDesc}
                onChange={(e) => setNewPlaylistDesc(e.target.value)}
                className="bg-secondary-50 dark:bg-secondary-800/50 w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]"
                placeholder="Add a description..."
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCreatingPlaylist(false)}
                className="border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleCreatePlaylist}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                Create Playlist
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <div className="fade-in">
          {filteredPlaylists.length === 0 ? (
            <div className="text-center py-12 bg-white/50 dark:bg-dark-light/50 backdrop-blur-sm rounded-xl border border-secondary-200/50 dark:border-secondary-700/30">
              {searchTerm ? (
                <div>
                  <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-secondary-400 mb-4" />
                  <p className="text-secondary-600 dark:text-secondary-400 mb-2">No playlists match your search</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-500">Try a different search term</p>
                </div>
              ) : (
                <div>
                  <QueueListIcon className="w-16 h-16 mx-auto text-secondary-400 mb-4" />
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">You don't have any playlists yet</p>
                  <Button 
                    variant="primary" 
                    onClick={() => setIsCreatingPlaylist(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white flex items-center mx-auto"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Your First Playlist
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredPlaylists.map((playlist, index) => (
                <Link 
                  key={playlist.id} 
                  to={`/playlist/${playlist.id}`} 
                  className="group scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="bg-white dark:bg-dark-light rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-secondary-100 dark:border-secondary-800">
                    <div className="relative aspect-square bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-800 dark:to-secondary-900">
                      {playlist.tracks.length > 0 ? (
                        <img 
                          src={playlist.coverImage || playlist.tracks[0].coverArt}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center border border-white/20 shadow-lg">
                            <MusicalNoteIcon className="w-10 h-10 text-white/80" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-white font-bold text-lg">{playlist.name}</h3>
                              <p className="text-white/80 text-sm">{playlist.tracks.length} tracks</p>
                            </div>
                            <div className="bg-primary-600 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                              <PlayIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-secondary-900 dark:text-white text-sm sm:text-base">{playlist.name}</h3>
                      <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 mt-1 line-clamp-2">
                        {playlist.description || `${playlist.tracks.length} songs`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Create Playlist Card */}
              <div 
                className="group cursor-pointer scale-in"
                style={{ animationDelay: `${filteredPlaylists.length * 0.05}s` }}
                onClick={() => setIsCreatingPlaylist(true)}
              >
                <div className="bg-white dark:bg-dark-light rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-secondary-100 dark:border-secondary-800 h-full">
                  <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-600/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PlusIcon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-primary-700 dark:text-primary-400 text-sm sm:text-base">Create New Playlist</h3>
                    <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                      Start a new collection of tracks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Liked Songs Tab */}
      {activeTab === 'tracks' && (
        <div className="fade-in">
          <div className="bg-gradient-to-br from-rose-700 to-primary-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 mix-blend-overlay opacity-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <pattern id="heart-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M3.25,5.5 C2.25,4.5 2.5,3 4,2.25 C5.5,1.5 6.75,2.5 7,3.5 C7.25,2.5 8.5,1.5 10,2.25 C11.5,3 11.75,4.5 10.75,5.5 L7,9.25 L3.25,5.5 Z" fill="white" fillOpacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heart-pattern)" />
              </svg>
            </div>
            
            <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-rose-500/20 to-primary-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10 scale-in z-10">
              <HeartIcon className="w-20 h-20 text-white/80" />
            </div>
            
            <div className="flex-1 text-center md:text-left z-10">
              <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Playlist</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 mb-2">Liked Songs</h2>
              <p className="text-white/80 text-sm mb-4">{queue.length} songs</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button 
                  onClick={playAllLikedSongs}
                  disabled={queue.length === 0}
                  className="bg-white hover:bg-white/90 text-primary-900 px-5 py-2 flex items-center shadow-md hover:shadow-lg transition-all"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Play All
                </Button>
                <Button 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white
                           border border-white/20 px-5 py-2 flex items-center"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Shuffle
                </Button>
              </div>
            </div>
          </div>
          
          {queue.length === 0 ? (
            <div className="text-center py-12 bg-white/50 dark:bg-dark-light/50 backdrop-blur-sm rounded-xl border border-secondary-200/50 dark:border-secondary-700/30">
              <HeartIcon className="w-16 h-16 mx-auto text-secondary-300 dark:text-secondary-700 mb-4" />
              <p className="text-secondary-600 dark:text-secondary-400 mb-2">You haven't liked any songs yet</p>
              <p className="text-sm text-secondary-500 dark:text-secondary-500">Like songs to add them to this collection</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
              {queue.map((track, index) => (
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
      )}
      
      {/* Recently Played Tab */}
      {activeTab === 'recent' && (
        <div className="fade-in">
          <div className="bg-gradient-to-br from-cyan-700 to-blue-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 mix-blend-overlay opacity-10">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <pattern id="clock-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="4" fill="none" stroke="white" strokeWidth="0.5" />
                    <line x1="5" y1="5" x2="5" y2="2" stroke="white" strokeWidth="0.5" />
                    <line x1="5" y1="5" x2="7" y2="7" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#clock-pattern)" />
              </svg>
            </div>
            
            <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10 scale-in z-10">
              <ClockIcon className="w-20 h-20 text-white/80" />
            </div>
            
            <div className="flex-1 text-center md:text-left z-10">
              <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">History</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 mb-2">Recently Played</h2>
              <p className="text-white/80 text-sm mb-4">Your listening history</p>
              <Button 
                className="bg-white hover:bg-white/90 text-blue-900 px-5 py-2 flex items-center shadow-md hover:shadow-lg transition-all"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Play All
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Today */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 px-1 flex items-center">
                Today <span className="ml-2 text-xs font-normal text-secondary-500 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-800 px-2 py-0.5 rounded-full">{recentTracks.length}</span>
              </h3>
              
              <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
                {recentTracks.map((track, index) => (
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
            </div>
            
            {/* Yesterday - Empty state for demo */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 px-1">Yesterday</h3>
              
              <div className="bg-white/50 dark:bg-dark-light/50 backdrop-blur-sm rounded-xl p-8 border border-secondary-200/50 dark:border-secondary-700/30 text-center">
                <p className="text-secondary-600 dark:text-secondary-400">No listening activity from yesterday</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
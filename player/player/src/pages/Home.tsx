import React, { useState, useEffect } from 'react';
import { TrackCard, formatDuration } from '../components/cards/TrackCard';
import { usePlayer } from '../context/PlayerContext';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  FireIcon, 
  MusicalNoteIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  PlayIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const genres = [
  { id: 'rock', name: 'Rock', color: 'from-red-700 to-orange-500', icon: '🎸' },
  { id: 'electronic', name: 'Electronic', color: 'from-purple-700 to-blue-500', icon: '🎧' },
  { id: 'jazz', name: 'Jazz', color: 'from-yellow-600 to-amber-500', icon: '🎷' },
  { id: 'classical', name: 'Classical', color: 'from-blue-700 to-cyan-500', icon: '🎻' },
  { id: 'hip-hop', name: 'Hip Hop', color: 'from-emerald-700 to-green-500', icon: '🎤' },
  { id: 'indie', name: 'Indie', color: 'from-pink-700 to-rose-500', icon: '🪕' },
  { id: 'pop', name: 'Pop', color: 'from-sky-700 to-indigo-500', icon: '🎵' },
  { id: 'ambient', name: 'Ambient', color: 'from-teal-700 to-cyan-500', icon: '🌊' },
];

const featuredArtists = [
  {
    id: 'arijit-singh',
    name: 'Arijit Singh',
    image: 'https://i.scdn.co/image/ab6761610000e5eb9a94c1f2850a90284af51770',
    type: 'Bollywood Singer'
  },
  {
    id: 'ar-rahman',
    name: 'A.R. Rahman',
    image: 'https://i.scdn.co/image/ab6761610000e5eb1a096475272874df420a7ae8',
    type: 'Music Composer'
  },
  {
    id: 'sonu-nigam',
    name: 'Sonu Nigam',
    image: 'https://i.scdn.co/image/ab6761610000e5ebf0df3f52e7851f9fb3c55652',
    type: 'Playback Singer'
  },
  {
    id: 'honey-singh',
    name: 'Yo Yo Honey Singh',
    image: 'https://i.scdn.co/image/ab6761610000e5ebf01a0d33f489e09903384629',
    type: 'Rapper'
  },
  {
    id: 'shrey-singhal',
    name: 'Shrey Singhal',
    image: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36',
    type: 'Pop Singer'
  },
  {
    id: 'udit-narayan',
    name: 'Udit Narayan',
    image: 'https://i.scdn.co/image/ab6761610000e5eb8208c4fa9192c5270d94efb0',
    type: 'Playback Singer'
  }
];

export const Home: React.FC = () => {
  const { queue, play } = usePlayer();
  const [activeTab, setActiveTab] = useState('discover');
  
  // For demo purposes, let's assume these are featured tracks
  const featuredTracks = queue.slice(0, 6);
  // And these are recently played
  const recentlyPlayed = [...queue].reverse().slice(0, 4);
  // New releases
  const newReleases = queue.sort(() => Math.random() - 0.5).slice(0, 3);
  // Weekly top tracks
  const weeklyTopTracks = [...queue].sort(() => Math.random() - 0.5).slice(0, 5);
  
  // Visual equalizer effect
  const [eqBars, setEqBars] = useState<number[]>([]);
  // Hero particle effect
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);
  
  // Define types for Hindi album and collection
  type PreviewTrack = {
    id: string;
    title: string;
    artist: string;
    album?: string;
    coverArt?: string;
    audioSrc: string;
    duration: number;
  };
  
  type HindiAlbum = {
    id: string;
    title: string;
    artist: string;
    coverArt: string;
    previewTrack: PreviewTrack;
  };
  
  type HindiCollection = {
    id: string;
    title: string;
    color: string;
    icon: string;
    previewTrack: PreviewTrack;
  };
  
  // Hindi albums preview data
  const hindiAlbums: HindiAlbum[] = [
    {
      id: 'kalank',
      title: 'Kalank',
      artist: 'Various Artists',
      coverArt: 'https://placehold.co/500x500/bb3939/FFFFFF?text=Kalank',
      previewTrack: {
        id: 'kalank-title-track',
        title: 'Kalank Title Track',
        artist: 'Arijit Singh',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 248
      }
    },
    {
      id: 'kabir-singh',
      title: 'Kabir Singh',
      artist: 'Various Artists',
      coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Kabir+Singh',
      previewTrack: {
        id: 'bekhayali',
        title: 'Bekhayali',
        artist: 'Sachet Tandon',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 273
      }
    },
    {
      id: 'kedarnath',
      title: 'Kedarnath',
      artist: 'Amit Trivedi',
      coverArt: 'https://placehold.co/500x500/3962ae/FFFFFF?text=Kedarnath',
      previewTrack: {
        id: 'namo-namo',
        title: 'Namo Namo',
        artist: 'Amit Trivedi',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 280
      }
    },
    {
      id: 'tu-hai-ram',
      title: 'Tu Hai Ram',
      artist: 'Anup Jalota',
      coverArt: 'https://placehold.co/500x500/e9b842/FFFFFF?text=Devotional',
      previewTrack: {
        id: 'tu-hai-ram-title',
        title: 'Tu Hai Ram',
        artist: 'Anup Jalota',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 312
      }
    },
    {
      id: 'remix-party',
      title: 'Bollywood Remix Party',
      artist: 'DJ Akbar Sami',
      coverArt: 'https://placehold.co/500x500/c042a3/FFFFFF?text=Remix',
      previewTrack: {
        id: 'kaanta-laga-remix',
        title: 'Kaanta Laga (Remix)',
        artist: 'DJ Akbar Sami',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 287
      }
    }
  ];
  
  // Hindi collection preview
  const hindiCollections: HindiCollection[] = [
    { 
      id: 'romantic', 
      title: 'Romantic Hits', 
      color: 'from-pink-600 to-red-600', 
      icon: '💕',
      previewTrack: {
        id: 'tum-hi-ho',
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        album: 'Romantic Hits',
        coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Romantic+Hits',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 261
      }
    },
    { 
      id: 'party', 
      title: 'Party Anthems', 
      color: 'from-purple-600 to-indigo-600', 
      icon: '🎉',
      previewTrack: {
        id: 'badtameez-dil',
        title: 'Badtameez Dil',
        artist: 'Benny Dayal',
        album: 'Party Anthems',
        coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Party+Anthems',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 243
      }
    },
    { 
      id: 'retro', 
      title: 'Retro Classics', 
      color: 'from-amber-600 to-orange-600', 
      icon: '🎸',
      previewTrack: {
        id: 'ek-pyaar-ka-nagma',
        title: 'Ek Pyaar Ka Nagma Hai',
        artist: 'Lata Mangeshkar',
        album: 'Retro Classics',
        coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Retro+Classics',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 326
      }
    }
  ];
  
  // Play an album preview track
  const playAlbumPreview = (item: HindiAlbum | HindiCollection) => {
    if (item.previewTrack) {
      let coverArtToUse = item.previewTrack.coverArt;
      if (!coverArtToUse && 'coverArt' in item) {
        coverArtToUse = item.coverArt;
      }
      
      play({
        id: item.previewTrack.id,
        title: item.previewTrack.title,
        artist: item.previewTrack.artist,
        album: item.title,
        coverArt: coverArtToUse || '',
        audioSrc: item.previewTrack.audioSrc,
        duration: item.previewTrack.duration
      });
    }
  };
  
  useEffect(() => {
    // Generate fixed equalizer heights that won't change
    setEqBars(Array.from({ length: 12 }, () => 30 + Math.random() * 70));
    
    // Generate static particles for hero background
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.2 + Math.random() * 0.5
    }));
    setParticles(newParticles);
    
    return () => {
      // No interval to clear anymore
    };
  }, []);
  
  return (
    <div className="pb-8 px-2 sm:px-0 fade-in">
      {/* Enhanced Hero section with particle effects */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 opacity-95"></div>
        
        {/* Particle background effect */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white opacity-30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 mix-blend-overlay opacity-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Animated sound equalizer effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center opacity-40 px-4">
          {eqBars.map((height, i) => (
            <div 
              key={i}
              className="w-2 mx-0.5 bg-white rounded-t-sm"
              style={{ 
                height: `${height}%`, 
                transition: 'height 0.5s ease',
                animationDelay: `${i * 0.1}s` 
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0 
                        bg-gradient-to-br from-primary-500/30 to-secondary-600/30 backdrop-blur-lg 
                        rounded-2xl shadow-2xl border border-white/10
                        flex items-center justify-center text-center p-4 transform transition-transform duration-500 
                        hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Static icon without 3D animation */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl z-10">🎧</span>
                </div>
              </div>
              
              <div className="absolute -bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-primary-600 to-transparent group-hover:bottom-0 transition-all duration-500"></div>
              <div className="absolute bottom-2 left-0 right-0 text-white text-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity z-20">Play Now</div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="slide-up">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Your Music Journey<br className="hidden sm:block" /> Starts Here
                </h1>
                <p className="text-white/80 mt-3 text-sm md:text-base mb-4 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  Discover new sounds, create the perfect playlist for any mood, and enjoy a personalized music experience tailored just for you.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 slide-up" style={{ animationDelay: '0.2s' }}>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white text-sm md:text-base px-5 py-2.5
                         border border-primary-400 hover:shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-1 transition-all">
                  <SparklesIcon className="w-5 h-5 mr-2 inline-block" />
                  Discover
                </Button>
                <Button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white
                         border border-white/20 text-sm md:text-base px-5 py-2.5
                         hover:shadow-lg hover:shadow-black/5 transform hover:-translate-y-1 transition-all">
                  <MusicalNoteIcon className="w-5 h-5 mr-2 inline-block" />
                  My Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab navigation with improved active state */}
      <div className="mb-6 overflow-x-auto pb-2 md:px-2">
        <div className="flex space-x-2 md:space-x-4 min-w-max">
          {['discover', 'trending', 'favorites', 'new', 'hindi'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === tab
                  ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-700/40'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800/40'
              }`}
            >
              {tab === 'hindi' ? 'Hindi' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hindi Music Section - Only visible when Hindi tab is selected */}
      {activeTab === 'hindi' && (
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-secondary-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">🎵</span>
                  Hindi Music Collection
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mt-1">
                  Explore the best of Hindi music across various genres
                </p>
              </div>
              <Link 
                to="/hindi-albums" 
                className="self-start md:self-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium flex items-center"
              >
                View All Albums
                <ChevronRightIcon className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { id: 'bollywood', name: 'Bollywood', icon: '🎬', color: 'bg-red-500' },
                { id: 'indie', name: 'Indie', icon: '🎸', color: 'bg-green-500' },
                { id: 'devotional', name: 'Devotional', icon: '🙏', color: 'bg-yellow-500' },
                { id: 'classic', name: 'Classical', icon: '🎻', color: 'bg-blue-500' },
                { id: 'remix', name: 'Remixes', icon: '🎧', color: 'bg-purple-500' },
                { id: 'all', name: 'All Albums', icon: '📀', color: 'bg-orange-500' }
              ].map((category) => (
                <Link
                  key={category.id}
                  to={`/hindi-albums`}
                  className="bg-white dark:bg-dark-light rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full ${category.color} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-secondary-900 dark:text-white text-sm">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Featured Artists Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white slide-in flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-purple-500" />
            Featured Artists
          </h2>
          <Link 
            to="/artists" 
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                     flex items-center gap-1 group slide-in" 
            style={{ animationDelay: '0.1s' }}
          >
            View All 
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {featuredArtists.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="bg-white dark:bg-dark-light rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-500/20">
                  <img 
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white">{artist.name}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">{artist.type}</p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                      <MusicalNoteIcon className="w-3 h-3 mr-1" />
                      View Artist
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Weekly Top Charts - NEW SECTION */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white slide-in flex items-center">
            <ChartBarIcon className="w-6 h-6 mr-2 text-blue-500" />
            Weekly Top Charts
          </h2>
          <Link 
            to="/charts" 
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                     flex items-center gap-1 group slide-in" 
            style={{ animationDelay: '0.1s' }}
          >
            View All 
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6 overflow-hidden relative shadow-md">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-10 w-24 h-24 bg-indigo-500/10 rounded-full translate-y-1/2"></div>
          
          <div className="grid gap-3">
            {weeklyTopTracks.map((track, index) => (
              <div 
                key={track.id} 
                className="bg-white dark:bg-dark-light/80 backdrop-blur-md rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-all group slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                  {index + 1}
                </div>
                <div className="relative flex-shrink-0 w-12 h-12">
                  <img 
                    src={track.coverArt} 
                    alt={track.title} 
                    className="w-full h-full object-cover rounded-md shadow-sm" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
                  <button
                    onClick={() => {/* play logic */}}
                    className="absolute inset-0 m-auto w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-secondary-900 dark:text-white truncate text-sm">{track.title}</h3>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400 truncate">{track.artist}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-secondary-500 dark:text-secondary-400">
                    {track.duration ? formatDuration(track.duration) : ""}
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                        <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                      </svg>
                      {index === 0 ? "Top" : index === 1 ? "+2" : index === 2 ? "+1" : "New"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced "For You" Section */}
      <section className="mb-8">
        <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white mb-4 px-1 slide-in flex items-center">
          <RocketLaunchIcon className="w-6 h-6 mr-2 text-purple-500" />
          For You
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Your Mix 1", desc: "Based on your recent listening", color: "from-purple-500 to-indigo-500", icon: "🎵", route: "/your-mix-1" },
            { title: "Workout Mix", desc: "Perfect for your gym sessions", color: "from-red-500 to-orange-500", icon: "💪", route: "/workout-mix" },
            { title: "Chill Evening", desc: "Relaxing tracks for your evening", color: "from-blue-500 to-cyan-500", icon: "🌙", route: "/chill-evening" },
            { title: "Focus Time", desc: "Concentration-boosting tracks", color: "from-emerald-500 to-green-500", icon: "🧠", route: "/focus" }
          ].map((mix, index) => (
            <div 
              key={mix.title}
              className="bg-white dark:bg-dark-light shadow-md hover:shadow-lg rounded-xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-24 bg-gradient-to-r ${mix.color} relative p-4 overflow-hidden`}>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-70 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                  {mix.icon}
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
                  <div className="absolute inset-0 bg-white/10"></div>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-white">{mix.title}</h3>
                  <p className="text-white/80 text-sm">{mix.desc}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-secondary-500 dark:text-secondary-400">Updated today</span>
                </div>
                <div className="flex justify-between">
                  <Link 
                    to={mix.route}
                    className="py-1.5 px-3 text-xs font-medium bg-white dark:bg-dark-light text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    View All
                  </Link>
                  <Button className="py-1.5 px-3 text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                    Play
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Genres section with improved visuals */}
      <section className="mb-8">
        <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white mb-4 px-1 slide-in">
          Browse Genres
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {genres.map((genre, index) => (
            <Link 
              key={genre.id}
              to={`/genre/${genre.id}`}
              className={`bg-gradient-to-r ${genre.color} rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center 
                       text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300 scale-in overflow-hidden relative`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                height: '100px',
                minHeight: '90px',
                maxHeight: '140px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center group">
                <span className="text-3xl sm:text-4xl mb-2 transform transition-transform group-hover:scale-110 group-hover:rotate-12">{genre.icon}</span>
                <span className="font-medium text-sm md:text-base text-center">{genre.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Recommended section (1 column layout on mobile, 3 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Recently played */}
        <section className="col-span-1 lg:col-span-2">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white mb-4 px-1 slide-in" 
             style={{ animationDelay: '0.25s' }}>
            Recently Played
          </h2>
          
          <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md hover:shadow-lg transition-shadow">
            {recentlyPlayed.map((track, index) => (
              <div 
                key={track.id}
                className="slide-in hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
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
            <div className="p-3 text-center">
              <Link to="/history" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                View Full History
              </Link>
            </div>
          </div>
        </section>
        
        {/* New releases with improved design */}
        <section className="col-span-1 mt-2 lg:mt-0">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white mb-4 px-1 slide-in" 
             style={{ animationDelay: '0.3s' }}>
            New Releases
          </h2>
          
          <div className="space-y-3 md:space-y-4">
            {newReleases.map((track, index) => (
              <div 
                key={track.id}
                className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition-all 
                         hover:translate-x-1 transform flex gap-3 items-center scale-in group"
                style={{ animationDelay: `${0.35 + index * 0.05}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-all">
                  <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-secondary-900 dark:text-white truncate">{track.title}</h3>
                  <p className="text-xs md:text-sm text-secondary-600 dark:text-secondary-400 truncate">{track.artist}</p>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-medium flex items-center">
                      <SparklesIcon className="w-3 h-3 mr-1" />
                      New Release
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-center">
              <Button className="w-full bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700
                             text-secondary-700 dark:text-secondary-300 text-sm py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700">
                View All New Releases
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Hindi Albums Section */}
      <section className="mt-10 mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white slide-in flex items-center">
            <MusicalNoteIcon className="w-6 h-6 mr-2 text-red-500" />
            Hindi Albums
          </h2>
          <Link 
            to="/hindi-albums" 
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                     flex items-center gap-1 group slide-in" 
            style={{ animationDelay: '0.1s' }}
          >
            View All 
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {hindiAlbums.map((album, index) => (
            <div 
              key={album.id}
              className="bg-white dark:bg-dark-light rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={album.coverArt} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAlbumPreview(album);
                    }}
                    className="p-3 bg-primary-600 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                  >
                    <PlayIcon className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              <Link to="/hindi-albums" className="block p-3">
                <h3 className="font-semibold text-secondary-900 dark:text-white truncate text-sm">{album.title}</h3>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 truncate">{album.artist}</p>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Hindi Collection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {hindiCollections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white dark:bg-dark-light rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <Link
                to={`/hindi-collection/${collection.id}`}
                className="block"
              >
                <div className={`h-24 bg-gradient-to-r ${collection.color} relative p-4`}>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl opacity-70 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                    {collection.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white">{collection.title}</h3>
                  </div>
                </div>
              </Link>
              <div className="p-3 flex justify-end">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    playAlbumPreview(collection);
                  }}
                  className="p-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200"
                >
                  <PlayIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Personalized Recommendations - NEW SECTION */}
      <section className="mt-8">
        <div className="bg-gradient-to-r from-primary-100/70 to-secondary-100/70 dark:from-primary-900/30 dark:to-secondary-900/30 
                     backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white slide-in">
                Made For You
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm md:text-base">
                Personalized recommendations based on your listening habits
              </p>
            </div>
            <Button className="self-start md:self-center bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2 
                       rounded-lg shadow-sm hover:shadow-md transition-all">
              Refresh Recommendations
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['Daily Mix', 'Discover Weekly', 'Release Radar'].map((playlistName, index) => (
              <Link
                key={playlistName}
                to={`/playlist/${playlistName.toLowerCase().replace(/\s/g, '-')}`}
                className="bg-white/70 dark:bg-dark-light/70 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3
                         hover:shadow-md transition-all group scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-md shadow-sm overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${playlistName}/160`} 
                    alt={playlistName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base text-secondary-900 dark:text-white">{playlistName}</h3>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400">Updated today</p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center justify-center bg-secondary-900/10 dark:bg-white/10 
                                  text-secondary-900 dark:text-white rounded-full text-xs px-2 py-0.5">
                      30+ songs
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Album Categories Section */}
      <section className="mt-10 mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white slide-in flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-blue-500" />
            Album Categories
          </h2>
          <Link 
            to="/album-categories" 
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 
                     flex items-center gap-1 group slide-in" 
            style={{ animationDelay: '0.1s' }}
          >
            View All 
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { id: '90s', name: '90s Hits', icon: '🎧', color: 'bg-indigo-600' },
            { id: 'sad', name: 'Sad Songs', icon: '😢', color: 'bg-gray-700' },
            { id: 'romance', name: 'Romance', icon: '❤️', color: 'bg-pink-600' },
            { id: 'love', name: 'Love Songs', icon: '💘', color: 'bg-red-600' },
            { id: 'hits', name: 'Top Hits', icon: '🔥', color: 'bg-amber-500' }
          ].map((category) => (
            <Link
              key={category.id}
              to="/album-categories"
              className="bg-white dark:bg-dark-light rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center text-2xl`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-secondary-900 dark:text-white">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
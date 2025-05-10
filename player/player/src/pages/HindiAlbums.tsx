import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  PlayIcon, 
  SparklesIcon, 
  MusicalNoteIcon,
  FireIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';

// Album types
const ALBUM_TYPES = [
  { id: 'all', name: 'All Albums' },
  { id: 'bollywood', name: 'Bollywood' },
  { id: 'indie', name: 'Indie Hindi' },
  { id: 'devotional', name: 'Devotional' },
  { id: 'classic', name: 'Classic Hindi' },
  { id: 'remix', name: 'Remixes' }
];

// Sample albums with songs
const ALBUMS = [
  {
    id: 'kalank',
    title: 'Kalank',
    artist: 'Various Artists',
    type: 'bollywood',
    coverArt: 'https://placehold.co/500x500/bb3939/FFFFFF?text=Kalank',
    year: 2019,
    songs: [
      {
        id: 'kalank-title-track',
        title: 'Kalank Title Track',
        artist: 'Arijit Singh',
        coverArt: 'https://placehold.co/500x500/bb3939/FFFFFF?text=Kalank',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 248
      },
      {
        id: 'tabaah-ho-gaye',
        title: 'Tabaah Ho Gaye',
        artist: 'Shreya Ghoshal',
        coverArt: 'https://placehold.co/500x500/bb3939/FFFFFF?text=Kalank',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 298
      },
      {
        id: 'first-class',
        title: 'First Class',
        artist: 'Arijit Singh',
        coverArt: 'https://placehold.co/500x500/bb3939/FFFFFF?text=Kalank',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 219
      }
    ]
  },
  {
    id: 'kabir-singh',
    title: 'Kabir Singh',
    type: 'bollywood',
    artist: 'Various Artists',
    coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Kabir+Singh',
    year: 2019,
    songs: [
      {
        id: 'bekhayali',
        title: 'Bekhayali',
        artist: 'Sachet Tandon',
        coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Kabir+Singh',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 273
      },
      {
        id: 'kaise-hua',
        title: 'Kaise Hua',
        artist: 'Vishal Mishra',
        coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Kabir+Singh',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 198
      },
      {
        id: 'tujhe-kitna-chahne-lage',
        title: 'Tujhe Kitna Chahne Lage',
        artist: 'Arijit Singh',
        coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Kabir+Singh',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 237
      }
    ]
  },
  {
    id: 'kedarnath',
    title: 'Kedarnath',
    type: 'bollywood',
    artist: 'Amit Trivedi',
    coverArt: 'https://placehold.co/500x500/3962ae/FFFFFF?text=Kedarnath',
    year: 2018,
    songs: [
      {
        id: 'namo-namo',
        title: 'Namo Namo',
        artist: 'Amit Trivedi',
        coverArt: 'https://placehold.co/500x500/3962ae/FFFFFF?text=Kedarnath',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 280
      },
      {
        id: 'qaafirana',
        title: 'Qaafirana',
        artist: 'Arijit Singh & Nikhita Gandhi',
        coverArt: 'https://placehold.co/500x500/3962ae/FFFFFF?text=Kedarnath',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 268
      }
    ]
  },
  {
    id: 'tu-hai-ram',
    title: 'Tu Hai Ram',
    type: 'devotional',
    artist: 'Anup Jalota',
    coverArt: 'https://placehold.co/500x500/e9b842/FFFFFF?text=Devotional',
    year: 2015,
    songs: [
      {
        id: 'tu-hai-ram-title',
        title: 'Tu Hai Ram',
        artist: 'Anup Jalota',
        coverArt: 'https://placehold.co/500x500/e9b842/FFFFFF?text=Devotional',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 312
      },
      {
        id: 'shree-hanuman-chalisa',
        title: 'Shree Hanuman Chalisa',
        artist: 'Anup Jalota',
        coverArt: 'https://placehold.co/500x500/e9b842/FFFFFF?text=Devotional',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 456
      }
    ]
  },
  {
    id: 'chhayanat',
    title: 'Chhayanat',
    type: 'classic',
    artist: 'Pandit Jasraj',
    coverArt: 'https://placehold.co/500x500/5a8a7a/FFFFFF?text=Classical',
    year: 1997,
    songs: [
      {
        id: 'raag-chhayanat',
        title: 'Raag Chhayanat',
        artist: 'Pandit Jasraj',
        coverArt: 'https://placehold.co/500x500/5a8a7a/FFFFFF?text=Classical',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 628
      },
      {
        id: 'mero-allah-meherbaan',
        title: 'Mero Allah Meherbaan',
        artist: 'Pandit Jasraj',
        coverArt: 'https://placehold.co/500x500/5a8a7a/FFFFFF?text=Classical',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 514
      }
    ]
  },
  {
    id: 'naya-safar',
    title: 'Naya Safar',
    type: 'indie',
    artist: 'The Yellow Diary',
    coverArt: 'https://placehold.co/500x500/41a35a/FFFFFF?text=Indie',
    year: 2021,
    songs: [
      {
        id: 'roz-roz',
        title: 'Roz Roz',
        artist: 'The Yellow Diary',
        coverArt: 'https://placehold.co/500x500/41a35a/FFFFFF?text=Indie',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 249
      },
      {
        id: 'dhoondti-firaan',
        title: 'Dhoondti Firaan',
        artist: 'The Yellow Diary',
        coverArt: 'https://placehold.co/500x500/41a35a/FFFFFF?text=Indie',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 223
      }
    ]
  },
  {
    id: 'remix-party',
    title: 'Bollywood Remix Party',
    type: 'remix',
    artist: 'DJ Akbar Sami',
    coverArt: 'https://placehold.co/500x500/c042a3/FFFFFF?text=Remix',
    year: 2020,
    songs: [
      {
        id: 'kaanta-laga-remix',
        title: 'Kaanta Laga (Remix)',
        artist: 'DJ Akbar Sami',
        coverArt: 'https://placehold.co/500x500/c042a3/FFFFFF?text=Remix',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 287
      },
      {
        id: 'dilbar-dilbar-remix',
        title: 'Dilbar Dilbar (Remix)',
        artist: 'DJ Akbar Sami',
        coverArt: 'https://placehold.co/500x500/c042a3/FFFFFF?text=Remix',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 302
      }
    ]
  }
];

export const HindiAlbums: React.FC = () => {
  const { play } = usePlayer();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);

  const filteredAlbums = selectedType === 'all' 
    ? ALBUMS 
    : ALBUMS.filter(album => album.type === selectedType);

  const toggleAlbumExpansion = (albumId: string) => {
    if (expandedAlbum === albumId) {
      setExpandedAlbum(null);
    } else {
      setExpandedAlbum(albumId);
    }
  };

  const playAlbum = (albumId: string) => {
    const album = ALBUMS.find(a => a.id === albumId);
    if (album && album.songs.length > 0) {
      play({
        id: album.songs[0].id,
        title: album.songs[0].title,
        artist: album.songs[0].artist,
        album: album.title,
        coverArt: album.songs[0].coverArt,
        audioSrc: album.songs[0].audioSrc,
        duration: album.songs[0].duration
      });
    }
  };

  return (
    <div className="pb-8 px-2 sm:px-0 fade-in">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700 via-red-800 to-purple-900 opacity-95"></div>
        
        <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0 
                        bg-gradient-to-br from-orange-500/30 to-red-600/30 backdrop-blur-lg 
                        rounded-2xl shadow-2xl border border-white/10
                        flex items-center justify-center text-center p-4 transform transition-transform duration-500 
                        hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl z-10">🎵</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="slide-up">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Hindi Albums Collection
                </h1>
                <p className="text-white/80 mt-3 text-sm md:text-base mb-4 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  Explore the best of Hindi music across various genres - from classic Bollywood hits to devotional hymns and indie gems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="mb-6 overflow-x-auto pb-2 md:px-2">
        <div className="flex space-x-2 md:space-x-4 min-w-max">
          {ALBUM_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedType === type.id
                  ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-700/40'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800/40'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Albums List */}
      <div className="space-y-8">
        {filteredAlbums.map((album) => (
          <div key={album.id} className="bg-white dark:bg-dark-light rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Album Cover and Info */}
              <div className="w-full sm:w-64 md:w-80 flex-shrink-0 relative group">
                <img 
                  src={album.coverArt} 
                  alt={album.title} 
                  className="w-full h-48 sm:h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => playAlbum(album.id)}
                    className="p-3 bg-primary-600 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                  >
                    <PlayIcon className="w-8 h-8 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Album Details */}
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">{album.title}</h2>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">{album.artist} • {album.year}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                        {ALBUM_TYPES.find(t => t.id === album.type)?.name}
                      </span>
                      <span className="inline-flex items-center text-xs text-secondary-500 dark:text-secondary-400">
                        <MusicalNoteIcon className="w-3 h-3 mr-1" />
                        {album.songs.length} songs
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    onClick={() => toggleAlbumExpansion(album.id)}
                  >
                    <ChevronRightIcon className={`w-5 h-5 transition-transform duration-300 ${expandedAlbum === album.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
                
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => playAlbum(album.id)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-full flex items-center"
                  >
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Play
                  </button>
                  <button className="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full flex items-center">
                    <HeartIcon className="w-4 h-4 mr-1" />
                    Like
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expandable Songs List */}
            {expandedAlbum === album.id && (
              <div className="px-5 pb-5 divide-y divide-secondary-200 dark:divide-secondary-700/30">
                <h3 className="font-medium text-secondary-900 dark:text-white py-3">Tracks</h3>
                <div className="space-y-1 pt-2">
                  {album.songs.map((song, index) => (
                    <div key={song.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors rounded-md overflow-hidden">
                      <TrackCard
                        id={song.id}
                        title={song.title}
                        artist={song.artist}
                        album={album.title}
                        coverArt={song.coverArt}
                        audioSrc={song.audioSrc}
                        duration={song.duration}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Featured Collections */}
      <section className="mt-10">
        <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white mb-5 px-1 flex items-center">
          <SparklesIcon className="w-6 h-6 mr-2 text-orange-500" />
          Curated Collections
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'romantic', title: 'Romantic Hits', count: '50+ songs', color: 'from-pink-600 to-red-600', icon: '💕' },
            { id: 'party', title: 'Party Anthems', count: '40+ songs', color: 'from-purple-600 to-indigo-600', icon: '🎉' },
            { id: 'retro', title: 'Retro Classics', count: '60+ songs', color: 'from-amber-600 to-orange-600', icon: '🎸' }
          ].map((collection) => (
            <Link
              key={collection.id}
              to={`/hindi-collection/${collection.id}`}
              className="bg-white dark:bg-dark-light rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className={`h-32 bg-gradient-to-r ${collection.color} relative p-5`}>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl opacity-70 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                  {collection.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white">{collection.title}</h3>
                  <p className="text-white/80">{collection.count}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-sm text-secondary-600 dark:text-secondary-400">Curated collection</span>
                <button className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors">
                  <PlayIcon className="w-5 h-5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}; 
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  PlayIcon, 
  PauseIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';

// Collection data
const COLLECTIONS = {
  'romantic': {
    title: 'Romantic Hits',
    description: 'The most heart-touching romantic songs from Hindi cinema.',
    color: 'from-pink-600 to-red-600',
    icon: '💕',
    coverImage: 'https://placehold.co/800x400/e83a77/FFFFFF?text=Romantic+Hits'
  },
  'party': {
    title: 'Party Anthems',
    description: 'Get the party started with these high-energy dance numbers.',
    color: 'from-purple-600 to-indigo-600',
    icon: '🎉',
    coverImage: 'https://placehold.co/800x400/6a48b0/FFFFFF?text=Party+Anthems'
  },
  'retro': {
    title: 'Retro Classics',
    description: 'Timeless melodies from the golden era of Hindi music.',
    color: 'from-amber-600 to-orange-600',
    icon: '🎸',
    coverImage: 'https://placehold.co/800x400/e9732f/FFFFFF?text=Retro+Classics'
  }
};

// Sample tracks for each collection
const COLLECTION_TRACKS = {
  'romantic': [
    {
      id: 'tum-hi-ho',
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh',
      album: 'Aashiqui 2',
      coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Aashiqui+2',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 261
    },
    {
      id: 'raabta',
      title: 'Raabta',
      artist: 'Arijit Singh',
      album: 'Agent Vinod',
      coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Agent+Vinod',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 243
    },
    {
      id: 'agar-tum-saath-ho',
      title: 'Agar Tum Saath Ho',
      artist: 'Arijit Singh & Alka Yagnik',
      album: 'Tamasha',
      coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Tamasha',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      duration: 341
    },
    {
      id: 'mere-naam-tu',
      title: 'Mere Naam Tu',
      artist: 'Abhay Jodhpurkar',
      album: 'Zero',
      coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Zero',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 289
    },
    {
      id: 'pehla-pyaar',
      title: 'Pehla Pyaar',
      artist: 'Armaan Malik',
      album: 'Kabir Singh',
      coverArt: 'https://placehold.co/500x500/e83a77/FFFFFF?text=Kabir+Singh',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 258
    }
  ],
  'party': [
    {
      id: 'badtameez-dil',
      title: 'Badtameez Dil',
      artist: 'Benny Dayal',
      album: 'Yeh Jawaani Hai Deewani',
      coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=YJHD',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 243
    },
    {
      id: 'kar-gayi-chull',
      title: 'Kar Gayi Chull',
      artist: 'Badshah & Neha Kakkar',
      album: 'Kapoor & Sons',
      coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=K%26S',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 228
    },
    {
      id: 'saturday-saturday',
      title: 'Saturday Saturday',
      artist: 'Badshah & Indeep Bakshi',
      album: 'Humpty Sharma Ki Dulhania',
      coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=HSKD',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      duration: 195
    },
    {
      id: 'abhi-toh-party',
      title: 'Abhi Toh Party Shuru Hui Hai',
      artist: 'Aastha Gill',
      album: 'Khoobsurat',
      coverArt: 'https://placehold.co/500x500/6a48b0/FFFFFF?text=Khoobsurat',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 182
    }
  ],
  'retro': [
    {
      id: 'ek-pyaar-ka-nagma',
      title: 'Ek Pyaar Ka Nagma Hai',
      artist: 'Lata Mangeshkar',
      album: 'Shor',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Shor',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 326
    },
    {
      id: 'tere-bina-zindagi',
      title: 'Tere Bina Zindagi Se',
      artist: 'Kishore Kumar & Lata Mangeshkar',
      album: 'Aandhi',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Aandhi',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 315
    },
    {
      id: 'mere-sapno-ki-rani',
      title: 'Mere Sapno Ki Rani',
      artist: 'Kishore Kumar',
      album: 'Aradhana',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Aradhana',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      duration: 292
    },
    {
      id: 'piya-tose',
      title: 'Piya Tose Naina Lage Re',
      artist: 'Lata Mangeshkar',
      album: 'Guide',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Guide',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 264
    },
    {
      id: 'pyar-kiya-to-darna',
      title: 'Pyar Kiya To Darna Kya',
      artist: 'Lata Mangeshkar',
      album: 'Mughal-e-Azam',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Mughal-e-Azam',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 317
    },
    {
      id: 'lag-ja-gale',
      title: 'Lag Ja Gale',
      artist: 'Lata Mangeshkar',
      album: 'Woh Kaun Thi',
      coverArt: 'https://placehold.co/500x500/e9732f/FFFFFF?text=Woh+Kaun+Thi',
      audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      duration: 278
    }
  ]
};

export const HindiCollection: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { play, isPlaying, currentTrack, playPause } = usePlayer();
  
  if (!collectionId || !COLLECTIONS[collectionId as keyof typeof COLLECTIONS]) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Collection Not Found</h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">The collection you're looking for doesn't exist.</p>
        <Link 
          to="/hindi-albums" 
          className="px-4 py-2 bg-primary-600 rounded-lg text-white flex items-center"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Albums
        </Link>
      </div>
    );
  }
  
  const collection = COLLECTIONS[collectionId as keyof typeof COLLECTIONS];
  const tracks = COLLECTION_TRACKS[collectionId as keyof typeof COLLECTION_TRACKS] || [];
  
  const playCollection = () => {
    if (tracks.length > 0) {
      play({
        id: tracks[0].id,
        title: tracks[0].title,
        artist: tracks[0].artist,
        album: tracks[0].album,
        coverArt: tracks[0].coverArt,
        audioSrc: tracks[0].audioSrc,
        duration: tracks[0].duration
      });
    }
  };
  
  const isCollectionPlaying = isPlaying && currentTrack && tracks.some(track => track.id === currentTrack.id);
  
  return (
    <div className="fade-in">
      {/* Hero Banner */}
      <div className={`w-full h-64 sm:h-80 relative bg-gradient-to-r ${collection.color} mb-6 rounded-xl overflow-hidden`}>
        <img 
          src={collection.coverImage} 
          alt={collection.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <div className="text-4xl mb-2">{collection.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{collection.title}</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl">{collection.description}</p>
          
          <div className="flex items-center mt-4 gap-3">
            <button
              onClick={isCollectionPlaying ? playPause : playCollection}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center gap-2 shadow-md"
            >
              {isCollectionPlaying && isPlaying ? (
                <>
                  <PauseIcon className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  Play All
                </>
              )}
            </button>
            
            <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors">
              <HeartIcon className="w-5 h-5" />
            </button>
            
            <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Tracks */}
      <div className="mx-2 sm:mx-6">
        <div className="bg-white dark:bg-dark-light rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b border-secondary-200 dark:border-secondary-800">
            <h2 className="font-bold text-secondary-900 dark:text-white">Tracks • {tracks.length}</h2>
          </div>
          
          <div className="divide-y divide-secondary-200/50 dark:divide-secondary-800/50">
            {tracks.map((track, index) => (
              <div 
                key={track.id}
                className="hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
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
        
        <div className="mb-8">
          <Link 
            to="/hindi-albums" 
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center w-fit"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Hindi Albums
          </Link>
        </div>
      </div>
    </div>
  );
}; 
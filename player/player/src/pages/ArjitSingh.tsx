import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const ArjitSingh: React.FC = () => {
  const { play } = usePlayer();
  
  // Filter only Arijit Singh songs (in a real app, this would come from an API)
  const arijitSongs: Track[] = [
    {
      id: 'arijit-1',
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh',
      album: 'Aashiqui 2',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273a9b4a06a6d73d994c90c9a5c',
      duration: 280,
      audioSrc: '/audio/tum-hi-ho.mp3'
    },
    {
      id: 'arijit-2',
      title: 'Channa Mereya',
      artist: 'Arijit Singh',
      album: 'Ae Dil Hai Mushkil',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273a3a7c2ef8759d583799d5265',
      duration: 289,
      audioSrc: '/audio/channa-mereya.mp3'
    },
    {
      id: 'arijit-3',
      title: 'Kesariya',
      artist: 'Arijit Singh',
      album: 'Brahmastra',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b27337f65266754703fd20d29854',
      duration: 268,
      audioSrc: '/audio/kesariya.mp3'
    },
    {
      id: 'arijit-4',
      title: 'Gerua',
      artist: 'Arijit Singh',
      album: 'Dilwale',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2737d214af8499aa95ad220f573',
      duration: 271,
      audioSrc: '/audio/gerua.mp3'
    },
    {
      id: 'arijit-5',
      title: 'Ae Dil Hai Mushkil',
      artist: 'Arijit Singh',
      album: 'Ae Dil Hai Mushkil',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273a3a7c2ef8759d583799d5265',
      duration: 274,
      audioSrc: '/audio/ae-dil-hai-mushkil.mp3'
    },
    {
      id: 'arijit-6',
      title: 'Khairiyat',
      artist: 'Arijit Singh',
      album: 'Chhichhore',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273776a8d0b2965cd9c2a2cf4f7',
      duration: 264,
      audioSrc: '/audio/khairiyat.mp3'
    },
    {
      id: 'arijit-7',
      title: 'Laal Ishq',
      artist: 'Arijit Singh',
      album: 'Goliyon Ki Raasleela Ram-Leela',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d9b35c32a8170a0780bd97d3',
      duration: 305,
      audioSrc: '/audio/laal-ishq.mp3'
    },
    {
      id: 'arijit-8',
      title: 'Kalank Title Track',
      artist: 'Arijit Singh',
      album: 'Kalank',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273e6ef7dd3b51121011792e0c3',
      duration: 310,
      audioSrc: '/audio/kalank.mp3'
    },
    {
      id: 'arijit-9',
      title: 'Phir Aur Kya Chahiye',
      artist: 'Arijit Singh',
      album: 'Zara Hatke Zara Bachke',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273bdba53f6fa43793fed66975f',
      duration: 281,
      audioSrc: '/audio/phir-aur-kya-chahiye.mp3'
    },
    {
      id: 'arijit-10',
      title: 'Apna Bana Le',
      artist: 'Arijit Singh',
      album: 'Bhediya',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2735b74e703d6ffb2ea16860c86',
      duration: 275,
      audioSrc: '/audio/apna-bana-le.mp3'
    }
  ];

  const handlePlayAll = () => {
    // Pass the full track object instead of just the ID
    play(arijitSongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-700 to-blue-900 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="music-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 0 0 L 4 4 M 4 0 L 0 4" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#music-pattern)" />
          </svg>
        </div>

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5eb9a94c1f2850a90284af51770"
            alt="Arijit Singh"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Arijit Singh</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            One of India's most versatile singers, known for his soulful voice and emotional depth in music.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Button 
              onClick={handlePlayAll}
              className="bg-white hover:bg-white/90 text-primary-900 px-6 py-2.5 flex items-center shadow-md hover:shadow-lg transition-all"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Play All
            </Button>
            <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 flex items-center">
              <HeartIcon className="w-5 h-5 mr-2" />
              Follow
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
        {arijitSongs.map((track) => (
          <div key={track.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors">
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
  );
};
import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const HoneySingh: React.FC = () => {
  const { play } = usePlayer();
  
  const honeySongs: Track[] = [
    {
      id: 'honey-1',
      title: 'Brown Rang',
      artist: 'Yo Yo Honey Singh',
      album: 'International Villager',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c719a4f7c46a856c7a1c2d2c',
      duration: 237,
      audioSrc: '/audio/brown-rang.mp3'
    },
    {
      id: 'honey-2',
      title: 'Blue Eyes',
      artist: 'Yo Yo Honey Singh',
      album: 'Blue Eyes',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b6af6a63af90bf3b02615c0',
      duration: 205,
      audioSrc: '/audio/blue-eyes.mp3'
    },
    {
      id: 'honey-3',
      title: 'Desi Kalakaar',
      artist: 'Yo Yo Honey Singh',
      album: 'Desi Kalakaar',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f2d2adaa21ad616df6241bd7',
      duration: 256,
      audioSrc: '/audio/desi-kalakaar.mp3'
    },
    {
      id: 'honey-4',
      title: 'Lungi Dance',
      artist: 'Yo Yo Honey Singh',
      album: 'Chennai Express',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d8501b63d0da46536937e3c7',
      duration: 242,
      audioSrc: '/audio/lungi-dance.mp3'
    },
    {
      id: 'honey-5',
      title: 'Chaar Botal Vodka',
      artist: 'Yo Yo Honey Singh',
      album: 'Ragini MMS 2',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273e1f61f916ee3b3151e4d3c6c',
      duration: 244,
      audioSrc: '/audio/chaar-botal-vodka.mp3'
    },
    {
      id: 'honey-6',
      title: 'Party All Night',
      artist: 'Yo Yo Honey Singh',
      album: 'Boss',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f1c25da27f4c3c6a50921a2d',
      duration: 268,
      audioSrc: '/audio/party-all-night.mp3'
    },
    {
      id: 'honey-7',
      title: 'Love Dose',
      artist: 'Yo Yo Honey Singh',
      album: 'Desi Kalakaar',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f2d2adaa21ad616df6241bd7',
      duration: 251,
      audioSrc: '/audio/love-dose.mp3'
    },
    {
      id: 'honey-8',
      title: 'Sunny Sunny',
      artist: 'Yo Yo Honey Singh',
      album: 'Yaariyan',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2736a07f0689f3f937d2561d3d1',
      duration: 234,
      audioSrc: '/audio/sunny-sunny.mp3'
    },
    {
      id: 'honey-9',
      title: 'Aankhon Aankhon',
      artist: 'Yo Yo Honey Singh',
      album: 'Bhaag Johnny',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273af3c1ad5ae8c37e8a792d48c',
      duration: 248,
      audioSrc: '/audio/aankhon-aankhon.mp3'
    },
    {
      id: 'honey-10',
      title: 'Birthday Bash',
      artist: 'Yo Yo Honey Singh',
      album: 'Dilliwaali Zaalim Girlfriend',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d8e19d336d2655c550f05b37',
      duration: 228,
      audioSrc: '/audio/birthday-bash.mp3'
    }
  ];

  const handlePlayAll = () => {
    play(honeySongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-yellow-600 to-red-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
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

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-yellow-500/20 to-red-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5ebf01a0d33f489e09903384629"
            alt="Yo Yo Honey Singh"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Yo Yo Honey Singh</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            Indian rapper, music producer and singer known for his high-energy performances and chart-topping Bollywood hits.
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
        {honeySongs.map((track) => (
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
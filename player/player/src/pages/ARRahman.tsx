import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const ARRahman: React.FC = () => {
  const { play } = usePlayer();
  
  const rahmanSongs: Track[] = [
    {
      id: 'rahman-1',
      title: 'Jai Ho',
      artist: 'A.R. Rahman',
      album: 'Slumdog Millionaire',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
      duration: 318,
      audioSrc: '/audio/jai-ho.mp3'
    },
    {
      id: 'rahman-2',
      title: 'Dil Se Re',
      artist: 'A.R. Rahman',
      album: 'Dil Se',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c5855580d27572e9ec3d334c',
      duration: 332,
      audioSrc: '/audio/dil-se-re.mp3'
    },
    {
      id: 'rahman-3',
      title: 'Chaiyya Chaiyya',
      artist: 'A.R. Rahman',
      album: 'Dil Se',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c5855580d27572e9ec3d334c',
      duration: 427,
      audioSrc: '/audio/chaiyya-chaiyya.mp3'
    },
    {
      id: 'rahman-4',
      title: 'Tere Bina',
      artist: 'A.R. Rahman',
      album: 'Guru',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b27326e5d7580b7066a88c286389',
      duration: 308,
      audioSrc: '/audio/tere-bina.mp3'
    },
    {
      id: 'rahman-5',
      title: 'Ranjha Ranjha',
      artist: 'A.R. Rahman',
      album: 'Raavan',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273df7ff39cc2ae35cf736b5743',
      duration: 292,
      audioSrc: '/audio/ranjha-ranjha.mp3'
    },
    {
      id: 'rahman-6',
      title: 'Kun Faya Kun',
      artist: 'A.R. Rahman',
      album: 'Rockstar',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273df9b18de13280f3f47d5767d',
      duration: 457,
      audioSrc: '/audio/kun-faya-kun.mp3'
    },
    {
      id: 'rahman-7',
      title: 'Tu Hi Re',
      artist: 'A.R. Rahman',
      album: 'Bombay',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c8f50e127767bd2b01773e95',
      duration: 353,
      audioSrc: '/audio/tu-hi-re.mp3'
    },
    {
      id: 'rahman-8',
      title: 'Khwaja Mere Khwaja',
      artist: 'A.R. Rahman',
      album: 'Jodhaa Akbar',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f8428f4c04393bd0fd73076e',
      duration: 366,
      audioSrc: '/audio/khwaja-mere-khwaja.mp3'
    },
    {
      id: 'rahman-9',
      title: 'Maa Tujhe Salaam',
      artist: 'A.R. Rahman',
      album: 'Vande Mataram',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273ba447e859e4c37704615c436',
      duration: 398,
      audioSrc: '/audio/maa-tujhe-salaam.mp3'
    },
    {
      id: 'rahman-10',
      title: 'Dil Hai Chota Sa',
      artist: 'A.R. Rahman',
      album: 'Roja',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2735b063c63b4e432082c89e738',
      duration: 328,
      audioSrc: '/audio/dil-hai-chota-sa.mp3'
    }
  ];

  const handlePlayAll = () => {
    play(rahmanSongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-green-600 to-blue-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
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

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-green-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5eb1a096475272874df420a7ae8"
            alt="A.R. Rahman"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">A.R. Rahman</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            Oscar-winning composer and musical genius known for revolutionizing Indian film music with his unique blend of traditional and contemporary sounds.
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
        {rahmanSongs.map((track) => (
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
import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const UditNarayan: React.FC = () => {
  const { play } = usePlayer();
  
  const uditSongs: Track[] = [
    {
      id: 'udit-1',
      title: 'Pehla Nasha',
      artist: 'Udit Narayan',
      album: 'Jo Jeeta Wohi Sikandar',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c8a7a34c0b8e5b4a30897e5b',
      duration: 295,
      audioSrc: '/audio/pehla-nasha.mp3'
    },
    {
      id: 'udit-2',
      title: 'Papa Kehte Hain',
      artist: 'Udit Narayan',
      album: 'Qayamat Se Qayamat Tak',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f6674c57c34f62c8752c3b38',
      duration: 276,
      audioSrc: '/audio/papa-kehte-hain.mp3'
    },
    {
      id: 'udit-3',
      title: 'Main Nikla Gaddi Leke',
      artist: 'Udit Narayan',
      album: 'Gadar: Ek Prem Katha',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273a8bca670cce0f1cff794c695',
      duration: 312,
      audioSrc: '/audio/main-nikla-gaddi-leke.mp3'
    },
    {
      id: 'udit-4',
      title: 'Tip Tip Barsa Paani',
      artist: 'Udit Narayan',
      album: 'Mohra',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2735cc1c6f337e225571970fd5b',
      duration: 289,
      audioSrc: '/audio/tip-tip-barsa-paani.mp3'
    },
    {
      id: 'udit-5',
      title: 'Kuch Kuch Hota Hai',
      artist: 'Udit Narayan',
      album: 'Kuch Kuch Hota Hai',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273871d85943145dde2d0ab7737',
      duration: 301,
      audioSrc: '/audio/kuch-kuch-hota-hai.mp3'
    },
    {
      id: 'udit-6',
      title: 'Mehndi Laga Ke Rakhna',
      artist: 'Udit Narayan',
      album: 'Dilwale Dulhania Le Jayenge',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273885eb4815c8c43098815d356',
      duration: 271,
      audioSrc: '/audio/mehndi-laga-ke-rakhna.mp3'
    },
    {
      id: 'udit-7',
      title: 'Tu Mere Samne',
      artist: 'Udit Narayan',
      album: 'Darr',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d6cc6a0fb8fbf5b789f7403b',
      duration: 284,
      audioSrc: '/audio/tu-mere-samne.mp3'
    },
    {
      id: 'udit-8',
      title: 'Dil To Pagal Hai',
      artist: 'Udit Narayan',
      album: 'Dil To Pagal Hai',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c9c9526a1df6700c3abdd363',
      duration: 308,
      audioSrc: '/audio/dil-to-pagal-hai.mp3'
    },
    {
      id: 'udit-9',
      title: 'Jaadu Teri Nazar',
      artist: 'Udit Narayan',
      album: 'Darr',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d6cc6a0fb8fbf5b789f7403b',
      duration: 265,
      audioSrc: '/audio/jaadu-teri-nazar.mp3'
    },
    {
      id: 'udit-10',
      title: 'Ae Mere Humsafar',
      artist: 'Udit Narayan',
      album: 'Qayamat Se Qayamat Tak',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f6674c57c34f62c8752c3b38',
      duration: 292,
      audioSrc: '/audio/ae-mere-humsafar.mp3'
    }
  ];

  const handlePlayAll = () => {
    play(uditSongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-orange-600 to-red-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
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

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5eb8208c4fa9192c5270d94efb0"
            alt="Udit Narayan"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Udit Narayan</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            Legendary Indian playback singer known for his melodious voice and countless Bollywood hits spanning over three decades.
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
        {uditSongs.map((track) => (
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
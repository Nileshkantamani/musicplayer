import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const ShayesSoyal: React.FC = () => {
  const { play } = usePlayer();
  
  const shreysSongs: Track[] = [
    {
      id: 'shrey-1',
      title: 'Kaise Mai',
      artist: 'Shrey Singhal',
      album: 'Kaise Mai',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d8ef13efc89f494db5919764',
      duration: 245,
      audioSrc: '/audio/kaise-mai.mp3'
    },
    {
      id: 'shrey-2',
      title: 'Yaara Tu Hi Tu',
      artist: 'Shrey Singhal',
      album: 'Yaara Tu Hi Tu',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273af7e1e3f31f64d28f5e9f47d',
      duration: 238,
      audioSrc: '/audio/yaara-tu-hi-tu.mp3'
    },
    {
      id: 'shrey-3',
      title: 'Teri Yaad',
      artist: 'Shrey Singhal',
      album: 'Teri Yaad',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273b8c5a619d6c08a2fd2af2bbf',
      duration: 256,
      audioSrc: '/audio/teri-yaad.mp3'
    },
    {
      id: 'shrey-4',
      title: 'Bemisaal',
      artist: 'Shrey Singhal',
      album: 'Bemisaal',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2735c9891b8fe11b26f3c45e4df',
      duration: 241,
      audioSrc: '/audio/bemisaal.mp3'
    },
    {
      id: 'shrey-5',
      title: 'Aaja Na Ferrari Mein',
      artist: 'Shrey Singhal',
      album: 'Aaja Na Ferrari Mein',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2738f1c042abe636f6e25eb5f34',
      duration: 233,
      audioSrc: '/audio/aaja-na-ferrari-mein.mp3'
    },
    {
      id: 'shrey-6',
      title: 'Tu Junooniyat',
      artist: 'Shrey Singhal',
      album: 'Tu Junooniyat',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273e8f69ab1dd364ab7dfb2618c',
      duration: 262,
      audioSrc: '/audio/tu-junooniyat.mp3'
    },
    {
      id: 'shrey-7',
      title: 'Dil Ye Bekarar Kyun Hai',
      artist: 'Shrey Singhal',
      album: 'Dil Ye Bekarar Kyun Hai',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c2f3f94503c478b4bab43bef',
      duration: 248,
      audioSrc: '/audio/dil-ye-bekarar-kyun-hai.mp3'
    },
    {
      id: 'shrey-8',
      title: 'Tere Naal',
      artist: 'Shrey Singhal',
      album: 'Tere Naal',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273f78bf84bdb4c59df9ef1ba1a',
      duration: 236,
      audioSrc: '/audio/tere-naal.mp3'
    },
    {
      id: 'shrey-9',
      title: 'Main Teri Ho Gayi',
      artist: 'Shrey Singhal',
      album: 'Main Teri Ho Gayi',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273a5df6c2e8af71f0a3a733b9d',
      duration: 251,
      audioSrc: '/audio/main-teri-ho-gayi.mp3'
    },
    {
      id: 'shrey-10',
      title: 'Toota Jo Kabhi Tara',
      artist: 'Shrey Singhal',
      album: 'Toota Jo Kabhi Tara',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d2f7c2c06dce95ecd51c130e',
      duration: 244,
      audioSrc: '/audio/toota-jo-kabhi-tara.mp3'
    }
  ];

  const handlePlayAll = () => {
    play(shreysSongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
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

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36"
            alt="Shrey Singhal"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Shrey Singhal</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            Rising Indian singer-songwriter known for his soulful voice and romantic compositions.
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
        {shreysSongs.map((track) => (
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
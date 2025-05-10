import React from 'react';
import { TrackCard } from '../components/cards/TrackCard';
import { Button } from '../components/ui/Button';
import { HeartIcon, MoonIcon } from '@heroicons/react/24/outline';

export const ChillEvening: React.FC = () => {
  // Sample chill evening music data - in a real app, this would come from an API or context
  const chillTracks = [
    {
      id: 'chill-1',
      title: 'Moonlight Serenade',
      artist: 'Luna Waves',
      album: 'Evening Essence',
      coverArt: 'https://picsum.photos/seed/chill1/400',
      duration: 264,
      audioSrc: '/audio/chill1.mp3'
    },
    {
      id: 'chill-2',
      title: 'Starlit Dreams',
      artist: 'Night Spirits',
      album: 'Twilight Tales',
      coverArt: 'https://picsum.photos/seed/chill2/400',
      duration: 285,
      audioSrc: '/audio/chill2.mp3'
    },
    {
      id: 'chill-3',
      title: 'Ocean Whispers',
      artist: 'Calm Tides',
      album: 'Peaceful Night',
      coverArt: 'https://picsum.photos/seed/chill3/400',
      duration: 312,
      audioSrc: '/audio/chill3.mp3'
    },
    {
      id: 'chill-4',
      title: 'Evening Rain',
      artist: 'Nature Sounds',
      album: 'Natural Calm',
      coverArt: 'https://picsum.photos/seed/chill4/400',
      duration: 298,
      audioSrc: '/audio/chill4.mp3'
    }
  ];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 to-purple-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="chill-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chill-pattern)" />
          </svg>
        </div>

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10 scale-in z-10">
          <MoonIcon className="w-20 h-20 text-white/80" />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Chill Evening</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Unwind & Relax</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl">
            A collection of soothing melodies perfect for your evening relaxation. Let the calm wash over you as you wind down your day.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
            <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 flex items-center">
              <HeartIcon className="w-5 h-5 mr-2" />
              Save to Library
            </Button>
          </div>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl overflow-hidden divide-y divide-secondary-200/50 dark:divide-secondary-800/50 shadow-md">
        {chillTracks.map((track) => (
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

export default ChillEvening;
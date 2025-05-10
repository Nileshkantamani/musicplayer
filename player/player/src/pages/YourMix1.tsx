import React from 'react';
import { TrackCard } from '../components/cards/TrackCard';
import { Button } from '../components/ui/Button';
import { HeartIcon } from '@heroicons/react/24/outline';

export const YourMix1: React.FC = () => {
  // Sample personalized tracks - in a real app, this would be based on user's listening history
  const personalizedTracks = [
    {
      id: 'personal-1',
      title: 'Your Groove',
      artist: 'Melody Masters',
      album: 'Personal Picks Vol. 1',
      coverArt: 'https://picsum.photos/seed/yourmix1/400',
      duration: 242,
      audioSrc: '/audio/yourmix1.mp3'
    },
    {
      id: 'personal-2',
      title: 'Favorite Beat',
      artist: 'Rhythm Squad',
      album: 'Your Collection',
      coverArt: 'https://picsum.photos/seed/yourmix2/400',
      duration: 235,
      audioSrc: '/audio/yourmix2.mp3'
    },
    {
      id: 'personal-3',
      title: 'Perfect Match',
      artist: 'Sound Select',
      album: 'Personalized Hits',
      coverArt: 'https://picsum.photos/seed/yourmix3/400',
      duration: 268,
      audioSrc: '/audio/yourmix3.mp3'
    },
    {
      id: 'personal-4',
      title: 'Your Style',
      artist: 'Custom Beats',
      album: 'Tailored Tunes',
      coverArt: 'https://picsum.photos/seed/yourmix4/400',
      duration: 254,
      audioSrc: '/audio/yourmix4.mp3'
    }
  ];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="mix-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mix-pattern)" />
          </svg>
        </div>

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10 scale-in z-10">
          <span className="text-6xl md:text-7xl">🎵</span>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Your Mix</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Personalized For You</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl">
            A custom mix of tracks based on your listening history. Discover new songs that match your unique taste.
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
        {personalizedTracks.map((track) => (
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

export default YourMix1;
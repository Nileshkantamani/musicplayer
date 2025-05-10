import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

// This array should match the featured artists array from Home.tsx
const allArtists = [
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

export const AllArtists: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">All Artists</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Discover all your favorite artists in one place</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {allArtists.map((artist) => (
          <Link
            key={artist.id}
            to={`/artist/${artist.id}`}
            className="bg-white dark:bg-dark-light rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group scale-in"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-500/20">
                <img 
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayIcon className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-secondary-900 dark:text-white text-lg mb-1">{artist.name}</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">{artist.type}</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full">
                    View Artist
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
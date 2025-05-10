import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Track } from '../types/Track';

export const SonuNigam: React.FC = () => {
  const { play } = usePlayer();
  
  const sonuSongs: Track[] = [
    {
      id: 'sonu-1',
      title: 'Kal Ho Naa Ho',
      artist: 'Sonu Nigam',
      album: 'Kal Ho Naa Ho',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273fc4f17340773c6c3952716bc',
      duration: 325,
      audioSrc: '/audio/kal-ho-naa-ho.mp3'
    },
    {
      id: 'sonu-2',
      title: 'Main Hoon Na',
      artist: 'Sonu Nigam',
      album: 'Main Hoon Na',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2738188d39fa41875936b668ce7',
      duration: 345,
      audioSrc: '/audio/main-hoon-na.mp3'
    },
    {
      id: 'sonu-3',
      title: 'Suraj Hua Maddham',
      artist: 'Sonu Nigam',
      album: 'Kabhi Khushi Kabhie Gham',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273885eb4815c8c43098815d356',
      duration: 418,
      audioSrc: '/audio/suraj-hua-maddham.mp3'
    },
    {
      id: 'sonu-4',
      title: 'Sandese Aate Hain',
      artist: 'Sonu Nigam',
      album: 'Border',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273ff39f0baa2d66c1e10509238',
      duration: 368,
      audioSrc: '/audio/sandese-aate-hain.mp3'
    },
    {
      id: 'sonu-5',
      title: 'Ye Dil Deewana',
      artist: 'Sonu Nigam',
      album: 'Pardes',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2737d214af8499aa95ad220f573',
      duration: 295,
      audioSrc: '/audio/ye-dil-deewana.mp3'
    },
    {
      id: 'sonu-6',
      title: 'Saathiya',
      artist: 'Sonu Nigam',
      album: 'Saathiya',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273d9b35c32a8170a0780bd97d3',
      duration: 278,
      audioSrc: '/audio/saathiya.mp3'
    },
    {
      id: 'sonu-7',
      title: 'Abhi Mujh Mein Kahin',
      artist: 'Sonu Nigam',
      album: 'Agneepath',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273e1f61f916ee3b3151e4d3c6c',
      duration: 341,
      audioSrc: '/audio/abhi-mujh-mein-kahin.mp3'
    },
    {
      id: 'sonu-8',
      title: 'Satrangi Re',
      artist: 'Sonu Nigam',
      album: 'Dil Se',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273c5855580d27572e9ec3d334c',
      duration: 427,
      audioSrc: '/audio/satrangi-re.mp3'
    },
    {
      id: 'sonu-9',
      title: 'Tumse Milke Dil Ka',
      artist: 'Sonu Nigam',
      album: 'Main Hoon Na',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2738188d39fa41875936b668ce7',
      duration: 355,
      audioSrc: '/audio/tumse-milke-dil-ka.mp3'
    },
    {
      id: 'sonu-10',
      title: 'You Are My Soniya',
      artist: 'Sonu Nigam',
      album: 'Kabhi Khushi Kabhie Gham',
      coverArt: 'https://i.scdn.co/image/ab67616d0000b273885eb4815c8c43098815d356',
      duration: 318,
      audioSrc: '/audio/you-are-my-soniya.mp3'
    }
  ];

  const handlePlayAll = () => {
    play(sonuSongs[0]);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-600 to-pink-800 rounded-xl p-6 sm:p-8 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-lg relative overflow-hidden">
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

        <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl shadow-2xl flex items-center justify-center border border-white/10">
          <img
            src="https://i.scdn.co/image/ab6761610000e5ebf0df3f52e7851f9fb3c55652"
            alt="Sonu Nigam"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2">Artist</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Sonu Nigam</h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl">
            Versatile Indian playback singer and live performer known for his exceptional vocal range and emotional depth in music.
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
        {sonuSongs.map((track) => (
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
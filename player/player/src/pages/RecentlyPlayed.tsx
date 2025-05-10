import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';
import { ClockIcon } from '@heroicons/react/24/solid';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const RecentlyPlayed: React.FC = () => {
  const { queue, play, currentTrack } = usePlayer();
  const [recentTracks, setRecentTracks] = useState<any[]>([]);
  
  // In a real app, this would come from an API or local storage
  // For demo purposes, we're using a subset of the queue
  useEffect(() => {
    // Simulate recently played tracks (up to 20 tracks)
    const shuffled = [...queue].sort(() => 0.5 - Math.random());
    setRecentTracks(shuffled.slice(0, Math.min(20, shuffled.length)));
  }, [queue]);
  
  const playAllRecentTracks = () => {
    if (recentTracks.length > 0) {
      play(recentTracks[0]);
    }
  };
  
  return (
    <div className="pb-8">
      <div className="bg-gradient-to-r from-indigo-900 to-blue-600 rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="w-40 h-40 flex-shrink-0 bg-indigo-800 rounded-lg shadow-lg flex items-center justify-center">
          <ClockIcon className="w-20 h-20 text-white/80" />
        </div>
        
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium">History</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 mb-2">Recently Played</h2>
          <p className="text-white/80 text-sm mb-4">{recentTracks.length} songs</p>
          <Button 
            onClick={playAllRecentTracks}
            disabled={recentTracks.length === 0}
            className="bg-white hover:bg-white/90 text-indigo-900"
          >
            Play All
          </Button>
        </div>
      </div>
      
      {recentTracks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-light rounded-lg">
          <ClockIcon className="w-16 h-16 text-secondary-300 dark:text-secondary-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">No recent activity</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            You haven't played any tracks yet. Start listening to see your history here.
          </p>
          <Link to="/browse">
            <Button className="inline-flex">
              Discover Music
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-light rounded-lg overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800">
          {recentTracks.map((track) => (
            <TrackCard
              key={track.id}
              id={track.id}
              title={track.title}
              artist={track.artist}
              album={track.album}
              coverArt={track.coverArt}
              audioSrc={track.audioSrc}
              duration={track.duration}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 
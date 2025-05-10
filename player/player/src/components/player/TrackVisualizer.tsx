import React from 'react';

interface TrackVisualizerProps {
  isPlaying: boolean;
  variant?: 'small' | 'medium' | 'large';
  color?: string;
}

export const TrackVisualizer: React.FC<TrackVisualizerProps> = ({ 
  isPlaying, 
  variant = 'medium',
  color = 'text-primary-500' 
}) => {
  if (!isPlaying) {
    return null;
  }
  
  const sizeClasses = {
    small: 'h-3',
    medium: 'h-4',
    large: 'h-5'
  };
  
  // Using static heights instead of animated equalizer bars
  const staticHeights = ['80%', '40%', '65%', '50%'];
  
  return (
    <div className={`flex items-end ${color}`}>
      {staticHeights.map((height, index) => (
        <div 
          key={index}
          className={`${sizeClasses[variant]} w-1 mx-px rounded-t-sm bg-current`} 
          style={{ height }}
        />
      ))}
    </div>
  );
}; 
import React from 'react';

type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
  size?: LoaderSize;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className={`inline-block animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent ${sizeClasses[size]} ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 
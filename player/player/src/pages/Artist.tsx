import React from 'react';
import { useParams } from 'react-router-dom';

export const Artist: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="p-6">
      {/* Placeholder for dynamic artist content */}
      <div className="text-center">
        <p className="text-secondary-600 dark:text-secondary-400">Artist ID: {id}</p>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  useEffect(() => {
    // Check if user was redirected from registration page
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('registered') === 'true') {
      setRegistrationSuccess(true);
    }
  }, [location]);
  
  // Redirect if already logged in
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-dark dark:to-dark-lighter">
      <div className="w-full max-w-md mb-6 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <MusicalNoteIcon className="w-12 h-12 text-primary-600" />
          <h1 className="text-3xl font-bold ml-2 text-primary-600">Luister</h1>
        </div>
        <p className="text-secondary-600 dark:text-secondary-400">Your personal music streaming platform</p>
      </div>
      
      {registrationSuccess && (
        <div className="mb-4 p-3 w-full max-w-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          Registration successful! You can now log in with your credentials.
        </div>
      )}
      
      <LoginForm />
      
      <p className="mt-8 text-secondary-600 dark:text-secondary-400 text-sm">
        &copy; {new Date().getFullYear()} Luister. All rights reserved.
      </p>
    </div>
  );
}; 
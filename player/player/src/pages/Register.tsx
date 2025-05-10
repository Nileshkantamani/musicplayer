import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="flex items-center">
              <MusicalNoteIcon className="h-12 w-12 text-primary-500" />
              <span className="ml-3 text-3xl font-bold text-white">SoundWave</span>
            </Link>
            <h2 className="mt-6 text-xl font-semibold text-white">
              Sign up to your account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Join millions of music lovers and unlock a world of music.
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-cover bg-center"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
            <h1 className="text-4xl font-bold text-white mb-6">Discover new music every day</h1>
            <p className="text-xl text-gray-200 max-w-md">
              Create playlists, discover new tracks, and enjoy a seamless music experience tailored just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 
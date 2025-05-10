import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(username, password);
      navigate('/');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid username or password');
      }
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-dark-light rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Welcome back</h2>
        <p className="text-secondary-600 dark:text-secondary-400">Sign in to continue to Luister</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSymbolIcon className="h-5 w-5 text-secondary-500 dark:text-secondary-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input pl-10"
              placeholder="username"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-secondary-500 dark:text-secondary-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500 font-medium">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
      
      <p className="mt-8 text-center text-sm text-secondary-600 dark:text-secondary-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}; 
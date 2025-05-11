import React, { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { PlayerBar } from '../player/PlayerBar';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  UserCircleIcon, 
  UserPlusIcon, 
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, requireAuth = false }) => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Check if user has admin role
  const isAdmin = user?.roles?.some(role => role === 'ROLE_ADMIN') || false;
  
  // Handle authentication redirect
  if (requireAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      {/* Mobile Sidebar Toggle Button */}
      <div className="fixed top-0 left-0 right-0 z-20 md:hidden flex items-center p-3 bg-white/95 dark:bg-dark/95 backdrop-blur-sm border-b border-secondary-200 dark:border-secondary-800">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-full hover:bg-secondary-200 dark:hover:bg-dark-lighter text-secondary-600 dark:text-secondary-400"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-bold text-primary-600">Luister</h1>
        </div>
        
        {/* Auth buttons for mobile */}
        {!isAuthenticated ? (
          <div className="flex items-center">
            <Link to="/login" className="p-2 text-sm font-medium text-primary-600 dark:text-primary-400">
              Login
            </Link>
            <Link to="/register" className="p-2 rounded-full bg-primary-600 text-white text-sm font-medium shadow-sm">
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            {isAdmin && (
              <Link 
                to="/admin" 
                className="p-2 mr-2 rounded-full bg-purple-500 text-white text-sm font-medium shadow-sm"
                title="Admin Panel"
              >
                <ShieldCheckIcon className="w-5 h-5" />
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-500 text-white text-sm font-medium shadow-sm"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="md:ml-64 pt-14 md:pt-5 pb-24 px-3 sm:px-6 min-h-screen">
        {/* Desktop Header with Auth Buttons */}
        <div className="hidden md:flex justify-end items-center mb-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-1" />
                Login
              </Link>
              <Link 
                to="/register" 
                className="flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium shadow-sm hover:bg-primary-700 rounded-lg transition-colors"
              >
                <UserPlusIcon className="w-4 h-4 mr-1" />
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-120px)]">
            <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          children
        )}
      </main>
      
      <PlayerBar />
    </div>
  );
}; 
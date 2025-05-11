import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  PlusCircleIcon,
  HeartIcon,
  ClockIcon,
  MusicalNoteIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  MagnifyingGlassIcon as MagnifyingGlassIconSolid, 
  BookOpenIcon as BookOpenIconSolid, 
  HeartIcon as HeartIconSolid,
  ClockIcon as ClockIconSolid,
  SunIcon as SunIconSolid,
  MoonIcon as MoonIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid
} from '@heroicons/react/24/solid';
import { usePlaylists } from '../../hooks/usePlaylists';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playlists } = usePlaylists();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Check if user has admin role
  const isAdmin = user?.roles?.some(role => role === 'ROLE_ADMIN') || false;
  
  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: isActive('/') ? <HomeIconSolid className="w-5 h-5" /> : <HomeIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Browse', 
      path: '/browse', 
      icon: isActive('/browse') ? <MagnifyingGlassIconSolid className="w-5 h-5" /> : <MagnifyingGlassIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Library', 
      path: '/library', 
      icon: isActive('/library') ? <BookOpenIconSolid className="w-5 h-5" /> : <BookOpenIcon className="w-5 h-5" /> 
    },
    // Show Admin Dashboard link only for users with admin role
    ...(isAdmin ? [{ 
      name: 'Admin', 
      path: '/admin', 
      icon: isActive('/admin') || location.pathname.startsWith('/admin/') 
        ? <ShieldCheckIconSolid className="w-5 h-5 text-purple-500" /> 
        : <ShieldCheckIcon className="w-5 h-5" /> 
    }] : []),
  ];
  
  const libraryItems = [
    { 
      name: 'Liked Songs', 
      path: '/liked-songs', 
      icon: isActive('/liked-songs') ? <HeartIconSolid className="w-4 h-4" /> : <HeartIcon className="w-4 h-4" /> 
    },
    { 
      name: 'Recently Played', 
      path: '/recently-played', 
      icon: isActive('/recently-played') ? <ClockIconSolid className="w-4 h-4" /> : <ClockIcon className="w-4 h-4" /> 
    },
  ];
  
  // Handle link click on mobile to close sidebar
  const handleLinkClick = () => {
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      if (onClose && window.innerWidth < 768) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`w-64 h-full bg-white dark:bg-dark fixed left-0 top-0 bottom-20 z-40 flex flex-col border-r border-secondary-200/50 dark:border-secondary-800/50 transition-all duration-300 ease-in-out md:translate-x-0 shadow-xl md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with logo and close button */}
        <div className="p-4 border-b border-secondary-100 dark:border-secondary-800/50 flex items-center justify-between bg-white/90 dark:bg-dark-light/90 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md">
              <MusicalNoteIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-500 dark:to-primary-700">Luister</h1>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded-full hover:bg-secondary-100 dark:hover:bg-dark-lighter text-secondary-500 dark:text-secondary-400 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Main content area with scrolling */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {/* Main navigation */}
          <div className="p-3">
            <nav className="mb-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                        isActive(item.path)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                          : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-dark-lighter hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      onClick={handleLinkClick}
                    >
                      <span className="w-7 h-7 flex items-center justify-center mr-2">{item.icon}</span>
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          
            {/* Login/Signup buttons - show when not authenticated */}
            {!isAuthenticated && (
              <div className="mb-5 px-2">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 rounded-lg border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium"
                    onClick={handleLinkClick}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium shadow-sm"
                    onClick={handleLinkClick}
                  >
                    <UserCircleIcon className="w-5 h-5 mr-2" />
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            {/* Logout button - show when authenticated */}
            {isAuthenticated && (
              <div className="mb-5 px-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-lg border border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          
            {/* User profile section */}
            {user && (
              <div className="mb-5 px-2">
                <div className="flex items-center p-2 rounded-lg bg-secondary-50 dark:bg-secondary-800/30 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white shadow-sm">
                    <UserCircleIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-2 min-w-0 flex-1">
                    <div className="font-medium text-sm text-secondary-900 dark:text-white truncate">
                      {user.username || 'User'}
                    </div>
                    <div className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                      {user.email || 'user@example.com'}
                    </div>
                  </div>
                  <button className="p-1 rounded-full hover:bg-white dark:hover:bg-dark-lighter text-secondary-500 dark:text-secondary-400">
                    <Cog6ToothIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          
            {/* Theme Switcher */}
            <div className="mb-6 px-3">
              <div className="p-3 bg-secondary-50 dark:bg-secondary-800/30 rounded-xl shadow-inner border border-secondary-100 dark:border-secondary-800/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase text-secondary-600 dark:text-secondary-400">Appearance</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                      theme === 'light' 
                        ? 'bg-white dark:bg-dark-lighter shadow-md ring-2 ring-primary-500 scale-105'
                        : 'hover:bg-white dark:hover:bg-dark-lighter hover:shadow-sm hover:scale-102'
                    }`}
                  >
                    {theme === 'light' ? 
                      <SunIconSolid className="w-5 h-5 text-amber-500" /> : 
                      <SunIcon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    }
                    <span className="text-xs mt-1 text-secondary-700 dark:text-secondary-300">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                      theme === 'dark' 
                        ? 'bg-white dark:bg-dark-lighter shadow-md ring-2 ring-primary-500 scale-105'
                        : 'hover:bg-white dark:hover:bg-dark-lighter hover:shadow-sm hover:scale-102'
                    }`}
                  >
                    {theme === 'dark' ? 
                      <MoonIconSolid className="w-5 h-5 text-indigo-400" /> : 
                      <MoonIcon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    }
                    <span className="text-xs mt-1 text-secondary-700 dark:text-secondary-300">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                      theme === 'system' 
                        ? 'bg-white dark:bg-dark-lighter shadow-md ring-2 ring-primary-500 scale-105'
                        : 'hover:bg-white dark:hover:bg-dark-lighter hover:shadow-sm hover:scale-102'
                    }`}
                  >
                    <ComputerDesktopIcon className={`w-5 h-5 ${theme === 'system' ? 'text-primary-500' : 'text-secondary-600 dark:text-secondary-400'}`} />
                    <span className="text-xs mt-1 text-secondary-700 dark:text-secondary-300">Auto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Your Library section */}
          {user && (
            <div className="mb-2 px-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-xs uppercase tracking-wider text-secondary-500 dark:text-secondary-400 px-2">
                  Your Library
                </h2>
                <button 
                  className="p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-dark-lighter text-secondary-500 dark:text-secondary-400 transition-colors"
                  title="Add playlist"
                >
                  <PlusCircleIcon className="w-4 h-4" />
                </button>
              </div>
              
              <ul className="space-y-1 mb-4">
                {libraryItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all group ${
                        isActive(item.path)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                          : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-dark-lighter hover:text-secondary-900 dark:hover:text-white'
                      }`}
                      onClick={handleLinkClick}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        isActive(item.path) 
                          ? 'bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-400' 
                          : 'bg-secondary-100 dark:bg-secondary-800/50 text-secondary-500 dark:text-secondary-400 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-700/50'
                      } mr-2 transition-colors`}>
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Quick dark mode toggle in footer */}
        <div className="p-3 border-t border-secondary-100 dark:border-secondary-800/50 bg-white/90 dark:bg-dark-light/90 backdrop-blur-sm sticky bottom-0">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-full gap-2 p-2 rounded-xl bg-secondary-50 dark:bg-secondary-800/30 hover:bg-secondary-100 dark:hover:bg-secondary-700/30 transition-all text-secondary-800 dark:text-secondary-200 border border-secondary-200/50 dark:border-secondary-700/50 shadow-sm hover:shadow"
          >
            {isDarkMode ? (
              <>
                <SunIcon className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium">Switch to Light</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium">Switch to Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Add custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 9999px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(55, 65, 81, 0.5);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 0.7);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
}; 
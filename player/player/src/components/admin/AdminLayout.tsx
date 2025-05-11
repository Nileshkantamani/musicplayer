import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  MusicalNoteIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
  { name: 'Users', icon: UsersIcon, path: '/admin/users' },
  { name: 'Songs', icon: MusicalNoteIcon, path: '/admin/songs' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/admin/analytics' },
  { name: 'Settings', icon: Cog6ToothIcon, path: '/admin/settings' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark">
      {/* Sidebar (desktop) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-lighter shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-semibold text-primary-600">Luister Admin</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-light'
                  }`}
                >
                  <Icon className={`mr-3 h-6 w-6 ${isActive ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-light rounded-md"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </button>
          
          <div className="mt-2 flex items-center">
            <Link to="/" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              Return to App
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <header className="w-full bg-white dark:bg-dark-lighter shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <span className="hidden md:inline-block text-gray-700 dark:text-gray-300">Welcome to Admin Panel</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}; 
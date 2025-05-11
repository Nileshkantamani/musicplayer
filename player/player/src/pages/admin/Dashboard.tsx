import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { api } from '../../utils/api';
import { 
  UsersIcon, 
  MusicalNoteIcon,
  HeartIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { DashboardMetricCard } from '../../components/admin/DashboardMetricCard';

interface DashboardStats {
  totalUsers: number;
  totalSongs: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader size="lg" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardMetricCard 
            title="Total Users" 
            value={stats?.totalUsers || 0} 
            icon={<UsersIcon className="w-8 h-8" />}
            color="bg-blue-500"
          />
          
          <DashboardMetricCard 
            title="Total Songs" 
            value={stats?.totalSongs || 0} 
            icon={<MusicalNoteIcon className="w-8 h-8" />}
            color="bg-purple-500"
          />
          
          <DashboardMetricCard 
            title="Active Sessions" 
            value={42} 
            icon={<HeartIcon className="w-8 h-8" />}
            color="bg-green-500"
          />
          
          <DashboardMetricCard 
            title="Playlists" 
            value={105} 
            icon={<ListBulletIcon className="w-8 h-8" />}
            color="bg-yellow-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">• New user registered (5 minutes ago)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">• Song uploaded by admin (2 hours ago)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">• System update completed (1 day ago)</p>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-green-600 h-2.5 rounded-full w-1/4"></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-yellow-500 h-2.5 rounded-full w-2/3"></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-sm">Storage</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full w-2/5"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}; 
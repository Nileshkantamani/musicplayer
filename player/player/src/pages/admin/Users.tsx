import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { adminAPI } from '../../utils/api';
import { 
  PencilIcon, 
  TrashIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  NoSymbolIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface User {
  id: number;
  username: string;
  email: string;
  isEmailVerified: boolean;
  roles: string[];
}

interface PagedResponse {
  content: User[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers(page, pageSize, `${sortField},${sortDirection}`);
      const pagedResponse = response as PagedResponse;
      
      setUsers(pagedResponse.content);
      setTotalPages(pagedResponse.totalPages);
      setTotalElements(pagedResponse.totalElements);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await adminAPI.toggleUserStatus(id);
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      console.error('Error toggling user status:', err);
      setError('Failed to update user status');
    }
  };

  const getSortIndicator = (field: string) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading && users.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader size="lg" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button 
            onClick={() => fetchUsers()}
            className="flex items-center px-4 py-2 bg-primary-100 text-primary-600 rounded-md hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-dark-lighter">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    ID {getSortIndicator('id')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('username')}
                  >
                    Username {getSortIndicator('username')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    Email {getSortIndicator('email')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Roles
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('isEmailVerified')}
                  >
                    Status {getSortIndicator('isEmailVerified')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-lighter divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-dark">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            role.includes('ADMIN')
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          } mr-1`}
                        >
                          {role.replace('ROLE_', '')}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isEmailVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          <NoSymbolIcon className="w-4 h-4 mr-1" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-medium">{users.length}</span> of{' '}
            <span className="font-medium">{totalElements}</span> users
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                page === 0
                  ? 'text-gray-400 bg-gray-50 dark:text-gray-500 dark:bg-gray-800'
                  : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-300 dark:bg-dark-lighter dark:hover:bg-dark'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 >= totalPages}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                page + 1 >= totalPages
                  ? 'text-gray-400 bg-gray-50 dark:text-gray-500 dark:bg-gray-800'
                  : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-300 dark:bg-dark-lighter dark:hover:bg-dark'
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}; 
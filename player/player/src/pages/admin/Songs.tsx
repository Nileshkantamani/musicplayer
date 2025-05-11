import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { adminAPI, SongResponse } from '../../utils/api';
import { 
  TrashIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PlayCircleIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

interface PagedResponse {
  content: SongResponse[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const AdminSongs: React.FC = () => {
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getSongs(page, pageSize, `${sortField},${sortDirection}`);
      const pagedResponse = response as PagedResponse;
      
      setSongs(pagedResponse.content);
      setTotalPages(pagedResponse.totalPages);
      setTotalElements(pagedResponse.totalElements);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching songs:', err);
      setError('Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
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

  const handleDeleteSong = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this song?')) {
      return;
    }
    
    try {
      await adminAPI.deleteSong(id);
      fetchSongs(); // Refresh the list
    } catch (err: any) {
      console.error('Error deleting song:', err);
      setError('Failed to delete song');
    }
  };

  const getSortIndicator = (field: string) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading && songs.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader size="lg" />
        </div>
      </AdminLayout>
    );
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AdminLayout>
      <div className="py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Song Management</h1>
          <div className="flex space-x-2">
            <button 
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Song
            </button>
            <button 
              onClick={() => fetchSongs()}
              className="flex items-center px-4 py-2 bg-primary-100 text-primary-600 rounded-md hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
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
                    onClick={() => handleSort('title')}
                  >
                    Title {getSortIndicator('title')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('artist')}
                  >
                    Artist {getSortIndicator('artist')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('album')}
                  >
                    Album {getSortIndicator('album')}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('duration')}
                  >
                    Duration {getSortIndicator('duration')}
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
                {songs.map((song) => (
                  <tr key={song.id} className="hover:bg-gray-50 dark:hover:bg-dark">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {song.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        {song.coverArt && (
                          <img 
                            src={song.coverArt} 
                            alt={song.title} 
                            className="w-10 h-10 rounded mr-3 object-cover"
                          />
                        )}
                        <span>{song.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {song.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {song.album}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDuration(song.duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      >
                        <PlayCircleIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSong(song.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upload Section */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold mb-4">Upload New Song</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
              Song File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-dark-lighter rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-offset-dark-lighter"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP3, WAV up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-dark-light dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Artist
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-dark-light dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Album
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-dark-light dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Cover Image
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-dark-light dark:text-white sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-lighter"
            >
              <CloudArrowUpIcon className="-ml-1 mr-2 h-5 w-5" />
              Upload Song
            </button>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-medium">{songs.length}</span> of{' '}
            <span className="font-medium">{totalElements}</span> songs
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
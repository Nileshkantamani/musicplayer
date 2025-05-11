import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
export const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Backend runs on port 8080
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh or logout
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const response = await axios.post(
          'http://localhost:8080/api/auth/refreshtoken',
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        // Store the new token
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// API interfaces
export interface SongResponse {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  coverArt: string;
}

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/signin', { username, password });
    return response.data;
  },
  
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/signout');
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  
  getUsers: async (page = 0, size = 10, sort = 'id,asc') => {
    const response = await api.get(`/admin/users?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
  },
  
  getUserById: async (id: number) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
  
  toggleUserStatus: async (id: number) => {
    const response = await api.put(`/admin/users/${id}/toggle-status`);
    return response.data;
  },
  
  getSongs: async (page = 0, size = 10, sort = 'id,asc') => {
    const response = await api.get(`/admin/songs?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
  },
  
  getSongById: async (id: number) => {
    const response = await api.get(`/admin/songs/${id}`);
    return response.data;
  },
  
  deleteSong: async (id: number) => {
    const response = await api.delete(`/admin/songs/${id}`);
    return response.data;
  },
}; 
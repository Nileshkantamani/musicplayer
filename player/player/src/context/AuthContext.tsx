import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../utils/api';

// Define user type based on backend response
type User = {
  id: number;
  username: string;
  email: string;
  isEmailVerified?: boolean;
  roles: string[];
};

// Define auth state type
type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in (from local storage)
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (storedUser && accessToken && refreshToken) {
          setAuthState({
            user: JSON.parse(storedUser),
            accessToken,
            refreshToken,
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear possibly corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(username, password);
      
      // Extract data from response with the correct field names matching the backend
      const { token, refreshToken, id, username: userName, email, isEmailVerified, roles } = response;
      
      const userData: User = {
        id,
        username: userName,
        email,
        isEmailVerified,
        roles,
      };
      
      // Save to state
      setAuthState({
        user: userData,
        accessToken: token,  // Backend returns 'token', not 'accessToken'
        refreshToken,
      });
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', token);  // Backend returns 'token', not 'accessToken'
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authAPI.register(username, email, password);
      // After registration, we'll redirect to login page
      // No need to set state here
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Always clear state and storage even if the API call fails
      setAuthState({
        user: null,
        accessToken: null,
        refreshToken: null,
      });
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);
    }
  };
  
  const value = {
    user: authState.user,
    isAuthenticated: !!authState.user,
    isLoading,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 
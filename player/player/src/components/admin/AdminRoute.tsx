import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../ui/Loader';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Display a loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Check if user is authenticated and has admin role
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role
  const hasAdminRole = user.roles.some(role => role === 'ROLE_ADMIN');
  
  if (!hasAdminRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 
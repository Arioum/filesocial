import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  
  console.log('ProtectedRoute render:', { isAuthenticated, isLoading, isInitialized });

  if (!isInitialized || isLoading) {
    console.log('ProtectedRoute: Showing loading');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  console.log('ProtectedRoute: Rendering children');
  return <>{children}</>;
};
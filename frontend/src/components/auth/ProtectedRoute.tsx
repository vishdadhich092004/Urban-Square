import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSpinner } from 'react-icons/fa';

interface ProtectedRouteProps {
  redirectPath?: string;
  requiredRole?: 'user' | 'agent' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
  requiredRole,
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <FaSpinner className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If role is required and user doesn't have it, redirect to home
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If authenticated and has required role (or no role required), render children
  return <Outlet />;
};

export default ProtectedRoute;

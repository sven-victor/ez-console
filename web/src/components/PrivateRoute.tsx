import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermission } from '../hooks/usePermission';
import { getURL } from '@/utils';
import Loading from './Loading';

export interface PrivateRouteProps {
  element: React.ReactElement;
  requiredPermission?: string;
  requiredPermissions?: string[];
}

/**
 * Private route component - protect routes that need authentication
 * 
 * Usage example:
 * <PrivateRoute element={<ProtectedComponent />} />
 * 
 * With permission control:
 * <PrivateRoute element={<UserListComponent />} requiredPermission="user:view" />
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredPermission,
  requiredPermissions,
}) => {
  const { user, loading } = useAuth();
  const { hasPermission, hasAllPermissions } = usePermission();

  // when loading, display loading state
  if (loading) {
    return <Loading />
  }

  // if not logged in, redirect to login page
  if (!user) {
    window.location.href = getURL('/login?redirect=' + encodeURIComponent(window.location.href));
    return null;
  }

  // if specific permission is required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/forbidden" replace />;
  }

  // if multiple permissions are required
  if (requiredPermissions && !hasAllPermissions(requiredPermissions)) {
    return <Navigate to="/forbidden" replace />;
  }

  // if logged in and has permission, return original component
  return element;
};

/**
 * Admin route - only admin can access
 */
export const AdminRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();
  const permissionHook = usePermission();

  // when loading, display loading state
  if (loading) {
    return <Loading />;
  }

  // if not logged in, redirect to login page
  if (!user) {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.href);
    return null;
  }

  // if not admin, redirect to 403 page
  if (!permissionHook.isAdmin) {
    return <Navigate to="/forbidden" replace />;
  }

  // if admin, return original component
  return element;
};

export default PrivateRoute; 
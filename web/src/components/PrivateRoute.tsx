/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermission } from '../hooks/usePermission';
import { getURL } from '@/utils';
import Loading from './Loading';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { ApiError } from '@/service/client';

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
  const { t } = useTranslation();
  const { user, loading, error: fetchCurrentUserError } = useAuth();
  const { hasPermission, hasAllPermissions } = usePermission();

  // when loading, display loading state
  if (loading) {
    return <Loading />
  }


  if (fetchCurrentUserError) {
    const error = fetchCurrentUserError as ApiError;
    if (error.code === "E4011") {
      return <Loading />
    }
    return <Result
      status="500"
      title="500"
      subTitle={t('login.fetchCurrentUserError', { defaultValue: 'Failed to fetch current user: {{error}}', error: fetchCurrentUserError?.message || fetchCurrentUserError })}
    />
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
  const { t } = useTranslation();
  const { user, loading, error: fetchCurrentUserError } = useAuth();
  const permissionHook = usePermission();

  // when loading, display loading state
  if (loading) {
    return <Loading />;
  }

  if (fetchCurrentUserError) {
    return <Result
      status="500"
      title="500"
      subTitle={t('login.fetchCurrentUserError', { defaultValue: 'Failed to fetch current user: {{error}}', error: fetchCurrentUserError?.message || fetchCurrentUserError })}
    />
  }
  // if not logged in, redirect to login page
  if (!user) {
    window.location.href = getURL('/login?redirect=' + encodeURIComponent(window.location.href));
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
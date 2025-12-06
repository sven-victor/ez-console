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

import React, { ReactNode } from 'react';
import { usePermission } from '../hooks/usePermission';

export interface PermissionGuardProps {
  permission?: string;
  permissions?: string[];
  checkAll?: boolean; // whether to check all permissions, default is false (check any one permission)
  fallback?: ReactNode; // content to display when there is no permission
  children: ReactNode;
}

/**
 * Permission guard component - control the display of content based on user permissions
 * 
 * @param permission single required permission code
 * @param permissions multiple required permission codes array
 * @param checkAll when providing multiple permissions, check all permissions (true) or any one permission (false, default)
 * @param fallback content to display when there is no permission
 * @param children content to display when there is permission
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  permissions = [],
  checkAll = false,
  fallback = null,
  children,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin, loading } = usePermission();

  // when permission is loading, do not display any content
  if (loading) {
    return null;
  }

  // admin has all permissions
  if (isAdmin) {
    return <>{children}</>;
  }

  // single permission check
  if (permission) {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  // multiple permissions check
  if (permissions.length > 0) {
    const hasAccess = checkAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    return hasAccess ? <>{children}</> : <>{fallback}</>;
  }

  // no specified permission requirements, default display content
  return <>{children}</>;
};

/**
 * Admin guard component - only admin can view content
 */
export const AdminGuard: React.FC<Omit<PermissionGuardProps, 'permission' | 'permissions' | 'checkAll'>> = ({
  fallback = null,
  children,
}) => {
  const { isAdmin, loading } = usePermission();

  if (loading) {
    return null;
  }

  return isAdmin ? <>{children}</> : <>{fallback}</>;
}; 
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

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useSite } from '@/contexts/SiteContext';

/**
 * Permission Hook, used to check if the user has specific permissions
 *
 * Usage example:
 * const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();
 *
 * if (hasPermission('authorization:user:create')) {
 *   // User has permission to create users
 * }
 */
export const usePermission = () => {
  const { user } = useContext(AuthContext);
  const { currentOrgId } = useSite();

  const roles = user?.roles?.filter(role => !role.organization_id || role.organization_id === currentOrgId)

  // Check if the user is an administrator
  const isAdminUser = (): boolean => {
    if (!roles) return false;
    return roles.some(role => role.name === 'admin' && !role.organization_id);
  };

  // Check for specific permission
  const hasPermission = (permission: string): boolean => {
    if (!roles) return false;

    // Check if the user has the admin role
    if (isAdminUser()) return true;

    // If not admin, check if the role has the permission
    return roles.some(role => {
      if (!role.permissions) return false;
      return role.permissions.some(perm => perm.code === permission);
    });
  };

  // Check if the user has all specified permissions
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(perm => hasPermission(perm));
  };

  // Check if the user has any of the specified permissions
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(perm => hasPermission(perm));
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin: isAdminUser(),
    loading: !user
  };
};

export default usePermission;
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

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
  const organizationId = localStorage.getItem('organization_id');

  const roles = user?.roles?.filter(role => !role.organization_id || role.organization_id === organizationId)

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
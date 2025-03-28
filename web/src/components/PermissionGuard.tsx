import React, { ReactNode } from 'react';
import { usePermission } from '../hooks/usePermission';

interface PermissionGuardProps {
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
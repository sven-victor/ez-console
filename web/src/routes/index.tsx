import React, { lazy, Suspense } from 'react';
import Loading from '../components/Loading';
import { DashboardOutlined, UserOutlined, SolutionOutlined, SettingOutlined, FileSearchOutlined, SafetyOutlined } from '@ant-design/icons';

// Lazy load page components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
// Temporarily comment out non-existent components, create later
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Forbidden = lazy(() => import('@/pages/Forbidden'));

// User pages
const UserList = lazy(() => import('@/pages/authorization/user/UserList'));
const UserDetail = lazy(() => import('@/pages/authorization/user/UserDetail'));
const UserForm = lazy(() => import('@/pages/authorization/user/UserForm'));

// Role pages
const RoleList = lazy(() => import('@/pages/authorization/role/RoleList'));

// System management pages
const SystemSettings = lazy(() => import('@/pages/system/settings/SystemSettings/index'));
const OAuthTestCallback = lazy(() => import('@/pages/system/settings/SystemSettings/OAuthTestCallback'));
const AuditLogs = lazy(() => import('@/pages/system/audit/AuditLogs'));

// Service account pages
const ServiceAccountList = lazy(() => import('@/pages/authorization/service-account/ServiceAccountList'));
const ServiceAccountDetail = lazy(() => import('@/pages/authorization/service-account/ServiceAccountDetail'));

// Wrap lazy loaded components
export const withSuspense = (Component: React.LazyExoticComponent<React.ComponentClass<any> | React.FC<any>>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Public routes - no authentication required
export const publicRoutes: IRoute[] = [
  {
    path: '/login',
    element: withSuspense(Login),
    index: true,
  },
  {
    path: '/404',
    element: withSuspense(NotFound),
    index: true,
  },
  {
    path: '/403',
    element: withSuspense(Forbidden),
    index: true,
  },
  {
    path: '/system/settings/oauth/test-callback',
    element: withSuspense(OAuthTestCallback),
    index: true,
  },
];

// Private routes - authentication required, use main layout
export const privateRoutes: IRoute[] = [
  {
    path: '/',
    is_private: true,
    children: [
      {
        path: '/',
        element: withSuspense(Dashboard),
        name: 'dashboard',
        icon: <DashboardOutlined />,
        index: true,
      },
      {
        path: '/profile',
        element: withSuspense(Profile),
        name: undefined,
        index: true,
      },
      {
        name: 'authorization',
        icon: <UserOutlined />,
        permissions: ['authorization:user:view', 'authorization:user:create', 'authorization:user:update', 'authorization:user:delete', 'authorization:service_account:view', 'authorization:service_account:create', 'authorization:service_account:update', 'authorization:service_account:delete'],
        children: [
          // Role management
          {
            path: '/authorization/roles',
            name: 'roles',
            icon: <SolutionOutlined />,
            permissions: ['authorization:role:view', 'authorization:role:create', 'authorization:role:update', 'authorization:role:delete'],
            children: [
              {
                element: withSuspense(RoleList),
                permissions: ['authorization:role:view'],
                index: true,
              },
            ]
          },

          // User management
          {
            path: '/authorization/users',
            name: 'users',
            icon: <UserOutlined />,
            permissions: ['authorization:user:view', 'authorization:user:list', 'authorization:user:create', 'authorization:user:update', 'authorization:user:delete'],
            children: [
              {
                element: withSuspense(UserList),
                permissions: ['authorization:user:list'],
                index: true,
              },
              {
                path: '/authorization/users/create',
                element: withSuspense(UserForm),
                permissions: ['authorization:user:create'],
                index: true,
              },
              {
                path: '/authorization/users/:id',
                element: withSuspense(UserDetail),
                permissions: ['authorization:user:view'],
                index: true,
              },
              {
                path: '/authorization/users/:id/edit',
                element: withSuspense(UserForm),
                permissions: ['authorization:user:update'],
                index: true,
              },
            ]
          },

          // Service account management
          {
            path: '/authorization/service-accounts',
            name: 'serviceAccounts',
            icon: <UserOutlined />,
            permissions: ['authorization:service_account:view'],
            children: [
              {
                element: withSuspense(ServiceAccountList),
                permissions: ['authorization:service_account:view'],
                index: true,
              },
              {
                path: '/authorization/service-accounts/:id',
                element: withSuspense(ServiceAccountDetail),
                permissions: ['authorization:service_account:view'],
                index: true,
              },
            ]
          },
        ]
      },
      // System management menu
      {
        name: 'system',
        icon: <SettingOutlined />,
        permissions: ['system:settings:view', 'system:settings:update', 'system:audit:view'],
        children: [
          // System settings
          {
            path: '/system/settings',
            icon: <SafetyOutlined />,
            index: true,
            name: 'settings',
            permissions: ['system:settings:view', 'system:settings:update'],
            element: withSuspense(SystemSettings),
          },
          // Audit logs
          {
            path: '/system/audit',
            icon: <FileSearchOutlined />,
            name: 'audit',
            permissions: ['system:audit:view'],
            index: true,
            element: withSuspense(AuditLogs),
          },
        ]
      },
      // Redirect and error handling
      {
        path: '*',
        element: withSuspense(NotFound),
        index: true,
      },
    ],
  },
];

export type IRoute = IRouteItem | IRouteGroup;

export interface IRouteItem {
  path?: string;
  element: React.ReactNode;
  name?: string;
  icon?: React.ReactNode;
  children?: undefined;
  is_private?: boolean;
  index: true;
  permissions?: string[];
}

export interface IRouteGroup {
  path?: string;
  element?: React.ReactNode;
  children: IRoute[];
  name?: string;
  icon?: React.ReactNode;
  is_private?: boolean;
  index?: false;
  permissions?: string[];
}

// Merge all routes
const routes: IRoute[] = [...publicRoutes, ...privateRoutes];


export default routes; 
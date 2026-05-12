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

import React, { lazy, Suspense } from 'react';
import Loading from '../components/Loading';
import { DashboardOutlined, UserOutlined, SolutionOutlined, SettingOutlined, FileSearchOutlined, SafetyOutlined } from '@ant-design/icons';
import type { TabsProps as AntTabsProps } from 'antd';
import { LanguageConfig } from '@/components/LanguageSwitch';

// Lazy load page components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const Activate = lazy(() => import('@/pages/Activate'));
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
const RoleForm = lazy(() => import('@/pages/authorization/role/RoleForm'));

// System management pages
const SystemSettings = lazy(() => import('@/pages/system/settings/SystemSettings/index'));
const OrganizationDetail = lazy(() => import('@/pages/system/settings/SystemSettings/OrganizationDetail'));
const SkillEditor = lazy(() => import('@/pages/system/settings/SystemSettings/SkillEditor'));
const SkillPreview = lazy(() => import('@/pages/system/settings/SystemSettings/SkillPreview'));
const AITraceViewer = lazy(() => import('@/pages/system/settings/SystemSettings/AITraceViewer'));
const ToolSetDebug = lazy(() => import('@/pages/system/settings/SystemSettings/ToolSetDebug'));
const OAuthTestCallback = lazy(() => import('@/pages/system/settings/SystemSettings/OAuthTestCallback'));
const AuditLogs = lazy(() => import('@/pages/system/audit/AuditLogs'));

// Service account pages
const ServiceAccountList = lazy(() => import('@/pages/authorization/service-account/ServiceAccountList'));
const ServiceAccountDetail = lazy(() => import('@/pages/authorization/service-account/ServiceAccountDetail'));

// Task pages
const TaskList = lazy(() => import('@/pages/task/TaskList'));
const TaskDetail = lazy(() => import('@/pages/task/TaskDetail'));
const TaskScheduleList = lazy(() => import('@/pages/task/TaskScheduleList'));

// Wrap lazy loaded components
export function withSuspense<
  T extends React.ComponentType<any>
>(
  Component: React.LazyExoticComponent<T>,
  props?: React.ComponentProps<T>
) {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props as React.ComponentProps<T>} />
    </Suspense>
  );
}
export interface GetRoutesProps {
  transformSettingTabs?: (items: AntTabsProps['items']) => AntTabsProps['items'];
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
  extraPrivateRoutes?: IRoute[];
  extraPublicRoutes?: IRoute[];
}

export const getRoutes = ({ transformSettingTabs, transformLangConfig, extraPrivateRoutes = [], extraPublicRoutes = [] }: GetRoutesProps): IRoute[] => {
  // Public routes - no authentication required
  const publicRoutes: IRoute[] = [
    {
      path: '/login',
      element: withSuspense(Login, { transformLangConfig }),
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
    {
      path: '/activate',
      element: withSuspense(Activate, { transformLangConfig }),
      index: true,
    },
    ...extraPublicRoutes,
  ];
  // Private routes - authentication required, use main layout
  const privateRoutes: IRoute[] = [
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
          hideInMenu: true,
          name: 'profile',
          index: false,
        },
        ...extraPrivateRoutes,
        {
          path: '/tasks',
          permissions: ['task:list', 'task:schedule:list'],
          children: [
            {
              // path: '/tasks',
              element: withSuspense(TaskList),
              permissions: ['task:list'],
              name: 'tasks',
              index: true,
            },
            {
              path: '/tasks/schedules',
              element: withSuspense(TaskScheduleList),
              permissions: ['task:schedule:list'],
              name: 'taskSchedules',
              index: false,
            },
            {
              path: '/tasks/:id',
              element: withSuspense(TaskDetail),
              permissions: ['task:view'],
              index: false,
            },
          ],
        },
        {
          name: 'authorization',
          icon: <UserOutlined />,
          permissions: [
            'authorization:user:list',
            'authorization:service_account:list',
            'authorization:role:view',
          ],
          children: [
            // Role management
            {
              path: '/authorization/roles',
              name: 'roles',
              icon: <SolutionOutlined />,
              permissions: ['authorization:role:view',],
              children: [
                {
                  element: withSuspense(RoleList),
                  permissions: ['authorization:role:view'],
                  index: true,
                  name: 'roles',
                },
                {
                  path: '/authorization/roles/create',
                  element: withSuspense(RoleForm),
                  permissions: ['authorization:role:create'],
                  index: false,
                  hideInMenu: true,
                  name: 'roleCreate',
                },
                {
                  path: '/authorization/roles/:id/edit',
                  element: withSuspense(RoleForm),
                  permissions: ['authorization:role:update'],
                  index: false,
                  hideInMenu: true,
                  name: 'roleUpdate',
                },
              ]
            },

            // User management
            {
              path: '/authorization/users',
              name: 'users',
              icon: <UserOutlined />,
              permissions: ['authorization:user:list'],
              children: [
                {
                  element: withSuspense(UserList),
                  permissions: ['authorization:user:list'],
                  index: true,
                  name: 'users',
                },
                {
                  path: '/authorization/users/create',
                  element: withSuspense(UserForm),
                  permissions: ['authorization:user:create'],
                  index: false,
                  hideInMenu: true,
                  name: 'userCreate',
                },
                {
                  path: '/authorization/users/:id',
                  element: withSuspense(UserDetail),
                  permissions: ['authorization:user:view'],
                  index: false,
                  hideInMenu: true,
                  name: 'userDetail',
                },
                {
                  path: '/authorization/users/:id/edit',
                  element: withSuspense(UserForm),
                  permissions: ['authorization:user:update'],
                  index: false,
                  hideInMenu: true,
                  name: 'userUpdate',
                },
              ]
            },

            // Service account management
            {
              path: '/authorization/service-accounts',
              name: 'serviceAccounts',
              icon: <UserOutlined />,
              permissions: [
                'authorization:service_account:list',
              ],
              children: [
                {
                  element: withSuspense(ServiceAccountList),
                  permissions: ['authorization:service_account:view'],
                  index: true,
                  hideInMenu: true,
                  name: 'serviceAccounts',
                },
                {
                  path: '/authorization/service-accounts/:id',
                  element: withSuspense(ServiceAccountDetail),
                  permissions: ['authorization:service_account:view'],
                  hideInMenu: true,
                  name: 'serviceAccountDetail',
                  index: false,
                },
              ]
            },
          ]
        },
        // System management menu
        {
          name: 'system',
          icon: <SettingOutlined />,
          permissions: ['system:settings:view', 'system:settings:update', 'system:security:view', 'system:security:update', 'system:audit_log:view', 'system:organization:view', 'ai:models:view', 'system:toolsets:view', 'system:skills:view'],
          children: [
            // System settings
            {
              path: '/system/settings',
              icon: <SafetyOutlined />,
              name: 'settings',
              permissions: ['system:settings:view', 'system:settings:update', 'system:security:view', 'system:security:update', 'system:organization:view', 'ai:models:view', 'system:toolsets:view', 'system:skills:view'],
              children: [
                {
                  path: '/system/settings',
                  index: true,
                  hideInMenu: true,
                  element: withSuspense(SystemSettings, { transformItems: transformSettingTabs }),
                  name: 'settings',
                },
                {
                  path: '/system/settings/organizations/:id',
                  permissions: ['system:organization:view'],
                  element: withSuspense(OrganizationDetail),
                  name: 'organizationDetail',
                  index: false,
                  hideInMenu: true,
                },
                {
                  path: '/system/settings/skills/:id/edit',
                  permissions: ['system:skills:edit_files'],
                  element: withSuspense(SkillEditor),
                  name: 'skillEditor',
                  hideInMenu: true,
                  index: false,
                },
                {
                  path: '/system/settings/skills/:id/preview',
                  permissions: ['system:skills:view'],
                  element: withSuspense(SkillPreview),
                  name: 'skillPreview',
                  hideInMenu: true,
                  index: false,
                },
                {
                  path: '/system/settings/ai-trace',
                  permissions: ['ai:trace:manage'],
                  element: withSuspense(AITraceViewer),
                  name: 'aiTraceViewer',
                  hideInMenu: true,
                  index: false,
                },
                {
                  path: '/system/settings/toolsets/:id/debug',
                  permissions: ['system:toolsets:test'],
                  element: withSuspense(ToolSetDebug),
                  name: 'toolSetDebug',
                  hideInMenu: true,
                  index: false,
                }
              ],
            },
            // Audit logs
            {
              path: '/system/audit',
              icon: <FileSearchOutlined />,
              name: 'audit',
              permissions: ['system:audit_log:view'],
              index: false,
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
  return [...publicRoutes, ...privateRoutes];
}




export type IRoute = IRouteItem | IRouteGroup;

export interface IRouteItem {
  path?: string;
  element: React.ReactNode;
  name?: string;
  icon?: React.ReactNode;
  is_private?: boolean;
  index: boolean;
  permissions?: string[];
  hideInMenu?: boolean;
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
  hideInMenu?: boolean;
}

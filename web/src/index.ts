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

export {
  default as EZApp,
  type AppProps as EZAppProps
} from '@/App'

export { useTranslation } from 'react-i18next';
export { default as i18n } from '@/i18n'
export { withSuspense, type IRoute, type IRouteGroup, type IRouteItem } from '@/routes'

export { default as Loading } from '@/components/Loading';
export { default as Actions, type ActionProps } from '@/components/Actions';
export { default as Avatar, AvatarUpload, type AvatarProps, type AvatarUploadProps } from '@/components/Avatar';
export { default as DynamicIcon, getIconByName, type DynamicIconProps } from '@/components/DynamicIcon';
export { default as HeaderDropdown, type HeaderDropdownProps } from '@/components/HeaderDropdown';
export { default as LabelCreater, type LabelCreaterProps } from '@/components/LabelCreater';
export { default as OrganizationSwitcher } from '@/components/OrganizationSwitcher';
export { default as LanguageSwitch, AllLangUIConfig, type LanguageSwitchProps } from '@/components/LanguageSwitch';
export { default as AppLayout, type AppLayoutProps } from '@/components/Layout';
export { PermissionGuard, type PermissionGuardProps, AdminGuard } from '@/components/PermissionGuard';
export { default as PrivateRoute, type PrivateRouteProps } from '@/components/PrivateRoute';
export { default as Table, type TableRefProps, type TableActionRefProps, type TableProps } from '@/components/Table';
export { type AIChatProps } from '@/components/AIChat';
export { AIChatModal, AIChatButton, AIChatSider } from '@/components/AIChatLayout';
export { type MarkdownViewerProps } from '@/components/MarkdownViewer';
export { type JsonSchemaConfigFormItemProps, type JsonSchemaConfigFormProps } from '@/components/JsonSchemaConfigForm';

import { lazy } from 'react';
const AIChat = lazy(() => import('@/components/AIChat'));

const JsonSchemaConfigForm = lazy(() => import('@/components/JsonSchemaConfigForm').then(module => ({ default: module.JsonSchemaConfigForm })));
const JsonSchemaConfigFormItem = lazy(() => import('@/components/JsonSchemaConfigForm').then(module => ({ default: module.JsonSchemaConfigFormItem })));
const MarkdownViewer = lazy(() => import('@/components/MarkdownViewer'));
const MarkdownCode = lazy(() => import('@/components/MarkdownViewer').then(module => ({ default: module.Code })));

export { default as Forbidden } from '@/pages/Forbidden';
export { default as NotFound } from '@/pages/NotFound';

export { useSite } from '@/contexts/SiteContext'
export { useAuth } from '@/hooks/useAuth'
export { usePermission } from '@/hooks/usePermission'
export { useAI } from '@/contexts/AIContext'
export type { PageAIOptions, RegisteredClientTool, ClientToolHandler, PageDataGetter } from '@/contexts/AIContext'

export { apiDelete, apiPost, apiGet, apiPut, ApiError, client, request, fetchSSE } from '@/service/client';
import * as authorizationapi from '@/service/api/authorization';
import * as baseapi from '@/service/api/base';
import * as oauthapi from '@/service/api/oauth';
import * as systemapi from '@/service/api/system';
import * as aiapi from '@/service/api/system';
import * as tasksapi from '@/service/api/tasks';

export type * from '@/service/api/typing';

const api = {
  ...authorizationapi,
  ...baseapi,
  ...oauthapi,
  ...systemapi,
  ...aiapi,
  ...tasksapi,
}

export {
  api,
  JsonSchemaConfigForm,
  JsonSchemaConfigFormItem,
  MarkdownViewer,
  MarkdownCode,
  AIChat,
}

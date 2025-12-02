export {
  default as EZApp,
  type AppProps as EZAppProps
} from '@/App'

export { useTranslation } from 'react-i18next';
export { default as i18n } from '@/i18n'
export { withSuspense, type IRoute, type IRouteGroup, type IRouteItem } from '@/routes'

export { default as Loading } from '@/components/Loading';
export { default as Actions } from '@/components/Actions';
export { default as Avatar, AvatarUpload, type AvatarProps, type AvatarUploadProps } from '@/components/Avatar';
export { default as DynamicIcon, getIconByName, type DynamicIconProps } from '@/components/DynamicIcon';
export { default as HeaderDropdown, type HeaderDropdownProps } from '@/components/HeaderDropdown';
export { default as LabelCreater, type LabelCreaterProps } from '@/components/LabelCreater';
export { default as LanguageSwitch, AllLangUIConfig, type LanguageSwitchProps } from '@/components/LanguageSwitch';
export { default as AppLayout, type AppLayoutProps } from '@/components/Layout';
export { PermissionGuard, type PermissionGuardProps, AdminGuard } from '@/components/PermissionGuard';
export { default as PrivateRoute, type PrivateRouteProps } from '@/components/PrivateRoute';
export { default as Table, type TableRefProps, type TableActionRefProps, type TableProps } from '@/components/Table';
export { default as AIChat } from '@/components/AIChat';
export { AIChatModal, AIChatButton, AIChatSider } from '@/components/AIChatLayout';


export { default as Forbidden } from '@/pages/Forbidden';
export { default as NotFound } from '@/pages/NotFound';

export { useSite } from '@/contexts/SiteContext'
export { useAuth } from '@/hooks/useAuth'
export { usePermission } from '@/hooks/usePermission'
export { useAI } from '@/contexts/AIContext'

export { apiDelete, apiPost, apiGet, apiPut, ApiError } from '@/service/client';
import * as authorizationapi from '@/service/api/authorization';
import * as baseapi from '@/service/api/base';
import * as oauthapi from '@/service/api/oauth';
import * as systemapi from '@/service/api/system';
import * as aiapi from '@/service/api/system';
export type * from '@/service/api/typing';


const api = {
  ...authorizationapi,
  ...baseapi,
  ...oauthapi,
  ...systemapi,
  ...aiapi,
}

export {
  api,
}

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

import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Spin, Space, type BreadcrumbProps, type MenuProps, type SiderProps } from 'antd';
import type { CollapseType } from 'antd/es/layout/Sider';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { type IRoute } from '../routes';
import LanguageSwitch, { type LanguageConfig } from './LanguageSwitch';
import HeaderDropdown from './HeaderDropdown';
import Avatar from './Avatar';
import OrganizationSwitcher from './OrganizationSwitcher';
import TaskListDropdown from './TaskListDropdown';
import InboxDropdown from './InboxDropdown';
import { useInboxStream } from '@/hooks/useInboxStream';
import { useTranslation } from 'react-i18next';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { type ItemType as MenuItemType } from 'antd/es/menu/interface';
import usePermission from '@/hooks/usePermission';
import { flatMapDeep, snakeCase } from 'lodash-es';
import { getURL, toSmartTitle } from '@/utils';
import { AIChatModal, AIChatButton, AIChatSider } from './AIChatLayout';
import { useSite } from '@/contexts/SiteContext';
import { useAI } from '@/contexts/AIContext';
import { useGlobalAITools } from '@/hooks/useGlobalAITools';
import { useThemeMode, createStyles } from 'antd-style';
import classNames from 'classnames';
import { type AIChatProps } from './AIChat';
import ThemeSwitch from './ThemeSwitch';
const { Header, Content, Footer, Sider } = Layout;

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      height: 100vh;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    `,
    header: css`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${token.colorBgContainer};
      border-block-end: 1px solid ${token.colorBorderSecondary};
    `,
    footer: css`
      text-align: center;
      padding: 15px 50px;
    `,
    contentContainer: css`
      padding: 24px;
      background-color: ${token.colorBgContainer};
    `,
    content: css`
      margin: 0 16px;
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    `,
    mainLayout: css`
      /* Containing block for in-page drawers. isolation keeps their z-index
         inside this column so they cannot paint over the AI sidebar. */
      position: relative;
      isolation: isolate;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background-color: ${token.colorBgContainer};
    `,
    breadcrumb: css`
      margin-left: 8px;
    `,
    headerItems: css`
      margin-right: 20px;
    `,
    userName: css`
      height: 1em;
      line-height: 1em;
      margin-left: 5px;
    `,
    themeSwitch: css`
      display: inline-flex;
    `,
    menuSider: css`
      height: 100%;
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }
    `,
    menuToggleButton: css`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
        border-radius: 0px;
      }
    `,
    layoutLogo: css`
      padding: 8px;
      border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
      display: flex;
    `,
    layoutLogoContainer: css`
      width: 100%;
      height: 100%;
      text-align: center;
    `,
    layoutLogoImage: css`
      height: 32px;
      width: 32px;
    `,
    menu: css`
      flex: 1 1 0%;
      min-height: 0;
      overflow: auto;
    `,
  }
})

export interface LayoutContext {
  siteIconUrl: string | null;
  menuItems: MenuItemType[];
  headerItems: React.ReactNode[];
  breadcrumbs: ItemType[];
  content: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export type LayoutRender = (ctx: LayoutContext) => React.ReactNode;

export interface LayoutLogoContext {
  collapsed: boolean;
  siteIconUrl: string | null;
  siteName: string;
}

export interface AppLayoutConfig {
  siderProps?: SiderProps;
  menuProps?: Omit<MenuProps, 'items' | 'selectedKeys'>;
  logo?: React.ReactNode | ((ctx: LayoutLogoContext) => React.ReactNode) | false;
  breadcrumb?: false | Pick<BreadcrumbProps, 'itemRender' | 'className' | 'style'>;
  footer?: React.ReactNode | false;
  contentWrapper?: false | {
    className?: string;
    style?: React.CSSProperties;
  };
}

export interface AppLayoutProps {
  siderWidth?: number;
  routes: IRoute[];
  element?: React.ReactNode | null;
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
  menuStyle?: 'dark' | 'light';
  transformHeaderItems?: (items: React.ReactNode[]) => React.ReactNode[];
  layout?: LayoutRender | AppLayoutConfig;
  aiChatProps?: AIChatProps;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  element,
  siderWidth = 250,
  routes,
  transformLangConfig,
  menuStyle = 'dark',
  transformHeaderItems = (items) => items,
  layout = { footer: false },
  aiChatProps,
}) => {
  const { isDarkMode } = useThemeMode();
  const { styles } = useStyle();
  const { layout: aiLayout, visible: chatVisible, loaded: chatLoaded, resetPageAIContext } = useAI()
  const { t, i18n } = useTranslation();
  const { t: tCommon } = useTranslation('common');
  const location = useLocation();
  const { hasPermission } = usePermission();

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { siteConfig, clearCurrentOrgId } = useSite();
  useInboxStream();
  const canUseAIChat = !!siteConfig?.attrs?.ai_enabled && hasPermission('ai:chat:create');

  const [navigation, setNavigation] = useState<API.Navigation[]>([]);
  const [siteIcon, setSiteIcon] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>("Loading...");
  const layoutConfig = typeof layout === 'function' ? undefined : layout;
  const {
    className: siderClassName,
    width: siderWidthProp,
    theme: siderTheme,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapse: onSiderCollapse,
    collapsible: siderCollapsible,
    breakpoint: siderBreakpoint = 'xxl',
    ...restSiderProps
  } = layoutConfig?.siderProps ?? {};
  const {
    className: menuClassName,
    theme: menuTheme,
    ...restMenuProps
  } = layoutConfig?.menuProps ?? {};
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const siderCollapsed = controlledCollapsed ?? collapsed;
  const collapsible = siderCollapsible ?? true;
  const setSiderCollapsed = (next: boolean, type: CollapseType) => {
    if (controlledCollapsed === undefined) {
      setCollapsed(next);
    }
    onSiderCollapse?.(next, type);
  };

  // Safety net: drop a stale page-level AI registration left by a page that
  // did not return the cleanup from registerPageAI. Registrations made by the
  // page now being shown are kept (they are stamped with the current route).
  useEffect(() => {
    resetPageAIContext();
  }, [location.pathname, resetPageAIContext]);

  // Global client tools (ui_navigate, ui_get_current_route) for the AI chat.
  useGlobalAITools(routes, canUseAIChat);

  if (location.pathname !== '/profile') {
    if (user && user.mfa_enforced && !user.mfa_enabled) {
      navigate('/profile#mfa');
    } else if (user && user.status === "password_expired") {
      navigate('/profile#password');
    }
  }


  const handleLogout = () => {
    logout();
    clearCurrentOrgId();
    window.location.href = getURL('/login?redirect=' + encodeURIComponent(window.location.href));
  };

  const userMenu = [
    {
      key: 'profile',
      label: <Link to="/profile">{tCommon('profile')}</Link>,
    },
    {
      key: 'logout',
      label: tCommon('logout'),
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (siteConfig) {
      const navigation = siteConfig.navigation?.filter(item => item.path !== siteConfig.home_page) ?? []
      const newNavigation = [...(siteConfig.home_page ? [{
        name: 'home',
        path: siteConfig.home_page,
      }] : []), ...navigation]
      if (newNavigation.length > 1) {
        setNavigation(newNavigation)
      } else {
        setNavigation([])
      }
      setSiteIcon(siteConfig.logo)
      document.getElementById('site-icon')?.setAttribute('href', siteConfig.logo)
    }
  }, [siteConfig])

  useEffect(() => {
    if (i18n.language) {
      setSiteName(siteConfig?.name_i18n[i18n.language] || siteConfig?.name || "")
    }
  }, [siteConfig, i18n.language])


  // get breadcrumbs
  const getBreadcrumbs = (): ItemType[] => {
    const matches = matchRoutes(routes, location.pathname);
    const breadcrumbs: ItemType[] = []
    if (matches) {
      for (const [idx, match] of matches.entries()) {
        if (match.route.path === '/' && !match.route.name) {
          breadcrumbs.push({
            href: match.route.path,
            title: tCommon('home'),
            key: 'home'
          })
        } else if (match.route.name) {
          const names = matches.slice(0, idx + 1).map(match => match.route.name).filter(Boolean).join('.')
          const lastRoutePath = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].path : undefined
          if (lastRoutePath === (match.route.path || match.pathnameBase)) {
            continue
          }
          breadcrumbs.push({
            path: match.pathnameBase,
            title: match.route.name
              ? t(`breadcrumbs.${names.replace(/\./g, '_')}`, { defaultValue: toSmartTitle(match.route.name) })
              : undefined,
            key: match.pathname || match.route.name,
          })
        }
      }
    }

    return breadcrumbs
  };
  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(permission => hasPermission(permission));
  }

  const defaultOpenKeys: string[] = flatMapDeep(routes, item => 'children' in item && item.children ? item.children : []).map(item => item?.name).filter(item => item !== undefined)

  const renderMenuItems = (routes: IRoute[], parent: (string | undefined)[] = []): MenuItemType[] => {
    const toTitle = (name: string | undefined) => {
      if (!name) return name;
      return name.replace(/_/g, ' ').split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
    return routes.flatMap((route) => {
      if ('children' in route && route.children && !route.name) {
        return route.children;
      }
      return [route];
    }).map((route): MenuItemType | null => {
      if ('hideInMenu' in route && route.hideInMenu) {
        return null
      }
      if (route.permissions && !hasAnyPermission(route.permissions)) {
        return null;
      }
      const title = toTitle(route.name)
      if (!route.name) {
        return null;
      }
      if ('children' in route && route.children) {
        const children: MenuItemType[] = renderMenuItems(route.children, [...parent, route.name])
        if (children.length == 0) {
          if (route.path) {
            return {
              key: route.path,
              icon: route.icon,
              label: <Link to={route.path}>{t(`menu.${[...parent, route.name].join('.')}`, { defaultValue: title })}</Link>,
            }
          }
        }
        return {
          key: route.path ?? route.name,
          icon: route.icon,
          label: t(`menu.${[...parent, route.name, route.name].join('.')}`, { defaultValue: title }),
          children: children,
        }
      }
      if (route.name && route.path) {
        return {
          key: route.path,
          icon: route.icon,
          label: <Link to={route.path}>{t(`menu.${[...parent, route.name].join('.')}`, { defaultValue: title })}</Link>,
        }
      }
      return null;
    }).filter(Boolean);
  };
  useEffect(() => {
    const title = getBreadcrumbs().filter(item => item.path !== "/").map(item => item.title).join(' - ')
    if (title) {
      document.title = `${siteName} | ${title}`
    } else {
      document.title = siteName
    }
  }, [getBreadcrumbs, location.pathname])

  const selectedMenuKeys = useMemo(() => {
    const matches = matchRoutes(routes, location.pathname)
    if (matches) {
      for (const match of matches.reverse()) {
        if (match.route.path && match.route.name && !('hideInMenu' in match.route && match.route.hideInMenu)) {
          return match.route.path
        }
      }
    }
    return location.pathname
  }, [location.pathname])

  const headerItems: React.ReactNode[] = [
    <HeaderDropdown
      className={"header-item navigation-dropdown"}
      key="navigation-dropdown"
      hidden={navigation.length <= 1} menu={{
        items: navigation.map(item => ({
          key: item.path,
          style: { paddingRight: '20px' },
          label: <a href={item.path}>{t(`menu.${item.name}`, { defaultValue: item.name })}</a>,
        })),
      }}>
      <SwapOutlined />
    </HeaderDropdown>,
    ...(siteConfig?.enable_multi_org ? [<OrganizationSwitcher key="org-switcher" className="header-item org-switcher" />] : []),
    <InboxDropdown key="inbox-dropdown" className="header-item inbox-dropdown" />,
    <TaskListDropdown key="task-dropdown" className="header-item task-dropdown" />,
    <HeaderDropdown
      key="user-dropdown"
      className="header-item user-dropdown"
      menu={{ items: userMenu }}
    >
      {user?.avatar ? <Avatar src={user.avatar} size={'small'} /> : <Avatar icon={<UserOutlined />} size={'small'} />}
      <span className={classNames("header-user-name", styles.userName)}>{user?.full_name || user?.username}</span>
    </HeaderDropdown>,
    <LanguageSwitch key="language-switch" className="header-item language-switch" transformLangConfig={transformLangConfig} />,
    <ThemeSwitch key="theme-switch" className="header-item theme-switch" />
  ]

  const sanitizeClassName = (className?: string) => {
    if (!className) return ''

    return snakeCase(className).replace(/[^a-zA-Z0-9-]/g, '-')
  }


  const defaultItemRender: BreadcrumbProps['itemRender'] = (route) => {
    const path = route.href || route.path
    if (path) {
      return <Link to={path}>{route.title}</Link>
    }
    return <span>{route.title}</span>
  }

  const defaultRenderLayout = (ctx: LayoutContext): React.ReactNode => {
    const pageClassName = sanitizeClassName(matchRoutes(routes, location.pathname)?.pop()?.route.name)
    const logoConfig = layoutConfig?.logo
    const breadcrumbConfig = layoutConfig?.breadcrumb
    const footerConfig = layoutConfig?.footer
    const contentWrapper = layoutConfig?.contentWrapper

    let logoNode: React.ReactNode = null
    if (logoConfig !== false) {
      let logoContent: React.ReactNode
      if (typeof logoConfig === 'function') {
        logoContent = logoConfig({
          collapsed: siderCollapsed,
          siteIconUrl: ctx.siteIconUrl,
          siteName,
        })
      } else if (logoConfig !== undefined) {
        logoContent = logoConfig
      } else if (ctx.siteIconUrl) {
        logoContent = <img src={ctx.siteIconUrl} alt="logo" className={styles.layoutLogoImage} />
      } else {
        logoContent = <Spin />
      }
      logoNode = (
        <div className={classNames("logo", styles.layoutLogo)}>
          <div className={classNames("layout-logo-container", styles.layoutLogoContainer)}>
            {logoContent}
          </div>
        </div>
      )
    }

    const breadcrumbNode = breadcrumbConfig === false ? null : (
      <Breadcrumb
        className={classNames("site-breadcrumb", styles.breadcrumb, breadcrumbConfig?.className)}
        style={breadcrumbConfig?.style}
        itemRender={breadcrumbConfig?.itemRender ?? defaultItemRender}
        items={ctx.breadcrumbs}
      />
    )

    const wrappedContent = contentWrapper === false ? ctx.content : (
      <div
        className={classNames("site-content-container", styles.contentContainer, contentWrapper?.className)}
        style={contentWrapper?.style}
      >
        {ctx.content}
      </div>
    )

    return <Layout className={classNames("main-layout", styles.layout, { [`page-${pageClassName}`]: pageClassName })}>
      <Sider
        {...restSiderProps}
        width={siderWidthProp ?? siderWidth}
        breakpoint={siderBreakpoint}
        collapsible={collapsible}
        collapsed={siderCollapsed}
        onCollapse={setSiderCollapsed}
        className={classNames(styles.menuSider, 'layout-menu-sider', siderClassName)}
        theme={siderTheme ?? (isDarkMode ? 'light' : menuStyle)}
      >
        {logoNode}
        <Menu
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={['1']}
          mode="inline"
          {...restMenuProps}
          className={classNames("layout-menu", styles.menu, menuClassName)}
          theme={menuTheme ?? (isDarkMode ? 'light' : menuStyle)}
          selectedKeys={[selectedMenuKeys]}
          items={ctx.menuItems}
        />
      </Sider>
      <Layout className={classNames("site-layout", "main-layout", styles.mainLayout)}>
        <Header className={classNames("site-header", styles.header)}>
          <Space>
            {collapsible && (
              <Button
                type="text"
                icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setSiderCollapsed(!siderCollapsed, 'clickTrigger')}
                className={classNames("layout-menu-toggle", styles.menuToggleButton)}
              />
            )}
            {breadcrumbNode}
          </Space>
          <div className={classNames("header-items", styles.headerItems)} >
            {ctx.headerItems}
          </div>
        </Header>
        <Content className={classNames("site-content", styles.content)}>
          {wrappedContent}
        </Content>
        {footerConfig !== false && (
          <Footer className={classNames("site-footer", styles.footer)}>
            {footerConfig === undefined ? <> ©{new Date().getFullYear()} {siteName}</> : footerConfig}
          </Footer>
        )}
      </Layout>
      {(canUseAIChat && (aiLayout === 'sidebar' || aiLayout === 'float-sidebar')) && (chatVisible || chatLoaded) && (<AIChatSider {...aiChatProps} />)}
      {canUseAIChat && <AIChatButton icon={aiChatProps?.floatButtonIcon} />}
      {canUseAIChat && aiLayout === 'classic' && (chatVisible || chatLoaded) && <AIChatModal {...aiChatProps} />}
    </Layout>
  }

  const layoutContext: LayoutContext = {
    siteIconUrl: siteIcon,
    menuItems: renderMenuItems(routes),
    headerItems: transformHeaderItems(headerItems),
    breadcrumbs: getBreadcrumbs(),
    content: element ?? <Outlet />,
    collapsed: siderCollapsed,
    setCollapsed: (next) => setSiderCollapsed(next, 'clickTrigger'),
  }

  if (typeof layout === 'function') {
    return layout(layoutContext)
  }
  return defaultRenderLayout(layoutContext)
};

export default AppLayout; 
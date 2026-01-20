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
import { Layout, Menu, Breadcrumb, Button, Spin, Space } from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SwapOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { type IRoute } from '../routes';
import LanguageSwitch, { type LanguageConfig } from './LanguageSwitch';
import HeaderDropdown from './HeaderDropdown';
import Avatar from './Avatar';
import OrganizationSwitcher from './OrganizationSwitcher';
import { useTranslation } from 'react-i18next';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import usePermission from '@/hooks/usePermission';
import { flatMapDeep } from 'lodash-es';
import { getURL } from '@/utils';
import { AIChatModal, AIChatButton, AIChatSider } from './AIChatLayout';
import { useSite } from '@/contexts/SiteContext';
import { useAI } from '@/contexts/AIContext';
import { useThemeMode, createStyles } from 'antd-style';
import classNames from 'classnames';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
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
      height: calc(100vh - 120px);
      overflow: auto;
    `,
    mainLayout: css`
      flex: 1;
      min-width: 0;
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
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
      }
    `,
    menuToggleButton: css`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
      }
    `,
    layoutLogo: css`
      margin: 8px;
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
    `,
  }
})
export interface AppLayoutProps {
  siderWidth?: number;
  routes: IRoute[];
  element?: React.ReactNode | null;
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
  menuStyle?: 'dark' | 'light';
  transformHeaderItems?: (items: React.ReactNode[]) => React.ReactNode[];
  renderLayout?: (siteIconUrl: string | null, menuItems: React.ReactNode[], headerItems: React.ReactNode[], breadcrumbs: ItemType[], content: React.ReactNode) => React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  element,
  siderWidth = 250,
  routes,
  transformLangConfig,
  menuStyle = 'dark',
  transformHeaderItems = (items) => items,
  renderLayout,
}) => {
  const { themeMode, setThemeMode, isDarkMode } = useThemeMode();
  const { styles } = useStyle();
  const { layout, visible: chatVisible, loaded: chatLoaded } = useAI()
  const { t, i18n } = useTranslation();
  const { t: tCommon } = useTranslation('common');
  const location = useLocation();
  const { hasPermission } = usePermission();

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { siteConfig, clearCurrentOrgId } = useSite();

  const [navigation, setNavigation] = useState<API.Navigation[]>([]);
  const [siteIcon, setSiteIcon] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>("Loading...");

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
          breadcrumbs.push({
            path: match.route.path,
            title: match.route.name ? t(`breadcrumbs.${names}`) : undefined,
            key: match.route.path
          })
        }
      }
    }

    return breadcrumbs
  };
  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(permission => hasPermission(permission));
  }

  const defaultOpenKeys: string[] = flatMapDeep(routes, item => item.children).map(item => item?.name).filter(item => item !== undefined)

  const renderMenuItems = (routes: IRoute[], parent: (string | undefined)[] = []): React.ReactNode[] => {
    const toTitle = (name: string | undefined) => {
      if (!name) return name;
      return name.replace(/_/g, ' ').split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
    return routes.flatMap((route) => {
      if ('children' in route && route.children && !route.name) {
        return route.children;
      }
      return [route];
    }).map((route) => {
      if (route.permissions && !hasAnyPermission(route.permissions)) {
        return null;
      }
      const title = toTitle(route.name)
      if (!route.name) {
        return null;
      }
      if ('children' in route && route.children) {
        const children: React.ReactNode[] = renderMenuItems(route.children, [...parent, route.name])
        if (children.length == 0) {
          if (route.path) {
            return <Menu.Item key={route.path} icon={route.icon}>
              <Link to={route.path}>{t(`menu.${[...parent, route.name].join('.')}`, { defaultValue: title })}</Link>
            </Menu.Item>
          }
        }
        return (
          <SubMenu key={route.path ?? route.name} icon={route.icon} title={t(`menu.${[...parent, route.name, route.name].join('.')}`, { defaultValue: title })}>
            {children}
          </SubMenu>
        );
      }
      if (route.name && route.path) {
        return (
          <Menu.Item key={route.path} icon={route.icon}>
            <Link to={route.path}>{t(`menu.${[...parent, route.name].join('.')}`, { defaultValue: title })}</Link>
          </Menu.Item>
        );
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
        if (match.route.path && match.route.name) {
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
    <HeaderDropdown
      key="user-dropdown"
      className="header-item user-dropdown"
      menu={{ items: userMenu }}
    >
      {user?.avatar ? <Avatar src={user.avatar} /> : <Avatar icon={<UserOutlined />} />}
      <span className={classNames("header-user-name", styles.userName)}>{user?.full_name || user?.username}</span>
    </HeaderDropdown>,
    <LanguageSwitch key="language-switch" className="header-item language-switch" transformLangConfig={transformLangConfig} />,
    <HeaderDropdown
      key="theme-switch"
      className="header-item theme-switch"
      menu={{
        items: [
          { key: 'light', label: <span><SunOutlined /> {tCommon('light', { defaultValue: 'Light Mode' })}</span> },
          { key: 'dark', label: <span><MoonOutlined /> {tCommon('dark', { defaultValue: 'Dark Mode' })}</span> }
        ],
        onClick: ({ key }) => {
          setThemeMode(key as 'light' | 'dark')
        },
        selectedKeys: [themeMode],
      }}
    >
      {themeMode === 'light' ? <SunOutlined /> : <MoonOutlined />}
    </HeaderDropdown>
  ]
  const defaultRenderLayout = (siteIconUrl: string | null, menuItems: React.ReactNode[], headerItems: React.ReactNode[], breadcrumbs: ItemType[], content: React.ReactNode): React.ReactNode => {
    const [collapsed, setCollapsed] = useState(false);

    return <Layout className={classNames("main-layout", styles.layout)}>
      <Sider width={siderWidth} collapsible collapsed={collapsed} onCollapse={setCollapsed} className={classNames(styles.menuSider, 'layout-menu-sider')} theme={isDarkMode ? 'light' : menuStyle} >
        <div className={classNames("logo", styles.layoutLogo)}>
          <div className={classNames("layout-logo-container", styles.layoutLogoContainer)}>
            {siteIconUrl ? <img src={siteIconUrl} alt="logo" className={styles.layoutLogoImage} /> : <Spin size="large" tip="Loading..." />}
          </div>
        </div>
        <Menu className={classNames("layout-menu", styles.menu)} theme={isDarkMode ? 'light' : menuStyle} defaultOpenKeys={defaultOpenKeys} defaultSelectedKeys={['1']} mode="inline" selectedKeys={[selectedMenuKeys]}>
          {menuItems}
        </Menu>
      </Sider>
      <Layout className={classNames("site-layout", "main-layout", styles.mainLayout)}>
        <Header className={classNames("site-header", styles.header)}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              // style={{ fontSize: '16px', width: 64, height: 64 }}
              className={classNames("layout-menu-toggle", styles.menuToggleButton)}
            />
            <Breadcrumb className={classNames("site-breadcrumb", styles.breadcrumb)} itemRender={(route) => {
              const path = route.href || route.path
              if (path) {
                return <Link to={path}>{route.title}</Link>
              }
              return <span>{route.title}</span>
            }} items={breadcrumbs} />
          </Space>
          <div className={classNames("header-items", styles.headerItems)} >
            {headerItems}
          </div>
        </Header>
        <Content className={classNames("site-content", styles.content)}>
          <div className={classNames("site-content-container", styles.contentContainer)}>
            {content}
          </div>
          {siteConfig?.attrs?.ai_enabled && <AIChatButton />}
          {siteConfig?.attrs?.ai_enabled && layout === 'classic' && (chatVisible || chatLoaded) && <AIChatModal />}
        </Content>
        <Footer className={classNames("site-footer", styles.footer)}> ©{new Date().getFullYear()} {siteName}</Footer>
      </Layout>
      {(siteConfig?.attrs?.ai_enabled && (layout === 'sidebar' || layout === 'float-sidebar')) && (chatVisible || chatLoaded) && (<AIChatSider />)}
    </Layout>
  }

  return (renderLayout ?? defaultRenderLayout)(siteIcon, renderMenuItems(routes), transformHeaderItems(headerItems), getBreadcrumbs(), element ?? <Outlet />)
};

export default AppLayout; 
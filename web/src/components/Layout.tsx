import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Spin } from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes, { IRoute } from '../routes';
import LanguageSwitch from './LanguageSwitch';
import HeaderDropdown from './HeaderDropdown';
import Avatar from './Avatar';
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import usePermission from '@/hooks/usePermission';
import { getSiteConfig } from '@/api/system';
import _ from 'lodash';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AppLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { t: tCommon } = useTranslation('common');
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { hasPermission } = usePermission();

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [navigation, setNavigation] = useState<API.Navigation[]>([]);
  const [siteIcon, setSiteIcon] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>("Loading...");

  const [siteConfig, setSiteConfig] = useState<API.SiteConfig | null>(null);

  if (location.pathname !== '/profile') {
    if (user && user.mfa_enforced && !user.mfa_enabled) {
      navigate('/profile#mfa');
    } else if (user && user.status === "password_expired") {
      navigate('/profile#password');
    }
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/console/login?redirect=' + encodeURIComponent(window.location.href);
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
    getSiteConfig().then((siteConfig) => {
      const navigation = siteConfig.navigation.filter(item => item.path !== siteConfig.home_page)
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
      setSiteConfig(siteConfig)
      document.getElementById('site-icon')?.setAttribute('href', siteConfig.logo)
    })
  }, [])

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

  const defaultOpenKeys: string[] = _.flatMapDeep(routes, item => item.children).map(item => item?.name).filter(item => item !== undefined)

  const renderMenuItems = (routes: IRoute[], parent: (string | undefined)[] = []) => {
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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}  >
        <div className="logo" style={{ margin: '8px', display: 'flex' }}>
          <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            {siteIcon ? <img src={siteIcon} alt="logo" style={{ height: '32px', width: '32px', }} /> : <Spin size="large" tip="Loading..." />}
          </div>
        </div>
        <Menu theme="dark" defaultOpenKeys={defaultOpenKeys} defaultSelectedKeys={['1']} mode="inline" selectedKeys={[location.pathname]}>
          {renderMenuItems(routes)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: '20px' }}>
            <HeaderDropdown hidden={navigation.length <= 1} menu={{
              items: navigation.map(item => ({
                key: item.path,
                style: { paddingRight: '20px' },
                label: <a href={item.path}>{t(`menu.${item.name}`, { defaultValue: item.name })}</a>,
              })),
            }}>
              <SwapOutlined />
            </HeaderDropdown>
            <HeaderDropdown menu={{ items: userMenu }}>
              {user?.avatar ? <Avatar src={user.avatar} /> : <Avatar icon={<UserOutlined />} />}
              <span style={{ height: '1em', lineHeight: '1em' }}>{user?.full_name || user?.username}</span>
            </HeaderDropdown>
            <LanguageSwitch />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} itemRender={(route) => {
            const path = route.href || route.path
            if (path) {
              return <Link to={path}>{route.title}</Link>
            }
            return <span>{route.title}</span>
          }} items={getBreadcrumbs()} />
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©{new Date().getFullYear()} {siteName}</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout; 
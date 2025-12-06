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

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, type TabsProps as AntTabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import deDE from 'antd/lib/locale/de_DE';
import esES from 'antd/lib/locale/es_ES';
import frFR from 'antd/lib/locale/fr_FR';
import arEG from 'antd/lib/locale/ar_EG';
import svSE from 'antd/lib/locale/sv_SE';

import { getRoutes, type IRoute } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/Layout';

import './index.css'
import './i18n'
import { getURL } from './utils';
import { LanguageConfig } from './components/LanguageSwitch';
import { SiteProvider } from './contexts/SiteContext';
import { AIProvider } from './contexts/AIContext';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const antdLocales: { [key: string]: any } = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'de-DE': deDE,
  'es-ES': esES,
  'fr-FR': frFR,
  'ar-AE': arEG,
  'sv-SE': svSE,
};

export interface AppProps {
  basePath?: string;
  transformRouter?: (routes: IRoute[]) => IRoute[];
  transformSettingTabs?: (items: AntTabsProps['items']) => AntTabsProps['items'];
  transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
  extraPrivateRoutes?: IRoute[];
  extraPublicRoutes?: IRoute[];
  menuStyle?: 'dark' | 'light';
  transformHeaderItems?: (items: React.ReactNode[]) => React.ReactNode[];
  renderLayout?: (siteIconUrl: string | null, menuItems: React.ReactNode[], headerItems: React.ReactNode[], breadcrumbs: ItemType[], content: React.ReactNode) => React.ReactNode;
}

function App({
  transformRouter = (routes) => routes,
  transformSettingTabs = (items) => items,
  transformLangConfig = (langs) => langs,
  extraPrivateRoutes = [],
  extraPublicRoutes = [],
  menuStyle = 'dark',
  transformHeaderItems = (items) => items,
  renderLayout,
}: AppProps) {
  const { i18n } = useTranslation();
  const [antdLocale, setAntdLocale] = useState(antdLocales[i18n.language] || enUS);

  useEffect(() => {
    setAntdLocale(antdLocales[i18n.language] || enUS);
  }, [i18n.language]);

  const deepCopyRouters = (routes: IRoute[]): IRoute[] => {
    return routes.map((route) => {
      if (route.children === undefined) {
        return route
      }
      return {
        ...route,
        children: deepCopyRouters(route.children),
      }
    })
  }


  const routes = transformRouter(deepCopyRouters(getRoutes({
    transformSettingTabs, transformLangConfig,
    extraPrivateRoutes, extraPublicRoutes
  })));

  const renderRoutes = (childrenRoutes: IRoute[], parentRoute?: IRoute): React.ReactElement[] => {
    return childrenRoutes.flatMap((route) => {
      if (route.is_private) {
        return [route];
      }
      if ('children' in route && route.children) {
        return route.children;
      }
      return [route];
    }).map((route, index) => {
      const element = route.is_private ? <PrivateRoute element={<AppLayout
        routes={routes}
        element={route.element}
        transformLangConfig={transformLangConfig}
        menuStyle={menuStyle}
        transformHeaderItems={transformHeaderItems}
        renderLayout={renderLayout}
      />} /> : route.element
      if ('children' in route && route.children && route.children.length > 0) {
        return <Route key={route.path ?? route.name ?? index} path={route.path} element={element} >
          {renderRoutes(route.children, route)}
        </Route>
      }
      const { path } = route;
      return <Route key={path ?? route.name ?? `${parentRoute?.path ?? ''}.${index}`} path={path} index={route.index} element={element} />
    }).filter(Boolean);
  }
  return (
    <QueryClientProvider client={queryClient} >
      <ConfigProvider
        locale={antdLocale}
      >
        <AuthProvider>
          <SiteProvider>
            <AIProvider>
              <Router basename={getURL()}>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
              </Router>
            </AIProvider>
          </SiteProvider>
        </AuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App; 
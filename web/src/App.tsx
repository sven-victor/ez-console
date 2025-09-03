import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import deDE from 'antd/lib/locale/de_DE';
import esES from 'antd/lib/locale/es_ES';
import frFR from 'antd/lib/locale/fr_FR';
import arEG from 'antd/lib/locale/ar_EG';
import svSE from 'antd/lib/locale/sv_SE';

import routes, { type IRoute } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/Layout';

import './index.css'
import './i18n'

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
  onRouteRender?: (routes: IRoute[]) => IRoute[];
}

function App({
  basePath = "/console/",
  onRouteRender = (routes) => routes,
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
      const element = route.is_private ? <PrivateRoute element={<AppLayout routes={onRouteRender(deepCopyRouters(routes))} element={route.element} />} /> : route.element
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
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={antdLocale}>
        <AuthProvider>
          <Router basename={basePath}>
            <Routes>
              {renderRoutes(onRouteRender(deepCopyRouters(routes)))}
            </Routes>
          </Router>
        </AuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App; 
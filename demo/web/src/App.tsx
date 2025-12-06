import { ConfigProvider } from 'antd';
import { EZApp, i18n, withSuspense } from 'ez-console'
import { lazy } from 'react';
const TestPage = lazy(() => import('@/pages/TestPage'));

i18n.addResource('en', 'translation', 'menu.testPage', "Test Page")
i18n.addResource('fr', 'translation', 'menu.testPage', "Page de test")
i18n.addResource('en', 'translation', 'common.testPage', "Test Page")
i18n.addResource('fr', 'translation', 'common.testPage', "Page de test")


export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          colorBgBase: '#f0f2f5',
          colorBgContainer: '#f0f2f5',
        }
      }}>
      <EZApp
        basePath='/'
        extraPrivateRoutes={[{
          path: '/testPage',
          element: withSuspense(TestPage),
          name: 'testPage',
          index: true,
        }]}
      />
    </ConfigProvider>
  )
}
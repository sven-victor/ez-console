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
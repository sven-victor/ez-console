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

import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'


function toSnakeCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

const baseConfig: UserConfig = {
  base: '/console/',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      treeshake: true,
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks(id, meta) {
          if (id.includes('/node_modules/chart.js/') || id.includes('/node_modules/react-chartjs-2/')) return 'chartjs';
          if (id.includes('/node_modules/highlight.js/')) return 'highlight';
          if (id.includes('/src/components/AIChat.tsx')) return 'ai-chat';
          if (id.includes('/src/components/AIChatLayout.tsx')) return 'ai-chat-layout';
          if (id.includes('/node_modules/react-syntax-highlighter/')) return 'highlighter';
          if (id.includes('/node_modules/mermaid/')) return 'mermaid';
          if (id.includes('/node_modules/refractor/')) return 'refractor';
          if (id.includes('/node_modules/@ant-design/x/') || id.includes('/node_modules/@ant-design/x-markdown/') || id.includes('/node_modules/@ant-design/x-sdk/')) return 'ant-design-x';
          if (id.includes('/node_modules/lodash/') || id.includes('/node_modules/lodash-es/')) return `lodash`;
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/main.tsx') || id.includes('/src/App.tsx') || id.includes('/src/components/Layout.tsx') || id.includes('/src/routes/')) return 'index';
          if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) return "contexts";
          if (id.includes('/src/pages/system/settings/SystemSettings')) return 'system-settings';
          if (id.includes('/src/pages/system/settings')) return 'settings';
          if (id.includes('/src/pages/system/audit')) return 'audit';
          if (id.includes('/src/pages/authorization/user')) return 'users';
          if (id.includes('/src/pages/authorization/role')) return 'roles';
          if (id.includes('/src/pages/authorization/service-account')) return 'service-accounts';
          if (id.includes('/src/pages/profile')) return 'profile';
          if (id.includes('/src/i18n/') || id.includes('/src/utils/') || id.includes('/src/constants/') || id.includes('/src/api/')) return 'base';
          if (id.includes('/src/components/')) return 'components';
          if (id.startsWith('\x00')) {
            return "vite";
          };
          return toSnakeCase(path.basename(id, path.extname(id)))
        }
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => {
  if (env.mode === 'lib') {
    return {
      ...baseConfig,
      base: '/',
      plugins: [
        ...baseConfig.plugins,
        dts({
          insertTypesEntry: true,
          entryRoot: 'src',
          outDir: 'types',
          copyDtsFiles: true,
          rollupTypes: true,
        })
      ],
      build: {
        ...baseConfig.build,
        outDir: 'lib',
        lib: {
          entry: './src/index.ts',
          name: 'EZ-Console',
          formats: ['es', 'cjs'],
          fileName: (format) => `ez-console.${format}.js`,
        },
        sourcemap: false,
        rollupOptions: {
          ...baseConfig.build.rollupOptions,
          treeshake: true,
          output: {
            ...baseConfig.build.rollupOptions.output,
            entryFileNames: 'ez-console.[format].js',
            chunkFileNames: '[format]/[name].js',
            assetFileNames: (chunkInfo) => {
              if (chunkInfo.names?.find((name) => name === 'style.css')) {
                return "[name].[ext]"
              }
              return '[format]/[name].[ext]'
            },

            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'antd': 'Antd',
            },
          },
          external: [
            "@ant-design/icons",
            "@ant-design/pro-components",
            "@ant-design/x",
            "@ant-design/x-markdown",
            "@ant-design/x-sdk",
            "ahooks",
            "antd",
            "antd-style",
            "axios",
            "classnames",
            "dayjs",
            "i18next",
            "lodash-es",
            "react",
            "react-dom",
            "react-i18next",
            "react-query",
            "react-router-dom"
          ],
        },
        cssCodeSplit: false
      }
    }
  }
  return baseConfig
})

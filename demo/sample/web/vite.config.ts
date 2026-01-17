import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function toSnakeCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase().replace(/^_+/, "");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/console': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
  },
  build: {
    outDir: '../internal/server/static/',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id, meta) {
          if (id.includes('/node_modules/mermaid/')) return 'mermaid';
          if (id.includes('/node_modules/refractor/')) return 'refractor';
          if (id.includes('/node_modules/highlight.js/')) return 'highlight';
          if (id.includes('/node_modules/@ant-design/x/') || id.includes('/node_modules/@ant-design/x-markdown/') || id.includes('/node_modules/@ant-design/x-sdk/')) return 'ant-design-x';
          if (id.includes('/node_modules/ez-console/') && id.endsWith("vendor.js")) return 'e-vendor';
          if (id.includes('/node_modules/ez-console/')) return path.basename(id, path.extname(id));
          if (id.includes('/node_modules/@ant-design/x')) return `antd-x`
          if (id.includes('/node_modules/antd/')) return `antd`;
          if (id.includes('/node_modules/antd-style/')) return `antd`;
          if (id.includes('/node_modules/@ant-design/')) return `antd`
          if (id.includes('/node_modules/@antv/')) return `antv`;
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) return `react`;
          if (id.includes('/node_modules/lodash/') || id.includes('/node_modules/lodash-es/')) return `lodash`;
          if (id.includes('/node_modules/i18next/') || id.includes('/node_modules/react-i18next/')) return `i18next`;
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/main.tsx') || id.includes('/src/App.tsx') || id.includes('/src/routes.tsx') || id.includes('/src/routes/')) return 'index';
          if (id.includes('/src/pages/Monitoring')) {
            const matchSubPage = id.match(/\/src\/pages\/Monitoring\/([^\/]*)\/.*/);
            if (matchSubPage) {
              return `monitoring-${toSnakeCase(matchSubPage[1])}`;
            }
          };
          if (id.includes('/src/i18n/') || id.includes('/src/utils/') || id.includes('/src/constants/') || id.includes('/src/api/')) return 'base';
          if (id.includes('/src/components/')) return 'components';
          if (id.startsWith('\x00vite/') || id === '\x00commonjsHelpers.js') {
            return "vite";
          };
          if (id.startsWith("\x00")) {
            return id.replace(/^\x00+/, "")
          }
          return toSnakeCase(path.basename(id, path.extname(id)))
        }
      },

    },
  },
})


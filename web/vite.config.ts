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
          if (id.startsWith('\x00vite/') || id === '\x00commonjsHelpers.js') {
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
              'react-router-dom': 'ReactRouterDOM',
            },
          },
          external: ['react', 'react-dom', 'react-router-dom'],
        },
        cssCodeSplit: false
      }
    }
  }
  return baseConfig
})

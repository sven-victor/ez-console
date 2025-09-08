import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function toSnakeCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      ignoreAnnotations: true,
    },
  }
}) 
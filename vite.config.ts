/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets'),
      'routes': path.resolve(__dirname, './src/routes'),
      'reduxToolkit': path.resolve(__dirname, './src/reduxToolkit'),
      'utils': path.resolve(__dirname, './src/utils'),
      'hooks': path.resolve(__dirname, './src/hooks'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
      ],
    },
  },
});

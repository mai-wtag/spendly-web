import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets'),
      'actions': path.resolve(__dirname, './src/actions'),
      'store': path.resolve(__dirname, './src/store'),
      'slices': path.resolve(__dirname, './src/slices'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'utils': path.resolve(__dirname, './src/utils')
    }
  }
})

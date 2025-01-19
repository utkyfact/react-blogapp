import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router', 'react-loader-spinner'],
      output: {
        globals: {
          'react-loader-spinner': 'ReactLoaderSpinner'
        }
      }
    },
  },
  resolve: {
    alias: {
      'react-router': 'react-router-dom',
    },
  },
  optimizeDeps: {
    include: ['react-loader-spinner']
  }
})

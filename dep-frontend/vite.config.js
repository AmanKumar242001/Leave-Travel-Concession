import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: 'https://dep-backend-ce.onrender.com/',
        // target: process.env.BACKEND_URL,
        target: 'http://127.0.0.1:5000/',
        changeOrigin:true,
        secure:false,
        rewrite: (path) => path.replace(/^\/api/,""),
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 left as-is, per your request

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // ✅ kept untouched
  ],
  base: '/My-Shop/',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  },
})

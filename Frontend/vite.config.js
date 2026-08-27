import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PostCSS-based Tailwind (compatible with Vite 8)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})

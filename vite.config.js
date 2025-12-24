import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Correct for user/organization pages
  build: {
    outDir: 'dist'
  }
})


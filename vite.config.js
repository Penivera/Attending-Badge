import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: [
      '8e4a62354522.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io'
    ]
  }
})

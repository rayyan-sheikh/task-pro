import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This makes the server accessible on your local network
    port: 5173, // Optional: Specify the port (default is 5173)
  },
})

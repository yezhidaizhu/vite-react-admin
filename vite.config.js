import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { inspectorServer } from '@react-dev-inspector/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inspectorServer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})

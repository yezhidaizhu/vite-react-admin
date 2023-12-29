/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { inspectorServer } from '@react-dev-inspector/vite-plugin'

const env = loadEnv("dev", process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inspectorServer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: env.VITE_PROXY_URL,
        changeOrigin: true,
      }
    }
  }
})

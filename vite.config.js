import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "src/assets/styles/_variables.scss" as *;`
      }
    }
  },
  optimizeDeps: {
    exclude: ['@sendgrid/mail']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      external: ['fs', 'path'],
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'styles': ['./src/assets/styles/main.scss']
        }
      }
    }
  }
})

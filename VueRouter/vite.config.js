import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 👈 чтобы @ указывал на src
    }
  },
  base: '/Vue_projects/' // 👈 если твой репозиторий называется VueRouter
})

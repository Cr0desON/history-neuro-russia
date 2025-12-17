import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base: '/history-neuro-russia/',   // ← добавили
    plugins: [vue()]
})

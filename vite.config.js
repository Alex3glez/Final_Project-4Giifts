import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        headers: {
            // Permitir que Sanity Studio (localhost:3333) cargue la web en un iframe de forma segura
            "Content-Security-Policy": "frame-ancestors 'self' http://localhost:3333 http://127.0.0.1:3333",
            "X-Frame-Options": "ALLOWALL",
            "Access-Control-Allow-Origin": "*",
        },
        hmr: {
            overlay: false,
        }
    },
    build: {
        outDir: 'dist'
    }
})
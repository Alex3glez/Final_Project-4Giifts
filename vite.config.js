import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Fix: @sanity/visual-editing v5 uses react/compiler-runtime (React 19 API)
            // This stub makes it work with React 18
            'react/compiler-runtime': path.resolve(__dirname, 'src/stubs/compiler-runtime.js'),
        },
    },
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
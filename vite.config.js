import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    esbuild: {
        target: 'esnext'
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'src/pages/home/index.html'),
                signin: resolve(__dirname, 'src/pages/login/index.html'),
                signup: resolve(__dirname, 'src/pages/signup/index.html'),
                404: resolve(__dirname, 'src/pages/404/index.html'),
                profile: resolve(__dirname, 'src/pages/profile/index.html'),
            },
        },
    },
})

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/landing/css/app.css',
                'resources/landing/app.tsx',
                'resources/monitoreo/css/app.css',
                'resources/monitoreo/app.tsx',
            ],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            '@landing': path.resolve(__dirname, 'resources/landing'),
            '@monitoreo': path.resolve(__dirname, 'resources/monitoreo'),
        },
    },
});

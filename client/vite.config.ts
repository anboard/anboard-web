import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: './',
    plugins: [react()],
    // base: '/',
    base: '/client',
    build: {
        outDir: 'build', // Same as react-scripts' output directory
    },
});

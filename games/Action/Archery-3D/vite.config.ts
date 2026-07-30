import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5191,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4191,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 900,
  },
});

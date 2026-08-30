import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          rnd: ['react-rnd'],
          cmdk: ['cmdk'],
          hotkeys: ['react-hotkeys-hook'],
          sonner: ['sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

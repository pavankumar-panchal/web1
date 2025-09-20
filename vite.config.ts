import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web1/',  // GitHub Pages base URL
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

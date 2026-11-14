import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dos entradas: el sitio público (index.html, una SPA con React Router) y el
// playground del backoffice, que va aparte para que sus estilos no se mezclen
// con los del sitio.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        playground: resolve(import.meta.dirname, 'playground.html'),
      },
    },
  },
});

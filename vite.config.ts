import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dos entradas: el sitio (index.html, React Router) y el playground de
// componentes del backoffice, que va aparte para no mezclar sus estilos.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // En desarrollo, /api se reenvía al backend con Gemini (backend/server.js).
  server: { proxy: { '/api': 'http://localhost:3001' } },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        playground: resolve(import.meta.dirname, 'playground.html'),
      },
    },
  },
})

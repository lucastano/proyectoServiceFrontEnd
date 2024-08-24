import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
export default {
  build: {
    outDir: 'dist'  // Asegúrate de que este sea el directorio correcto
  }
}
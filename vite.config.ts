import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  /*  build: {
    outDir: 'www'  
  }, */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },/*  */
  },
})

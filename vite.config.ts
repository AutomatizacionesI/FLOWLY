import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // El build de servidor (prerender) empaqueta todas las dependencias para
  // no depender de cómo cada paquete se importa desde Node.
  ssr: {
    noExternal: true,
  },
  // El manifest le dice al prerender qué CSS y JS usa la landing, para
  // ponerlos en el <head> y que el HTML prerenderizado no se vea sin estilos.
  build: {
    manifest: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

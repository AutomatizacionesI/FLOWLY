import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import Landing from "../Landing"

/**
 * Entrada del build de servidor (`vite build --ssr`). No se usa en el
 * navegador: `scripts/prerender.mjs` la importa después del build y escribe
 * el HTML resultante en `dist/`.
 *
 * La landing se renderiza con el mismo árbol que monta `src/main.tsx` al
 * hidratar (StrictMode + Landing), así el HTML del servidor y el primer
 * render del cliente coinciden.
 */
export function renderLanding(): string {
  return renderToString(
    <StrictMode>
      <Landing />
    </StrictMode>,
  )
}

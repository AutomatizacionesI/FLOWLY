import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import Landing from "../Landing"
import { empresa, faqs } from "../content/sitio"
import { organizacion, personas, preguntasFrecuentes, scriptJsonLd, sitioWeb } from "./schema"

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

/** JSON-LD de la landing: la organización, el sitio, los socios y las FAQ que se ven en la página. */
export function jsonLdLanding(): string {
  return scriptJsonLd([
    organizacion(),
    sitioWeb(),
    ...personas(),
    preguntasFrecuentes(`${empresa.url}/`, faqs),
  ])
}

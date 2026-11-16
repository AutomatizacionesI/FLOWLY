/**
 * Prerender del sitio, después de `vite build` y `vite build --ssr`.
 *
 * Toma `dist/index.html` (el que armó Vite, con los assets con hash) y le
 * mete adentro de `#root` el HTML de la landing que renderiza
 * `dist-ssr/entry-server.js`. Personas y buscadores reciben el mismo HTML;
 * después React lo hidrata en el navegador (ver `src/main.tsx`).
 */

import { readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const raiz = process.cwd()
const dist = path.join(raiz, "dist")
const distSsr = path.join(raiz, "dist-ssr")

const ssr = await import(pathToFileURL(path.join(distSsr, "entry-server.js")).href)

const plantilla = await readFile(path.join(dist, "index.html"), "utf8")
const marcador = '<div id="root"></div>'
if (!plantilla.includes(marcador)) {
  throw new Error(`No encontré ${marcador} en dist/index.html`)
}

const landing = ssr.renderLanding()
await writeFile(
  path.join(dist, "index.html"),
  plantilla
    .replace("</head>", `  ${ssr.jsonLdLanding()}\n  </head>`)
    .replace(marcador, `<div id="root">${landing}</div>`),
)
console.log(`prerender: landing (${Math.round(landing.length / 1024)} KB de HTML)`)

await rm(distSsr, { recursive: true, force: true })

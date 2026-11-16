/**
 * Prerender del sitio, después de `vite build` y `vite build --ssr`.
 *
 * Toma `dist/index.html` (el que armó Vite, con los assets con hash) y le
 * mete adentro de `#root` el HTML de la landing que renderiza
 * `dist-ssr/entry-server.js`. Personas y buscadores reciben el mismo HTML;
 * después React lo hidrata en el navegador (ver `src/main.tsx`).
 */

import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
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

// Páginas de contenido: HTML estático, una carpeta por ruta (/casos/hike/ →
// dist/casos/hike/index.html).
ssr.validarEnlaces()
const escribir = async (ruta, html) => {
  const destino = path.join(dist, ...ruta.split("/").filter(Boolean), "index.html")
  await mkdir(path.dirname(destino), { recursive: true })
  await writeFile(destino, html)
}
for (const pagina of ssr.paginas) await escribir(pagina.ruta, ssr.renderPagina(pagina))
for (const indice of ssr.renderIndices()) await escribir(indice.ruta, indice.html)
await writeFile(path.join(dist, "404.html"), ssr.render404())
console.log(`prerender: ${ssr.paginas.length} páginas, ${ssr.renderIndices().length} índices y 404.html`)

// Archivos para buscadores y agentes de IA.
const hoy = new Date().toISOString().slice(0, 10)
await writeFile(path.join(dist, "sitemap.xml"), ssr.sitemap(hoy))
await writeFile(path.join(dist, "llms.txt"), ssr.llmsTxt())
await writeFile(path.join(dist, "llms-full.txt"), ssr.llmsFullTxt())
console.log("prerender: sitemap.xml, llms.txt y llms-full.txt")

await rm(distSsr, { recursive: true, force: true })

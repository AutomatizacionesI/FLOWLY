import { renderToStaticMarkup } from "react-dom/server"

import { casos } from "../content/paginas/casos"
import { industrias } from "../content/paginas/industrias"
import { institucionales } from "../content/paginas/institucionales"
import { servicios } from "../content/paginas/servicios"
import { empresa } from "../content/sitio"
import type { Pagina } from "../content/tipos"
import { migas, nodoPagina, organizacion, preguntasFrecuentes, scriptJsonLd } from "./schema"

/**
 * Páginas de contenido con URL propia (servicios, casos, industrias e
 * institucionales). Son HTML estático sin JS: se generan en el build con
 * `renderToStaticMarkup` y usan su propia hoja de estilos (`/paginas.css`).
 * No están en la navegación de la landing; se llega por el pie, el sitemap,
 * `llms.txt` y los enlaces entre ellas.
 */

type Indice = {
  ruta: string
  titulo: string
  tituloSeo: string
  descripcion: string
  etiqueta: string
  entrada: string
  paginas: Pagina[]
}

const indices: Indice[] = [
  {
    ruta: "/servicios/",
    titulo: "Servicios",
    tituloSeo: "Servicios: sistemas a medida, automatización e IA",
    descripcion:
      "Sistemas a medida, automatización de procesos, inteligencia artificial, dashboards y plataformas web para empresas. Spike AI, Montevideo, Uruguay.",
    etiqueta: "Qué hacemos",
    entrada:
      "Ordenamos cómo trabaja tu empresa y automatizamos lo que hoy se hace a mano. Estos son los tipos de trabajo que hacemos; en la mayoría de los proyectos se combinan varios.",
    paginas: servicios,
  },
  {
    ruta: "/casos/",
    titulo: "Casos de éxito",
    tituloSeo: "Casos de éxito de Spike AI",
    descripcion:
      "Sistemas, automatizaciones y plataformas que construimos para empresas en Uruguay: qué problema había, qué hicimos y qué cambió en la operación.",
    etiqueta: "Casos",
    entrada:
      "Proyectos en los que trabajamos. Los clientes que autorizaron aparecer van con nombre; el resto se cuenta por rubro, sin nombres ni datos.",
    paginas: casos,
  },
  {
    ruta: "/industrias/",
    titulo: "Industrias",
    tituloSeo: "Industrias en las que trabajamos",
    descripcion:
      "Sistemas y automatizaciones para inmobiliarias, estudios contables y retail en Uruguay: problemas típicos de cada rubro y qué construimos.",
    etiqueta: "Rubros",
    entrada:
      "Rubros donde ya construimos sistemas en producción. Si el tuyo no está, igual escribinos: la lógica de ordenar la operación se repite más de lo que parece.",
    paginas: industrias,
  },
]

export const paginas: Pagina[] = [...servicios, ...casos, ...industrias, ...institucionales]

const porRuta = new Map<string, { titulo: string; resumen: string }>([
  ...paginas.map((p) => [p.ruta, { titulo: p.titulo, resumen: p.resumen }] as const),
  ...indices.map((i) => [i.ruta, { titulo: i.titulo, resumen: i.entrada }] as const),
])

const nombreSeccion: Record<string, { nombre: string; ruta: string }> = {
  servicio: { nombre: "Servicios", ruta: "/servicios/" },
  caso: { nombre: "Casos de éxito", ruta: "/casos/" },
  industria: { nombre: "Industrias", ruta: "/industrias/" },
}

/** Todas las rutas que se generan, para el sitemap y llms.txt. */
export function rutasGeneradas(): { ruta: string; titulo: string; resumen: string }[] {
  return [
    ...indices.map((i) => ({ ruta: i.ruta, titulo: i.titulo, resumen: i.descripcion })),
    ...paginas.map((p) => ({ ruta: p.ruta, titulo: p.titulo, resumen: p.resumen })),
  ]
}

/** Falla el build si una página enlaza a una ruta que no existe o si hay rutas repetidas. */
export function validarEnlaces(): void {
  const vistas = new Set<string>()
  for (const p of paginas) {
    if (vistas.has(p.ruta)) throw new Error(`Ruta repetida: ${p.ruta}`)
    vistas.add(p.ruta)
    if (!p.ruta.startsWith("/") || !p.ruta.endsWith("/")) throw new Error(`Ruta sin barras: ${p.ruta}`)
    for (const r of p.relacionadas) {
      if (!porRuta.has(r)) throw new Error(`${p.ruta} enlaza a ${r}, que no existe`)
    }
  }
}

/* ── Piezas comunes ─────────────────────────────────────────────────────── */

const enlacesPie = [
  { nombre: "Servicios", ruta: "/servicios/" },
  { nombre: "Casos de éxito", ruta: "/casos/" },
  { nombre: "Industrias", ruta: "/industrias/" },
  { nombre: "Cómo trabajamos", ruta: "/como-trabajamos/" },
  { nombre: "Preguntas frecuentes", ruta: "/preguntas-frecuentes/" },
  { nombre: "Sobre Spike", ruta: "/sobre-spike/" },
]

function Encabezado() {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado__fila">
        <a href="/" className="marca" aria-label="Spike AI, ir al inicio">
          <img src="/brand/spike-logo.svg" alt="Spike AI" width="88" height="45" />
        </a>
        <nav className="encabezado__nav" aria-label="Secciones">
          <a href="/servicios/">Servicios</a>
          <a href="/casos/">Casos</a>
          <a href="/sobre-spike/">Sobre Spike</a>
          <a href={empresa.whatsapp} className="boton boton--chico" rel="noreferrer" target="_blank">
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  )
}

function Migas({ items }: { items: { nombre: string; ruta: string }[] }) {
  return (
    <nav className="migas" aria-label="Estás en">
      <ol>
        {items.map((item, i) => (
          <li key={item.ruta}>
            {i < items.length - 1 ? <a href={item.ruta}>{item.nombre}</a> : <span aria-current="page">{item.nombre}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Cierre común de todas las páginas: diagnóstico sin costo y cómo
 * acompañamos a la empresa después. Los textos salen de la landing (método
 * de 4 pasos y "Qué recibís"); sin precios, plazos ni garantías.
 */
const acompanamiento = [
  {
    titulo: "Empezamos por algo acotado",
    texto: "Arrancamos por lo que más duele y lo vamos haciendo crecer a medida que ves resultados.",
  },
  {
    titulo: "Tu equipo capacitado",
    texto: "Los entrenamos hasta que manejen el sistema sin nosotros.",
  },
  {
    titulo: "Alguien del otro lado",
    texto: "Si algo falla o surge algo nuevo, nos escribís y te contestamos nosotros, no un ticket.",
  },
]

function Llamado() {
  return (
    <section className="llamado" aria-labelledby="llamado-titulo">
      <p className="llamado__etiqueta">Diagnóstico sin costo</p>
      <h2 id="llamado-titulo">Empecemos por entender cómo trabajan hoy</h2>
      <p>
        Una charla de 30 a 60 minutos, sin costo y sin compromiso, para ver dónde se pierde tiempo y por dónde
        conviene empezar. Después no te dejamos solo: te acompañamos mientras el sistema crece.
      </p>
      <ul className="llamado__puntos">
        {acompanamiento.map((a) => (
          <li key={a.titulo}>
            <strong>{a.titulo}</strong>
            <span>{a.texto}</span>
          </li>
        ))}
      </ul>
      <a href={empresa.whatsapp} className="boton" rel="noreferrer" target="_blank">
        Agendar el diagnóstico
      </a>
    </section>
  )
}

function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <nav className="pie__enlaces" aria-label="Más de Spike">
          {enlacesPie.map((e) => (
            <a key={e.ruta} href={e.ruta}>
              {e.nombre}
            </a>
          ))}
        </nav>
        <div className="pie__datos">
          <strong>{empresa.nombre}</strong>
          <span>
            {empresa.ciudad}, {empresa.pais}
          </span>
          <a href={empresa.whatsapp} rel="noreferrer" target="_blank">
            {empresa.telefono}
          </a>
          <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
          <a href={empresa.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a href={empresa.instagram} rel="noreferrer" target="_blank">
            Instagram
          </a>
        </div>
        <p className="pie__frase">{empresa.descripcion}</p>
      </div>
    </footer>
  )
}

function Relacionadas({ rutas }: { rutas: string[] }) {
  if (!rutas.length) return null
  return (
    <section className="relacionadas">
      <h2>Seguí leyendo</h2>
      <ul className="tarjetas">
        {rutas.map((r) => {
          const p = porRuta.get(r)!
          return (
            <li key={r}>
              <a href={r} className="tarjeta">
                <strong>{p.titulo}</strong>
                <span>{p.resumen}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ── Documento ──────────────────────────────────────────────────────────── */

type Cabecera = {
  ruta: string
  tituloSeo: string
  descripcion: string
  jsonLd?: string
  indexar?: boolean
}

function documento(cabecera: Cabecera, cuerpo: string): string {
  const url = `${empresa.url}${cabecera.ruta}`
  const titulo = `${cabecera.tituloSeo} | ${empresa.nombre}`
  const imagen = `${empresa.url}${empresa.ogImagen}`
  const e = escaparAtributo
  return `<!doctype html>
<html lang="es-UY">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${e(titulo)}</title>
    <meta name="description" content="${e(cabecera.descripcion)}" />
    ${cabecera.indexar === false ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`}
    <link rel="icon" type="image/png" sizes="512x512" href="/spike-favicon.png" />
    <link rel="icon" type="image/svg+xml" href="/brand/spike-mark.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/spike-apple-touch-icon.png" />
    <link rel="preload" href="/brand/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/paginas.css" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_UY" />
    <meta property="og:site_name" content="${empresa.nombre}" />
    <meta property="og:title" content="${e(titulo)}" />
    <meta property="og:description" content="${e(cabecera.descripcion)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${imagen}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(titulo)}" />
    <meta name="twitter:description" content="${e(cabecera.descripcion)}" />
    <meta name="twitter:image" content="${imagen}" />
    ${cabecera.jsonLd ?? ""}
  </head>
  <body>
${cuerpo}
  </body>
</html>
`
}

function escaparAtributo(texto: string): string {
  return texto.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function migasDe(pagina: Pagina) {
  const items = [{ nombre: "Inicio", ruta: "/" }]
  const seccion = nombreSeccion[pagina.tipo]
  if (seccion) items.push(seccion)
  items.push({ nombre: pagina.titulo, ruta: pagina.ruta })
  return items
}

export function renderPagina(pagina: Pagina): string {
  const items = migasDe(pagina)
  const url = `${empresa.url}${pagina.ruta}`
  const nodos = [organizacion(), ...nodoPagina(pagina), migas(items)]
  if (pagina.preguntas?.length) nodos.push(preguntasFrecuentes(url, pagina.preguntas))

  const cuerpo = renderToStaticMarkup(
    <>
      <Encabezado />
      <main className="contenedor contenido">
        <Migas items={items} />
        <article>
          <p className="etiqueta">{pagina.etiqueta}</p>
          <h1>{pagina.titulo}</h1>
          <p className="entrada">{pagina.entrada}</p>
          {pagina.cliente && (
            <p className="cliente">
              Cliente:{" "}
              <a href={pagina.cliente.url} rel="noopener noreferrer" target="_blank">
                {pagina.cliente.nombre}
              </a>
            </p>
          )}
          {pagina.secciones.map((s) => (
            <section key={s.titulo} className="seccion">
              <h2>{s.titulo}</h2>
              {s.parrafos?.map((t) => <p key={t}>{t}</p>)}
              {s.puntos && (
                <ul>
                  {s.puntos.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {pagina.preguntas?.length ? (
            <section className="seccion preguntas">
              <h2>Preguntas frecuentes</h2>
              {pagina.preguntas.map((p) => (
                <div key={p.q} className="pregunta">
                  <h3>{p.q}</h3>
                  <p>{p.a}</p>
                </div>
              ))}
            </section>
          ) : null}
        </article>
        <Relacionadas rutas={pagina.relacionadas} />
        <Llamado />
      </main>
      <Pie />
    </>,
  )

  return documento(
    { ruta: pagina.ruta, tituloSeo: pagina.tituloSeo, descripcion: pagina.descripcion, jsonLd: scriptJsonLd(nodos) },
    cuerpo,
  )
}

export function renderIndices(): { ruta: string; html: string }[] {
  return indices.map((indice) => {
    const items = [
      { nombre: "Inicio", ruta: "/" },
      { nombre: indice.titulo, ruta: indice.ruta },
    ]
    const url = `${empresa.url}${indice.ruta}`
    const nodos = [
      organizacion(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#pagina`,
        url,
        name: indice.titulo,
        description: indice.descripcion,
        inLanguage: "es-UY",
        hasPart: indice.paginas.map((p) => ({ "@id": `${empresa.url}${p.ruta}#pagina` })),
      },
      migas(items),
    ]
    const cuerpo = renderToStaticMarkup(
      <>
        <Encabezado />
        <main className="contenedor contenido">
          <Migas items={items} />
          <p className="etiqueta">{indice.etiqueta}</p>
          <h1>{indice.titulo}</h1>
          <p className="entrada">{indice.entrada}</p>
          <ul className="tarjetas tarjetas--indice">
            {indice.paginas.map((p) => (
              <li key={p.ruta}>
                <a href={p.ruta} className="tarjeta">
                  <span className="tarjeta__etiqueta">{p.etiqueta}</span>
                  <strong>{p.titulo}</strong>
                  <span>{p.resumen}</span>
                </a>
              </li>
            ))}
          </ul>
          <Llamado />
        </main>
        <Pie />
      </>,
    )
    return {
      ruta: indice.ruta,
      html: documento(
        { ruta: indice.ruta, tituloSeo: indice.tituloSeo, descripcion: indice.descripcion, jsonLd: scriptJsonLd(nodos) },
        cuerpo,
      ),
    }
  })
}

export function render404(): string {
  const cuerpo = renderToStaticMarkup(
    <>
      <Encabezado />
      <main className="contenedor contenido no-encontrada">
        <p className="etiqueta">Error 404</p>
        <h1>Esta página no existe</h1>
        <p className="entrada">
          Puede que el enlace esté mal escrito o que la página se haya movido. Desde acá podés seguir:
        </p>
        <ul className="tarjetas">
          {[{ nombre: "Inicio", ruta: "/" }, ...enlacesPie].map((e) => (
            <li key={e.ruta}>
              <a href={e.ruta} className="tarjeta">
                <strong>{e.nombre}</strong>
              </a>
            </li>
          ))}
        </ul>
        <Llamado />
      </main>
      <Pie />
    </>,
  )
  return documento(
    { ruta: "/404.html", tituloSeo: "Página no encontrada", descripcion: empresa.descripcion, indexar: false },
    cuerpo,
  )
}

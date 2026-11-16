import { empresa, faqs, team } from "../content/sitio"
import type { Pagina } from "../content/tipos"
import { paginas, rutasGeneradas } from "./paginas"

/** sitemap.xml con la landing y todas las páginas generadas. */
export function sitemap(fecha: string): string {
  const urls = ["/", ...rutasGeneradas().map((r) => r.ruta)]
  const items = urls
    .map(
      (ruta) => `  <url>
    <loc>${empresa.url}${ruta}</loc>
    <lastmod>${fecha}</lastmod>
  </url>`,
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`
}

const grupos: { titulo: string; filtro: (p: Pagina) => boolean }[] = [
  { titulo: "Servicios", filtro: (p) => p.tipo === "servicio" },
  { titulo: "Casos", filtro: (p) => p.tipo === "caso" },
  { titulo: "Industrias", filtro: (p) => p.tipo === "industria" },
  { titulo: "Sobre Spike AI", filtro: (p) => p.tipo === "institucional" },
]

const cabecera = () => `# ${empresa.nombre}

> ${empresa.nombre} (también Spike Automations) es una empresa de ${empresa.ciudad}, ${empresa.pais}, que construye sistemas a medida, automatizaciones e inteligencia artificial para empresas que necesitan ordenar su operación. Trabaja con empresas de Uruguay y de la región, en forma remota.

- Sitio: ${empresa.url}/
- Socios: ${team.map((p) => `${p.name} (${p.role})`).join(", ")}
- Contacto: WhatsApp ${empresa.telefono}, ${empresa.email}
- LinkedIn: ${empresa.linkedin}
- Instagram: ${empresa.instagram}
`

/** llms.txt (formato llmstxt.org): resumen y enlaces a todas las páginas. */
export function llmsTxt(): string {
  const secciones = grupos
    .map((g) => {
      const lineas = paginas
        .filter(g.filtro)
        .map((p) => `- [${p.titulo}](${empresa.url}${p.ruta}): ${p.resumen}`)
      return `## ${g.titulo}\n\n${lineas.join("\n")}`
    })
    .join("\n\n")
  return `${cabecera()}
Texto completo de todas las páginas: ${empresa.url}/llms-full.txt

${secciones}
`
}

function paginaEnMarkdown(p: Pagina): string {
  const partes = [`## ${p.titulo}`, `URL: ${empresa.url}${p.ruta}`, p.entrada]
  if (p.cliente) partes.push(`Cliente: ${p.cliente.nombre} (${p.cliente.url})`)
  for (const s of p.secciones) {
    partes.push(`### ${s.titulo}`)
    if (s.parrafos) partes.push(...s.parrafos)
    if (s.puntos) partes.push(s.puntos.map((t) => `- ${t}`).join("\n"))
  }
  if (p.preguntas?.length) {
    partes.push("### Preguntas frecuentes")
    for (const q of p.preguntas) partes.push(`**${q.q}**\n${q.a}`)
  }
  return partes.join("\n\n")
}

/** llms-full.txt: el texto de todas las páginas en un solo archivo Markdown. */
export function llmsFullTxt(): string {
  const tieneFaq = paginas.some((p) => p.ruta === "/preguntas-frecuentes/")
  const faqLanding = tieneFaq
    ? ""
    : `\n## Preguntas frecuentes\n\n${faqs.map((q) => `**${q.q}**\n${q.a}`).join("\n\n")}\n`
  return `${cabecera()}
${paginas.map(paginaEnMarkdown).join("\n\n---\n\n")}
${faqLanding}`
}

import { empresa, team } from "../content/sitio"
import type { Pagina, Pregunta } from "../content/tipos"

/**
 * Datos estructurados (schema.org en JSON-LD). Todo lo que se declara acá
 * también está en el texto visible de la página donde se usa.
 */

type Nodo = Record<string, unknown>

const base = empresa.url
export const idOrganizacion = `${base}/#organizacion`
const idSitio = `${base}/#sitio`

const slug = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const idPersona = (nombre: string) => `${base}/sobre-spike/#${slug(nombre)}`

export function organizacion(): Nodo {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": idOrganizacion,
    name: empresa.nombre,
    alternateName: empresa.otrosNombres,
    url: `${base}/`,
    logo: `${base}${empresa.logo}`,
    image: `${base}${empresa.ogImagen}`,
    description: empresa.descripcion,
    email: empresa.email,
    telephone: empresa.telefono,
    address: {
      "@type": "PostalAddress",
      addressLocality: empresa.ciudad,
      addressCountry: empresa.paisCodigo,
    },
    areaServed: [
      { "@type": "Country", name: "Uruguay" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    founder: team.map((p) => ({ "@id": idPersona(p.name) })),
    sameAs: [empresa.linkedin, empresa.instagram],
    knowsLanguage: "es",
  }
}

export function sitioWeb(): Nodo {
  return {
    "@type": "WebSite",
    "@id": idSitio,
    url: `${base}/`,
    name: empresa.nombre,
    inLanguage: "es-UY",
    publisher: { "@id": idOrganizacion },
  }
}

export function personas(): Nodo[] {
  return team.map((p) => ({
    "@type": "Person",
    "@id": idPersona(p.name),
    name: p.name,
    jobTitle: p.role,
    image: `${base}${p.photo}`,
    sameAs: [p.linkedin],
    worksFor: { "@id": idOrganizacion },
  }))
}

export function preguntasFrecuentes(url: string, preguntas: Pregunta[]): Nodo {
  return {
    "@type": "FAQPage",
    "@id": `${url}#preguntas`,
    url,
    inLanguage: "es-UY",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  }
}

export function migas(items: { nombre: string; ruta: string }[]): Nodo {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: `${base}${item.ruta}`,
    })),
  }
}

/** Nodo principal de cada página de contenido, según su tipo. */
export function nodoPagina(pagina: Pagina): Nodo[] {
  const url = `${base}${pagina.ruta}`
  const comun = {
    "@id": `${url}#pagina`,
    url,
    name: pagina.titulo,
    description: pagina.descripcion,
    inLanguage: "es-UY",
    isPartOf: { "@id": idSitio },
  }
  switch (pagina.tipo) {
    case "servicio":
      return [
        { "@type": "WebPage", ...comun, mainEntity: { "@id": `${url}#servicio` } },
        {
          "@type": "Service",
          "@id": `${url}#servicio`,
          name: pagina.titulo,
          description: pagina.descripcion,
          url,
          provider: { "@id": idOrganizacion },
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      ]
    case "caso":
      return [
        {
          "@type": "Article",
          ...comun,
          headline: pagina.titulo,
          author: { "@id": idOrganizacion },
          publisher: { "@id": idOrganizacion },
          ...(pagina.cliente
            ? { about: { "@type": "Organization", name: pagina.cliente.nombre, url: pagina.cliente.url } }
            : {}),
        },
      ]
    case "institucional":
      if (pagina.ruta === "/sobre-spike/") {
        return [{ "@type": "AboutPage", ...comun, about: { "@id": idOrganizacion } }, ...personas()]
      }
      return [{ "@type": "WebPage", ...comun, about: { "@id": idOrganizacion } }]
    default:
      return [{ "@type": "WebPage", ...comun, about: { "@id": idOrganizacion } }]
  }
}

/** `<script type="application/ld+json">` listo para meter en el <head>. */
export function scriptJsonLd(nodos: Nodo[]): string {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodos })
  return `<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`
}

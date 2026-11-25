/**
 * Datos del sitio que comparten la landing y las páginas generadas en el
 * build (páginas de contenido, JSON-LD, sitemap, llms.txt). Si algo cambia
 * acá, cambia en todos lados.
 */

export const empresa = {
  nombre: "Spike AI",
  otrosNombres: ["Spike Automations"],
  url: "https://spikeai.com.uy",
  descripcion:
    "Sistemas a medida y automatización para empresas que necesitan ordenar su operación.",
  ciudad: "Montevideo",
  pais: "Uruguay",
  paisCodigo: "UY",
  telefono: "+598 91 315 670",
  email: "contacto@spikeai.com.uy",
  whatsapp:
    "https://wa.me/59891315670?text=Hola%20Spike%20AI%2C%20quiero%20automatizar%20mi%20negocio",
  linkedin: "https://www.linkedin.com/company/spike-automations/",
  instagram: "https://www.instagram.com/somos.spike/",
  logo: "/brand/spike-logo.png",
  ogImagen: "/brand/og-spike.png",
}

export const team = [
  {
    name: "Facundo Etcheverry",
    role: "Sistemas y automatización",
    photo: "/equipo/facundo.jpeg",
    linkedin: "https://www.linkedin.com/in/facundo-etcheverry-castells-87517531a/",
  },
  {
    name: "Gonzalo Pittaluga",
    role: "Datos y estrategia",
    photo: "/equipo/gonzalo.jpeg",
    linkedin: "https://www.linkedin.com/in/gonzalopittaluga/",
  },
]

export const faqs = [
  {
    q: "¿Cómo cobran?",
    a: "Cada proyecto se cotiza con alcance, entregables, precio cerrado y plazos definidos antes de empezar. No trabajamos por hora ni con presupuestos abiertos. Las necesidades nuevas que aparecen durante el proyecto se evalúan como cambios de alcance.",
  },
  {
    q: "¿La primera conversación incluye un diagnóstico o una demo?",
    a: "La primera conversación sirve para entender cómo trabajan hoy y evaluar si podemos ayudar. Si hace falta un diagnóstico más profundo o una demo, acordamos antes qué incluye, qué información necesitamos y en cuánto tiempo.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "La primera automatización suele estar corriendo entre dos y cuatro semanas. Los sistemas completos llevan más, pero entregamos por partes para que veas resultados antes de terminar.",
  },
  {
    q: "¿Tengo que cambiar las herramientas que uso hoy?",
    a: "Casi nunca. Trabajamos sobre lo que ya tenés y conectamos lo que haga falta. Si algo conviene reemplazar, te lo decimos con el motivo.",
  },
  {
    q: "¿Qué pasa con nuestros datos?",
    a: "Los datos son tuyos y quedan en infraestructura tuya o en servicios que vos controlás. Firmamos acuerdo de confidencialidad si lo necesitás.",
  },
  {
    q: "¿Qué pasa si mi equipo no es técnico?",
    a: "Es el caso más común. Capacitamos al equipo y dejamos el sistema funcionando con la gente que ya trabaja ahí. Si nadie lo usa, no sirvió.",
  },
  {
    q: "¿Trabajan fuera de Uruguay?",
    a: "Sí. Estamos en Uruguay y trabajamos con empresas de toda la región de forma remota.",
  },
]

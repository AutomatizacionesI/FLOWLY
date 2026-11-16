/**
 * Formato de las páginas de contenido (servicios, casos, industrias e
 * institucionales). Se generan como HTML estático en el build
 * (ver `src/ssg/` y `scripts/prerender.mjs`); no forman parte de la landing.
 */

export type Seccion = {
  /** Título de la sección (se pinta como <h2>). */
  titulo: string
  /** Párrafos de texto corrido. */
  parrafos?: string[]
  /** Lista de puntos. */
  puntos?: string[]
}

export type Pregunta = { q: string; a: string }

export type TipoPagina = "servicio" | "caso" | "industria" | "institucional"

export type Pagina = {
  /** Ruta con barra final, por ejemplo "/servicios/sistemas-a-medida/". */
  ruta: string
  tipo: TipoPagina
  /** El <h1> de la página. */
  titulo: string
  /** El <title>, sin " | Spike AI" (se agrega solo). Hasta ~60 caracteres. */
  tituloSeo: string
  /** Meta description. Entre 120 y 160 caracteres. */
  descripcion: string
  /** Texto corto arriba del <h1> (rubro, tipo de servicio, etc.). */
  etiqueta: string
  /** Párrafo de entrada: qué es y para quién. */
  entrada: string
  secciones: Seccion[]
  /** Preguntas frecuentes propias de la página (opcional). */
  preguntas?: Pregunta[]
  /** Rutas de páginas relacionadas (servicios, casos, industrias). */
  relacionadas: string[]
  /** Solo para casos con cliente nombrado (Lunar, ReDress, HIKE). */
  cliente?: { nombre: string; url: string }
  /** Resumen de una línea para índices, tarjetas y llms.txt. */
  resumen: string
}

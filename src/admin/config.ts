/**
 * Vocabulario del panel: los estados del pipeline, los orígenes y las
 * prioridades viven acá para que las pantallas, los filtros y los colores
 * lean siempre de la misma lista.
 */

/** El panel cuelga de /admin y no se enlaza desde ninguna parte del sitio. */
export const ADMIN_BASE = "/admin"

export type EstadoLead = "nuevo" | "contactado" | "reunion" | "propuesta" | "ganado" | "perdido"

export const estados: { id: EstadoLead; label: string; corto: string; tono: string }[] = [
  { id: "nuevo", label: "Nuevo", corto: "Nuevo", tono: "#7cc4ff" },
  { id: "contactado", label: "Contactado", corto: "Contactado", tono: "#a894ff" },
  { id: "reunion", label: "Reunión", corto: "Reunión", tono: "#ffc46b" },
  { id: "propuesta", label: "Propuesta", corto: "Propuesta", tono: "#ff9a7a" },
  { id: "ganado", label: "Ganado", corto: "Ganado", tono: "#63e28f" },
  { id: "perdido", label: "Perdido", corto: "Perdido", tono: "#8b93a7" },
]

/** Los que siguen vivos: lo que cuenta como pipeline abierto. */
export const estadosAbiertos: EstadoLead[] = ["nuevo", "contactado", "reunion", "propuesta"]

export const estadoLabel = (id: string) => estados.find((e) => e.id === id)?.label ?? id
export const estadoTono = (id: string) => estados.find((e) => e.id === id)?.tono ?? "#8b93a7"

export type Origen = "whatsapp" | "mail" | "instagram" | "linkedin" | "referido" | "web" | "otro"

export const origenes: { id: Origen; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "mail", label: "Mail" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "referido", label: "Referido" },
  { id: "web", label: "Web" },
  { id: "otro", label: "Otro" },
]

export const origenLabel = (id: string) => origenes.find((o) => o.id === id)?.label ?? id

export type EstadoProyecto = "en_curso" | "entregado" | "cancelado"

export const estadosProyecto: { id: EstadoProyecto; label: string; tono: string }[] = [
  { id: "en_curso", label: "En curso", tono: "#ffc46b" },
  { id: "entregado", label: "Entregado", tono: "#63e28f" },
  { id: "cancelado", label: "Cancelado", tono: "#8b93a7" },
]

export const estadoProyectoLabel = (id: string) =>
  estadosProyecto.find((e) => e.id === id)?.label ?? id
export const estadoProyectoTono = (id: string) =>
  estadosProyecto.find((e) => e.id === id)?.tono ?? "#8b93a7"

export type TipoCosto = "infra" | "licencia" | "terceros" | "otro"

export const tiposCosto: { id: TipoCosto; label: string }[] = [
  { id: "infra", label: "Infraestructura" },
  { id: "licencia", label: "Licencia" },
  { id: "terceros", label: "Terceros" },
  { id: "otro", label: "Otro" },
]

export type TipoMovimiento =
  | "nota"
  | "llamada"
  | "reunion"
  | "mail"
  | "whatsapp"
  | "propuesta"
  | "estado"

export const movimientos: { id: TipoMovimiento; label: string }[] = [
  { id: "nota", label: "Nota" },
  { id: "llamada", label: "Llamada" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "mail", label: "Mail" },
  { id: "reunion", label: "Reunión" },
  { id: "propuesta", label: "Propuesta" },
  { id: "estado", label: "Cambio de estado" },
]

export type Prioridad = "baja" | "media" | "alta"

export const prioridades: { id: Prioridad; label: string; tono: string }[] = [
  { id: "alta", label: "Alta", tono: "#ff7a6b" },
  { id: "media", label: "Media", tono: "#ffc46b" },
  { id: "baja", label: "Baja", tono: "#8b93a7" },
]

export const prioridadTono = (id: string) => prioridades.find((p) => p.id === id)?.tono ?? "#8b93a7"
export const prioridadLabel = (id: string) => prioridades.find((p) => p.id === id)?.label ?? id

/**
 * A los cuántos días sin hablar un lead abierto pasa a estar "frío".
 * Es el número que dispara el aviso de seguimiento en el resumen.
 */
export const DIAS_SIN_CONTACTO = 7

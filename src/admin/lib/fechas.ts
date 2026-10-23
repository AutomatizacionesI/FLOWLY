/**
 * Fechas en castellano y en criollo: lo que interesa en el panel no es el
 * timestamp exacto sino "hace cuánto" y "cuánto falta".
 */

const DIA = 86_400_000

/** Medianoche local de hoy, para comparar días sin que la hora moleste. */
function hoy() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Pasa "2026-03-04" o un ISO completo a Date local. */
export function aFecha(valor: string | null | undefined): Date | null {
  if (!valor) return null
  const soloDia = /^\d{4}-\d{2}-\d{2}$/.test(valor)
  const d = soloDia ? new Date(`${valor}T00:00:00`) : new Date(valor)
  return Number.isNaN(d.getTime()) ? null : d
}

/** Días enteros entre hoy y la fecha. Negativo = pasado. */
export function diasHasta(valor: string | null | undefined): number | null {
  const d = aFecha(valor)
  if (!d) return null
  const base = new Date(d)
  base.setHours(0, 0, 0, 0)
  return Math.round((base.getTime() - hoy().getTime()) / DIA)
}

/** Días transcurridos desde la fecha hasta hoy. */
export function diasDesde(valor: string | null | undefined): number | null {
  const dias = diasHasta(valor)
  return dias === null ? null : -dias
}

/** "hace 3 días", "ayer", "hoy". Para el último contacto. */
export function hace(valor: string | null | undefined): string {
  const dias = diasDesde(valor)
  if (dias === null) return "Sin contacto"
  if (dias <= 0) return "Hoy"
  if (dias === 1) return "Ayer"
  if (dias < 7) return `Hace ${dias} días`
  if (dias < 14) return "Hace una semana"
  if (dias < 31) return `Hace ${Math.floor(dias / 7)} semanas`
  if (dias < 60) return "Hace un mes"
  return `Hace ${Math.floor(dias / 30)} meses`
}

/** "en 2 días", "mañana", "vencida hace 3 días". Para los seguimientos. */
export function cuando(valor: string | null | undefined): string {
  const dias = diasHasta(valor)
  if (dias === null) return "Sin fecha"
  if (dias === 0) return "Hoy"
  if (dias === 1) return "Mañana"
  if (dias === -1) return "Ayer"
  if (dias > 1) return `En ${dias} días`
  return `Hace ${-dias} días`
}

export function vencida(valor: string | null | undefined): boolean {
  const dias = diasHasta(valor)
  return dias !== null && dias < 0
}

export function esHoy(valor: string | null | undefined): boolean {
  return diasHasta(valor) === 0
}

const fechaCorta = new Intl.DateTimeFormat("es-UY", { day: "numeric", month: "short" })
const fechaLarga = new Intl.DateTimeFormat("es-UY", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
})

export function corta(valor: string | null | undefined): string {
  const d = aFecha(valor)
  return d ? fechaCorta.format(d) : "—"
}

export function larga(valor: string | null | undefined): string {
  const d = aFecha(valor)
  return d ? fechaLarga.format(d) : "—"
}

/** "2026-10-23" a partir de un Date, que es lo que esperan los <input type="date">. */
export function aInput(d: Date): string {
  const mes = `${d.getMonth() + 1}`.padStart(2, "0")
  const dia = `${d.getDate()}`.padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function enDias(cantidad: number): string {
  const d = new Date()
  d.setDate(d.getDate() + cantidad)
  return aInput(d)
}

const plata = new Intl.NumberFormat("es-UY", { maximumFractionDigits: 0 })

export function monto(valor: number | null | undefined, moneda = "USD"): string {
  if (valor === null || valor === undefined) return "—"
  const simbolo = moneda === "UYU" ? "$U" : "US$"
  return `${simbolo} ${plata.format(valor)}`
}

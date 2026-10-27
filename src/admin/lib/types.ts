import type {
  EstadoLead,
  EstadoProyecto,
  Origen,
  Prioridad,
  TipoCosto,
  TipoMovimiento,
} from "../config"

export type Perfil = {
  id: string
  nombre: string
  email: string | null
  color: string
}

export type Lead = {
  id: string
  empresa: string
  contacto: string | null
  email: string | null
  telefono: string | null
  origen: Origen
  estado: EstadoLead
  valor_estimado: number | null
  /** Lo que paga por año de mantenimiento, aparte del valor del cierre. */
  mantenimiento_anual: number | null
  moneda: string
  responsable_id: string | null
  notas: string | null
  ultimo_contacto: string | null
  /** Se graba sola al pasar a ganado y no cambia al editar. */
  cerrado_en: string | null
  proximo_seguimiento: string | null
  orden: number
  motivo_perdida: string | null
  /** Cliente al que pertenece; null mientras sea un prospecto nuevo. */
  cliente_id?: string | null
  creado_en: string
  actualizado_en: string
}

export type Cliente = {
  id: string
  nombre: string
  contacto: string | null
  email: string | null
  telefono: string | null
  /** false para internos y trabajos sin fin comercial: no entran en métricas. */
  comercial: boolean
  responsable_id: string | null
  notas: string | null
  ultimo_contacto: string | null
  proximo_seguimiento: string | null
  creado_en: string
  actualizado_en: string
}

/** Una fila de la vista `proyectos_resumen`: el proyecto con horas, costos y margen. */
export type Proyecto = {
  id: string
  cliente_id: string
  cliente: string
  comercial: boolean
  lead_id: string | null
  proyecto_origen_id: string | null
  nombre: string
  estado: EstadoProyecto
  cotizado_usd: number | null
  monto_usd: number
  confirmado_en: string
  arr_usd: number
  arr_baja_en: string | null
  responsable_id: string | null
  repo_url: string | null
  drive_url: string | null
  notas: string | null
  horas: number
  costos_usd: number
  margen_usd: number
  usd_por_hora: number | null
  cuenta_generado: boolean
  cuenta_arr: boolean
}

export type ProyectoForm = {
  cliente_id: string
  nombre: string
  estado: EstadoProyecto
  cotizado_usd: number | null
  monto_usd: number
  confirmado_en: string
  arr_usd: number
  proyecto_origen_id: string | null
  responsable_id: string | null
  repo_url: string | null
  drive_url: string | null
  notas: string | null
}

export type ClienteForm = Pick<
  Cliente,
  | "nombre"
  | "contacto"
  | "email"
  | "telefono"
  | "comercial"
  | "responsable_id"
  | "proximo_seguimiento"
  | "notas"
>

export type Hora = {
  id: string
  proyecto_id: string
  persona_id: string | null
  fecha: string
  horas: number
  detalle: string | null
}

export type Costo = {
  id: string
  proyecto_id: string
  fecha: string
  tipo: TipoCosto
  concepto: string
  monto_usd: number
}

export type Movimiento = {
  id: string
  lead_id: string
  tipo: TipoMovimiento
  detalle: string | null
  autor_id: string | null
  cuenta_contacto: boolean
  creado_en: string
}

export type Tarea = {
  id: string
  titulo: string
  detalle: string | null
  lead_id: string | null
  responsable_id: string | null
  vence: string | null
  prioridad: Prioridad
  hecha: boolean
  completada_en: string | null
  creado_en: string
}

/** Lo que manda el formulario de alta/edición de un lead. */
export type LeadForm = Pick<
  Lead,
  | "empresa"
  | "contacto"
  | "email"
  | "telefono"
  | "origen"
  | "estado"
  | "valor_estimado"
  | "mantenimiento_anual"
  | "responsable_id"
  | "proximo_seguimiento"
  | "notas"
  | "cliente_id"
>

export type TareaForm = Pick<
  Tarea,
  "titulo" | "detalle" | "lead_id" | "responsable_id" | "vence" | "prioridad"
>

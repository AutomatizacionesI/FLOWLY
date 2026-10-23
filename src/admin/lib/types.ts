import type { EstadoLead, Origen, Prioridad, TipoMovimiento } from "../config"

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
  moneda: string
  responsable_id: string | null
  notas: string | null
  ultimo_contacto: string | null
  proximo_seguimiento: string | null
  orden: number
  motivo_perdida: string | null
  creado_en: string
  actualizado_en: string
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
  | "responsable_id"
  | "proximo_seguimiento"
  | "notas"
>

export type TareaForm = Pick<
  Tarea,
  "titulo" | "detalle" | "lead_id" | "responsable_id" | "vence" | "prioridad"
>

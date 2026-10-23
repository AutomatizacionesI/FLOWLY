import { useState } from "react"

import { prioridades, type Prioridad } from "../config"
import { enDias } from "../lib/fechas"
import type { Tarea, TareaForm } from "../lib/types"
import { useDatos } from "../state/DataContext"

import { Campo, Modal } from "./piezas"

/**
 * Alta y edición de una tarea. Puede quedar colgada de un lead (el típico
 * "mandarle la propuesta a X") o ser suelta.
 */
export function FormTarea({
  tarea,
  leadId,
  cerrar,
}: {
  tarea?: Tarea
  leadId?: string
  cerrar: () => void
}) {
  const { leads, perfiles, crearTarea, editarTarea } = useDatos()

  const [form, setForm] = useState<TareaForm>(() =>
    tarea
      ? {
          titulo: tarea.titulo,
          detalle: tarea.detalle,
          lead_id: tarea.lead_id,
          responsable_id: tarea.responsable_id,
          vence: tarea.vence,
          prioridad: tarea.prioridad,
        }
      : {
          titulo: "",
          detalle: "",
          lead_id: leadId ?? null,
          responsable_id: null,
          // Por defecto, mañana: una tarea sin fecha es una tarea que se olvida.
          vence: enDias(1),
          prioridad: "media",
        },
  )
  const [guardando, setGuardando] = useState(false)

  const set = <K extends keyof TareaForm>(k: K, v: TareaForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo.trim() || guardando) return

    setGuardando(true)
    const limpio: TareaForm = {
      ...form,
      titulo: form.titulo.trim(),
      detalle: form.detalle?.trim() || null,
      vence: form.vence || null,
    }

    if (tarea) await editarTarea(tarea.id, limpio)
    else await crearTarea(limpio)

    cerrar()
  }

  return (
    <Modal titulo={tarea ? "Editar tarea" : "Nueva tarea"} cerrar={cerrar}>
      <form className="a-form a-form--2" onSubmit={guardar}>
        <Campo label="Qué hay que hacer" ancho>
          <input
            className="a-input"
            value={form.titulo}
            onChange={(e) => set("titulo", e.target.value)}
            placeholder="Mandar la propuesta"
            autoFocus
            required
          />
        </Campo>

        <Campo label="Detalle" ancho>
          <textarea
            className="a-area"
            value={form.detalle ?? ""}
            onChange={(e) => set("detalle", e.target.value)}
            placeholder="Lo que haga falta recordar."
          />
        </Campo>

        <Campo label="Para cuándo">
          <input
            className="a-input"
            type="date"
            value={form.vence ?? ""}
            onChange={(e) => set("vence", e.target.value || null)}
          />
        </Campo>

        <Campo label="Prioridad">
          <select
            className="a-select"
            value={form.prioridad}
            onChange={(e) => set("prioridad", e.target.value as Prioridad)}
          >
            {prioridades.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Quién la hace">
          <select
            className="a-select"
            value={form.responsable_id ?? ""}
            onChange={(e) => set("responsable_id", e.target.value || null)}
          >
            <option value="">Sin asignar</option>
            {perfiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Lead relacionado">
          <select
            className="a-select"
            value={form.lead_id ?? ""}
            onChange={(e) => set("lead_id", e.target.value || null)}
          >
            <option value="">Ninguno</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.empresa}
              </option>
            ))}
          </select>
        </Campo>

        <div className="a-pie a-ancho">
          <button type="button" className="a-btn a-btn--fantasma" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="a-btn a-btn--primario" disabled={guardando}>
            {tarea ? "Guardar" : "Crear tarea"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

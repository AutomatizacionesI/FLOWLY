import { useState } from "react"

import { estados, origenes, type EstadoLead, type Origen } from "../config"
import type { Lead, LeadForm } from "../lib/types"
import { useDatos } from "../state/DataContext"

import { Campo, Modal } from "./piezas"

const vacio: LeadForm = {
  empresa: "",
  contacto: "",
  email: "",
  telefono: "",
  origen: "whatsapp",
  estado: "nuevo",
  valor_estimado: null,
  mantenimiento_anual: null,
  cliente_id: null,
  responsable_id: null,
  proximo_seguimiento: null,
  notas: "",
}

/**
 * Alta y edición de un lead. El mismo formulario para los dos casos: si viene
 * `lead`, edita; si no, crea.
 */
export function FormLead({
  lead,
  estadoInicial,
  cerrar,
}: {
  lead?: Lead
  estadoInicial?: EstadoLead
  cerrar: () => void
}) {
  const { perfiles, crearLead, editarLead, clientes, modeloListo } = useDatos()

  const [form, setForm] = useState<LeadForm>(() =>
    lead
      ? {
          empresa: lead.empresa,
          contacto: lead.contacto,
          email: lead.email,
          telefono: lead.telefono,
          origen: lead.origen,
          estado: lead.estado,
          valor_estimado: lead.valor_estimado,
          mantenimiento_anual: lead.mantenimiento_anual,
          cliente_id: lead.cliente_id ?? null,
          responsable_id: lead.responsable_id,
          proximo_seguimiento: lead.proximo_seguimiento,
          notas: lead.notas,
        }
      : { ...vacio, estado: estadoInicial ?? "nuevo" },
  )
  const [guardando, setGuardando] = useState(false)

  const set = <K extends keyof LeadForm>(k: K, v: LeadForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.empresa.trim() || guardando) return

    setGuardando(true)
    // Los campos de texto vacíos van como null: así la base no guarda "".
    const limpio: LeadForm = {
      ...form,
      empresa: form.empresa.trim(),
      contacto: form.contacto?.trim() || null,
      email: form.email?.trim() || null,
      telefono: form.telefono?.trim() || null,
      notas: form.notas?.trim() || null,
      proximo_seguimiento: form.proximo_seguimiento || null,
    }

    if (lead) await editarLead(lead.id, limpio)
    else await crearLead(limpio)

    cerrar()
  }

  return (
    <Modal titulo={lead ? "Editar lead" : "Nuevo lead"} cerrar={cerrar}>
      <form className="a-form a-form--2" onSubmit={guardar}>
        <Campo label="Empresa" ancho>
          <input
            className="a-input"
            value={form.empresa}
            onChange={(e) => set("empresa", e.target.value)}
            placeholder="Estudio Pérez"
            autoFocus
            required
          />
        </Campo>

        <Campo label="Contacto">
          <input
            className="a-input"
            value={form.contacto ?? ""}
            onChange={(e) => set("contacto", e.target.value)}
            placeholder="Nombre y apellido"
          />
        </Campo>

        <Campo label="Teléfono">
          <input
            className="a-input"
            value={form.telefono ?? ""}
            onChange={(e) => set("telefono", e.target.value)}
            placeholder="099 123 456"
          />
        </Campo>

        <Campo label="Mail" ancho>
          <input
            className="a-input"
            type="email"
            value={form.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            placeholder="contacto@empresa.com"
          />
        </Campo>

        <Campo label="Estado">
          <select
            className="a-select"
            value={form.estado}
            onChange={(e) => set("estado", e.target.value as EstadoLead)}
          >
            {estados.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Entró por">
          <select
            className="a-select"
            value={form.origen}
            onChange={(e) => set("origen", e.target.value as Origen)}
          >
            {origenes.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Valor estimado (US$)">
          <input
            className="a-input"
            type="number"
            min="0"
            step="100"
            value={form.valor_estimado ?? ""}
            onChange={(e) =>
              set("valor_estimado", e.target.value === "" ? null : Number(e.target.value))
            }
            placeholder="2500"
          />
        </Campo>

        <Campo label="Mantenimiento anual (US$)">
          <input
            className="a-input"
            type="number"
            min="0"
            step="20"
            value={form.mantenimiento_anual ?? ""}
            onChange={(e) =>
              set("mantenimiento_anual", e.target.value === "" ? null : Number(e.target.value))
            }
            placeholder="220"
          />
        </Campo>

        {/* Un cliente que vuelve a pedir algo abre un lead nuevo, pero ligado
            a su ficha: así su historia no se parte en dos. */}
        {modeloListo && clientes.length > 0 ? (
          <Campo label="¿Ya es cliente?" ancho>
            <select
              className="a-select"
              value={form.cliente_id ?? ""}
              onChange={(e) => set("cliente_id", e.target.value || null)}
            >
              <option value="">No, es nuevo</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </Campo>
        ) : null}

        <Campo label="Lo sigue">
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

        <Campo label="Próximo seguimiento" ancho>
          <input
            className="a-input"
            type="date"
            value={form.proximo_seguimiento ?? ""}
            onChange={(e) => set("proximo_seguimiento", e.target.value || null)}
          />
        </Campo>

        <Campo label="Notas" ancho>
          <textarea
            className="a-area"
            value={form.notas ?? ""}
            onChange={(e) => set("notas", e.target.value)}
            placeholder="Qué necesita, qué le interesó, de dónde salió."
          />
        </Campo>

        <div className="a-pie a-ancho">
          <button type="button" className="a-btn a-btn--fantasma" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="a-btn a-btn--primario" disabled={guardando}>
            {lead ? "Guardar" : "Crear lead"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

import { useState } from "react"

import type { Cliente, ClienteForm } from "../lib/types"
import { useDatos } from "../state/DataContext"

import { Campo, Modal } from "./piezas"

const vacio: ClienteForm = {
  nombre: "",
  contacto: "",
  email: "",
  telefono: "",
  comercial: true,
  responsable_id: null,
  proximo_seguimiento: null,
  notas: "",
}

/** Alta y edición de un cliente. Si viene `cliente`, edita; si no, crea. */
export function FormCliente({ cliente, cerrar }: { cliente?: Cliente; cerrar: () => void }) {
  const { perfiles, crearCliente, editarCliente } = useDatos()

  const [form, setForm] = useState<ClienteForm>(() =>
    cliente
      ? {
          nombre: cliente.nombre,
          contacto: cliente.contacto,
          email: cliente.email,
          telefono: cliente.telefono,
          comercial: cliente.comercial,
          responsable_id: cliente.responsable_id,
          proximo_seguimiento: cliente.proximo_seguimiento,
          notas: cliente.notas,
        }
      : vacio,
  )
  const [guardando, setGuardando] = useState(false)

  const set = <K extends keyof ClienteForm>(k: K, v: ClienteForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  return (
    <Modal titulo={cliente ? "Editar cliente" : "Nuevo cliente"} cerrar={cerrar}>
      <form
        className="a-form a-form--2"
        onSubmit={async (e) => {
          e.preventDefault()
          if (guardando) return
          setGuardando(true)
          if (cliente) await editarCliente(cliente.id, form)
          else await crearCliente(form)
          setGuardando(false)
          cerrar()
        }}
      >
        <Campo label="Nombre" ancho>
          <input
            className="a-input"
            value={form.nombre}
            onChange={(e) => set("nombre", e.target.value)}
            placeholder="Estudio Pérez"
            required
          />
        </Campo>

        <Campo label="Contacto">
          <input
            className="a-input"
            value={form.contacto ?? ""}
            onChange={(e) => set("contacto", e.target.value || null)}
            placeholder="Nombre y apellido"
          />
        </Campo>

        <Campo label="Teléfono">
          <input
            className="a-input"
            value={form.telefono ?? ""}
            onChange={(e) => set("telefono", e.target.value || null)}
            placeholder="099 123 456"
          />
        </Campo>

        <Campo label="Mail" ancho>
          <input
            className="a-input"
            type="email"
            value={form.email ?? ""}
            onChange={(e) => set("email", e.target.value || null)}
            placeholder="contacto@empresa.com"
          />
        </Campo>

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

        <Campo label="Volver a hablarle">
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
            onChange={(e) => set("notas", e.target.value || null)}
            placeholder="Qué le hicimos, con quién se habla, lo que haga falta."
          />
        </Campo>

        {/* Lo no comercial queda afuera de todas las métricas: interno,
            favores, pruebas. Por eso se avisa acá y no en una ayuda aparte. */}
        <label
          className="a-ancho"
          style={{ display: "flex", gap: 9, alignItems: "flex-start", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={!form.comercial}
            onChange={(e) => set("comercial", !e.target.checked)}
            style={{ marginTop: 2 }}
          />
          <span style={{ fontSize: 12.5, color: "var(--a-ink-soft)" }}>
            No es comercial
            <span style={{ display: "block", color: "var(--a-ink-faint)", fontSize: 11.5 }}>
              Interno, un favor o una prueba. No entra en el generado ni en los mantenimientos.
            </span>
          </span>
        </label>

        <div className="a-pie a-ancho">
          <button type="button" className="a-btn" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="a-btn a-btn--primario" disabled={guardando}>
            {cliente ? "Guardar" : "Crear cliente"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

import { useState } from "react"

import { aInput, monto } from "../lib/fechas"
import type { Lead } from "../lib/types"
import { useDatos } from "../state/DataContext"

import { Campo, Modal } from "./piezas"

/**
 * El paso que convierte un lead en trabajo confirmado.
 *
 * Ganar un lead no es sólo moverlo de columna: de acá sale el proyecto, y el
 * proyecto es lo que alimenta el generado. Por eso pide el monto en vez de
 * dar por bueno el estimado — lo que se cotizó y lo que se firmó rara vez
 * son el mismo número.
 *
 * El alta del cliente no se pregunta: si todavía no existía, lo crea la
 * misma operación en la base.
 */
export function FormConfirmar({ lead, cerrar }: { lead: Lead; cerrar: () => void }) {
  const { confirmarLead } = useDatos()

  const [nombre, setNombre] = useState(lead.empresa)
  const [montoUsd, setMontoUsd] = useState<number>(lead.valor_estimado ?? 0)
  const [arrUsd, setArrUsd] = useState<number>(lead.mantenimiento_anual ?? 0)
  const [fecha, setFecha] = useState(aInput(new Date()))
  const [guardando, setGuardando] = useState(false)

  const enPesos = lead.moneda && lead.moneda !== "USD"

  async function confirmar(e: React.FormEvent) {
    e.preventDefault()
    if (guardando) return
    setGuardando(true)

    const ok = await confirmarLead(lead.id, {
      monto_usd: montoUsd,
      nombre: nombre.trim() || lead.empresa,
      arr_usd: arrUsd,
      confirmado_en: fecha,
    })

    setGuardando(false)
    if (ok) cerrar()
  }

  return (
    <Modal titulo="Confirmar el trabajo" cerrar={cerrar}>
      <form className="a-form a-form--2" onSubmit={confirmar}>
        <p
          style={{
            gridColumn: "1 / -1",
            margin: 0,
            fontSize: 12.5,
            color: "var(--a-ink-faint)",
            lineHeight: 1.55,
          }}
        >
          <b style={{ color: "var(--a-ink-soft)" }}>{lead.empresa}</b> pasa a ganado y se abre su
          proyecto. El monto que pongas acá es el que suma al generado, así que va el que se firmó,
          no el que se cotizó.
        </p>

        <Campo label="Nombre del proyecto" ancho>
          <input
            className="a-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={lead.empresa}
            required
          />
        </Campo>

        <Campo label="Monto confirmado (US$)">
          <input
            className="a-input"
            type="number"
            min="0"
            step="10"
            value={montoUsd}
            onChange={(e) => setMontoUsd(Number(e.target.value))}
            required
          />
        </Campo>

        <Campo label="Mantenimiento anual (US$)">
          <input
            className="a-input"
            type="number"
            min="0"
            step="20"
            value={arrUsd}
            onChange={(e) => setArrUsd(Number(e.target.value))}
          />
        </Campo>

        <Campo label="Fecha de confirmación" ancho>
          <input
            className="a-input"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </Campo>

        {lead.valor_estimado ? (
          <p
            style={{
              gridColumn: "1 / -1",
              margin: 0,
              fontSize: 12,
              color: "var(--a-ink-faint)",
            }}
          >
            Lo estimado era {monto(lead.valor_estimado, lead.moneda)}
            {enPesos ? " — ojo, estaba en otra moneda: el proyecto se guarda en dólares." : "."}
          </p>
        ) : null}

        <div className="a-pie a-ancho">
          <button type="button" className="a-btn" onClick={cerrar}>
            Cancelar
          </button>
          <button type="submit" className="a-btn a-btn--primario" disabled={guardando}>
            {guardando ? "Confirmando…" : "Confirmar y ganar"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

import { ArrowRight, Upload } from "lucide-react"
import { useState } from "react"

import { texts } from "../config"
import { PageHead } from "../components/Screen"
import { formatDay, formatMoney, isoDay, daysFromToday } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/**
 * Extracto bancario de ejemplo. Positivo = entra plata al banco.
 * En el libro se mira en espejo: lo que entra al banco va al Debe.
 */
const statement = [
  { id: "e1", date: isoDay(daysFromToday(-18)), concept: "Transferencia de Ferretería Los Álamos", amount: 64500 },
  { id: "e2", date: isoDay(daysFromToday(-16)), concept: "Pago a Insumos del Litoral", amount: -48500 },
  { id: "e3", date: isoDay(daysFromToday(-14)), concept: "Débito automático UTE", amount: -9800 },
  { id: "e4", date: isoDay(daysFromToday(-11)), concept: "Acreditación POS", amount: 37250 },
  { id: "e5", date: isoDay(daysFromToday(-9)), concept: "Comisión bancaria", amount: -1450 },
  { id: "e6", date: isoDay(daysFromToday(-6)), concept: "Pago de sueldos", amount: -185500 },
  { id: "e7", date: isoDay(daysFromToday(-3)), concept: "Transferencia de Textil Mirasol", amount: 128000 },
]

/** La cuenta contrapartida que le corresponde a cada movimiento. */
function counterAccount(concept: string) {
  if (concept.startsWith("Transferencia de")) return "Deudores por ventas"
  if (concept.startsWith("Pago a")) return "Proveedores"
  if (concept.includes("UTE")) return "Gastos — servicios públicos"
  if (concept.includes("POS")) return "Deudores por ventas"
  if (concept.includes("Comisión")) return "Gastos bancarios"
  if (concept.includes("sueldos")) return "Sueldos a pagar"
  return "Cuenta a definir"
}

export function Extractos() {
  const { toast } = useDemo()
  const [converted, setConverted] = useState(false)

  const entries = statement.map((movement) => {
    const other = counterAccount(movement.concept)
    const amount = Math.abs(movement.amount)
    // Entra plata: Banco al Debe. Sale plata: Banco al Haber.
    return movement.amount > 0
      ? { ...movement, debit: "Banco cuenta corriente", credit: other, amount }
      : { ...movement, debit: other, credit: "Banco cuenta corriente", amount }
  })

  const total = entries.reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <>
      <PageHead
        title="Extractos a asientos"
        sub="El extracto del banco pasa a asientos de partida doble · datos de ejemplo"
      />

      <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Extracto de ejemplo</div>
              <div className="d-card__sub">Itaú · {statement.length} movimientos</div>
            </div>
            <button
              type="button"
              className="d-btn d-btn--quiet d-btn--sm"
              onClick={() => toast(texts.fakeUpload)}
            >
              <Upload size={12} />
              Subir archivo
            </button>
          </div>

          <table className="d-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th className="is-num">Importe</th>
              </tr>
            </thead>
            <tbody>
              {statement.map((movement) => (
                <tr key={movement.id}>
                  <td className="d-num d-muted">{formatDay(movement.date)}</td>
                  <td>{movement.concept}</td>
                  <td
                    className="is-num"
                    style={{ color: movement.amount < 0 ? "var(--d-bad)" : "var(--d-ok)" }}
                  >
                    {formatMoney(movement.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className="d-btn d-btn--primary"
            style={{ marginTop: 16 }}
            onClick={() => setConverted(true)}
          >
            Convertir a asientos
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="d-card d-card--flat" style={{ alignSelf: "start" }}>
          <div className="d-card__title">Cómo se traduce</div>
          <p className="d-muted" style={{ marginTop: 9, fontSize: 12.5, lineHeight: 1.6 }}>
            Banco y libro se miran en espejo: un depósito es positivo en el banco y va al Debe en el
            libro; un pago es negativo en el banco y va al Haber.
          </p>
          <p className="d-muted" style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6 }}>
            La contrapartida sale del concepto. Lo que el sistema no reconoce queda marcado como
            “cuenta a definir” para que lo resuelvas vos.
          </p>
        </div>
      </div>

      {converted ? (
        <div className="d-card" style={{ marginTop: 13 }}>
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Asientos generados</div>
              <div className="d-card__sub">Partida doble · ejemplo</div>
            </div>
            <span className="d-chip d-chip--ok">Cuadra: el Debe es igual al Haber</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="d-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cuenta</th>
                  <th className="is-num">Debe</th>
                  <th className="is-num">Haber</th>
                </tr>
              </thead>
              <tbody>
                {entries.flatMap((entry) => [
                  <tr key={`${entry.id}-d`}>
                    <td className="d-num d-muted">{formatDay(entry.date)}</td>
                    <td>{entry.debit}</td>
                    <td className="is-num">{formatMoney(entry.amount)}</td>
                    <td className="is-num">—</td>
                  </tr>,
                  <tr key={`${entry.id}-h`}>
                    <td />
                    <td style={{ paddingLeft: 26 }} className="d-muted">
                      {entry.credit}
                    </td>
                    <td className="is-num">—</td>
                    <td className="is-num">{formatMoney(entry.amount)}</td>
                  </tr>,
                ])}
                <tr>
                  <td />
                  <td style={{ fontWeight: 700 }}>Totales</td>
                  <td className="is-num" style={{ fontWeight: 700 }}>
                    {formatMoney(total)}
                  </td>
                  <td className="is-num" style={{ fontWeight: 700 }}>
                    {formatMoney(total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="d-btn d-btn--ghost d-btn--sm"
            style={{ marginTop: 14 }}
            onClick={() => toast(texts.fakeDownload)}
          >
            Descargar para tu sistema contable
          </button>
        </div>
      ) : null}
    </>
  )
}

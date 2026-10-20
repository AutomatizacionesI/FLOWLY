import { useState } from "react"

import { texts } from "../config"
import { PageHead } from "../components/Screen"
import { daysFromToday, formatDay, formatMoney, isoDay } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/**
 * Reporte de comprobantes electrónicos (CFE) de ejemplo.
 * La gracia de la pantalla: la tabla RUT → cuenta contable es editable, y al
 * cambiar una cuenta se rehacen los asientos de abajo.
 */

type Cfe = {
  id: string
  date: string
  rut: string
  supplier: string
  net: number
  vatRate: 22 | 10
}

const cfes: Cfe[] = [
  { id: "cfe1", date: isoDay(daysFromToday(-20)), rut: "217733440019", supplier: "Insumos del Litoral S.R.L.", net: 48500, vatRate: 22 },
  { id: "cfe2", date: isoDay(daysFromToday(-18)), rut: "214400910017", supplier: "UTE", net: 8030, vatRate: 22 },
  { id: "cfe3", date: isoDay(daysFromToday(-15)), rut: "219911030015", supplier: "Alimentos Rinconada S.A.", net: 73400, vatRate: 10 },
  { id: "cfe4", date: isoDay(daysFromToday(-12)), rut: "215566210013", supplier: "Servicios Cañada Ltda.", net: 112000, vatRate: 22 },
  { id: "cfe5", date: isoDay(daysFromToday(-9)), rut: "214400910017", supplier: "UTE", net: 9150, vatRate: 22 },
  { id: "cfe6", date: isoDay(daysFromToday(-5)), rut: "217733440019", supplier: "Insumos del Litoral S.R.L.", net: 21300, vatRate: 22 },
]

const accounts = [
  "Gastos — insumos",
  "Gastos — servicios públicos",
  "Gastos — servicios profesionales",
  "Mercadería",
  "Gastos — fletes",
  "Cuenta a definir",
]

/** Cuenta que el estudio le viene poniendo a cada RUT. */
const defaultAccounts: Record<string, string> = {
  "217733440019": "Gastos — insumos",
  "214400910017": "Gastos — servicios públicos",
  "219911030015": "Mercadería",
  "215566210013": "Gastos — servicios profesionales",
}

export function AsientosCfe() {
  const { toast } = useDemo()
  const [mapping, setMapping] = useState<Record<string, string>>(defaultAccounts)

  // Un RUT puede venir varias veces: la tabla de cuentas va por RUT, no por comprobante.
  const ruts = [...new Map(cfes.map((cfe) => [cfe.rut, cfe])).values()]

  const rows = cfes.flatMap((cfe) => {
    const vat = cfe.net * (cfe.vatRate / 100)
    const account = mapping[cfe.rut] ?? "Cuenta a definir"
    return [
      { key: `${cfe.id}-g`, date: cfe.date, account, debe: cfe.net, haber: 0 },
      { key: `${cfe.id}-i`, date: cfe.date, account: `IVA compras ${cfe.vatRate}%`, debe: vat, haber: 0 },
      { key: `${cfe.id}-p`, date: cfe.date, account: `Proveedores — ${cfe.supplier}`, debe: 0, haber: cfe.net + vat },
    ]
  })

  const debe = rows.reduce((sum, row) => sum + row.debe, 0)
  const haber = rows.reduce((sum, row) => sum + row.haber, 0)

  return (
    <>
      <PageHead
        title="Asientos desde CFE"
        sub="El reporte de comprobantes electrónicos pasa a asientos · datos de ejemplo"
      />

      <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Comprobantes del período</div>
              <div className="d-card__sub">{cfes.length} CFE de ejemplo</div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="d-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Proveedor</th>
                  <th>RUT</th>
                  <th className="is-num">Neto</th>
                  <th className="is-num">IVA</th>
                </tr>
              </thead>
              <tbody>
                {cfes.map((cfe) => (
                  <tr key={cfe.id}>
                    <td className="d-num d-muted">{formatDay(cfe.date)}</td>
                    <td style={{ fontWeight: 500 }}>{cfe.supplier}</td>
                    <td className="d-num d-muted">{cfe.rut}</td>
                    <td className="is-num">{formatMoney(cfe.net)}</td>
                    <td className="is-num d-muted">{cfe.vatRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-card" style={{ alignSelf: "start" }}>
          <div className="d-card__head">
            <div>
              <div className="d-card__title">RUT → cuenta contable</div>
              <div className="d-card__sub">Cambiá una cuenta y los asientos se rehacen</div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {ruts.map((cfe) => (
              <label key={cfe.rut} style={{ display: "grid", gap: 5 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{cfe.supplier}</span>
                <span className="d-muted d-num" style={{ fontSize: 11 }}>
                  RUT {cfe.rut}
                </span>
                <select
                  className="d-input"
                  value={mapping[cfe.rut] ?? "Cuenta a definir"}
                  onChange={(event) =>
                    setMapping({ ...mapping, [cfe.rut]: event.target.value })
                  }
                >
                  {accounts.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>

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
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="d-num d-muted">{formatDay(row.date)}</td>
                  <td>{row.account}</td>
                  <td className="is-num">{row.debe > 0 ? formatMoney(row.debe) : "—"}</td>
                  <td className="is-num">{row.haber > 0 ? formatMoney(row.haber) : "—"}</td>
                </tr>
              ))}
              <tr>
                <td />
                <td style={{ fontWeight: 700 }}>Totales</td>
                <td className="is-num" style={{ fontWeight: 700 }}>
                  {formatMoney(debe)}
                </td>
                <td className="is-num" style={{ fontWeight: 700 }}>
                  {formatMoney(haber)}
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
    </>
  )
}

import { Camera, Check, FileDown, ImagePlus, Sparkles, Smartphone, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { texts } from "../config"
import { FacturaPreview } from "../components/FacturaPreview"
import { PageHead } from "../components/Screen"
import { useEscape } from "../components/useEscape"
import { clientName, formatMoney, type Invoice } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/** Qué tan seguro quedó cada campo después de leer. Es parte del ejemplo. */
const confidence: Record<string, number> = {
  fecha: 99,
  proveedor: 97,
  rut: 94,
  moneda: 99,
  subtotal: 96,
  iva: 92,
  total: 98,
  categoria: 81,
}

type Draft = {
  date: string
  supplier: string
  rut: string
  currency: "UYU" | "USD"
  subtotal: number
  vatRate: 22 | 10
  category: string
}

export function Facturas() {
  const { invoices, setInvoices, toast } = useDemo()
  const [openId, setOpenId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const open = invoices.find((invoice) => invoice.id === openId) ?? null
  const confirmed = invoices.filter((invoice) => invoice.status === "confirmada")

  return (
    <>
      <PageHead
        title="Facturas con IA"
        sub="Elegí una factura, dejá que la lea y confirmá · datos de ejemplo"
      />

      <div className="d-card" style={{ padding: 14, marginBottom: 13 }}>
        <div className="d-row" style={{ flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            className="d-btn d-btn--primary d-btn--sm"
            onClick={() => setUploading(true)}
          >
            <Camera size={14} />
            Cargar factura
          </button>
          <span className="d-muted" style={{ fontSize: 12.5 }}>
            En tu sistema le sacás una foto desde el celular y se carga sola.
          </span>
        </div>
      </div>

      <div
        className="d-grid"
        style={{ marginTop: 0, gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
      >
        {invoices.map((invoice) => (
          <div key={invoice.id} className="d-card">
            <FacturaPreview invoice={invoice} />

            <div className="d-row" style={{ marginTop: 13, justifyContent: "space-between" }}>
              <span
                className={
                  invoice.status === "confirmada"
                    ? "d-chip d-chip--ok"
                    : invoice.status === "leida"
                      ? "d-chip d-chip--warn"
                      : "d-chip"
                }
              >
                {invoice.status === "confirmada"
                  ? "Confirmada"
                  : invoice.status === "leida"
                    ? "Leída, falta confirmar"
                    : "Sin leer"}
              </span>

              <button
                type="button"
                className={`d-btn d-btn--sm ${invoice.status === "confirmada" ? "d-btn--ghost" : "d-btn--ai"}`}
                onClick={() => setOpenId(invoice.id)}
              >
                {invoice.status === "confirmada" ? (
                  "Ver"
                ) : (
                  <>
                    <Sparkles size={13} />
                    Leer con IA
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmed.length > 0 ? <Batch invoices={confirmed} /> : null}

      {uploading ? <UploadNotice onClose={() => setUploading(false)} /> : null}

      {open ? (
        <Reader
          invoice={open}
          onClose={() => setOpenId(null)}
          onConfirm={(draft) => {
            setInvoices((list) =>
              list.map((item) =>
                item.id === open.id ? { ...item, ...draft, status: "confirmada" } : item,
              ),
            )
            setOpenId(null)
            toast("Factura confirmada y lista para exportar.")
          }}
          onRead={() => {
            setInvoices((list) =>
              list.map((item) =>
                item.id === open.id && item.status === "sin_leer"
                  ? { ...item, status: "leida" }
                  : item,
              ),
            )
            toast("Leída. Revisá los datos y confirmá.")
          }}
        />
      ) : null}
    </>
  )
}

/* ── Cargar factura ────────────────────────────────────────────────── */

/**
 * Muestra cómo se carga una factura en el sistema real: foto desde el celular,
 * desde la galería o un archivo. En la demo no acepta nada: solo explica.
 */
function UploadNotice({ onClose }: { onClose: () => void }) {
  useEscape(onClose)

  const ways = [
    {
      icon: Camera,
      title: "Sacarle una foto",
      body: "Desde el celular, parado en el mostrador. La IA la lee y completa los campos.",
    },
    {
      icon: ImagePlus,
      title: "Elegirla de la galería",
      body: "La foto que ya le sacaste, o la captura que te mandaron por WhatsApp.",
    },
    {
      icon: Smartphone,
      title: "Subir el PDF",
      body: "El comprobante que llega por mail, arrastrado desde la computadora.",
    },
  ]

  return (
    <div className="d-overlay" onClick={onClose}>
      <div
        className="d-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Cargar factura"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-row" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <span className="d-chip d-chip--warn">Esto es una demo</span>
            <h2 className="d-modal__title" style={{ marginTop: 11 }}>
              Acá cargás tus facturas
            </h2>
            <p className="d-modal__body" style={{ marginTop: 8 }}>
              En la demo no se suben archivos: probá con las facturas de ejemplo. En tu sistema,
              las cargás de estas tres formas.
            </p>
          </div>
          <button type="button" className="d-icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <ul style={{ display: "grid", gap: 10, marginTop: 20 }}>
          {ways.map((way) => (
            <li key={way.title} className="d-card d-card--flat d-row" style={{ alignItems: "flex-start" }}>
              <span
                style={{
                  display: "grid",
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  placeItems: "center",
                  borderRadius: 10,
                  background: "var(--d-green-soft)",
                  color: "var(--d-green)",
                }}
              >
                <way.icon size={16} />
              </span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{way.title}</div>
                <p className="d-muted" style={{ marginTop: 3, fontSize: 12.5, lineHeight: 1.55 }}>
                  {way.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="d-modal__actions">
          <button type="button" className="d-btn d-btn--primary" onClick={onClose}>
            Probar con las de ejemplo
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Lectura con IA ────────────────────────────────────────────────── */

const readingSteps = ["Abriendo el documento…", "Reconociendo el texto…", "Ubicando los campos…"]

function Reader({
  invoice,
  onClose,
  onConfirm,
  onRead,
}: {
  invoice: Invoice
  onClose: () => void
  onConfirm: (draft: Draft) => void
  onRead: () => void
}) {
  useEscape(onClose)

  const alreadyRead = invoice.status !== "sin_leer"
  const [reading, setReading] = useState(!alreadyRead)
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>({
    date: invoice.date,
    supplier: invoice.supplier,
    rut: invoice.rut,
    currency: invoice.currency,
    subtotal: invoice.subtotal,
    vatRate: invoice.vatRate,
    category: invoice.category,
  })
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (alreadyRead) return
    timers.current = readingSteps.map((_, index) =>
      window.setTimeout(
        () => {
          setStep(index + 1)
          if (index === readingSteps.length - 1) {
            setReading(false)
            onRead()
          }
        },
        600 * (index + 1),
      ),
    )
    return () => timers.current.forEach(window.clearTimeout)
    // Corre una sola vez, al abrir la factura.
  }, [])

  const vat = draft.subtotal * (draft.vatRate / 100)
  const total = draft.subtotal + vat

  return (
    <div className="d-overlay" onClick={onClose}>
      <div
        className="d-modal"
        style={{ width: "min(740px, 100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Lectura de la factura"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="d-modal__title">
          {reading ? "Leyendo la factura…" : "Revisá lo que leyó y confirmá"}
        </h2>
        <p className="d-muted" style={{ marginTop: 5, fontSize: 12.5 }}>
          {reading
            ? readingSteps[Math.min(step, readingSteps.length - 1)]
            : "Los campos salieron del documento. Corregí lo que haga falta."}
        </p>

        <div
          className="d-grid"
          style={{ gridTemplateColumns: "minmax(0, 200px) minmax(0, 1fr)", alignItems: "start" }}
        >
          <FacturaPreview invoice={invoice} scanning={reading} />

          {reading ? (
            <div className="d-card d-card--flat" style={{ display: "grid", gap: 10 }}>
              {readingSteps.map((label, index) => (
                <div key={label} className="d-row" style={{ gap: 8, fontSize: 12.5 }}>
                  <span
                    style={{
                      display: "grid",
                      width: 18,
                      height: 18,
                      placeItems: "center",
                      borderRadius: 999,
                      background: step > index ? "var(--d-ai)" : "var(--d-line)",
                      color: "#fff",
                    }}
                  >
                    {step > index ? <Check size={11} /> : null}
                  </span>
                  <span className={step > index ? undefined : "d-muted"}>{label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 11 }}>
              <ReadField label="Fecha" name="fecha">
                <input
                  className="d-input"
                  type="date"
                  value={draft.date}
                  onChange={(event) => setDraft({ ...draft, date: event.target.value })}
                />
              </ReadField>

              <ReadField label="Proveedor" name="proveedor">
                <input
                  className="d-input"
                  value={draft.supplier}
                  onChange={(event) => setDraft({ ...draft, supplier: event.target.value })}
                />
              </ReadField>

              <div className="d-grid d-grid--2" style={{ marginTop: 0 }}>
                <ReadField label="RUT" name="rut">
                  <input
                    className="d-input"
                    value={draft.rut}
                    onChange={(event) => setDraft({ ...draft, rut: event.target.value })}
                  />
                </ReadField>

                <ReadField label="Moneda" name="moneda">
                  <select
                    className="d-input"
                    value={draft.currency}
                    onChange={(event) =>
                      setDraft({ ...draft, currency: event.target.value as "UYU" | "USD" })
                    }
                  >
                    <option value="UYU">Pesos</option>
                    <option value="USD">Dólares</option>
                  </select>
                </ReadField>

                <ReadField label="Subtotal" name="subtotal">
                  <input
                    className="d-input"
                    type="number"
                    value={draft.subtotal}
                    onChange={(event) =>
                      setDraft({ ...draft, subtotal: Number(event.target.value) })
                    }
                  />
                </ReadField>

                <ReadField label="IVA" name="iva">
                  <select
                    className="d-input"
                    value={draft.vatRate}
                    onChange={(event) =>
                      setDraft({ ...draft, vatRate: Number(event.target.value) as 22 | 10 })
                    }
                  >
                    <option value={22}>22%</option>
                    <option value={10}>10%</option>
                  </select>
                </ReadField>
              </div>

              <ReadField label="Categoría" name="categoria">
                <input
                  className="d-input"
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                />
              </ReadField>

              <div className="d-card d-card--flat d-row" style={{ justifyContent: "space-between" }}>
                <span className="d-muted" style={{ fontSize: 12 }}>
                  Total calculado
                </span>
                <span className="d-num" style={{ fontSize: 17, fontWeight: 700 }}>
                  {formatMoney(total, draft.currency)}
                </span>
              </div>
            </div>
          )}
        </div>

        {!reading ? (
          <div className="d-modal__actions">
            <button type="button" className="d-btn d-btn--primary" onClick={() => onConfirm(draft)}>
              <Check size={14} />
              Confirmar
            </button>
            <button type="button" className="d-btn d-btn--ghost" onClick={onClose}>
              Cancelar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

/** Campo leído, con su indicador de confianza. */
function ReadField({
  label,
  name,
  children,
}: {
  label: string
  name: string
  children: React.ReactNode
}) {
  const score = confidence[name] ?? 90

  return (
    <div style={{ display: "grid", gap: 5 }}>
      <div className="d-row" style={{ justifyContent: "space-between" }}>
        <span className="d-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>
          {label}
        </span>
        <span className={score >= 90 ? "d-chip d-chip--ai" : "d-chip d-chip--warn"}>
          {score}% de confianza
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Lote confirmado y exportación a asientos ──────────────────────── */

function Batch({ invoices }: { invoices: Invoice[] }) {
  const { toast } = useDemo()
  const [exported, setExported] = useState(false)

  const rows = invoices.flatMap((invoice) => {
    const vat = invoice.subtotal * (invoice.vatRate / 100)
    return [
      { account: `Gastos — ${invoice.category}`, debe: invoice.subtotal, haber: 0, invoice },
      { account: `IVA compras ${invoice.vatRate}%`, debe: vat, haber: 0, invoice },
      { account: `Proveedores — ${invoice.supplier}`, debe: 0, haber: invoice.subtotal + vat, invoice },
    ]
  })

  const debe = rows.reduce((sum, row) => sum + row.debe, 0)
  const haber = rows.reduce((sum, row) => sum + row.haber, 0)
  const balanced = Math.abs(debe - haber) < 0.01

  return (
    <div className="d-card" style={{ marginTop: 13 }}>
      <div className="d-card__head">
        <div>
          <div className="d-card__title">Lote confirmado</div>
          <div className="d-card__sub">
            {invoices.length} {invoices.length === 1 ? "factura lista" : "facturas listas"} para
            pasar a asientos · ejemplo
          </div>
        </div>

        <button
          type="button"
          className="d-btn d-btn--primary d-btn--sm"
          onClick={() => {
            setExported(true)
            toast("Asientos generados. Cuadra: el Debe es igual al Haber.")
          }}
        >
          <FileDown size={13} />
          Exportar a asientos
        </button>
      </div>

      <table className="d-table">
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Cliente</th>
            <th>Categoría</th>
            <th className="is-num">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td style={{ fontWeight: 500 }}>{invoice.supplier}</td>
              <td className="d-muted">{clientName(invoice.clientId)}</td>
              <td className="d-muted">{invoice.category}</td>
              <td className="is-num">
                {formatMoney(
                  invoice.subtotal * (1 + invoice.vatRate / 100),
                  invoice.currency,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {exported ? (
        <>
          <div className="d-card__head" style={{ marginTop: 22 }}>
            <div>
              <div className="d-card__title">Asientos generados</div>
              <div className="d-card__sub">Partida doble · ejemplo</div>
            </div>
            <span className={balanced ? "d-chip d-chip--ok" : "d-chip d-chip--bad"}>
              {balanced ? "Cuadra: el Debe es igual al Haber" : "No cuadra"}
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="d-table">
              <thead>
                <tr>
                  <th>Cuenta</th>
                  <th className="is-num">Debe</th>
                  <th className="is-num">Haber</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${row.account}-${index}`}>
                    <td>{row.account}</td>
                    <td className="is-num">
                      {row.debe > 0 ? formatMoney(row.debe, row.invoice.currency) : "—"}
                    </td>
                    <td className="is-num">
                      {row.haber > 0 ? formatMoney(row.haber, row.invoice.currency) : "—"}
                    </td>
                  </tr>
                ))}
                <tr>
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
            style={{ marginTop: 13 }}
            onClick={() => toast(texts.fakeDownload)}
          >
            Descargar para tu sistema contable
          </button>
        </>
      ) : null}
    </div>
  )
}

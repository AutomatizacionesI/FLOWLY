import { formatDay, formatMoney, type Invoice } from "../data/demoData"

/**
 * Dibujo de una factura de ejemplo. Es HTML, no una imagen: no hay ningún
 * documento real detrás, y los proveedores y RUT son inventados.
 */
export function FacturaPreview({ invoice, scanning }: { invoice: Invoice; scanning?: boolean }) {
  const vat = invoice.subtotal * (invoice.vatRate / 100)
  const total = invoice.subtotal + vat

  return (
    <div className="d-factura">
      {scanning ? <div className="d-factura__scan" aria-hidden="true" /> : null}

      <div className="d-factura__head">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "-0.01em" }}>
            {invoice.supplier}
          </div>
          <div style={{ fontSize: 8, color: "#7a7d85" }}>RUT {invoice.rut}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#7a7d85" }}>e-FACTURA</div>
          <div style={{ fontSize: 8, color: "#7a7d85" }}>Serie A · {formatDay(invoice.date)}</div>
        </div>
      </div>

      <div className="d-factura__rule" />

      <div style={{ display: "grid", gap: 4 }}>
        {[
          ["Servicios del período", invoice.subtotal * 0.62],
          ["Insumos varios", invoice.subtotal * 0.28],
          ["Fletes", invoice.subtotal * 0.1],
        ].map(([label, amount]) => (
          <div key={label as string} className="d-factura__line">
            <span>{label}</span>
            <span className="d-num">{formatMoney(amount as number, invoice.currency)}</span>
          </div>
        ))}
      </div>

      <div className="d-factura__rule" />

      <div style={{ display: "grid", gap: 3 }}>
        <div className="d-factura__line">
          <span>Subtotal</span>
          <span className="d-num">{formatMoney(invoice.subtotal, invoice.currency)}</span>
        </div>
        <div className="d-factura__line">
          <span>IVA {invoice.vatRate}%</span>
          <span className="d-num">{formatMoney(vat, invoice.currency)}</span>
        </div>
        <div className="d-factura__line" style={{ fontWeight: 700, fontSize: 10 }}>
          <span>Total</span>
          <span className="d-num">{formatMoney(total, invoice.currency)}</span>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 7, color: "#9a9ca3" }}>
        Documento de ejemplo · sin validez fiscal
      </div>
    </div>
  )
}

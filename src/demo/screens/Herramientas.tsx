import { ChevronDown, ChevronUp, FileText, RotateCw, Trash2, Upload } from "lucide-react"
import { useState } from "react"

import { texts } from "../config"
import { PageHead } from "../components/Screen"
import { documents, formatDay, formatMoney, daysFromToday, isoDay } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/* ── Unir PDFs ─────────────────────────────────────────────────────── */

type Piece = { id: string; name: string; pages: number; rotation: number }

const startingPieces: Piece[] = documents.slice(0, 4).map((document, index) => ({
  id: document.id,
  name: document.name,
  pages: [4, 2, 11, 3][index],
  rotation: 0,
}))

export function UnirPdfs() {
  const { toast } = useDemo()
  const [pieces, setPieces] = useState<Piece[]>(startingPieces)

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= pieces.length) return
    const next = [...pieces]
    ;[next[index], next[target]] = [next[target], next[index]]
    setPieces(next)
  }

  const totalPages = pieces.reduce((sum, piece) => sum + piece.pages, 0)

  return (
    <>
      <PageHead
        title="Unir PDFs"
        sub="Ordenalos, rotá lo que haga falta y unilos en uno solo · datos de ejemplo"
      />

      <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Documentos a unir</div>
              <div className="d-card__sub">
                {pieces.length} documentos · {totalPages} páginas en total
              </div>
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

          {pieces.length === 0 ? (
            <p className="d-muted">
              Sacaste todos los documentos.{" "}
              <button
                type="button"
                className="d-btn d-btn--quiet d-btn--sm"
                onClick={() => setPieces(startingPieces)}
              >
                Volver a cargar los de ejemplo
              </button>
            </p>
          ) : (
            <ul style={{ display: "grid", gap: 9 }}>
              {pieces.map((piece, index) => (
                <li key={piece.id} className="d-card d-card--flat d-row">
                  <span
                    className="d-num"
                    style={{
                      display: "grid",
                      width: 24,
                      height: 24,
                      flexShrink: 0,
                      placeItems: "center",
                      borderRadius: 8,
                      background: "var(--d-green-soft)",
                      color: "var(--d-green)",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </span>

                  <FileText
                    size={16}
                    className="d-muted"
                    style={{ transform: `rotate(${piece.rotation}deg)`, transition: "transform .2s ease" }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{piece.name}</div>
                    <div className="d-muted" style={{ fontSize: 11.5 }}>
                      {piece.pages} páginas
                      {piece.rotation !== 0 ? ` · rotado ${piece.rotation}°` : ""}
                    </div>
                  </div>

                  <div className="d-row" style={{ gap: 4 }}>
                    <button
                      type="button"
                      className="d-icon-btn"
                      style={{ width: 29, height: 29 }}
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label="Subir"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="d-icon-btn"
                      style={{ width: 29, height: 29 }}
                      onClick={() => move(index, 1)}
                      disabled={index === pieces.length - 1}
                      aria-label="Bajar"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="d-icon-btn"
                      style={{ width: 29, height: 29 }}
                      onClick={() =>
                        setPieces((list) =>
                          list.map((item) =>
                            item.id === piece.id
                              ? { ...item, rotation: (item.rotation + 90) % 360 }
                              : item,
                          ),
                        )
                      }
                      aria-label="Rotar"
                    >
                      <RotateCw size={14} />
                    </button>
                    <button
                      type="button"
                      className="d-icon-btn"
                      style={{ width: 29, height: 29 }}
                      onClick={() => setPieces((list) => list.filter((item) => item.id !== piece.id))}
                      aria-label="Quitar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="d-btn d-btn--primary"
            style={{ marginTop: 16 }}
            disabled={pieces.length < 2}
            onClick={() =>
              toast(`Listo: un PDF de ${totalPages} páginas. En la demo no se descarga nada.`)
            }
          >
            Unir en un PDF
          </button>
        </div>

        <div className="d-card d-card--flat" style={{ alignSelf: "start" }}>
          <div className="d-card__title">Para qué sirve</div>
          <p className="d-muted" style={{ marginTop: 9, fontSize: 12.5, lineHeight: 1.6 }}>
            Juntar en un solo archivo lo que llega suelto: el balance, los anexos y los
            comprobantes, en el orden en que los necesitás presentar.
          </p>
          <p className="d-muted" style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6 }}>
            {texts.fakeUpload}
          </p>
        </div>
      </div>
    </>
  )
}

/* ── PDF a Excel ───────────────────────────────────────────────────── */

const extracted = [
  { date: isoDay(daysFromToday(-26)), description: "Saldo anterior", amount: 412300 },
  { date: isoDay(daysFromToday(-24)), description: "Cobranza Ferretería Los Álamos", amount: 64500 },
  { date: isoDay(daysFromToday(-22)), description: "Pago Insumos del Litoral", amount: -48500 },
  { date: isoDay(daysFromToday(-19)), description: "Débito automático UTE", amount: -9800 },
  { date: isoDay(daysFromToday(-17)), description: "Acreditación POS", amount: 37250 },
  { date: isoDay(daysFromToday(-14)), description: "Comisión bancaria", amount: -1450 },
  { date: isoDay(daysFromToday(-11)), description: "Pago de sueldos", amount: -185500 },
  { date: isoDay(daysFromToday(-8)), description: "Cobranza Textil Mirasol", amount: 128000 },
]

export function PdfAExcel() {
  const { toast } = useDemo()
  const [converted, setConverted] = useState(false)

  return (
    <>
      <PageHead
        title="PDF a Excel"
        sub="Convertimos los reportes en PDF que recibís a Excel, listos para tu planilla"
      />

      <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Documento de ejemplo</div>
              <div className="d-card__sub">Extracto Itaú del mes · 3 páginas</div>
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

          <div
            className="d-card d-card--flat"
            style={{ display: "grid", justifyItems: "center", gap: 9, padding: 26, textAlign: "center" }}
          >
            <FileText size={22} className="d-muted" />
            <div style={{ fontSize: 13, fontWeight: 600 }}>Extracto Itaú del mes.pdf</div>
            <div className="d-muted" style={{ fontSize: 11.5 }}>
              212 KB · {formatDay(isoDay(daysFromToday(-12)))}
            </div>
          </div>

          <button
            type="button"
            className="d-btn d-btn--primary"
            style={{ marginTop: 16 }}
            onClick={() => setConverted(true)}
          >
            Convertir a Excel
          </button>
        </div>

        <div className="d-card d-card--flat" style={{ alignSelf: "start" }}>
          <div className="d-card__title">Qué sale</div>
          <p className="d-muted" style={{ marginTop: 9, fontSize: 12.5, lineHeight: 1.6 }}>
            Una planilla de tres columnas —fecha, descripción e importe— con los números ya como
            números, no como texto. Lista para pegar en tu planilla de trabajo.
          </p>
        </div>
      </div>

      {converted ? (
        <div className="d-card" style={{ marginTop: 13 }}>
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Vista previa</div>
              <div className="d-card__sub">{extracted.length} filas reconocidas · ejemplo</div>
            </div>
            <button
              type="button"
              className="d-btn d-btn--ghost d-btn--sm"
              onClick={() => toast(texts.fakeDownload)}
            >
              Descargar Excel
            </button>
          </div>

          <table className="d-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th className="is-num">Importe</th>
              </tr>
            </thead>
            <tbody>
              {extracted.map((row) => (
                <tr key={row.date + row.description}>
                  <td className="d-num d-muted">{formatDay(row.date)}</td>
                  <td>{row.description}</td>
                  <td
                    className="is-num"
                    style={{ color: row.amount < 0 ? "var(--d-bad)" : undefined }}
                  >
                    {formatMoney(row.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  )
}

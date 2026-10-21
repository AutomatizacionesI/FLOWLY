import { Check, Download, FileSpreadsheet, HelpCircle, Upload, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { texts } from "../config"
import { Gauge } from "../components/Gauge"
import { PageHead } from "../components/Screen"
import {
  banks,
  formatDay,
  formatMoney,
  type BankMovement,
  type MatchStatus,
} from "../data/demoData"
import { reconciliationCounts } from "../data/selectors"
import { useDemo } from "../state/DemoContext"

const steps = [
  "Leyendo extracto…",
  "Ordenando movimientos…",
  "Comparando con el libro…",
  "Buscando coincidencias parciales…",
  "Armando el resultado…",
]

const statusLabel: Record<MatchStatus, string> = {
  conciliado: "Conciliado",
  sugerido: "Sugerido",
  pendiente: "Pendiente",
}

const statusChip: Record<MatchStatus, string> = {
  conciliado: "d-chip d-chip--ok",
  sugerido: "d-chip d-chip--warn",
  pendiente: "d-chip",
}

export function Conciliacion() {
  const { movements, setMovements, reconciled, setReconciled, toast } = useDemo()
  const [bankId, setBankId] = useState("itau")
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [filter, setFilter] = useState<MatchStatus | "todos">("todos")
  const [page, setPage] = useState(1)
  const timers = useRef<number[]>([])

  const counts = reconciliationCounts(movements)
  const rate = Math.round((counts.conciliado / counts.total) * 100)

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const run = () => {
    setRunning(true)
    setStep(0)
    timers.current.forEach(window.clearTimeout)
    timers.current = steps.map((_, index) =>
      window.setTimeout(() => {
        setStep(index + 1)
        if (index === steps.length - 1) {
          setRunning(false)
          setReconciled(true)
          const fresh = reconciliationCounts(movements)
          toast(
            `Listo: ${fresh.conciliado} movimientos conciliados solos, ${fresh.sugerido} para que revises y ${fresh.pendiente} pendientes (datos de ejemplo).`,
          )
        }
      }, 650 * (index + 1)),
    )
  }

  const decide = (movement: BankMovement, accept: boolean) => {
    setMovements((list) =>
      list.map((item) =>
        item.id === movement.id
          ? { ...item, status: accept ? "conciliado" : "pendiente", score: undefined }
          : item,
      ),
    )
    toast(accept ? "Movimiento conciliado." : "Movimiento marcado como pendiente.")
  }

  const shown = movements.filter((movement) => filter === "todos" || movement.status === filter)

  // Paginado: 40 movimientos seguidos hacen una lista eterna.
  const perPage = 12
  const pages = Math.max(1, Math.ceil(shown.length / perPage))
  const current = Math.min(page, pages)
  const pageRows = shown.slice((current - 1) * perPage, current * perPage)

  return (
    <>
      <PageHead
        title="Conciliación bancaria"
        sub="Cruzamos el extracto del banco contra el libro · datos de ejemplo"
      />

      {!reconciled ? (
        <Setup bankId={bankId} onBank={setBankId} running={running} step={step} onRun={run} />
      ) : (
        <>
          <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
            <div className="d-card">
              <div className="d-card__head">
                <div>
                  <div className="d-card__title">Resultado de la conciliación</div>
                  <div className="d-card__sub">
                    {banks.find((bank) => bank.id === bankId)?.name} · {counts.total} movimientos ·
                    ejemplo
                  </div>
                </div>
                <div className="d-row" style={{ gap: 7, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="d-btn d-btn--ghost d-btn--sm"
                    onClick={() => toast(texts.fakeDownload)}
                  >
                    <Download size={13} />
                    Descargar conciliación
                  </button>
                  <button
                    type="button"
                    className="d-btn d-btn--quiet d-btn--sm"
                    onClick={() => setReconciled(false)}
                  >
                    Volver a correr
                  </button>
                </div>
              </div>

              <div className="d-row" style={{ gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                {(["todos", "conciliado", "sugerido", "pendiente"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`d-btn d-btn--sm ${filter === key ? "d-btn--primary" : "d-btn--ghost"}`}
                    onClick={() => {
                      setFilter(key)
                      setPage(1)
                    }}
                    aria-pressed={filter === key}
                  >
                    {key === "todos"
                      ? `Todos (${counts.total})`
                      : `${statusLabel[key]} (${counts[key]})`}
                  </button>
                ))}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table className="d-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Concepto en el banco</th>
                      <th>Contra el libro</th>
                      <th className="is-num">Importe</th>
                      <th>Estado</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((movement) => (
                      <tr key={movement.id}>
                        <td className="d-num d-muted">{formatDay(movement.date)}</td>
                        <td style={{ fontWeight: 500 }}>{movement.concept}</td>
                        <td className="d-muted" style={{ fontSize: 12 }}>
                          {movement.bookConcept ?? "—"}
                          {movement.reason ? (
                            <div style={{ fontSize: 11 }}>{movement.reason}</div>
                          ) : null}
                        </td>
                        <td className="is-num">{formatMoney(movement.amount)}</td>
                        <td>
                          <span className={statusChip[movement.status]}>
                            {statusLabel[movement.status]}
                            {movement.score ? ` · ${movement.score}%` : ""}
                          </span>
                        </td>
                        <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          {movement.status === "sugerido" ? (
                            <div className="d-row" style={{ gap: 5, justifyContent: "flex-end" }}>
                              <button
                                type="button"
                                className="d-btn d-btn--green d-btn--sm"
                                onClick={() => decide(movement, true)}
                              >
                                <Check size={12} />
                                Aceptar
                              </button>
                              <button
                                type="button"
                                className="d-btn d-btn--ghost d-btn--sm"
                                onClick={() => decide(movement, false)}
                              >
                                <X size={12} />
                                Descartar
                              </button>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pages > 1 ? (
                <div className="d-row" style={{ marginTop: 14, flexWrap: "wrap", gap: 8 }}>
                  <span className="d-muted" style={{ fontSize: 12 }}>
                    Mostrando {(current - 1) * perPage + 1}–
                    {Math.min(current * perPage, shown.length)} de {shown.length} movimientos
                  </span>

                  <div className="d-top__spacer" />

                  <button
                    type="button"
                    className="d-btn d-btn--ghost d-btn--sm"
                    onClick={() => setPage(current - 1)}
                    disabled={current === 1}
                    style={current === 1 ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                  >
                    Anterior
                  </button>

                  <span className="d-muted d-num" style={{ fontSize: 12 }}>
                    {current} de {pages}
                  </span>

                  <button
                    type="button"
                    className="d-btn d-btn--ghost d-btn--sm"
                    onClick={() => setPage(current + 1)}
                    disabled={current === pages}
                    style={current === pages ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                  >
                    Siguiente
                  </button>
                </div>
              ) : null}
            </div>

            <div style={{ display: "grid", gap: 13, alignContent: "start" }}>
              <div className="d-card">
                <div className="d-card__head">
                  <div>
                    <div className="d-card__title">Conciliado solo</div>
                    <div className="d-card__sub">Sin tocar nada · ejemplo</div>
                  </div>
                </div>
                <Gauge value={rate} label={`${counts.conciliado} de ${counts.total} movimientos`} />
                <div className="d-row" style={{ marginTop: 14, gap: 6, flexWrap: "wrap" }}>
                  <span className="d-chip d-chip--ok">{counts.conciliado} conciliados</span>
                  <span className="d-chip d-chip--warn">{counts.sugerido} a revisar</span>
                  <span className="d-chip">{counts.pendiente} pendientes</span>
                </div>
              </div>

              <div className="d-card d-card--flat">
                <div className="d-row" style={{ gap: 8, alignItems: "flex-start" }}>
                  <HelpCircle size={15} className="d-muted" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                    Banco y libro se miran en espejo: un depósito es positivo en el banco y va al
                    Debe en el libro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ── Paso previo: banco y archivos ─────────────────────────────────── */

function Setup({
  bankId,
  onBank,
  running,
  step,
  onRun,
}: {
  bankId: string
  onBank: (id: string) => void
  running: boolean
  step: number
  onRun: () => void
}) {
  const { toast } = useDemo()
  const [files, setFiles] = useState(false)

  return (
    <div className="d-grid d-grid--main" style={{ marginTop: 0 }}>
      <div className="d-card">
        <div className="d-card__head">
          <div>
            <div className="d-card__title">1. Elegí el banco</div>
            <div className="d-card__sub">Leemos el formato de extracto de cada uno</div>
          </div>
        </div>

        <div className="d-grid d-grid--3" style={{ marginTop: 0 }}>
          {banks.map((bank) => (
            <button
              key={bank.id}
              type="button"
              className="d-card d-card--flat"
              style={{
                textAlign: "left",
                outline: bankId === bank.id ? "2px solid var(--d-green)" : "none",
                opacity: bank.available ? 1 : 0.72,
              }}
              onClick={() => (bank.available ? onBank(bank.id) : toast("Lo adaptamos a tu banco."))}
            >
              <div style={{ fontSize: 14, fontWeight: 600 }}>{bank.name}</div>
              <span
                className={bank.available ? "d-chip d-chip--ok" : "d-chip"}
                style={{ marginTop: 8 }}
              >
                {bank.available ? "Disponible" : "A pedido: lo adaptamos"}
              </span>
            </button>
          ))}
        </div>

        <div className="d-card__head" style={{ marginTop: 24 }}>
          <div>
            <div className="d-card__title">2. Cargá el extracto y el libro</div>
            <div className="d-card__sub">En la demo usamos archivos de ejemplo</div>
          </div>
        </div>

        <div className="d-grid d-grid--2" style={{ marginTop: 0 }}>
          {["Extracto del banco", "Libro mayor"].map((label) => (
            <div
              key={label}
              className="d-card d-card--flat"
              style={{
                display: "grid",
                justifyItems: "center",
                gap: 7,
                padding: 22,
                border: "1px dashed var(--d-line)",
                textAlign: "center",
              }}
            >
              <FileSpreadsheet size={20} className="d-muted" />
              <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div className="d-muted" style={{ fontSize: 11.5 }}>
                {files ? "ejemplo-cargado.csv" : "Ningún archivo"}
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
          ))}
        </div>

        <div className="d-row" style={{ marginTop: 18, gap: 9, flexWrap: "wrap" }}>
          <button
            type="button"
            className="d-btn d-btn--ghost"
            onClick={() => {
              setFiles(true)
              toast("Archivos de ejemplo cargados.")
            }}
          >
            Usar archivos de ejemplo
          </button>
          <button
            type="button"
            className="d-btn d-btn--primary"
            onClick={onRun}
            disabled={!files || running}
            style={!files || running ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
          >
            {running ? "Conciliando…" : "Conciliar"}
          </button>
        </div>

        {running || step > 0 ? (
          <div style={{ marginTop: 18 }}>
            <div className="d-bar" style={{ height: 8 }}>
              <div
                className="d-bar__fill"
                style={{ width: `${(step / steps.length) * 100}%`, transition: "width .4s ease" }}
              />
            </div>
            <div className="d-muted" style={{ marginTop: 8, fontSize: 12.5 }}>
              {steps[Math.min(step, steps.length - 1)]}
            </div>
          </div>
        ) : null}
      </div>

      <div className="d-card d-card--flat" style={{ alignSelf: "start" }}>
        <div className="d-card__title">Qué va a pasar</div>
        <ul style={{ display: "grid", gap: 11, marginTop: 12, fontSize: 12.5, lineHeight: 1.55 }}>
          <li>
            <strong>Conciliado:</strong> el movimiento aparece igual en el banco y en el libro.
          </li>
          <li>
            <strong>Sugerido:</strong> hay una coincidencia probable (mismo monto, fecha cercana o
            concepto parecido) y la decidís vos.
          </li>
          <li>
            <strong>Pendiente:</strong> no hay nada equivalente del otro lado.
          </li>
        </ul>
        <div className="d-row" style={{ gap: 8, marginTop: 16, alignItems: "flex-start" }}>
          <HelpCircle size={15} className="d-muted" style={{ marginTop: 2, flexShrink: 0 }} />
          <p className="d-muted" style={{ fontSize: 12, lineHeight: 1.55 }}>
            Banco y libro se miran en espejo: un depósito es positivo en el banco y va al Debe en el
            libro.
          </p>
        </div>
      </div>
    </div>
  )
}

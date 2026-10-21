import { Clock3, FileText, Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import { PageHead } from "../components/Screen"
import { useEscape } from "../components/useEscape"
import {
  clients,
  documentsOf,
  formatDay,
  formatHours,
  formatMoney,
  personName,
  type Client,
} from "../data/demoData"
import { canEditClient } from "../data/selectors"
import { texts } from "../config"
import { useDemo } from "../state/DemoContext"

type Tab = "resumen" | "tareas" | "horas" | "documentos"

export function Clientes() {
  const { role, user, tasks, hours } = useDemo()
  const [query, setQuery] = useState("")
  const [onlyMine, setOnlyMine] = useState(role === "contador")
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return clients.filter((client) => {
      if (onlyMine && !client.teamIds.includes(user.id)) return false
      if (!term) return true
      return (
        client.name.toLowerCase().includes(term) ||
        client.sector.toLowerCase().includes(term) ||
        client.rut.includes(term)
      )
    })
  }, [query, onlyMine, user.id])

  const open = clients.find((client) => client.id === openId) ?? null

  return (
    <>
      <PageHead
        title="Clientes"
        sub={`${visible.length} de ${clients.length} clientes · datos de ejemplo`}
      />

      <div className="d-card" style={{ padding: 14, marginBottom: 13 }}>
        <div className="d-row" style={{ flexWrap: "wrap", gap: 10 }}>
          <div className="d-search" style={{ flex: "1 1 240px", maxWidth: 340 }}>
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, rubro o RUT"
              aria-label="Buscar cliente"
            />
          </div>

          <div className="d-roleswitch">
            <button
              type="button"
              className={onlyMine ? "is-on" : undefined}
              onClick={() => setOnlyMine(true)}
              aria-pressed={onlyMine}
            >
              Mis clientes
            </button>
            <button
              type="button"
              className={!onlyMine ? "is-on" : undefined}
              onClick={() => setOnlyMine(false)}
              aria-pressed={!onlyMine}
            >
              Todos
            </button>
          </div>
        </div>
      </div>

      <div className="d-grid" style={{ marginTop: 0, gridTemplateColumns: "repeat(auto-fill, minmax(258px, 1fr))" }}>
        {visible.map((client) => {
          const clientHours = hours.filter((entry) => entry.clientId === client.id)
          const openTasks = tasks.filter(
            (task) => task.clientId === client.id && task.status !== "hecha",
          ).length

          return (
            <button
              key={client.id}
              type="button"
              className="d-card"
              style={{ textAlign: "left", display: "block" }}
              onClick={() => setOpenId(client.id)}
            >
              <div className="d-row" style={{ alignItems: "flex-start" }}>
                <span
                  style={{
                    display: "grid",
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    placeItems: "center",
                    borderRadius: 11,
                    background: "var(--d-green-soft)",
                    color: "var(--d-green)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {client.name.slice(0, 2).toUpperCase()}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em" }}>
                    {client.name}
                  </div>
                  <div className="d-muted" style={{ fontSize: 11.5 }}>
                    {client.sector} · desde {client.since}
                  </div>
                </div>
              </div>

              <div className="d-row" style={{ marginTop: 14, gap: 6, flexWrap: "wrap" }}>
                <span className="d-chip">{openTasks} tareas abiertas</span>
                <span className="d-chip d-chip--green">
                  {formatHours(clientHours.reduce((sum, entry) => sum + entry.minutes, 0))}
                </span>
              </div>

              <div className="d-muted" style={{ marginTop: 11, fontSize: 11.5 }}>
                Responsable: {personName(client.ownerId)}
              </div>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="d-card" style={{ marginTop: 13 }}>
          <p className="d-muted">
            Ningún cliente coincide con esa búsqueda. Probá con otro nombre o sacá el filtro de
            “Mis clientes”.
          </p>
        </div>
      ) : null}

      {open ? (
        <ClientPanel
          client={open}
          editable={canEditClient(role, user.id, open.id)}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </>
  )
}

/* ── Ficha del cliente ─────────────────────────────────────────────── */

function ClientPanel({
  client,
  editable,
  onClose,
}: {
  client: Client
  editable: boolean
  onClose: () => void
}) {
  const { tasks, hours, toast } = useDemo()
  const [tab, setTab] = useState<Tab>("resumen")
  useEscape(onClose)

  const clientTasks = tasks.filter((task) => task.clientId === client.id)
  const clientHours = hours.filter((entry) => entry.clientId === client.id)
  const minutes = clientHours.reduce((sum, entry) => sum + entry.minutes, 0)
  const docs = documentsOf(client.id)

  const tabs: Array<[Tab, string]> = [
    ["resumen", "Resumen"],
    ["tareas", `Tareas (${clientTasks.length})`],
    ["horas", `Horas (${clientHours.length})`],
    ["documentos", `Documentos (${docs.length})`],
  ]

  return (
    <div className="d-overlay" onClick={onClose}>
      <div
        className="d-modal"
        style={{ width: "min(620px, 100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha de ${client.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-row" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 className="d-modal__title">{client.name}</h2>
            <p className="d-muted" style={{ marginTop: 4, fontSize: 12.5 }}>
              {client.sector} · RUT {client.rut} · responsable {personName(client.ownerId)}
            </p>
          </div>
          <button type="button" className="d-icon-btn" onClick={onClose} aria-label="Cerrar ficha">
            <X size={16} />
          </button>
        </div>

        {!editable ? (
          <div
            className="d-chip d-chip--warn"
            style={{ marginTop: 12, whiteSpace: "normal", lineHeight: 1.4 }}
          >
            {texts.notAllowed}
          </div>
        ) : null}

        <div className="d-row" style={{ gap: 4, margin: "18px 0 16px", flexWrap: "wrap" }}>
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`d-btn d-btn--sm ${tab === key ? "d-btn--primary" : "d-btn--ghost"}`}
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "resumen" ? (
          <div className="d-grid d-grid--2" style={{ marginTop: 0 }}>
            <div className="d-card d-card--flat">
              <div className="d-muted" style={{ fontSize: 11.5 }}>
                Horas acumuladas
              </div>
              <div className="d-num" style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>
                {formatHours(minutes)}
              </div>
            </div>
            <div className="d-card d-card--flat">
              <div className="d-muted" style={{ fontSize: 11.5 }}>
                Honorarios del mes (ejemplo)
              </div>
              <div className="d-num" style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>
                {formatMoney(client.monthlyFee)}
              </div>
            </div>
            <div className="d-card d-card--flat">
              <div className="d-muted" style={{ fontSize: 11.5 }}>
                Tareas abiertas
              </div>
              <div className="d-num" style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>
                {clientTasks.filter((task) => task.status !== "hecha").length}
              </div>
            </div>
            <div className="d-card d-card--flat">
              <div className="d-muted" style={{ fontSize: 11.5 }}>
                Equipo asignado
              </div>
              <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
                {client.teamIds.map((id) => personName(id)).join(", ")}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "tareas" ? (
          <table className="d-table">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Responsable</th>
                <th>Vence</th>
              </tr>
            </thead>
            <tbody>
              {clientTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td className="d-muted">{personName(task.assigneeId)}</td>
                  <td className="is-num d-muted">{formatDay(task.due)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === "horas" ? (
          <table className="d-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Persona</th>
                <th className="is-num">Horas</th>
              </tr>
            </thead>
            <tbody>
              {clientHours.slice(-10).reverse().map((entry) => (
                <tr key={entry.id}>
                  <td className="d-num">{formatDay(entry.day)}</td>
                  <td className="d-muted">{personName(entry.personId)}</td>
                  <td className="is-num">{formatHours(entry.minutes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === "documentos" ? (
          <ul style={{ display: "grid", gap: 9 }}>
            {docs.map((document) => (
              <li key={document.id} className="d-card d-card--flat d-row">
                <FileText size={16} className="d-muted" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{document.name}</div>
                  <div className="d-muted" style={{ fontSize: 11.5 }}>
                    {document.kind} · {document.size} · {formatDay(document.day)}
                  </div>
                </div>
                <button
                  type="button"
                  className="d-btn d-btn--ghost d-btn--sm"
                  onClick={() => toast(texts.fakeDownload)}
                >
                  Abrir
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="d-row d-muted" style={{ marginTop: 18, fontSize: 11.5 }}>
          <Clock3 size={13} />
          Todos los datos de esta ficha son de ejemplo.
        </div>
      </div>
    </div>
  )
}

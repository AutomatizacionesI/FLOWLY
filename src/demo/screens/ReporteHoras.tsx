import { FileDown } from "lucide-react"
import { useMemo, useState } from "react"

import { texts } from "../config"
import { PageHead } from "../components/Screen"
import {
  clientName,
  clients,
  formatHours,
  people,
  personName,
  workTypeName,
  workTypes,
} from "../data/demoData"
import { useDemo } from "../state/DemoContext"

type GroupBy = "cliente" | "persona" | "tipo" | "mes"

const tabs: Array<[GroupBy, string]> = [
  ["cliente", "Por cliente"],
  ["persona", "Por persona"],
  ["tipo", "Por tipo de trabajo"],
  ["mes", "Por mes"],
]

export function ReporteHoras() {
  const { hours, toast } = useDemo()
  const [groupBy, setGroupBy] = useState<GroupBy>("cliente")
  const [clientId, setClientId] = useState("todos")
  const [personId, setPersonId] = useState("todos")
  const [workTypeId, setWorkTypeId] = useState("todos")

  const filtered = useMemo(
    () =>
      hours.filter(
        (entry) =>
          (clientId === "todos" || entry.clientId === clientId) &&
          (personId === "todos" || entry.personId === personId) &&
          (workTypeId === "todos" || entry.workTypeId === workTypeId),
      ),
    [hours, clientId, personId, workTypeId],
  )

  const rows = useMemo(() => {
    const totals = new Map<string, number>()

    for (const entry of filtered) {
      const key =
        groupBy === "cliente"
          ? entry.clientId
          : groupBy === "persona"
            ? entry.personId
            : groupBy === "tipo"
              ? entry.workTypeId
              : entry.day.slice(0, 7)
      totals.set(key, (totals.get(key) ?? 0) + entry.minutes)
    }

    const label = (key: string) =>
      groupBy === "cliente"
        ? clientName(key)
        : groupBy === "persona"
          ? personName(key)
          : groupBy === "tipo"
            ? workTypeName(key)
            : monthLabel(key)

    return [...totals.entries()]
      .map(([key, minutes]) => ({ key, label: label(key), minutes }))
      .sort((a, b) => (groupBy === "mes" ? a.key.localeCompare(b.key) : b.minutes - a.minutes))
  }, [filtered, groupBy])

  const total = rows.reduce((sum, row) => sum + row.minutes, 0)
  const max = Math.max(1, ...rows.map((row) => row.minutes))

  return (
    <>
      <PageHead
        title="Reporte de horas"
        sub={`${formatHours(total)} en ${filtered.length} registros · datos de ejemplo`}
      />

      <div className="d-card" style={{ padding: 15, marginBottom: 13 }}>
        <div className="d-grid d-grid--3" style={{ marginTop: 0 }}>
          <Filter label="Cliente" value={clientId} onChange={setClientId}>
            <option value="todos">Todos los clientes</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Filter>

          <Filter label="Persona" value={personId} onChange={setPersonId}>
            <option value="todos">Todo el equipo</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </Filter>

          <Filter label="Tipo de trabajo" value={workTypeId} onChange={setWorkTypeId}>
            <option value="todos">Todos los tipos</option>
            {workTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Filter>
        </div>
      </div>

      <div className="d-card">
        <div className="d-card__head">
          <div className="d-row" style={{ gap: 4, flexWrap: "wrap" }}>
            {tabs.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`d-btn d-btn--sm ${groupBy === key ? "d-btn--primary" : "d-btn--ghost"}`}
                onClick={() => setGroupBy(key)}
                aria-pressed={groupBy === key}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="d-btn d-btn--ghost d-btn--sm"
            onClick={() => toast("En tu sistema esto baja un Excel con varias hojas.")}
          >
            <FileDown size={13} />
            Exportar a Excel
          </button>
        </div>

        {rows.length === 0 ? (
          <p className="d-muted">
            Con esos filtros no queda ningún registro. Probá sacando alguno.
          </p>
        ) : (
          <table className="d-table">
            <thead>
              <tr>
                <th>{tabs.find(([key]) => key === groupBy)?.[1].replace("Por ", "")}</th>
                <th>Reparto</th>
                <th className="is-num">Horas</th>
                <th className="is-num">% del total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td style={{ fontWeight: 500 }}>{row.label}</td>
                  <td style={{ width: "42%" }}>
                    <div className="d-bar" style={{ marginTop: 0 }}>
                      <div
                        className="d-bar__fill"
                        style={{ width: `${(row.minutes / max) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="is-num">{formatHours(row.minutes)}</td>
                  <td className="is-num d-muted">
                    {Math.round((row.minutes / total) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="d-muted" style={{ marginTop: 14, fontSize: 11.5 }}>
          {texts.footer}
        </div>
      </div>
    </>
  )
}

function Filter({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <label style={{ display: "grid", gap: 5 }}>
      <span className="d-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>
        {label}
      </span>
      <select className="d-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  )
}

function monthLabel(key: string) {
  const [year, month] = key.split("-")
  const names = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "setiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]
  return `${names[Number(month) - 1]} ${year}`
}

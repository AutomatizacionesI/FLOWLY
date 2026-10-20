import { AlertTriangle, Plus, X } from "lucide-react"
import { useMemo, useState } from "react"

import { texts } from "../config"
import { PageHead } from "../components/Screen"
import {
  clientName,
  clients,
  formatDay,
  isOverdue,
  isoDay,
  TODAY,
  daysFromToday,
  people,
  personName,
  workTypeName,
  workTypes,
  type Task,
  type TaskStatus,
} from "../data/demoData"
import { canEditClient } from "../data/selectors"
import { useDemo } from "../state/DemoContext"

const columns: Array<[TaskStatus, string]> = [
  ["pendiente", "Pendientes"],
  ["en_curso", "En curso"],
  ["en_revision", "En revisión"],
  ["hecha", "Hechas"],
]

const priorityChip: Record<Task["priority"], string> = {
  alta: "d-chip d-chip--bad",
  media: "d-chip d-chip--warn",
  baja: "d-chip",
}

export function Tareas() {
  const { role, user, tasks, setTasks, toast } = useDemo()
  const [view, setView] = useState<"tablero" | "lista" | "mias">("tablero")
  const [creating, setCreating] = useState(false)

  const overdue = tasks.filter(isOverdue)

  const scoped = useMemo(
    () => (view === "mias" ? tasks.filter((task) => task.assigneeId === user.id) : tasks),
    [view, tasks, user.id],
  )

  /** Mover una tarea de columna, respetando los permisos del contador. */
  const move = (task: Task, status: TaskStatus) => {
    if (!canEditClient(role, user.id, task.clientId)) {
      toast(texts.notAllowed)
      return
    }
    setTasks((list) =>
      list.map((item) => (item.id === task.id ? { ...item, status } : item)),
    )
  }

  return (
    <>
      <PageHead title="Tareas" sub={`${tasks.length} tareas en el estudio · datos de ejemplo`} />

      <div className="d-card" style={{ padding: 14, marginBottom: 13 }}>
        <div className="d-row" style={{ flexWrap: "wrap", gap: 10 }}>
          <div className="d-roleswitch">
            {(
              [
                ["tablero", "Tablero"],
                ["lista", "Lista"],
                ["mias", "Mis tareas"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={view === key ? "is-on" : undefined}
                onClick={() => setView(key)}
                aria-pressed={view === key}
              >
                {label}
              </button>
            ))}
          </div>

          {overdue.length > 0 ? (
            <span className="d-chip d-chip--bad">
              <AlertTriangle size={11} />
              {overdue.length} vencidas
            </span>
          ) : null}

          <div className="d-top__spacer" />

          <button
            type="button"
            className="d-btn d-btn--primary d-btn--sm"
            onClick={() => setCreating(true)}
          >
            <Plus size={14} />
            Nueva tarea
          </button>
        </div>
      </div>

      {view === "tablero" ? (
        <div
          className="d-grid"
          style={{ marginTop: 0, gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
        >
          {columns.map(([status, label]) => {
            const list = scoped.filter((task) => task.status === status)
            return (
              <section key={status} className="d-card d-card--flat">
                <div className="d-row" style={{ marginBottom: 12 }}>
                  <h2 className="d-card__title" style={{ flex: 1 }}>
                    {label}
                  </h2>
                  <span className="d-chip">{list.length}</span>
                </div>

                <ul style={{ display: "grid", gap: 9 }}>
                  {list.map((task) => (
                    <li key={task.id} className="d-card" style={{ padding: 13 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
                        {task.title}
                      </div>
                      <div className="d-muted" style={{ marginTop: 3, fontSize: 11.5 }}>
                        {clientName(task.clientId)}
                      </div>

                      <div className="d-row" style={{ marginTop: 10, gap: 5, flexWrap: "wrap" }}>
                        <span className={priorityChip[task.priority]}>{task.priority}</span>
                        <span className={isOverdue(task) ? "d-chip d-chip--bad" : "d-chip"}>
                          {formatDay(task.due)}
                        </span>
                      </div>

                      <div className="d-row" style={{ marginTop: 11, justifyContent: "space-between" }}>
                        <span className="d-muted" style={{ fontSize: 11 }}>
                          {personName(task.assigneeId)}
                        </span>
                        {status !== "hecha" ? (
                          <button
                            type="button"
                            className="d-btn d-btn--ghost d-btn--sm"
                            onClick={() => move(task, nextStatus(status))}
                          >
                            {status === "en_revision" ? "Marcar hecha" : "Avanzar"}
                          </button>
                        ) : null}
                      </div>
                    </li>
                  ))}

                  {list.length === 0 ? (
                    <li className="d-muted" style={{ fontSize: 12.5, padding: "6px 2px" }}>
                      Nada acá por ahora.
                    </li>
                  ) : null}
                </ul>
              </section>
            )
          })}
        </div>
      ) : (
        <TaskList tasks={scoped} grouped={view === "mias"} onMove={move} />
      )}

      {creating ? (
        <NewTask
          onClose={() => setCreating(false)}
          onCreate={(task) => {
            setTasks((list) => [task, ...list])
            setCreating(false)
            toast("Tarea creada (datos de ejemplo).")
          }}
        />
      ) : null}
    </>
  )
}

function nextStatus(status: TaskStatus): TaskStatus {
  if (status === "pendiente") return "en_curso"
  if (status === "en_curso") return "en_revision"
  return "hecha"
}

/* ── Lista ─────────────────────────────────────────────────────────── */

function TaskList({
  tasks,
  grouped,
  onMove,
}: {
  tasks: Task[]
  grouped: boolean
  onMove: (task: Task, status: TaskStatus) => void
}) {
  const today = isoDay(TODAY)
  const inAWeek = isoDay(daysFromToday(7))

  const groups: Array<[string, Task[]]> = grouped
    ? [
        ["Vencidas", tasks.filter(isOverdue)],
        [
          "Esta semana",
          tasks.filter((task) => !isOverdue(task) && task.due >= today && task.due <= inAWeek),
        ],
        ["Más adelante", tasks.filter((task) => task.due > inAWeek)],
      ]
    : [["Todas", [...tasks].sort((a, b) => a.due.localeCompare(b.due))]]

  return (
    <div style={{ display: "grid", gap: 13 }}>
      {groups.map(([label, list]) =>
        list.length === 0 ? null : (
          <div key={label} className="d-card">
            <div className="d-card__head">
              <div className="d-card__title">{label}</div>
              <span className="d-chip">{list.length}</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="d-table">
                <thead>
                  <tr>
                    <th>Tarea</th>
                    <th>Cliente</th>
                    <th>Responsable</th>
                    <th>Tipo</th>
                    <th>Vence</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {list.map((task) => (
                    <tr key={task.id}>
                      <td style={{ fontWeight: 500 }}>{task.title}</td>
                      <td className="d-muted">{clientName(task.clientId)}</td>
                      <td className="d-muted">{personName(task.assigneeId)}</td>
                      <td className="d-muted">{workTypeName(task.workTypeId)}</td>
                      <td className="is-num">
                        <span className={isOverdue(task) ? "d-chip d-chip--bad" : "d-chip"}>
                          {formatDay(task.due)}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {task.status !== "hecha" ? (
                          <button
                            type="button"
                            className="d-btn d-btn--ghost d-btn--sm"
                            onClick={() => onMove(task, "hecha")}
                          >
                            Marcar hecha
                          </button>
                        ) : (
                          <span className="d-chip d-chip--ok">hecha</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

/* ── Alta de tarea ─────────────────────────────────────────────────── */

function NewTask({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (task: Task) => void
}) {
  const { user } = useDemo()
  const [title, setTitle] = useState("")
  const [clientId, setClientId] = useState(clients[0].id)
  const [assigneeId, setAssigneeId] = useState(user.id)
  const [workTypeId, setWorkTypeId] = useState(workTypes[0].id)
  const [priority, setPriority] = useState<Task["priority"]>("media")
  const [due, setDue] = useState(isoDay(daysFromToday(7)))

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    onCreate({
      id: `t${Date.now()}`,
      title: title.trim() || "Tarea sin título",
      clientId,
      assigneeId,
      workTypeId,
      status: "pendiente",
      priority,
      due,
    })
  }

  return (
    <div className="d-overlay" onClick={onClose}>
      <form
        className="d-modal"
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        aria-label="Nueva tarea"
      >
        <div className="d-row" style={{ alignItems: "flex-start" }}>
          <h2 className="d-modal__title" style={{ flex: 1 }}>
            Nueva tarea
          </h2>
          <button type="button" className="d-icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "grid", gap: 13, marginTop: 18 }}>
          <Field label="Qué hay que hacer">
            <input
              className="d-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Liquidación de IVA del mes"
              autoFocus
            />
          </Field>

          <div className="d-grid d-grid--2" style={{ marginTop: 0 }}>
            <Field label="Cliente">
              <select
                className="d-input"
                value={clientId}
                onChange={(event) => setClientId(event.target.value)}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Responsable">
              <select
                className="d-input"
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
              >
                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Tipo de trabajo">
              <select
                className="d-input"
                value={workTypeId}
                onChange={(event) => setWorkTypeId(event.target.value)}
              >
                {workTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Prioridad">
              <select
                className="d-input"
                value={priority}
                onChange={(event) => setPriority(event.target.value as Task["priority"])}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </Field>
          </div>

          <Field label="Vence">
            <input
              className="d-input"
              type="date"
              value={due}
              onChange={(event) => setDue(event.target.value)}
            />
          </Field>
        </div>

        <div className="d-modal__actions">
          <button type="submit" className="d-btn d-btn--primary">
            Crear tarea
          </button>
          <button type="button" className="d-btn d-btn--ghost" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 5 }}>
      <span className="d-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>
        {label}
      </span>
      {children}
    </label>
  )
}

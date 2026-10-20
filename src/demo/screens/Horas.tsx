import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import { PageHead } from "../components/Screen"
import { useEscape } from "../components/useEscape"
import {
  clientName,
  clients,
  daysFromToday,
  formatDay,
  formatHours,
  isoDay,
  people,
  TODAY,
  workTypeColor,
  workTypeName,
  workTypes,
  type HourEntry,
} from "../data/demoData"
import { useDemo } from "../state/DemoContext"

import { Field } from "./Tareas"

/* El calendario va de 8:00 a 20:00, en bloques de 30 minutos. */
const START_HOUR = 8
const END_HOUR = 20
const SLOT = 30
const SLOT_PX = 22
const ROWS = ((END_HOUR - START_HOUR) * 60) / SLOT

function personInitials(id: string) {
  return people.find((person) => person.id === id)?.initials ?? "—"
}

function minutesToLabel(minutes: number) {
  const hour = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `${hour}:${`${rest}`.padStart(2, "0")}`
}

/** Lunes de la semana que contiene a `date`. */
function mondayOf(date: Date) {
  const copy = new Date(date)
  const weekday = (copy.getDay() + 6) % 7
  copy.setDate(copy.getDate() - weekday)
  copy.setHours(0, 0, 0, 0)
  return copy
}

type Draft = {
  day: string
  start: number
  minutes: number
  /** Si viene de mover o estirar un bloque que ya existía. */
  editing?: HourEntry
}

export function Horas() {
  const { role, user, hours, setHours, toast } = useDemo()
  const [weekOffset, setWeekOffset] = useState(0)
  const [draft, setDraft] = useState<Draft | null>(null)

  const monday = mondayOf(daysFromToday(weekOffset * 7))
  const days = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(date.getDate() + index)
    return date
  })

  /*
   * El calendario es personal: arranca en el usuario actual. Un socio puede
   * mirar el de cualquiera o el equipo entero; un contador, solo el suyo.
   * Mostrar a las seis personas juntas por defecto deja los bloques tan
   * angostos que no se lee nada.
   */
  const mine = role === "contador"
  const [whoId, setWhoId] = useState(user.id)
  const who = mine ? user.id : whoId

  const visible = hours.filter((entry) => who === "equipo" || entry.personId === who)

  const weekFrom = isoDay(days[0])
  const weekTo = isoDay(days[4])
  const weekEntries = visible.filter((entry) => entry.day >= weekFrom && entry.day <= weekTo)
  const weekMinutes = weekEntries.reduce((sum, entry) => sum + entry.minutes, 0)

  /** Lo que está esperando a que el usuario confirme el solapamiento. */
  const [clash, setClash] = useState<{ entry: Omit<HourEntry, "id">; editingId?: string } | null>(
    null,
  )
  useEscape(useCallback(() => setClash(null), []))

  const commit = (entry: Omit<HourEntry, "id">, editingId?: string) => {
    setHours((list) =>
      editingId
        ? list.map((item) => (item.id === editingId ? { ...entry, id: editingId } : item))
        : [...list, { ...entry, id: `h${Date.now()}` }],
    )
    setDraft(null)
    setClash(null)
    toast(editingId ? "Registro actualizado." : "Hora cargada (datos de ejemplo).")
  }

  /**
   * Guarda el borrador. Si se pisa con otro registro de la misma persona,
   * primero pregunta. Al arrastrar (`silent`) no pregunta: cortaría el gesto.
   */
  const save = (entry: Omit<HourEntry, "id">, editingId?: string, silent = false) => {
    const overlaps = hours.some(
      (other) =>
        other.id !== editingId &&
        other.personId === entry.personId &&
        other.day === entry.day &&
        entry.start < other.start + other.minutes &&
        other.start < entry.start + entry.minutes,
    )

    if (overlaps && !silent) {
      setClash({ entry, editingId })
      return
    }

    commit(entry, editingId)
  }

  return (
    <>
      <PageHead
        title="Horas"
        sub={
          mine
            ? "Arrastrá sobre un hueco para cargar tus horas · datos de ejemplo"
            : "Arrastrá sobre un hueco para cargar horas · datos de ejemplo"
        }
      />

      <div className="d-card" style={{ padding: 14, marginBottom: 13 }}>
        <div className="d-row" style={{ flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            className="d-icon-btn"
            onClick={() => setWeekOffset((value) => value - 1)}
            aria-label="Semana anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="d-icon-btn"
            onClick={() => setWeekOffset((value) => value + 1)}
            aria-label="Semana siguiente"
          >
            <ChevronRight size={16} />
          </button>

          <div style={{ fontSize: 13.5, fontWeight: 600 }}>
            {formatDay(isoDay(days[0]))} — {formatDay(isoDay(days[4]))}
          </div>

          {weekOffset !== 0 ? (
            <button
              type="button"
              className="d-btn d-btn--quiet d-btn--sm"
              onClick={() => setWeekOffset(0)}
            >
              Volver a esta semana
            </button>
          ) : null}

          <div className="d-top__spacer" />

          {!mine ? (
            <label className="d-row" style={{ gap: 7 }}>
              <span className="d-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>
                Viendo
              </span>
              <select
                className="d-input"
                style={{ width: "auto" }}
                value={whoId}
                onChange={(event) => setWhoId(event.target.value)}
              >
                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
                <option value="equipo">Todo el equipo</option>
              </select>
            </label>
          ) : null}

          <span className="d-chip d-chip--green">{formatHours(weekMinutes)} esta semana</span>
        </div>
      </div>

      <div className="d-card" style={{ overflowX: "auto" }}>
        <WeekGrid
          days={days}
          entries={visible}
          onDraft={setDraft}
          onMove={(entry, day, start) => save({ ...entry, day, start }, entry.id, true)}
          onResize={(entry, minutes) => save({ ...entry, minutes }, entry.id, true)}
        />
      </div>

      <div className="d-card" style={{ marginTop: 13 }}>
        <div className="d-card__head">
          <div>
            <div className="d-card__title">Registros de la semana</div>
            <div className="d-card__sub">
              {who === "equipo"
                ? "De todo el equipo"
                : who === user.id
                  ? "Solo tus horas"
                  : `De ${people.find((person) => person.id === who)?.name}`}{" "}
              · ejemplo
            </div>
          </div>
        </div>

        {weekEntries.length === 0 ? (
          <p className="d-muted">
            No hay horas cargadas en esta semana. Arrastrá sobre el calendario para cargar una.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="d-table">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Tipo de trabajo</th>
                  <th className="is-num">Duración</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {[...weekEntries]
                  .sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start))
                  .map((entry) => (
                    <tr key={entry.id}>
                      <td className="d-num">{formatDay(entry.day)}</td>
                      <td className="d-num d-muted">{minutesToLabel(entry.start)}</td>
                      <td>{clientName(entry.clientId)}</td>
                      <td className="d-muted">{workTypeName(entry.workTypeId)}</td>
                      <td className="is-num">{formatHours(entry.minutes)}</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          className="d-btn d-btn--quiet d-btn--sm"
                          onClick={() =>
                            setHours((list) => list.filter((item) => item.id !== entry.id))
                          }
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {draft ? (
        <EntryForm
          draft={draft}
          onClose={() => setDraft(null)}
          onSave={(entry) => save(entry, draft.editing?.id)}
        />
      ) : null}

      {clash ? (
        <div className="d-overlay" onClick={() => setClash(null)}>
          <div
            className="d-modal"
            style={{ width: "min(420px, 100%)" }}
            role="alertdialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="d-modal__title">Se pisa con otro registro tuyo</h2>
            <p className="d-modal__body">
              Ya tenés horas cargadas en ese rango. ¿Querés guardarlo igual?
            </p>
            <div className="d-modal__actions">
              <button
                type="button"
                className="d-btn d-btn--primary"
                onClick={() => commit(clash.entry, clash.editingId)}
              >
                Guardar igual
              </button>
              <button
                type="button"
                className="d-btn d-btn--ghost"
                onClick={() => setClash(null)}
              >
                Revisar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

/* ── Rejilla semanal ───────────────────────────────────────────────── */

function WeekGrid({
  days,
  entries,
  onDraft,
  onMove,
  onResize,
}: {
  days: Date[]
  entries: HourEntry[]
  onDraft: (draft: Draft) => void
  onMove: (entry: HourEntry, day: string, start: number) => void
  onResize: (entry: HourEntry, minutes: number) => void
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selection, setSelection] = useState<{ day: string; from: number; to: number } | null>(null)

  /** Convierte una posición vertical en minutos del día, redondeados al bloque. */
  const yToMinutes = (clientY: number, column: HTMLElement) => {
    const rect = column.getBoundingClientRect()
    const offset = Math.max(0, Math.min(rect.height, clientY - rect.top))
    const slot = Math.floor(offset / SLOT_PX)
    return START_HOUR * 60 + slot * SLOT
  }

  const startDrag = (event: React.PointerEvent<HTMLDivElement>, day: string) => {
    // Solo el botón principal, y no cuando se arranca sobre un bloque existente.
    if (event.button !== 0) return
    const column = event.currentTarget
    const from = yToMinutes(event.clientY, column)
    setSelection({ day, from, to: from + SLOT })
    column.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!selection) return
    const to = yToMinutes(event.clientY, event.currentTarget) + SLOT
    setSelection((current) => (current ? { ...current, to } : null))
  }

  const endDrag = () => {
    if (!selection) return
    const start = Math.min(selection.from, selection.to - SLOT)
    const end = Math.max(selection.from + SLOT, selection.to)
    onDraft({ day: selection.day, start, minutes: end - start })
    setSelection(null)
  }

  return (
    <div style={{ display: "flex", minWidth: 620 }}>
      {/* Columna de horas */}
      <div style={{ width: 48, flexShrink: 0, paddingTop: 30 }}>
        {Array.from({ length: END_HOUR - START_HOUR }, (_, index) => (
          <div
            key={index}
            className="d-muted"
            style={{ height: SLOT_PX * 2, fontSize: 10.5, textAlign: "right", paddingRight: 8 }}
          >
            {START_HOUR + index}:00
          </div>
        ))}
      </div>

      <div ref={gridRef} style={{ display: "flex", flex: 1, gap: 6 }}>
        {days.map((date) => {
          const day = isoDay(date)
          const isToday = day === isoDay(TODAY)
          const dayEntries = entries.filter((entry) => entry.day === day)

          return (
            <div key={day} style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  height: 30,
                  fontSize: 11.5,
                  fontWeight: 600,
                  textAlign: "center",
                  color: isToday ? "var(--d-green)" : "var(--d-ink)",
                }}
              >
                {date.toLocaleDateString("es-UY", { weekday: "short" })} {date.getDate()}
              </div>

              <div
                style={{
                  position: "relative",
                  height: ROWS * SLOT_PX,
                  borderRadius: 12,
                  background: isToday ? "#f6f8f6" : "var(--d-wash)",
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${SLOT_PX * 2 - 1}px, var(--d-line) ${SLOT_PX * 2 - 1}px ${SLOT_PX * 2}px)`,
                  cursor: "crosshair",
                  touchAction: "none",
                }}
                onPointerDown={(event) => startDrag(event, day)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                role="application"
                aria-label={`Horas del ${formatDay(day)}`}
              >
                {/* Selección en curso */}
                {selection?.day === day ? (
                  <div
                    style={{
                      position: "absolute",
                      insetInline: 3,
                      top: ((Math.min(selection.from, selection.to - SLOT) - START_HOUR * 60) / SLOT) * SLOT_PX,
                      height:
                        ((Math.max(selection.from + SLOT, selection.to) -
                          Math.min(selection.from, selection.to - SLOT)) /
                          SLOT) *
                        SLOT_PX,
                      borderRadius: 8,
                      background: "rgba(51,96,74,.22)",
                      border: "1px dashed var(--d-green)",
                      pointerEvents: "none",
                    }}
                  />
                ) : null}

                {layout(dayEntries).map(({ entry, lane, lanes }) => (
                  <Block
                    key={entry.id}
                    entry={entry}
                    lane={lane}
                    lanes={lanes}
                    onMove={onMove}
                    onResize={onResize}
                    onOpen={() =>
                      onDraft({
                        day: entry.day,
                        start: entry.start,
                        minutes: entry.minutes,
                        editing: entry,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Acomoda los registros de un día en carriles, para que los que se pisan
 * queden uno al lado del otro en vez de encimados.
 */
function layout(entries: HourEntry[]) {
  const sorted = [...entries].sort((a, b) => a.start - b.start)
  const laneEnds: number[] = []
  const placed = sorted.map((entry) => {
    let lane = laneEnds.findIndex((end) => end <= entry.start)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(0)
    }
    laneEnds[lane] = entry.start + entry.minutes
    return { entry, lane }
  })

  const lanes = Math.max(1, laneEnds.length)
  return placed.map((item) => ({ ...item, lanes }))
}

/** Un registro dentro de la rejilla: se puede mover y estirar. */
function Block({
  entry,
  lane,
  lanes,
  onMove,
  onResize,
  onOpen,
}: {
  entry: HourEntry
  lane: number
  lanes: number
  onMove: (entry: HourEntry, day: string, start: number) => void
  onResize: (entry: HourEntry, minutes: number) => void
  onOpen: () => void
}) {
  const [drag, setDrag] = useState<{ mode: "move" | "resize"; originY: number; value: number } | null>(
    null,
  )

  const top = ((entry.start - START_HOUR * 60) / SLOT) * SLOT_PX
  const height = (entry.minutes / SLOT) * SLOT_PX
  const color = workTypeColor(entry.workTypeId)

  const begin = (event: React.PointerEvent, mode: "move" | "resize") => {
    event.stopPropagation()
    event.preventDefault()
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
    setDrag({
      mode,
      originY: event.clientY,
      value: mode === "move" ? entry.start : entry.minutes,
    })
  }

  const during = (event: React.PointerEvent) => {
    if (!drag) return
    event.stopPropagation()
    const slots = Math.round((event.clientY - drag.originY) / SLOT_PX)
    if (slots === 0) return

    if (drag.mode === "move") {
      const next = Math.max(START_HOUR * 60, drag.value + slots * SLOT)
      if (next !== entry.start) onMove(entry, entry.day, next)
    } else {
      const next = Math.max(SLOT, drag.value + slots * SLOT)
      if (next !== entry.minutes) onResize(entry, next)
    }
  }

  const end = (event: React.PointerEvent) => {
    event.stopPropagation()
    setDrag(null)
  }

  const width = 100 / lanes

  return (
    <div
      style={{
        position: "absolute",
        top,
        height,
        left: `calc(${lane * width}% + 3px)`,
        width: `calc(${width}% - 5px)`,
        overflow: "hidden",
        borderRadius: 9,
        borderLeft: `3px solid ${color}`,
        background: `${color}26`,
        cursor: "grab",
        padding: "4px 6px",
        touchAction: "none",
      }}
      onPointerDown={(event) => begin(event, "move")}
      onPointerMove={during}
      onPointerUp={end}
      onDoubleClick={onOpen}
      title={`${clientName(entry.clientId)} — ${workTypeName(entry.workTypeId)} (doble clic para editar)`}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          lineHeight: 1.25,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {clientName(entry.clientId)}
      </div>
      {height > 38 ? (
        <div
          className="d-muted"
          style={{ fontSize: 9.5, lineHeight: 1.3, overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {personInitials(entry.personId)} · {formatHours(entry.minutes)}
        </div>
      ) : null}

      {/* Manija para estirar */}
      <div
        onPointerDown={(event) => begin(event, "resize")}
        onPointerMove={during}
        onPointerUp={end}
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: 7,
          cursor: "ns-resize",
        }}
        aria-hidden="true"
      />
    </div>
  )
}

/* ── Formulario de carga ───────────────────────────────────────────── */

function EntryForm({
  draft,
  onClose,
  onSave,
}: {
  draft: Draft
  onClose: () => void
  onSave: (entry: Omit<HourEntry, "id">) => void
}) {
  const { user } = useDemo()
  useEscape(onClose)
  const [clientId, setClientId] = useState(draft.editing?.clientId ?? clients[0].id)
  const [workTypeId, setWorkTypeId] = useState(draft.editing?.workTypeId ?? workTypes[0].id)
  const [minutes, setMinutes] = useState(draft.minutes)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    onSave({
      personId: draft.editing?.personId ?? user.id,
      clientId,
      workTypeId,
      day: draft.day,
      start: draft.start,
      minutes,
    })
  }

  return (
    <div className="d-overlay" onClick={onClose}>
      <form
        className="d-modal"
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        aria-label="Cargar horas"
      >
        <div className="d-row" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h2 className="d-modal__title">
              {draft.editing ? "Editar registro" : "Cargar horas"}
            </h2>
            <p className="d-muted" style={{ marginTop: 4, fontSize: 12.5 }}>
              {formatDay(draft.day)} · arranca {minutesToLabel(draft.start)}
            </p>
          </div>
          <button type="button" className="d-icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "grid", gap: 13, marginTop: 18 }}>
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

          <Field label="Duración">
            <select
              className="d-input"
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
            >
              {/*
                La duración que viene del arrastre se suma a la lista: si no
                está entre las opciones, el desplegable muestra la primera y
                se guarda otra cosa.
              */}
              {[...new Set([30, 60, 90, 120, 150, 180, 240, minutes])]
                .sort((a, b) => a - b)
                .map((value) => (
                  <option key={value} value={value}>
                    {formatHours(value)}
                  </option>
                ))}
            </select>
          </Field>
        </div>

        <div className="d-modal__actions">
          <button type="submit" className="d-btn d-btn--primary">
            Guardar
          </button>
          <button type="button" className="d-btn d-btn--ghost" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

import { Bell, PlayCircle, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { CONTACT_LABEL, texts, whatsappHref } from "../config"
import { clientName, isOverdue } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/** Campana con las tareas vencidas. */
function Alerts() {
  const { tasks } = useDemo()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  const overdue = tasks.filter(isOverdue)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [open])

  return (
    <div ref={wrap} style={{ position: "relative" }}>
      <button
        type="button"
        className="d-icon-btn"
        style={{ position: "relative" }}
        onClick={() => setOpen((value) => !value)}
        aria-label={`Alertas: ${overdue.length} tareas vencidas`}
        aria-expanded={open}
      >
        <Bell size={16} />
        {overdue.length > 0 ? <span className="d-icon-btn__dot">{overdue.length}</span> : null}
      </button>

      {open ? (
        <div
          className="d-card"
          style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 40, width: 300 }}
        >
          <div className="d-card__head" style={{ marginBottom: 10 }}>
            <div>
              <div className="d-card__title">Tareas vencidas</div>
              <div className="d-card__sub">Datos de ejemplo</div>
            </div>
          </div>
          {overdue.length === 0 ? (
            <p className="d-muted">No hay tareas vencidas.</p>
          ) : (
            <ul style={{ display: "grid", gap: 10 }}>
              {overdue.slice(0, 5).map((task) => (
                <li key={task.id} style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 500 }}>{task.title}</div>
                  <div className="d-muted" style={{ fontSize: 12 }}>
                    {clientName(task.clientId)} · vencía el {task.due.split("-").reverse().join("/")}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="tareas"
            className="d-btn d-btn--ghost d-btn--sm d-btn--block"
            style={{ marginTop: 12 }}
            onClick={() => setOpen(false)}
          >
            Ver todas las tareas
          </Link>
        </div>
      ) : null}
    </div>
  )
}

/** Menú de usuario, con el botón de reiniciar la demo. */
function UserMenu() {
  const { user, resetDemo, toast } = useDemo()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [open])

  return (
    <div ref={wrap} style={{ position: "relative" }}>
      <button
        type="button"
        className="d-icon-btn"
        style={{
          background: "var(--d-green-soft)",
          borderColor: "transparent",
          color: "var(--d-green)",
          fontSize: 11.5,
          fontWeight: 700,
        }}
        onClick={() => setOpen((value) => !value)}
        aria-label={`Usuario: ${user.name}`}
        aria-expanded={open}
      >
        {user.initials}
      </button>

      {open ? (
        <div
          className="d-card"
          style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 40, width: 230 }}
        >
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div className="d-muted" style={{ fontSize: 12 }}>
            {user.title} · Estudio Demo
          </div>
          <button
            type="button"
            className="d-btn d-btn--ghost d-btn--sm d-btn--block"
            style={{ marginTop: 14 }}
            onClick={() => {
              resetDemo()
              setOpen(false)
              toast(texts.resetDone)
            }}
          >
            <RotateCcw size={13} />
            Reiniciar demo
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function TopbarExtras() {
  const { para, setWelcomeOpen } = useDemo()

  return (
    <>
      <button
        type="button"
        className="d-btn d-btn--ghost d-btn--sm"
        onClick={() => setWelcomeOpen(true)}
        aria-label="Ver recorrido"
      >
        <PlayCircle size={14} />
        <span className="d-hide-narrow">Ver recorrido</span>
      </button>

      <Alerts />

      <a
        className="d-btn d-btn--cta d-btn--sm"
        href={whatsappHref(para)}
        target="_blank"
        rel="noreferrer"
      >
        {CONTACT_LABEL}
      </a>

      <UserMenu />
    </>
  )
}

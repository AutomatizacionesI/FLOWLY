import { X } from "lucide-react"
import { useEffect, useState } from "react"

import { texts } from "../config"
import type { Role } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

/** Qué ve y qué puede hacer cada rol. Es la tabla del panel "¿Qué cambia?". */
const comparison: Array<{ area: string; socio: string; contador: string }> = [
  {
    area: "Clientes",
    socio: "Ve todos, edita todos",
    contador: "Ve todos, arranca en “Mis clientes”, edita solo los de su equipo",
  },
  { area: "Tareas", socio: "Todas", contador: "Ve todas, actúa solo sobre las de sus clientes" },
  {
    area: "Horas",
    socio: "Todas, a nombre de cualquiera",
    contador: "Solo las propias y solo en sus clientes",
  },
  {
    area: "Reporte de horas",
    socio: "Sí (por cliente, persona, tarea, tipo de trabajo y mes)",
    contador: "No: pantalla bloqueada",
  },
  { area: "Tablero de socios", socio: "Sí", contador: "No: pantalla bloqueada" },
  { area: "Facturas", socio: "Todas", contador: "Solo las que cargó él" },
  { area: "Administración", socio: "Usuarios, equipos y tipos de trabajo", contador: "No" },
  { area: "Conciliación, asientos y herramientas PDF", socio: "Sí", contador: "Sí" },
]

function roleLabel(role: Role) {
  return role === "socio" ? "Socio" : "Contador"
}

/* ── Panel comparativo ─────────────────────────────────────────────── */

function DiffPanel({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="d-overlay" onClick={onClose}>
      <div
        className="d-modal"
        style={{ width: "min(760px, 100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Qué cambia entre socio y contador"
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 className="d-modal__title">¿Qué cambia entre un socio y un contador?</h2>
            <p className="d-modal__body" style={{ marginTop: 6 }}>
              Los permisos no son solo pantallas: cambian los datos que se ven y los botones que
              aparecen.
            </p>
          </div>
          <button type="button" className="d-icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <div style={{ marginTop: 18, overflowX: "auto" }}>
          <table className="d-table">
            <thead>
              <tr>
                <th>Área</th>
                <th>Socio</th>
                <th>Contador</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.area}>
                  <td style={{ fontWeight: 600 }}>{row.area}</td>
                  <td>{row.socio}</td>
                  <td className="d-muted">{row.contador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Interruptor ───────────────────────────────────────────────────── */

const COACH_KEY = "demo-contable:coach-rol"

export function RoleSwitch() {
  const { role, setRole, toast, welcomeOpen } = useDemo()
  const [panelOpen, setPanelOpen] = useState(false)
  const [coachOpen, setCoachOpen] = useState(false)

  // El globo de ayuda aparece una sola vez por sesión, y recién cuando se
  // cerró el modal de bienvenida: si no, se pisan en pantalla.
  useEffect(() => {
    if (welcomeOpen) return
    try {
      if (window.sessionStorage.getItem(COACH_KEY)) return
    } catch {
      // Si el navegador bloquea el almacenamiento, lo mostramos igual.
    }
    const timer = window.setTimeout(() => setCoachOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [welcomeOpen])

  const dismissCoach = () => {
    setCoachOpen(false)
    try {
      window.sessionStorage.setItem(COACH_KEY, "1")
    } catch {
      // Sin almacenamiento, simplemente no se recuerda.
    }
  }

  const change = (next: Role) => {
    if (next === role) return
    setRole(next)
    dismissCoach()
    toast(texts.roleChanged(roleLabel(next)))
  }

  return (
    <>
      <div className="d-roleswitch">
        <span className="d-roleswitch__label">Vista:</span>
        {(["socio", "contador"] as Role[]).map((option) => (
          <button
            key={option}
            type="button"
            className={role === option ? "is-on" : undefined}
            onClick={() => change(option)}
            aria-pressed={role === option}
          >
            {roleLabel(option)}
          </button>
        ))}

        {coachOpen ? (
          <div className="d-coach" role="note">
            <p>{texts.roleHint}</p>
            <div className="d-coach__actions">
              <button
                type="button"
                className="d-btn d-btn--sm"
                style={{ background: "#fff", color: "var(--d-ink)" }}
                onClick={dismissCoach}
              >
                Entendido
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        className="d-btn d-btn--ghost d-btn--sm"
        onClick={() => {
          dismissCoach()
          setPanelOpen(true)
        }}
      >
        ¿Qué cambia?
      </button>

      {panelOpen ? <DiffPanel onClose={() => setPanelOpen(false)} /> : null}
    </>
  )
}

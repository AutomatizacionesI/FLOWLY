import { CheckSquare, LayoutGrid, LogOut, Menu, Users, Zap } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

import { DIAS_SIN_CONTACTO, estadosAbiertos } from "../config"
import { diasDesde, diasHasta } from "../lib/fechas"
import { useAuth } from "../state/AuthContext"
import { useDatos } from "../state/DataContext"

import { Avatar } from "./piezas"

export const secciones = [
  { path: "resumen", label: "Resumen", icono: LayoutGrid },
  { path: "leads", label: "Leads", icono: Users },
  { path: "tareas", label: "Tareas", icono: CheckSquare },
] as const

/* ── Barra lateral ──────────────────────────────────────────────────── */

function Riel({ abierta, cerrar }: { abierta: boolean; cerrar: () => void }) {
  const { pathname } = useLocation()
  const { perfil, salir } = useAuth()
  const { leads, tareas } = useDatos()

  // Lo que pide atención hoy, que es lo que justifica el número en el riel.
  const seguimientos = leads.filter((l) => {
    if (!estadosAbiertos.includes(l.estado)) return false
    const porVencer = diasHasta(l.proximo_seguimiento)
    if (porVencer !== null && porVencer <= 0) return true
    const sinHablar = diasDesde(l.ultimo_contacto)
    return sinHablar === null || sinHablar >= DIAS_SIN_CONTACTO
  }).length

  const pendientes = tareas.filter((t) => !t.hecha).length
  const vencidas = tareas.filter((t) => !t.hecha && (diasHasta(t.vence) ?? 1) <= 0).length

  const cuentas: Record<string, { n: number; urgente?: boolean }> = {
    leads: { n: seguimientos, urgente: seguimientos > 0 },
    tareas: { n: pendientes, urgente: vencidas > 0 },
  }

  return (
    <aside className={`a-glass a-side${abierta ? " is-abierta" : ""}`}>
      <div className="a-side__brand">
        <span className="a-side__mark">
          <Zap size={17} strokeWidth={2.4} />
        </span>
        <div>
          <div className="a-side__name">Spike</div>
          <div className="a-side__tag">Panel interno</div>
        </div>
      </div>

      <nav className="a-side__nav" aria-label="Secciones del panel">
        <div className="a-side__group">Seguimiento</div>
        {secciones.map((s) => {
          const activo = pathname.endsWith(`/${s.path}`)
          const cuenta = cuentas[s.path]
          const Icono = s.icono

          return (
            <Link
              key={s.path}
              // Absoluto a propósito: relativo se encadena (/admin/leads/tareas).
              // El basename del router le pone el /admin adelante.
              to={`/${s.path}`}
              onClick={cerrar}
              className={`a-side__item${activo ? " is-active" : ""}`}
            >
              <Icono size={16.5} strokeWidth={1.9} />
              {s.label}
              {cuenta && cuenta.n > 0 ? (
                <span className={`a-side__count${cuenta.urgente ? " is-urgente" : ""}`}>
                  {cuenta.n}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      <div className="a-side__pie">
        <Avatar nombre={perfil?.nombre ?? "Equipo"} color={perfil?.color} />
        <div className="a-side__quien">
          <b>{perfil?.nombre ?? "Equipo"}</b>
          <span>{perfil?.email ?? ""}</span>
        </div>
        <button
          type="button"
          className="a-btn a-btn--fantasma a-btn--icono"
          onClick={() => void salir()}
          title="Salir"
          aria-label="Salir"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}

/* ── Marco ──────────────────────────────────────────────────────────── */

export function Shell({
  titulo,
  bajada,
  acciones,
  children,
}: {
  titulo: ReactNode
  bajada?: string
  acciones?: ReactNode
  children: ReactNode
}) {
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  // Cambiar de pantalla cierra el menú del celular.
  useEffect(() => setMenu(false), [pathname])

  return (
    <div className="a-shell">
      <Riel abierta={menu} cerrar={() => setMenu(false)} />
      {menu ? <div className="a-tapa" onClick={() => setMenu(false)} /> : null}

      <main className="a-main">
        <header className="a-glass a-top">
          <button
            type="button"
            className="a-btn a-btn--fantasma a-btn--icono a-abrir-menu"
            onClick={() => setMenu(true)}
            aria-label="Abrir el menú"
          >
            <Menu size={18} />
          </button>

          <div className="a-top__titulo">
            <h1>{titulo}</h1>
            {bajada ? <p>{bajada}</p> : null}
          </div>

          {acciones ? <div className="a-top__acciones">{acciones}</div> : null}
        </header>

        {children}
      </main>
    </div>
  )
}

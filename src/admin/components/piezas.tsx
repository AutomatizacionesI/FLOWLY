import { X } from "lucide-react"
import { useEffect, type ReactNode } from "react"

import { estadoLabel, estadoTono } from "../config"

/* ── Vidrio ───────────────────────────────────────────────────────────
   Cualquier superficie del panel pasa por acá, así el reflejo y la sombra
   salen siempre del mismo lado. */

export function Vidrio({
  className = "",
  children,
  ...resto
}: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`a-glass ${className}`} {...resto}>
      {children}
    </div>
  )
}

/* ── Chips ──────────────────────────────────────────────────────────── */

export function ChipEstado({ estado }: { estado: string }) {
  return (
    <span
      className="a-chip a-chip--estado"
      style={{ "--tono": estadoTono(estado) } as React.CSSProperties}
    >
      {estadoLabel(estado)}
    </span>
  )
}

export function Punto({ tono }: { tono: string }) {
  return <span className="a-punto" style={{ "--tono": tono } as React.CSSProperties} />
}

/* ── Avatar ─────────────────────────────────────────────────────────── */

/** Un color estable por persona, por si todavía no tiene uno guardado. */
const paleta = ["#63e28f", "#7cc4ff", "#ffc46b", "#a894ff", "#ff9a7a"]

export function Avatar({
  nombre,
  color,
  chico,
}: {
  nombre: string
  color?: string | null
  chico?: boolean
}) {
  const tono =
    color ?? paleta[[...nombre].reduce((suma, c) => suma + c.charCodeAt(0), 0) % paleta.length]

  const iniciales = nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()

  return (
    <span
      className={`a-avatar${chico ? " a-avatar--sm" : ""}`}
      style={{ background: `linear-gradient(145deg, ${tono}, ${tono}bb)` }}
      title={nombre}
    >
      {iniciales || "?"}
    </span>
  )
}

/* ── Campos ─────────────────────────────────────────────────────────── */

export function Campo({
  label,
  ancho,
  children,
}: {
  label: string
  ancho?: boolean
  children: ReactNode
}) {
  return (
    <label className={`a-campo${ancho ? " a-ancho" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}

/* ── Capas ──────────────────────────────────────────────────────────── */

function useEscape(cerrar: () => void) {
  useEffect(() => {
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar()
    }
    document.addEventListener("keydown", alTecla)
    return () => document.removeEventListener("keydown", alTecla)
  }, [cerrar])
}

export function Modal({
  titulo,
  cerrar,
  children,
}: {
  titulo: string
  cerrar: () => void
  children: ReactNode
}) {
  useEscape(cerrar)

  return (
    <div
      className="a-fondo a-fondo--centro"
      onMouseDown={(e) => e.target === e.currentTarget && cerrar()}
    >
      <div className="a-modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <div className="a-modal__top">
          <h2>{titulo}</h2>
          <button type="button" className="a-btn a-btn--fantasma a-btn--icono" onClick={cerrar}>
            <X size={17} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Panel que entra desde la derecha. Para el detalle de un lead. */
export function Panel({
  cerrar,
  children,
  etiqueta,
}: {
  cerrar: () => void
  children: ReactNode
  etiqueta: string
}) {
  useEscape(cerrar)

  return (
    <div
      className="a-fondo a-fondo--lado"
      onMouseDown={(e) => e.target === e.currentTarget && cerrar()}
    >
      <div className="a-sheet" role="dialog" aria-modal="true" aria-label={etiqueta}>
        {children}
      </div>
    </div>
  )
}

/* ── Vacío ──────────────────────────────────────────────────────────── */

export function Vacio({
  icono,
  titulo,
  texto,
  chico,
  children,
}: {
  icono?: ReactNode
  titulo: string
  texto?: string
  chico?: boolean
  children?: ReactNode
}) {
  return (
    <div className={`a-vacio${chico ? " a-vacio--chico" : ""}`}>
      {icono}
      <b>{titulo}</b>
      {texto ? <span>{texto}</span> : null}
      {children}
    </div>
  )
}

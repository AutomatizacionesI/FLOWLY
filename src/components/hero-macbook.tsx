/* ─────────────────────────────────────────────
   Hero · MacBook Pro 14 con un dashboard en pantalla.
   El marco esta hecho en CSS en vez de importado como imagen: pesa
   nada, se ve nitido en cualquier densidad de pantalla y el contenido
   de la pantalla es DOM real, asi que se puede animar.
   Proporciones tomadas del equipo real: lid 1.41:1, pantalla 16:10.4,
   notch centrado y base mas ancha que la tapa.
   ───────────────────────────────────────────── */

import { motion, useReducedMotion } from "motion/react"

const INK = "#1c2434"
const MUTE = "#8a93a4"
const BODY = "#445063"
const LINE = "#eceff3"
const INDIGO = "#5b5bd6"
const TEAL = "#14b8a6"
const AMBER = "#f59e0b"
const GREEN = "#22c55e"

const viewport = { once: true, amount: 0.2 } as const

/* ── marco ── */

function MacbookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full select-none">
      {/* tapa */}
      <div
        className="relative rounded-[14px] p-[6px] sm:rounded-[18px] sm:p-[8px]"
        style={{
          background: "linear-gradient(160deg,#3a3d42 0%,#1d1d1f 38%,#0f1011 100%)",
          boxShadow:
            "0 40px 80px -40px rgba(15,23,42,0.55), 0 2px 0 rgba(255,255,255,0.14) inset",
        }}
      >
        <div
          className="relative aspect-[16/10.4] overflow-hidden rounded-[8px] bg-[#f6f7f9] sm:rounded-[11px]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.55) inset" }}
        >
          {/* notch */}
          <div
            className="absolute left-1/2 top-0 z-20 h-[10px] w-[72px] -translate-x-1/2 rounded-b-[6px] sm:h-[13px] sm:w-[96px]"
            style={{ background: "#0f1011" }}
          />
          {children}
        </div>
      </div>

      {/* base */}
      <div className="relative mx-auto -mt-[1px] w-[108%] -translate-x-[3.7%]">
        <div
          className="h-[8px] rounded-b-[7px] sm:h-[11px] sm:rounded-b-[9px]"
          style={{
            background:
              "linear-gradient(180deg,#d4d8dd 0%,#aeb4bb 55%,#878d95 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[4px] w-[58px] -translate-x-1/2 rounded-b-[5px] sm:h-[5px] sm:w-[80px]"
          style={{ background: "linear-gradient(180deg,#9aa0a8,#b7bcc3)" }}
        />
        <div
          className="mx-auto h-[3px] w-[62%] rounded-b-[6px] sm:h-[4px]"
          style={{ background: "linear-gradient(180deg,#8d939b,#6f757c)" }}
        />
      </div>
    </div>
  )
}

/* ── piezas del dashboard ── */

function Spark({ color, points }: { color: string; points: string }) {
  return (
    <svg viewBox="0 0 60 18" preserveAspectRatio="none" className="h-[14px] w-full" aria-hidden>
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </svg>
  )
}

function Kpi({
  label,
  value,
  delta,
  color,
  points,
  delay,
}: {
  label: string
  value: string
  delta: string
  color: string
  points: string
  delay: number
}) {
  return (
    <motion.div
      className="min-w-0 flex-1 rounded-[6px] border bg-white px-2 py-1.5"
      style={{ borderColor: LINE }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ type: "spring", stiffness: 280, damping: 26, delay }}
    >
      <p className="truncate text-[5px] font-medium sm:text-[6px]" style={{ color: MUTE }}>
        {label}
      </p>
      <div className="mt-0.5 flex items-baseline gap-1">
        <span
          className="text-[9px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[11px]"
          style={{ color: INK }}
        >
          {value}
        </span>
        <span
          className="text-[5px] font-semibold sm:text-[6px]"
          style={{ color: "#15803d" }}
        >
          {delta}
        </span>
      </div>
      <div className="mt-1">
        <Spark color={color} points={points} />
      </div>
    </motion.div>
  )
}

function Panel({
  title,
  action,
  className = "",
  children,
}: {
  title: string
  action?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={`flex min-h-0 flex-col rounded-[6px] border bg-white px-2 py-1.5 ${className}`}
      style={{ borderColor: LINE }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.25 }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[6px] font-semibold tracking-[-0.01em] sm:text-[7px]"
          style={{ color: INK }}
        >
          {title}
        </span>
        {action ? (
          <span
            className="rounded-[3px] border px-1 py-[1px] text-[4.5px] sm:text-[5.5px]"
            style={{ borderColor: LINE, color: MUTE }}
          >
            {action}
          </span>
        ) : null}
      </div>
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.div>
  )
}

/* ── dashboard ── */

function HeroDashboard() {
  const reduced = useReducedMotion()

  const nav = [
    "Resumen",
    "Pedidos",
    "Clientes",
    "Stock",
    "Automatizaciones",
    "Reportes",
  ]

  const area = "0,40 26,31 52,35 78,22 104,27 130,14 156,19 182,7"

  const rows = [
    { c: "Pedido #2841 confirmado", t: "hace 2 min", d: GREEN },
    { c: "Stock bajo en 3 productos", t: "hace 14 min", d: AMBER },
    { c: "Reporte semanal enviado", t: "hace 1 h", d: INDIGO },
    { c: "Cliente nuevo desde WhatsApp", t: "hace 2 h", d: TEAL },
  ]

  return (
    <div className="flex h-full w-full" style={{ background: "#f6f7f9" }}>
      {/* sidebar */}
      <aside
        className="flex w-[52px] shrink-0 flex-col gap-[3px] border-r bg-white p-1.5 sm:w-[68px] sm:p-2"
        style={{ borderColor: LINE }}
      >
        <div className="mb-1.5 flex items-center gap-1">
          <span className="size-[8px] rounded-[3px] sm:size-[10px]" style={{ background: INK }} />
          <span
            className="text-[5.5px] font-semibold tracking-[-0.02em] sm:text-[7px]"
            style={{ color: INK }}
          >
            Operación
          </span>
        </div>

        {nav.map((n, i) => (
          <span
            key={n}
            className="truncate rounded-[4px] px-1 py-[2.5px] text-[5px] font-medium sm:text-[6px]"
            style={
              i === 0
                ? { background: "#f1f3f7", color: INK }
                : { color: MUTE }
            }
          >
            {n}
          </span>
        ))}

        <div
          className="mt-auto rounded-[5px] border px-1 py-1"
          style={{ borderColor: LINE }}
        >
          <p className="text-[4.5px] sm:text-[5.5px]" style={{ color: MUTE }}>
            Sincronizado
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <motion.span
              className="size-[3px] rounded-full"
              style={{ background: GREEN }}
              animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[4.5px] sm:text-[5.5px]" style={{ color: BODY }}>
              hace 1 min
            </span>
          </div>
        </div>
      </aside>

      {/* contenido */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-1.5 pt-[13px] sm:gap-2 sm:p-2.5 sm:pt-[17px]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p
              className="truncate text-[7px] font-semibold tracking-[-0.02em] sm:text-[9px]"
              style={{ color: INK }}
            >
              Buen día, Martina
            </p>
            <p className="text-[4.5px] sm:text-[5.5px]" style={{ color: MUTE }}>
              Jueves 16 de octubre
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="hidden rounded-[4px] border px-1.5 py-[2px] text-[5px] sm:block"
              style={{ borderColor: LINE, background: "#fff", color: MUTE }}
            >
              Buscar
            </span>
            <span
              className="size-[11px] rounded-full sm:size-[14px]"
              style={{ background: "linear-gradient(140deg,#c7d2fe,#5b5bd6)" }}
            />
          </div>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
          <Kpi
            label="Ingresos del mes"
            value="$ 1,24 M"
            delta="+14%"
            color={INDIGO}
            points="0,14 12,10 24,12 36,6 48,8 60,2"
            delay={0.1}
          />
          <Kpi
            label="Pedidos"
            value="872"
            delta="+9%"
            color={TEAL}
            points="0,12 12,13 24,8 36,10 48,5 60,4"
            delay={0.18}
          />
          <Kpi
            label="Horas ahorradas"
            value="146"
            delta="+22%"
            color={GREEN}
            points="0,15 12,12 24,13 36,8 48,6 60,3"
            delay={0.26}
          />
        </div>

        <div className="flex min-h-0 flex-1 gap-1.5 sm:gap-2">
          <Panel title="Ingresos" action="8 meses" className="flex-[1.35]">
            <svg
              viewBox="0 0 182 44"
              preserveAspectRatio="none"
              className="h-full min-h-[40px] w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="hero_area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={INDIGO} stopOpacity="0.26" />
                  <stop offset="100%" stopColor={INDIGO} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[11, 22, 33].map((y) => (
                <line key={y} x1="0" y1={y} x2="182" y2={y} stroke="#f1f3f7" strokeWidth="1" />
              ))}
              <motion.polygon
                points={`${area} 182,44 0,44`}
                fill="url(#hero_area)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewport}
                transition={{ duration: 0.7, delay: 0.8 }}
              />
              <motion.polyline
                points={area}
                fill="none"
                stroke={INDIGO}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewport}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              />
              <motion.circle
                cx="182"
                cy="7"
                r="2.6"
                fill={INDIGO}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 1.6 }}
              />
            </svg>
          </Panel>

          <Panel title="Actividad" className="flex-1">
            <div className="flex flex-col gap-[3px]">
              {rows.map((r, i) => (
                <motion.div
                  key={r.c}
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 26,
                    delay: 0.5 + i * 0.1,
                  }}
                >
                  <span
                    className="size-[3px] shrink-0 rounded-full"
                    style={{ background: r.d }}
                  />
                  <span
                    className="min-w-0 flex-1 truncate text-[5px] sm:text-[6px]"
                    style={{ color: BODY }}
                  >
                    {r.c}
                  </span>
                  <span
                    className="shrink-0 text-[4.5px] sm:text-[5.5px]"
                    style={{ color: MUTE }}
                  >
                    {r.t}
                  </span>
                </motion.div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

export function HeroMacbook() {
  return (
    <MacbookFrame>
      <HeroDashboard />
    </MacbookFrame>
  )
}

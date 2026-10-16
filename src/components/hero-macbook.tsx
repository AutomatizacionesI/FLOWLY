/* ─────────────────────────────────────────────
   Hero · MacBook Pro 14 con el dashboard en pantalla.
   El marco esta hecho en CSS en vez de importado como imagen: pesa
   nada, se ve nitido en cualquier densidad y el contenido de la
   pantalla es DOM real, asi que se puede animar.
   Proporciones del equipo real: tapa 1.41:1, pantalla 16:10.4, notch
   centrado y base mas ancha que la tapa.

   Los estilos del dashboard viven en index.css bajo .hdash, con los
   tamanos en cqw para que escale con el ancho de la pantalla.
   ───────────────────────────────────────────── */

import { useEffect, useRef, type ReactNode } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react"

const INDIGO = "#5b5bd6"
const TEAL = "#14b8a6"
const AMBER = "#f59e0b"
const GREEN = "#22c55e"

const viewport = { once: true, amount: 0.25 } as const

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
}

/* Numero que cuenta hasta su valor al entrar en pantalla. */
function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 34, stiffness: 140 })
  const inView = useInView(ref, { once: true, margin: "-40px" })

  const format = (n: number) =>
    prefix +
    new Intl.NumberFormat("es-UY", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n) +
    suffix

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = format(value)
      return
    }
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spring, reduced, value, decimals, prefix, suffix])

  return <span ref={ref}>{reduced ? format(value) : format(0)}</span>
}

/* ── marco ── */

function MacbookFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full select-none">
      <div
        className="relative rounded-[13px] p-[6px] sm:rounded-[17px] sm:p-[7px]"
        style={{
          background: "linear-gradient(160deg,#3a3d42 0%,#1d1d1f 38%,#0f1011 100%)",
          boxShadow:
            "0 44px 80px -44px rgba(15,23,42,0.5), 0 2px 0 rgba(255,255,255,0.13) inset",
        }}
      >
        <div
          className="relative aspect-[16/10.4] overflow-hidden rounded-[8px] sm:rounded-[10px]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.5) inset" }}
        >
          <div
            className="absolute left-1/2 top-0 z-20 h-[9px] w-[66px] -translate-x-1/2 rounded-b-[5px] sm:h-[11px] sm:w-[84px]"
            style={{ background: "#0f1011" }}
          />
          {children}
        </div>
      </div>

      <div className="relative mx-auto -mt-[1px] w-[108%] -translate-x-[3.7%]">
        <div
          className="h-[8px] rounded-b-[7px] sm:h-[10px] sm:rounded-b-[8px]"
          style={{
            background: "linear-gradient(180deg,#d4d8dd 0%,#aeb4bb 55%,#878d95 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[4px] w-[54px] -translate-x-1/2 rounded-b-[5px] sm:w-[72px]"
          style={{ background: "linear-gradient(180deg,#9aa0a8,#b7bcc3)" }}
        />
        <div
          className="mx-auto h-[3px] w-[60%] rounded-b-[6px]"
          style={{ background: "linear-gradient(180deg,#8d939b,#6f757c)" }}
        />
      </div>
    </div>
  )
}

/* ── datos ── */

const navGroups = [
  { title: "General", items: ["Resumen", "Pedidos", "Clientes", "Facturación"] },
  { title: "Operación", items: ["Stock", "Proveedores", "Envíos", "Automatizaciones"] },
  { title: "Análisis", items: ["Reportes", "Métricas"] },
  { title: "Sistema", items: ["Integraciones", "Equipo"] },
]

const months = ["Nov", "Ene", "Mar", "May", "Jul", "Set"]
const prev = [30, 34, 28, 38, 33, 42, 36]
const curr = [44, 40, 52, 48, 58, 62, 70]

const orders = [
  { id: "#2841", who: "Lucía Fernández", ch: "Instagram", st: "ok", amount: "$ 3.120" },
  { id: "#2840", who: "Martín Suárez", ch: "Tienda online", st: "ok", amount: "$ 1.890" },
  { id: "#2839", who: "Carolina Díaz", ch: "WhatsApp", st: "pe", amount: "$ 2.450" },
  { id: "#2838", who: "Rodrigo Peña", ch: "Mayorista", st: "nu", amount: "$ 7.640" },
] as const

const stLabel = { ok: "Pago", pe: "Pendiente", nu: "Preparando" } as const

/* ── mini graficos de las metricas ── */

function SparkArea() {
  const pts = "0,14 10,11 20,12 30,7 40,9 50,4 60,2"
  return (
    <svg viewBox="0 0 60 18" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="hsp1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={INDIGO} stopOpacity="0.32" />
          <stop offset="100%" stopColor={INDIGO} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={`${pts} 60,18 0,18`}
        fill="url(#hsp1)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
      <motion.polyline
        points={pts}
        fill="none"
        stroke={INDIGO}
        strokeWidth="1.8"
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

function SparkBars() {
  const hs = [7, 6, 11, 9, 13, 12, 16]
  return (
    <svg viewBox="0 0 60 18" preserveAspectRatio="none" aria-hidden>
      {hs.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 8.6}
          y={18 - h}
          width={6}
          height={h}
          rx={1.4}
          fill={i >= 5 ? TEAL : "#9fe3da"}
          style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.05 }}
        />
      ))}
    </svg>
  )
}

function SparkSegments() {
  return (
    <svg viewBox="0 0 60 18" preserveAspectRatio="none" aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <motion.rect
          key={i}
          x={i * 8.6}
          y={6}
          width={6.4}
          height={6}
          rx={3}
          fill={i < 5 ? AMBER : "#f6e4c4"}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.3 + i * 0.05 }}
        />
      ))}
    </svg>
  )
}

function SparkStacked() {
  return (
    <svg viewBox="0 0 60 18" preserveAspectRatio="none" aria-hidden>
      <rect x="0" y="6" width="60" height="6" rx="3" fill="#e7eaef" />
      <motion.rect
        x="0"
        y="6"
        width="51"
        height="6"
        rx="3"
        fill="#86efac"
        style={{ transformOrigin: "left", transformBox: "fill-box" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
      <motion.rect
        x="0"
        y="6"
        width="38"
        height="6"
        rx="3"
        fill={GREEN}
        style={{ transformOrigin: "left", transformBox: "fill-box" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </svg>
  )
}

/* ── dashboard ── */

function HeroDashboard() {
  const kpis = [
    { l: "Facturación del mes", v: <Counter value={1.24} decimals={2} prefix="$ " suffix=" M" />, d: "+14%", up: true, chart: <SparkArea /> },
    { l: "Pedidos", v: <Counter value={872} />, d: "+9%", up: true, chart: <SparkBars /> },
    { l: "Ticket promedio", v: <Counter value={2480} prefix="$ " />, d: "-2%", up: false, chart: <SparkSegments /> },
    { l: "Horas ahorradas", v: <Counter value={146} />, d: "+22%", up: true, chart: <SparkStacked /> },
  ]

  return (
    <div className="hdash">
      {/* barra lateral */}
      <aside className="side">
        <div className="brand">
          <i />
          <b>Operación</b>
        </div>

        {navGroups.map((g) => (
          <div key={g.title}>
            <p className="grp">{g.title}</p>
            <div className="nav">
              {g.items.map((n) => (
                <span key={n} className={n === "Resumen" ? "on" : undefined}>
                  <i />
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="foot">
          <span className="av" />
          <div style={{ minWidth: 0 }}>
            <b>Martina R.</b>
            <em>Administración</em>
          </div>
        </div>
      </aside>

      {/* contenido */}
      <div className="main">
        <div className="top">
          <div style={{ minWidth: 0 }}>
            <h3>Resumen de operación</h3>
            <p className="sub">Actualizado hace 2 minutos</p>
          </div>
          <span className="sp" />
          <span className="search">Buscar pedido, cliente…</span>
          <span className="avat" />
        </div>

        {/* metricas */}
        <motion.div
          className="kpis"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {kpis.map((k) => (
            <motion.div key={k.l} className="kpi" variants={item}>
              <p className="l">{k.l}</p>
              <p className="v">
                <b>{k.v}</b>
                <span className={k.up ? "chip up" : "chip dn"}>{k.d}</span>
              </p>
              {k.chart}
            </motion.div>
          ))}
        </motion.div>

        {/* grafico y reparto */}
        <div className="mid">
          <motion.div
            className="panel"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.2 }}
          >
            <div className="ph">
              <b>Facturación</b>
              <span className="sp" />
              <span className="leg">
                <i style={{ background: INDIGO }} />
                2026
              </span>
              <span className="leg">
                <i style={{ background: "#dfe3e9" }} />
                2025
              </span>
            </div>

            <div className="chartwrap">
              <svg viewBox="0 0 240 86" preserveAspectRatio="none" aria-hidden>
                {[20, 40, 60].map((y) => (
                  <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#f2f4f7" />
                ))}
                <line x1="0" y1="80" x2="240" y2="80" stroke="#e7eaef" />

                {prev.map((h, i) => (
                  <motion.rect
                    key={`p${i}`}
                    x={8 + i * 32}
                    y={80 - h}
                    width={9}
                    height={h}
                    rx={2}
                    fill="#dfe3e9"
                    style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.07 }}
                  />
                ))}

                {curr.map((h, i) => (
                  <motion.rect
                    key={`c${i}`}
                    x={19 + i * 32}
                    y={80 - h}
                    width={9}
                    height={h}
                    rx={2}
                    fill={INDIGO}
                    style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.07 }}
                  />
                ))}
              </svg>
            </div>

            <div className="xaxis">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="panel"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.3 }}
          >
            <div className="ph">
              <b>Por canal</b>
              <span className="sp" />
              <span className="tag">Mes</span>
            </div>

            <div className="donut">
              <motion.div
                className="ring"
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.5 }}
              >
                <span>
                  <Counter value={872} />
                </span>
              </motion.div>
            </div>

            <div className="legs">
              <div>
                <i style={{ background: INDIGO }} />
                Tienda online<b>48%</b>
              </div>
              <div>
                <i style={{ background: TEAL }} />
                Redes<b>33%</b>
              </div>
              <div>
                <i style={{ background: AMBER }} />
                Local<b>19%</b>
              </div>
            </div>
          </motion.div>
        </div>

        {/* tabla */}
        <motion.div
          className="tbl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.4 }}
        >
          <div className="ph">
            <b>Últimos pedidos</b>
            <span className="sp" />
            <span className="tag">Ver todos</span>
          </div>

          <table>
            <tbody>
              {orders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 26,
                    delay: 0.55 + i * 0.08,
                  }}
                >
                  <td className="b">{o.id}</td>
                  <td>{o.who}</td>
                  <td>{o.ch}</td>
                  <td>
                    <span className={`st ${o.st}`}>{stLabel[o.st]}</span>
                  </td>
                  <td className="n">{o.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
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

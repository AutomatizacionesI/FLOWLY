/* ─────────────────────────────────────────────
   Hero · MacBook Pro 14 con un dashboard en pantalla.
   El marco esta hecho en CSS en vez de importado como imagen: pesa
   nada, se ve nitido en cualquier densidad y el contenido de la
   pantalla es DOM real, asi que se puede animar.
   Proporciones del equipo real: tapa 1.41:1, pantalla 16:10.4, notch
   centrado y base mas ancha que la tapa.

   El dashboard es deliberadamente escueto: pocos elementos y grandes.
   A este tamano, meter mucho lo vuelve ilegible.
   ───────────────────────────────────────────── */

import { motion, useReducedMotion } from "motion/react"

const INK = "#131a26"
const MUTE = "#9aa3b0"
const LINE = "#edf0f4"
const INDIGO = "#5b5bd6"
const GREEN = "#22c55e"

const viewport = { once: true, amount: 0.2 } as const

/* ── marco ── */

function MacbookFrame({ children }: { children: React.ReactNode }) {
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
          className="relative aspect-[16/10.4] overflow-hidden rounded-[8px] bg-[#f7f8fa] sm:rounded-[10px]"
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

/* ── dashboard ── */

function HeroDashboard() {
  const reduced = useReducedMotion()

  const nav = ["Resumen", "Pedidos", "Stock", "Reportes"]
  const area = "0,52 30,42 60,46 90,28 120,34 150,17 180,24 210,6"
  const months = ["Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct"]

  return (
    <div className="flex h-full w-full" style={{ background: "#f7f8fa" }}>
      {/* sidebar */}
      <aside
        className="flex w-[54px] shrink-0 flex-col border-r bg-white px-1.5 py-2 sm:w-[72px] sm:px-2 sm:py-2.5"
        style={{ borderColor: LINE }}
      >
        <div className="mb-2.5 flex items-center gap-1.5 px-0.5">
          <span
            className="size-[9px] shrink-0 rounded-[3px] sm:size-[11px]"
            style={{ background: INK }}
          />
          <span
            className="truncate text-[6px] font-semibold tracking-[-0.02em] sm:text-[8px]"
            style={{ color: INK }}
          >
            Operación
          </span>
        </div>

        <div className="flex flex-col gap-[2px]">
          {nav.map((n, i) => (
            <span
              key={n}
              className="truncate rounded-[4px] px-1.5 py-[3px] text-[6px] font-medium sm:text-[7.5px]"
              style={i === 0 ? { background: "#f1f3f7", color: INK } : { color: MUTE }}
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1 px-0.5">
          <motion.span
            className="size-[4px] shrink-0 rounded-full"
            style={{ background: GREEN }}
            animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="truncate text-[5.5px] sm:text-[6.5px]" style={{ color: MUTE }}>
            En vivo
          </span>
        </div>
      </aside>

      {/* contenido */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-2 pt-[13px] sm:gap-2.5 sm:p-3 sm:pt-[17px]">
        {/* encabezado */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="truncate text-[9px] font-semibold tracking-[-0.03em] sm:text-[12px]"
              style={{ color: INK }}
            >
              Resumen de operación
            </p>
            <p className="mt-[1px] text-[5.5px] sm:text-[7px]" style={{ color: MUTE }}>
              Actualizado hace 2 minutos
            </p>
          </div>
          <span
            className="size-[13px] shrink-0 rounded-full sm:size-[17px]"
            style={{ background: "linear-gradient(140deg,#c7d2fe,#5b5bd6)" }}
          />
        </div>

        {/* dos metricas */}
        <div className="flex gap-2 sm:gap-2.5">
          {[
            { l: "Ingresos del mes", v: "$ 1,24 M", d: "+14%" },
            { l: "Horas ahorradas", v: "146", d: "+22%" },
          ].map((k, i) => (
            <motion.div
              key={k.l}
              className="min-w-0 flex-1 rounded-[7px] border bg-white px-2 py-1.5 sm:px-2.5 sm:py-2"
              style={{ borderColor: LINE }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.1 + i * 0.08 }}
            >
              <p className="truncate text-[6px] sm:text-[7.5px]" style={{ color: MUTE }}>
                {k.l}
              </p>
              <div className="mt-[3px] flex items-baseline gap-1.5">
                <span
                  className="text-[12px] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[16px]"
                  style={{ color: INK }}
                >
                  {k.v}
                </span>
                <span
                  className="rounded-full px-1 py-[1px] text-[5.5px] font-semibold sm:text-[6.5px]"
                  style={{ color: "#15803d", background: "#dcfce7" }}
                >
                  {k.d}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* grafico */}
        <motion.div
          className="relative flex min-h-0 flex-1 flex-col rounded-[7px] border bg-white px-2 py-1.5 sm:px-2.5 sm:py-2"
          style={{ borderColor: LINE }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.26 }}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[7px] font-semibold tracking-[-0.02em] sm:text-[9px]"
              style={{ color: INK }}
            >
              Facturación
            </span>
            <span className="flex items-center gap-1">
              <span className="size-[4px] rounded-full" style={{ background: INDIGO }} />
              <span className="text-[5.5px] sm:text-[7px]" style={{ color: MUTE }}>
                2026
              </span>
            </span>
          </div>

          <div className="relative mt-1 min-h-0 flex-1">
            <svg
              viewBox="0 0 210 58"
              preserveAspectRatio="none"
              className="h-full min-h-[46px] w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="hero_area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={INDIGO} stopOpacity="0.24" />
                  <stop offset="100%" stopColor={INDIGO} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[14, 29, 44].map((y) => (
                <line key={y} x1="0" y1={y} x2="210" y2={y} stroke="#f2f4f7" strokeWidth="1" />
              ))}

              <motion.polygon
                points={`${area} 210,58 0,58`}
                fill="url(#hero_area)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewport}
                transition={{ duration: 0.7, delay: 0.9 }}
              />
              <motion.polyline
                points={area}
                fill="none"
                stroke={INDIGO}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewport}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              />
            </svg>

            {/* punto destacado con su burbuja */}
            <motion.div
              className="absolute"
              style={{ left: "71%", top: "22%" }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ type: "spring", stiffness: 340, damping: 20, delay: 1.5 }}
            >
              <span
                className="block size-[5px] rounded-full ring-2 sm:size-[6px]"
                style={{ background: INDIGO, boxShadow: "0 0 0 2.5px #fff" }}
              />
              <span
                className="absolute bottom-[9px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] px-1.5 py-[2px] text-[5.5px] font-medium sm:text-[7px]"
                style={{ background: INK, color: "#fff" }}
              >
                Set · $ 1,18 M
              </span>
            </motion.div>
          </div>

          <div className="mt-1 flex justify-between">
            {months.map((m) => (
              <span key={m} className="text-[5px] sm:text-[6.5px]" style={{ color: MUTE }}>
                {m}
              </span>
            ))}
          </div>
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

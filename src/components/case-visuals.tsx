/* ─────────────────────────────────────────────
   Case visuals — simulaciones de los sistemas que construimos.
   Animadas con Motion (motion/react), no con keyframes de CSS: los
   numeros cuentan hasta su valor, las filas entran escalonadas con
   resorte y los trazos se dibujan al entrar en pantalla.
   Paleta propia, distinta a la de la landing, para que se lean como
   producto. No son capturas: son mockups, sin datos de clientes.
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

const INK = "#1c2434"
const MUTE = "#8a93a4"
const BODY = "#445063"
const LINE = "#e9ecf1"
const CANVAS = "#f6f7f9"
const D_LINE = "#232a36"
const D_CARD = "#1b2230"

const INDIGO = "#5b5bd6"
const TEAL = "#14b8a6"
const AMBER = "#f59e0b"
const GREEN = "#22c55e"

/* ── movimiento compartido ── */

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 7 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
}

const viewport = { once: true, amount: 0.15 } as const

function Stagger({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  )
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

/* Punto que late, para marcar "en vivo". */
function LiveDot({ color, size = 5 }: { color: string; size?: number }) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      className="inline-block rounded-full"
      style={{ width: size, height: size, background: color }}
      animate={reduced ? undefined : { opacity: [1, 0.35, 1], scale: [1, 0.78, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

/* ── chrome compartido ── */

function Window({
  app,
  nav,
  active,
  tone = "light",
  children,
}: {
  app: string
  nav: string[]
  active: number
  tone?: "light" | "dark"
  children: ReactNode
}) {
  const dark = tone === "dark"

  return (
    <div
      className="flex h-full min-h-[270px] overflow-hidden rounded-[1.25rem] border"
      style={{
        borderColor: dark ? D_LINE : LINE,
        background: dark ? "#141922" : CANVAS,
      }}
    >
      <aside
        className="hidden w-[132px] shrink-0 flex-col gap-1 border-r p-3 sm:flex"
        style={{
          borderColor: dark ? D_LINE : LINE,
          background: dark ? "#10151d" : "#fff",
        }}
      >
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="size-[18px] rounded-md"
            style={{ background: dark ? GREEN : INK }}
          />
          <span
            className="text-[0.7rem] font-semibold tracking-[-0.01em]"
            style={{ color: dark ? "#e8ecf3" : INK }}
          >
            {app}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <span
              key={item}
              className="rounded-lg px-2 py-[6px] text-[0.66rem] font-medium"
              style={
                i === active
                  ? {
                      background: dark ? D_CARD : "#f1f3f7",
                      color: dark ? "#e8ecf3" : INK,
                    }
                  : { color: MUTE }
              }
            >
              {item}
            </span>
          ))}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 sm:p-4">
        {children}
      </div>
    </div>
  )
}

function Card({
  title,
  action,
  dark = false,
  children,
}: {
  title: string
  action?: string
  dark?: boolean
  children: ReactNode
}) {
  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col rounded-xl border px-3 py-2.5"
      style={{
        borderColor: dark ? D_LINE : LINE,
        background: dark ? D_CARD : "#fff",
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[0.68rem] font-semibold tracking-[-0.01em]"
          style={{ color: dark ? "#e8ecf3" : INK }}
        >
          {title}
        </span>
        {action ? (
          <span
            className="rounded-md border px-1.5 py-[2px] text-[0.56rem] font-medium"
            style={{ borderColor: dark ? "#2b3444" : LINE, color: MUTE }}
          >
            {action}
          </span>
        ) : null}
      </div>
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.div>
  )
}

function Pill({ text, tone }: { text: string; tone: "ok" | "warn" | "idle" }) {
  const map = {
    ok: { c: "#15803d", b: "#dcfce7" },
    warn: { c: "#b45309", b: "#fef3c7" },
    idle: { c: "#64748b", b: "#eef1f5" },
  }[tone]

  return (
    <span
      className="shrink-0 rounded-full px-2 py-[2px] text-[0.58rem] font-semibold"
      style={{ color: map.c, background: map.b }}
    >
      {text}
    </span>
  )
}

function Row({
  left,
  right,
  dark = false,
}: {
  left: string
  right: ReactNode
  dark?: boolean
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between gap-3 border-t py-[7px] first:border-t-0"
      style={{ borderColor: dark ? D_LINE : "#f1f3f7" }}
    >
      <span
        className="min-w-0 flex-1 truncate text-[0.68rem]"
        style={{ color: dark ? "#c7cfdb" : BODY }}
      >
        {left}
      </span>
      {right}
    </motion.div>
  )
}

function Metric({
  label,
  children,
  color = INK,
}: {
  label: string
  children: ReactNode
  color?: string
}) {
  return (
    <div>
      <p className="text-[0.58rem] font-medium" style={{ color: MUTE }}>
        {label}
      </p>
      <p
        className="mt-0.5 text-[1.3rem] font-semibold leading-none tracking-[-0.04em] tabular-nums"
        style={{ color }}
      >
        {children}
      </p>
    </div>
  )
}

/* Barra que se llena de izquierda a derecha. */
function Fill({
  pct,
  color,
  delay = 0,
  track = "#eef1f5",
}: {
  pct: number
  color: string
  delay?: number
  track?: string
}) {
  return (
    <div
      className="h-[5px] w-full overflow-hidden rounded-full"
      style={{ background: track }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: pct / 100 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </div>
  )
}

/* ── 1. Inmobiliaria · calendario de vencimientos ── */

export function RentalsVisual() {
  const reduced = useReducedMotion()
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const marks: Record<number, string> = {
    4: GREEN,
    9: GREEN,
    17: AMBER,
    26: "#f43f5e",
  }

  return (
    <Window
      app="Alquileres"
      nav={["Calendario", "Contratos", "Propiedades", "Cobranzas"]}
      active={0}
    >
      <Card title="Octubre · vencimientos" action="Mes">
        <motion.div
          className="grid grid-cols-[repeat(10,minmax(0,1fr))] gap-[3px] sm:grid-cols-[repeat(16,minmax(0,1fr))]"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.012 } } }}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {days.map((d) => (
            <motion.span
              key={d}
              variants={{
                hidden: { opacity: 0, scale: 0.7 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", stiffness: 420, damping: 24 },
                },
              }}
              className="relative flex aspect-square items-center justify-center rounded-[4px] text-[0.5rem] font-medium"
              style={{
                background: marks[d] ? `${marks[d]}1f` : "#f4f6f8",
                color: marks[d] ? INK : "#b4bcc8",
              }}
            >
              {d}
              {marks[d] ? (
                <span className="absolute bottom-[2px]">
                  <LiveDot color={marks[d]} size={3} />
                </span>
              ) : null}
            </motion.span>
          ))}
        </motion.div>

        <div className="mt-2.5 flex items-center gap-3">
          <motion.span
            className="h-[22px] w-[2px] rounded-full"
            style={{ background: INDIGO }}
            animate={reduced ? undefined : { x: [0, 14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[0.6rem]" style={{ color: MUTE }}>
            Hoy · <Counter value={4} /> vencimientos en los próximos 30 días
          </span>
        </div>
      </Card>

      <Card title="Acciones automáticas">
        <Stagger className="flex flex-col">
          <Row left="Pocitos · renovación enviada" right={<Pill text="Hecho" tone="ok" />} />
          <Row left="Carrasco · recordatorio día 17" right={<Pill text="Programado" tone="idle" />} />
          <Row left="Centro · sin respuesta" right={<Pill text="Escalado" tone="warn" />} />
        </Stagger>
      </Card>
    </Window>
  )
}

/* ── 2. Conciliación · cruce de dos columnas ── */

export function ReconciliationVisual() {
  const pairs = [
    { bank: "Transf. 04/10", doc: "FC A-1204", ok: true },
    { bank: "Débito 07/10", doc: "FC A-1211", ok: true },
    { bank: "Depósito 11/10", doc: "FC A-1219", ok: true },
    { bank: "Transf. 14/10", doc: "sin match", ok: false },
  ]

  return (
    <Window
      app="Finanzas"
      nav={["Movimientos", "Conciliación", "Diferencias", "Cierre"]}
      active={1}
    >
      <Card title="Cruce automático" action="1.240 mov.">
        <div className="flex flex-1 items-center gap-2">
          <Stagger className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {pairs.map((p) => (
              <motion.div
                key={p.bank}
                variants={itemVariants}
                className="truncate rounded-md border px-2 py-[5px] text-[0.62rem]"
                style={{ borderColor: LINE, color: BODY }}
              >
                {p.bank}
              </motion.div>
            ))}
          </Stagger>

          <div className="flex shrink-0 flex-col gap-[5px]">
            {pairs.map((p, i) => (
              <div key={p.bank} className="flex h-[26px] items-center">
                <motion.span
                  className="block h-[1.5px] w-5 origin-left"
                  style={{ background: p.ok ? GREEN : "#e2e6eb" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.45,
                    delay: 0.35 + i * 0.18,
                    ease: "easeOut",
                  }}
                />
              </div>
            ))}
          </div>

          <Stagger className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {pairs.map((p) => (
              <motion.div
                key={p.doc}
                variants={itemVariants}
                className="truncate rounded-md border px-2 py-[5px] text-[0.62rem]"
                style={{
                  borderColor: p.ok ? "#cdebd8" : "#fde3c7",
                  background: p.ok ? "#f2fbf5" : "#fff8ef",
                  color: p.ok ? "#15803d" : "#b45309",
                }}
              >
                {p.doc}
              </motion.div>
            ))}
          </Stagger>
        </div>
      </Card>

      <div
        className="flex items-end justify-between gap-4 rounded-xl border px-3 py-2.5"
        style={{ borderColor: LINE, background: "#fff" }}
      >
        <Metric label="Conciliados" color={INDIGO}>
          <Counter value={1198} />
        </Metric>
        <Metric label="A revisar" color={AMBER}>
          <Counter value={42} />
        </Metric>
        <div className="min-w-0 flex-1">
          <Fill pct={96} color={INDIGO} delay={0.2} />
          <p className="mt-1.5 text-[0.58rem]" style={{ color: MUTE }}>
            <Counter value={96} suffix="%" /> del cierre resuelto sin intervención
          </p>
        </div>
      </div>
    </Window>
  )
}

/* ── 3. Asistente · conversación ── */

export function AssistantVisual() {
  const reduced = useReducedMotion()

  return (
    <Window
      app="Asistente"
      nav={["Consultas", "Documentos", "Procesos", "Historial"]}
      active={0}
    >
      <div
        className="flex min-h-0 flex-1 flex-col justify-end gap-2 rounded-xl border px-3 py-3"
        style={{ borderColor: LINE, background: "#fff" }}
      >
        <motion.div
          className="ml-auto max-w-[78%] rounded-2xl rounded-br-md px-3 py-2 text-[0.72rem] leading-5"
          style={{ background: INDIGO, color: "#fff" }}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          ¿Cómo se imputa una factura de exterior?
        </motion.div>

        <motion.div
          className="max-w-[86%] rounded-2xl rounded-bl-md border px-3 py-2 text-[0.72rem] leading-5"
          style={{ borderColor: LINE, background: "#fafbfc", color: BODY }}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.5 }}
        >
          Va a la cuenta 6.2.1 con retención. Según el procedimiento interno,
          primero cargás el comprobante y después el formulario.
        </motion.div>

        <Stagger className="flex flex-wrap items-center gap-1.5">
          <motion.span
            variants={itemVariants}
            className="text-[0.56rem] font-medium"
            style={{ color: MUTE }}
          >
            Fuentes
          </motion.span>
          {["Procedimiento interno.pdf", "Plan de cuentas"].map((src) => (
            <motion.span
              key={src}
              variants={itemVariants}
              className="rounded-md px-1.5 py-[2px] text-[0.56rem] font-medium"
              style={{ background: "#eef1f5", color: BODY }}
            >
              {src}
            </motion.span>
          ))}
        </Stagger>

        <div className="flex items-center gap-[4px] pl-1 pt-1">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="size-[4px] rounded-full"
              style={{ background: INDIGO }}
              animate={reduced ? undefined : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: d * 0.18,
              }}
            />
          ))}
          <span className="ml-1.5 text-[0.56rem]" style={{ color: MUTE }}>
            escribiendo
          </span>
        </div>
      </div>
    </Window>
  )
}

/* ── 4. Base conectada · consola (oscuro) ── */

export function DatabaseVisual() {
  const reduced = useReducedMotion()

  return (
    <Window
      app="Base"
      nav={["Consola", "Tablas", "Automatizaciones", "Equipo"]}
      active={0}
      tone="dark"
    >
      <div
        className="rounded-xl border px-3 py-2.5"
        style={{ borderColor: D_LINE, background: D_CARD }}
      >
        <p className="text-[0.56rem] font-medium" style={{ color: MUTE }}>
          Pregunta
        </p>
        <p className="mt-1 text-[0.72rem] leading-5" style={{ color: "#e8ecf3" }}>
          ¿Qué propiedades quedaron sin visita esta semana?
        </p>

        <p className="mt-2.5 text-[0.56rem] font-medium" style={{ color: MUTE }}>
          SQL generado
        </p>
        <motion.code
          className="mt-1 block overflow-hidden whitespace-nowrap font-mono text-[0.62rem]"
          style={{ color: GREEN }}
          initial={reduced ? undefined : { width: 0 }}
          whileInView={reduced ? undefined : { width: "100%" }}
          viewport={viewport}
          transition={{ duration: 1.5, ease: "linear", delay: 0.3 }}
        >
          select * from propiedades where ultima_visita &lt; now() - 5
        </motion.code>
      </div>

      <Card title="Resultado" action="3 filas" dark>
        <Stagger className="flex flex-col">
          <Row dark left="Pocitos · 2 amb." right={<Pill text="6 días" tone="warn" />} />
          <Row dark left="Carrasco · casa" right={<Pill text="8 días" tone="warn" />} />
          <Row dark left="Centro · oficina" right={<Pill text="11 días" tone="warn" />} />
        </Stagger>
        <div
          className="mt-2 flex items-center gap-2 border-t pt-2"
          style={{ borderColor: D_LINE }}
        >
          <LiveDot color={GREEN} />
          <span className="text-[0.6rem]" style={{ color: MUTE }}>
            Tarea creada para el equipo comercial
          </span>
        </div>
      </Card>
    </Window>
  )
}

/* ── 5. Rendimiento · gráfico de área ── */

export function DashboardVisual() {
  const pts = "0,54 32,44 64,49 96,30 128,36 160,18 192,26 224,8"

  return (
    <Window
      app="Rendimiento"
      nav={["Resumen", "Ventas", "Operación", "Reportes"]}
      active={0}
    >
      <Card title="Ingresos · últimos 8 meses" action="2026">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-end gap-6">
            <Metric label="Este mes">
              <Counter value={1.24} decimals={2} prefix="$ " suffix=" M" />
            </Metric>
            <Metric label="Variación" color="#15803d">
              <Counter value={14} prefix="+" suffix="%" />
            </Metric>
          </div>

          <svg
            viewBox="0 0 224 64"
            preserveAspectRatio="none"
            className="mt-2.5 h-[70px] w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="cv_area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={INDIGO} stopOpacity="0.28" />
                <stop offset="100%" stopColor={INDIGO} stopOpacity="0" />
              </linearGradient>
            </defs>

            {[16, 32, 48].map((y) => (
              <line key={y} x1="0" y1={y} x2="224" y2={y} stroke="#eef1f5" strokeWidth="1" />
            ))}

            <motion.polygon
              points={`${pts} 224,64 0,64`}
              fill="url(#cv_area)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.polyline
              points={pts}
              fill="none"
              stroke={INDIGO}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              cx="222"
              cy="8"
              r="3.5"
              fill={INDIGO}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 1.3 }}
            />
          </svg>

          <div className="mt-1 flex items-center justify-between">
            {["Mar", "May", "Jul", "Set"].map((m) => (
              <span key={m} className="text-[0.54rem]" style={{ color: MUTE }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Window>
  )
}

/* ── 6. Datos · pipeline de migración (oscuro) ── */

export function DataVisual() {
  const reduced = useReducedMotion()

  return (
    <Window
      app="Datos"
      nav={["Origen", "Pipeline", "Modelo", "Reportes"]}
      active={1}
      tone="dark"
    >
      <Card title="Pipeline" action="Corriendo" dark>
        <div className="flex flex-1 items-center gap-2">
          <Stagger className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {["planilla_v3.xlsx", "copia_2024.xlsx", "archivo_roto.csv"].map((f) => (
              <motion.div
                key={f}
                variants={itemVariants}
                className="truncate rounded-md border px-2 py-[5px] font-mono text-[0.58rem]"
                style={{ borderColor: D_LINE, color: MUTE }}
              >
                {f}
              </motion.div>
            ))}
          </Stagger>

          <div className="relative flex h-[62px] w-10 shrink-0 items-center">
            <span className="absolute h-[1.5px] w-full" style={{ background: D_LINE }} />
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="absolute left-0 size-[5px] rounded-full"
                style={{ background: GREEN }}
                animate={reduced ? undefined : { x: [0, 34], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: d * 0.9,
                }}
              />
            ))}
          </div>

          <Stagger className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {["produccion", "stock", "reportes"].map((t) => (
              <motion.div
                key={t}
                variants={itemVariants}
                className="truncate rounded-md border px-2 py-[5px] font-mono text-[0.58rem]"
                style={{ borderColor: "#1f4d33", background: "#13241b", color: GREEN }}
              >
                {t}
              </motion.div>
            ))}
          </Stagger>
        </div>
      </Card>

      <div
        className="flex items-end justify-between gap-4 rounded-xl border px-3 py-2.5"
        style={{ borderColor: D_LINE, background: D_CARD }}
      >
        <Metric label="Filas migradas" color="#e8ecf3">
          <Counter value={214830} />
        </Metric>
        <Metric label="Duplicados" color={GREEN}>
          <Counter value={0} />
        </Metric>
        <Metric label="Fuentes" color="#e8ecf3">
          <Counter value={11} />
        </Metric>
      </div>
    </Window>
  )
}

/* ── 7. Ventas · HIKE y Lunar Vintage ── */

/* Placeholder de marca: reemplazar por los logos reales cuando lleguen. */
const brands = [
  { name: "HIKE", color: "#1c2434", bg: "#eef1f5" },
  { name: "Lunar Vintage", color: "#7c3aed", bg: "#f3eefe" },
]

export function SalesVisual() {
  const channels = [
    { name: "Tienda online", pct: 48, c: INDIGO },
    { name: "Instagram y WhatsApp", pct: 33, c: TEAL },
    { name: "Local y mayorista", pct: 19, c: AMBER },
  ]

  const orders = [
    { id: "#2841", brand: "Lunar Vintage", amount: "$ 3.120", tone: "ok" as const },
    { id: "#2840", brand: "HIKE", amount: "$ 1.890", tone: "ok" as const },
    { id: "#2839", brand: "HIKE", amount: "$ 2.450", tone: "idle" as const },
  ]

  return (
    <Window app="Ventas" nav={["Pedidos", "Canales", "Stock", "Clientes"]} active={0}>
      <Stagger className="flex items-center gap-2">
        {brands.map((b) => (
          <motion.span
            key={b.name}
            variants={itemVariants}
            className="rounded-lg px-2.5 py-1 text-[0.64rem] font-semibold tracking-[-0.01em]"
            style={{ background: b.bg, color: b.color }}
          >
            {b.name}
          </motion.span>
        ))}
        <span className="ml-auto flex items-center gap-1.5">
          <LiveDot color={GREEN} size={5} />
          <span className="text-[0.58rem]" style={{ color: MUTE }}>
            en vivo
          </span>
        </span>
      </Stagger>

      <Card title="Pedidos entrando">
        <Stagger className="flex flex-col gap-[5px]">
          {orders.map((o, i) => (
            <motion.div
              key={o.id}
              variants={itemVariants}
              className="flex items-center justify-between gap-3 rounded-md border px-2.5 py-[6px]"
              style={{
                borderColor: LINE,
                background: i === 0 ? "#f2fbf5" : "#fff",
              }}
            >
              <span className="font-mono text-[0.6rem]" style={{ color: MUTE }}>
                {o.id}
              </span>
              <span
                className="min-w-0 flex-1 truncate text-[0.66rem] font-medium"
                style={{
                  color: brands.find((b) => b.name === o.brand)?.color ?? BODY,
                }}
              >
                {o.brand}
              </span>
              <span
                className="shrink-0 text-[0.66rem] font-semibold tabular-nums"
                style={{ color: INK }}
              >
                {o.amount}
              </span>
              <Pill text={o.tone === "ok" ? "Pago" : "Pendiente"} tone={o.tone} />
            </motion.div>
          ))}
        </Stagger>
      </Card>

      <Card title="Reparto por canal">
        <div className="flex flex-col gap-2">
          {channels.map((ch, i) => (
            <div key={ch.name}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[0.64rem]" style={{ color: BODY }}>
                  {ch.name}
                </span>
                <span
                  className="shrink-0 text-[0.62rem] font-semibold tabular-nums"
                  style={{ color: INK }}
                >
                  <Counter value={ch.pct} suffix="%" />
                </span>
              </div>
              <div className="mt-1">
                <Fill pct={ch.pct} color={ch.c} delay={i * 0.14} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Window>
  )
}

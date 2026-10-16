/* ─────────────────────────────────────────────
   Case visuals — simulaciones de los sistemas que construimos.
   Paleta propia, deliberadamente distinta a la de la landing: estos
   paneles tienen que leerse como producto, no como una seccion mas.
   Cada caso tiene su propia estructura dominante (calendario, cruce,
   chat, consola, grafico, pipeline, feed) para que no se vean iguales.
   No son capturas: son mockups fieles, sin datos de clientes.
   ───────────────────────────────────────────── */

import type { ReactNode } from "react"

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
            className="cv-live size-[18px] rounded-md"
            style={{ background: dark ? GREEN : INK }}
          />
          <span
            className="text-[0.7rem] font-semibold tracking-[-0.01em]"
            style={{ color: dark ? "#e8ecf3" : INK }}
          >
            {app}
          </span>
        </div>

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
    <div
      className="flex min-h-0 flex-1 flex-col rounded-xl border px-3 py-2.5"
      style={{
        borderColor: dark ? D_LINE : LINE,
        background: dark ? D_CARD : "#fff",
      }}
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
    </div>
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
    <div
      className="cv-row flex items-center justify-between gap-3 border-t py-[7px] first:border-t-0"
      style={{ borderColor: dark ? D_LINE : "#f1f3f7" }}
    >
      <span
        className="min-w-0 flex-1 truncate text-[0.68rem]"
        style={{ color: dark ? "#c7cfdb" : BODY }}
      >
        {left}
      </span>
      {right}
    </div>
  )
}

function Metric({
  label,
  value,
  color = INK,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div>
      <p className="text-[0.58rem] font-medium" style={{ color: MUTE }}>
        {label}
      </p>
      <p
        className="cv-value mt-0.5 text-[1.3rem] font-semibold leading-none tracking-[-0.04em] tabular-nums"
        style={{ color }}
      >
        {value}
      </p>
    </div>
  )
}

/* ── 1. Inmobiliaria · calendario de vencimientos ── */

export function RentalsVisual() {
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
        <div className="grid grid-cols-[repeat(10,minmax(0,1fr))] gap-[3px] sm:grid-cols-[repeat(16,minmax(0,1fr))]">
          {days.map((d) => (
            <span
              key={d}
              className="relative flex aspect-square items-center justify-center rounded-[4px] text-[0.5rem] font-medium"
              style={{
                background: marks[d] ? `${marks[d]}1f` : "#f4f6f8",
                color: marks[d] ? INK : "#b4bcc8",
              }}
            >
              {d}
              {marks[d] ? (
                <span
                  className="cv-live absolute bottom-[2px] size-[3px] rounded-full"
                  style={{ background: marks[d] }}
                />
              ) : null}
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-3">
          <span
            className="cv-sweep h-[22px] w-[2px] rounded-full"
            style={{ background: INDIGO }}
          />
          <span className="text-[0.6rem]" style={{ color: MUTE }}>
            Hoy · 4 vencimientos en los próximos 30 días
          </span>
        </div>
      </Card>

      <Card title="Acciones automáticas">
        <div className="cv-rows flex flex-col">
          <Row left="Pocitos · renovación enviada" right={<Pill text="Hecho" tone="ok" />} />
          <Row left="Carrasco · recordatorio día 17" right={<Pill text="Programado" tone="idle" />} />
          <Row left="Centro · sin respuesta" right={<Pill text="Escalado" tone="warn" />} />
        </div>
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
          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {pairs.map((p, i) => (
              <div
                key={p.bank}
                className="cv-row truncate rounded-md border px-2 py-[5px] text-[0.62rem]"
                style={{
                  borderColor: LINE,
                  color: BODY,
                  animationDelay: `${i * 160}ms`,
                }}
              >
                {p.bank}
              </div>
            ))}
          </div>

          <div className="flex shrink-0 flex-col gap-[5px]">
            {pairs.map((p, i) => (
              <div key={p.bank} className="flex h-[26px] items-center">
                <span
                  className={p.ok ? "cv-link block h-[1.5px] w-5" : "block h-[1.5px] w-5"}
                  style={{
                    background: p.ok ? GREEN : "#e2e6eb",
                    animationDelay: `${i * 300}ms`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {pairs.map((p, i) => (
              <div
                key={p.doc}
                className="cv-row truncate rounded-md border px-2 py-[5px] text-[0.62rem]"
                style={{
                  borderColor: p.ok ? "#cdebd8" : "#fde3c7",
                  background: p.ok ? "#f2fbf5" : "#fff8ef",
                  color: p.ok ? "#15803d" : "#b45309",
                  animationDelay: `${i * 160 + 80}ms`,
                }}
              >
                {p.doc}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div
        className="flex items-end justify-between gap-4 rounded-xl border px-3 py-2.5"
        style={{ borderColor: LINE, background: "#fff" }}
      >
        <Metric label="Conciliados" value="1.198" color={INDIGO} />
        <Metric label="A revisar" value="42" color={AMBER} />
        <div className="min-w-0 flex-1">
          <div
            className="h-[5px] w-full overflow-hidden rounded-full"
            style={{ background: "#eef1f5" }}
          >
            <div
              className="cv-fill h-full rounded-full"
              style={{ width: "96%", background: INDIGO }}
            />
          </div>
          <p className="mt-1.5 text-[0.58rem]" style={{ color: MUTE }}>
            96% del cierre resuelto sin intervención
          </p>
        </div>
      </div>
    </Window>
  )
}

/* ── 3. Asistente · conversación a pantalla completa ── */

export function AssistantVisual() {
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
        <div
          className="cv-row ml-auto max-w-[78%] rounded-2xl rounded-br-md px-3 py-2 text-[0.72rem] leading-5"
          style={{ background: INDIGO, color: "#fff", animationDelay: "120ms" }}
        >
          ¿Cómo se imputa una factura de exterior?
        </div>

        <div
          className="cv-row max-w-[86%] rounded-2xl rounded-bl-md border px-3 py-2 text-[0.72rem] leading-5"
          style={{
            borderColor: LINE,
            background: "#fafbfc",
            color: BODY,
            animationDelay: "560ms",
          }}
        >
          Va a la cuenta 6.2.1 con retención. Según el procedimiento interno,
          primero cargás el comprobante y después el formulario.
        </div>

        <div
          className="cv-row flex flex-wrap items-center gap-1.5"
          style={{ animationDelay: "900ms" }}
        >
          <span className="text-[0.56rem] font-medium" style={{ color: MUTE }}>
            Fuentes
          </span>
          {["Procedimiento interno.pdf", "Plan de cuentas"].map((src) => (
            <span
              key={src}
              className="rounded-md px-1.5 py-[2px] text-[0.56rem] font-medium"
              style={{ background: "#eef1f5", color: BODY }}
            >
              {src}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-[4px] pl-1 pt-1">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="cv-dot size-[4px] rounded-full"
              style={{ background: INDIGO, animationDelay: `${d * 180}ms` }}
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

/* ── 4. Base conectada · consola de consultas (oscuro) ── */

export function DatabaseVisual() {
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
        <code
          className="cv-type mt-1 block font-mono text-[0.62rem]"
          style={{ color: GREEN }}
        >
          select * from propiedades where ultima_visita &lt; now() - 5
        </code>
      </div>

      <Card title="Resultado" action="3 filas" dark>
        <div className="cv-rows flex flex-col">
          <Row dark left="Pocitos · 2 amb." right={<Pill text="6 días" tone="warn" />} />
          <Row dark left="Carrasco · casa" right={<Pill text="8 días" tone="warn" />} />
          <Row dark left="Centro · oficina" right={<Pill text="11 días" tone="warn" />} />
        </div>
        <div
          className="mt-2 flex items-center gap-2 border-t pt-2"
          style={{ borderColor: D_LINE }}
        >
          <span
            className="cv-live size-[5px] rounded-full"
            style={{ background: GREEN }}
          />
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
            <Metric label="Este mes" value="$ 1,24 M" />
            <Metric label="Variación" value="+14%" color="#15803d" />
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
              <line
                key={y}
                x1="0"
                y1={y}
                x2="224"
                y2={y}
                stroke="#eef1f5"
                strokeWidth="1"
              />
            ))}

            <polygon points={`${pts} 224,64 0,64`} fill="url(#cv_area)" />
            <polyline
              className="cv-draw"
              points={pts}
              fill="none"
              stroke={INDIGO}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="cv-live" cx="222" cy="8" r="3.5" fill={INDIGO} />
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
  return (
    <Window
      app="Datos"
      nav={["Origen", "Pipeline", "Modelo", "Reportes"]}
      active={1}
      tone="dark"
    >
      <Card title="Pipeline" action="Corriendo" dark>
        <div className="flex flex-1 items-center gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {["planilla_v3.xlsx", "copia_2024.xlsx", "archivo_roto.csv"].map(
              (f, i) => (
                <div
                  key={f}
                  className="cv-row truncate rounded-md border px-2 py-[5px] font-mono text-[0.58rem]"
                  style={{
                    borderColor: D_LINE,
                    color: MUTE,
                    animationDelay: `${i * 160}ms`,
                  }}
                >
                  {f}
                </div>
              )
            )}
          </div>

          <div className="relative flex h-[62px] w-10 shrink-0 items-center justify-center">
            <span
              className="absolute h-[1.5px] w-full"
              style={{ background: D_LINE }}
            />
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="cv-travel absolute left-0 size-[5px] rounded-full"
                style={{
                  background: GREEN,
                  animationDelay: `${d * 1.1}s`,
                }}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            {["produccion", "stock", "reportes"].map((t, i) => (
              <div
                key={t}
                className="cv-row truncate rounded-md border px-2 py-[5px] font-mono text-[0.58rem]"
                style={{
                  borderColor: "#1f4d33",
                  background: "#13241b",
                  color: GREEN,
                  animationDelay: `${i * 160 + 200}ms`,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div
        className="flex items-end justify-between gap-4 rounded-xl border px-3 py-2.5"
        style={{ borderColor: D_LINE, background: D_CARD }}
      >
        <Metric label="Filas migradas" value="214.830" color="#e8ecf3" />
        <Metric label="Duplicados" value="0" color={GREEN} />
        <Metric label="Fuentes" value="11" color="#e8ecf3" />
      </div>
    </Window>
  )
}

/* ── 7. Ventas · feed de pedidos y reparto por canal ── */

export function SalesVisual() {
  const channels = [
    { name: "Tienda online", pct: 48, c: INDIGO },
    { name: "Instagram y WhatsApp", pct: 33, c: TEAL },
    { name: "Local y mayorista", pct: 19, c: AMBER },
  ]

  const orders = [
    { id: "#2841", ch: "Instagram", amount: "$ 3.120", tone: "ok" as const },
    { id: "#2840", ch: "Tienda online", amount: "$ 1.890", tone: "ok" as const },
    { id: "#2839", ch: "WhatsApp", amount: "$ 2.450", tone: "idle" as const },
  ]

  return (
    <Window app="Ventas" nav={["Pedidos", "Canales", "Stock", "Clientes"]} active={0}>
      <Card title="Pedidos entrando" action="En vivo">
        <div className="flex flex-col gap-[5px]">
          {orders.map((o, i) => (
            <div
              key={o.id}
              className="cv-feed flex items-center justify-between gap-3 rounded-md border px-2.5 py-[6px]"
              style={{
                borderColor: LINE,
                background: i === 0 ? "#f2fbf5" : "#fff",
                animationDelay: `${i * 900}ms`,
              }}
            >
              <span className="font-mono text-[0.6rem]" style={{ color: MUTE }}>
                {o.id}
              </span>
              <span
                className="min-w-0 flex-1 truncate text-[0.66rem]"
                style={{ color: BODY }}
              >
                {o.ch}
              </span>
              <span
                className="shrink-0 text-[0.66rem] font-semibold tabular-nums"
                style={{ color: INK }}
              >
                {o.amount}
              </span>
              <Pill text={o.tone === "ok" ? "Pago" : "Pendiente"} tone={o.tone} />
            </div>
          ))}
        </div>
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
                  {ch.pct}%
                </span>
              </div>
              <div
                className="mt-1 h-[5px] w-full overflow-hidden rounded-full"
                style={{ background: "#eef1f5" }}
              >
                <div
                  className="cv-fill h-full rounded-full"
                  style={{
                    width: `${ch.pct}%`,
                    background: ch.c,
                    animationDelay: `${i * 220}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Window>
  )
}

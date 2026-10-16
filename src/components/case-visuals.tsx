/* ─────────────────────────────────────────────
   Case visuals — simulaciones de los sistemas que construimos.
   Paleta propia, deliberadamente distinta a la de la landing: estos
   paneles tienen que leerse como producto, no como una seccion mas.
   No son capturas: son mockups fieles, sin datos de clientes.
   ───────────────────────────────────────────── */

import type { ReactNode } from "react"

const INK = "#1c2434"
const MUTE = "#8a93a4"
const LINE = "#e9ecf1"
const CANVAS = "#f6f7f9"

/* ── chrome compartido: ventana con sidebar ── */

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
        borderColor: dark ? "#232a36" : LINE,
        background: dark ? "#141922" : CANVAS,
      }}
    >
      {/* sidebar */}
      <aside
        className="hidden w-[132px] shrink-0 flex-col gap-1 border-r p-3 sm:flex"
        style={{
          borderColor: dark ? "#232a36" : LINE,
          background: dark ? "#10151d" : "#fff",
        }}
      >
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="size-[18px] rounded-md"
            style={{ background: dark ? "#22c55e" : INK }}
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
                    background: dark ? "#1b2230" : "#f1f3f7",
                    color: dark ? "#e8ecf3" : INK,
                  }
                : { color: MUTE }
            }
          >
            {item}
          </span>
        ))}
      </aside>

      {/* contenido */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 sm:p-4">
        {children}
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  delta,
  up = true,
  dark = false,
}: {
  label: string
  value: string
  delta?: string
  up?: boolean
  dark?: boolean
}) {
  return (
    <div
      className="min-w-0 flex-1 rounded-xl border px-3 py-2.5"
      style={{
        borderColor: dark ? "#232a36" : LINE,
        background: dark ? "#1b2230" : "#fff",
      }}
    >
      <p className="truncate text-[0.6rem] font-medium" style={{ color: MUTE }}>
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span
          className="text-[1.15rem] font-semibold leading-none tracking-[-0.035em] tabular-nums"
          style={{ color: dark ? "#f2f5f9" : INK }}
        >
          {value}
        </span>
        {delta ? (
          <span
            className="rounded-full px-1.5 py-[1px] text-[0.58rem] font-semibold"
            style={{
              color: up ? "#15803d" : "#be123c",
              background: up ? "#dcfce7" : "#ffe4e6",
            }}
          >
            {delta}
          </span>
        ) : null}
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
        borderColor: dark ? "#232a36" : LINE,
        background: dark ? "#1b2230" : "#fff",
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
  mid,
  right,
  dark = false,
}: {
  left: string
  mid?: ReactNode
  right: ReactNode
  dark?: boolean
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 border-t py-[7px] first:border-t-0"
      style={{ borderColor: dark ? "#232a36" : "#f1f3f7" }}
    >
      <span
        className="min-w-0 flex-1 truncate text-[0.68rem]"
        style={{ color: dark ? "#c7cfdb" : "#445063" }}
      >
        {left}
      </span>
      {mid}
      {right}
    </div>
  )
}

function Bars({ data }: { data: { h: number; c: string }[] }) {
  return (
    <div className="flex h-full min-h-[58px] items-end gap-[5px]">
      {data.map((b, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col justify-end gap-[3px]">
          <div
            className="w-full rounded-[3px]"
            style={{ height: `${b.h}%`, background: b.c }}
          />
        </div>
      ))}
    </div>
  )
}

function Donut({ pct, color }: { pct: number; color: string }) {
  return (
    <div
      className="relative size-[62px] shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${color} ${pct * 3.6}deg, #eef1f5 0deg)`,
      }}
    >
      <div className="absolute inset-[9px] grid place-items-center rounded-full bg-white">
        <span
          className="text-[0.66rem] font-semibold tabular-nums"
          style={{ color: INK }}
        >
          {pct}%
        </span>
      </div>
    </div>
  )
}

/* ── 1. Inmobiliaria: alquileres y contratos ── */

export function RentalsVisual() {
  return (
    <Window app="Alquileres" nav={["Resumen", "Contratos", "Propiedades", "Cobranzas", "Alertas"]} active={1}>
      <div className="flex gap-2.5">
        <Kpi label="Contratos activos" value="148" delta="+6" />
        <Kpi label="Vencen este mes" value="4" />
        <Kpi label="Ocupación" value="82%" delta="+3%" />
      </div>

      <Card title="Vencimientos próximos" action="Este mes">
        <div className="flex flex-col">
          <Row left="Pocitos - 2 amb." right={<Pill text="Renovado" tone="ok" />} />
          <Row left="Carrasco - casa" right={<Pill text="Renovado" tone="ok" />} />
          <Row left="Centro - oficina" right={<Pill text="Sin respuesta" tone="warn" />} />
          <Row left="Malvin - 1 amb." right={<Pill text="Sin contactar" tone="idle" />} />
        </div>
      </Card>
    </Window>
  )
}

/* ── 2. Conciliacion bancaria ── */

export function ReconciliationVisual() {
  return (
    <Window app="Finanzas" nav={["Resumen", "Movimientos", "Conciliación", "Reportes"]} active={2}>
      <div className="flex gap-2.5">
        <Kpi label="Movimientos" value="1.240" />
        <Kpi label="Conciliados" value="1.198" delta="96%" />
        <Kpi label="A revisar" value="42" delta="-18" up={false} />
      </div>

      <div className="flex min-h-0 flex-1 gap-2.5">
        <Card title="Avance del cierre">
          <div className="flex items-center gap-3">
            <Donut pct={96} color="#5b5bd6" />
            <div className="min-w-0">
              <p className="text-[0.64rem]" style={{ color: MUTE }}>
                Cruce automático
              </p>
              <p className="text-[0.7rem] font-medium" style={{ color: INK }}>
                Listo para revisión
              </p>
            </div>
          </div>
        </Card>

        <Card title="Diferencias">
          <div className="flex flex-col">
            <Row left="Transferencia" right={<Pill text="Match" tone="ok" />} />
            <Row left="Débito automático" right={<Pill text="Match" tone="ok" />} />
            <Row left="Dif. $ 1.430" right={<Pill text="Revisar" tone="warn" />} />
          </div>
        </Card>
      </div>
    </Window>
  )
}

/* ── 3. Asistente interno con contexto ── */

export function AssistantVisual() {
  return (
    <Window app="Asistente" nav={["Consultas", "Documentos", "Procesos", "Historial"]} active={0}>
      <Card title="Consulta del equipo" action="En linea">
        <div className="flex flex-col gap-2">
          <div
            className="ml-auto max-w-[80%] rounded-2xl rounded-br-md px-3 py-2 text-[0.7rem] leading-5"
            style={{ background: "#5b5bd6", color: "#fff" }}
          >
            ¿Cómo se imputa una factura de exterior?
          </div>
          <div
            className="max-w-[86%] rounded-2xl rounded-bl-md border px-3 py-2 text-[0.7rem] leading-5"
            style={{ borderColor: LINE, background: "#fff", color: "#445063" }}
          >
            Va a la cuenta 6.2.1 con retención. Te dejo el paso a paso y el
            formulario.
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="rounded-md px-1.5 py-[2px] text-[0.56rem] font-medium"
              style={{ background: "#eef1f5", color: MUTE }}
            >
              Procedimiento interno.pdf
            </span>
            <span
              className="rounded-md px-1.5 py-[2px] text-[0.56rem] font-medium"
              style={{ background: "#eef1f5", color: MUTE }}
            >
              Plan de cuentas
            </span>
          </div>
        </div>
      </Card>

      <div className="flex gap-2.5">
        <Kpi label="Consultas hoy" value="37" delta="+12" />
        <Kpi label="Respuesta media" value="4 s" />
      </div>
    </Window>
  )
}

/* ── 4. IA conectada a la base operativa (oscuro) ── */

export function DatabaseVisual() {
  return (
    <Window
      app="Base"
      nav={["Consultas", "Tablas", "Automatizaciones", "Equipo"]}
      active={0}
      tone="dark"
    >
      <Card title="Consulta en lenguaje natural" action="SQL generado" dark>
        <p className="text-[0.7rem] leading-5" style={{ color: "#c7cfdb" }}>
          ¿Qué propiedades quedaron sin visita esta semana?
        </p>
        <div className="mt-2 flex flex-col">
          <Row dark left="Pocitos - 2 amb." right={<Pill text="6 días" tone="warn" />} />
          <Row dark left="Carrasco - casa" right={<Pill text="8 días" tone="warn" />} />
          <Row dark left="Centro - oficina" right={<Pill text="11 días" tone="warn" />} />
        </div>
      </Card>

      <div className="flex gap-2.5">
        <Kpi dark label="Registros" value="48.210" />
        <Kpi dark label="Tarea creada" value="Auto" delta="OK" />
      </div>
    </Window>
  )
}

/* ── 5. Dashboards de rendimiento ── */

export function DashboardVisual() {
  const bars = [
    { h: 48, c: "#c7d2fe" },
    { h: 66, c: "#a5b4fc" },
    { h: 42, c: "#c7d2fe" },
    { h: 80, c: "#818cf8" },
    { h: 71, c: "#a5b4fc" },
    { h: 95, c: "#5b5bd6" },
    { h: 58, c: "#c7d2fe" },
  ]

  return (
    <Window app="Rendimiento" nav={["Resumen", "Ventas", "Operación", "Reportes"]} active={0}>
      <div className="flex gap-2.5">
        <Kpi label="Ingresos del mes" value="$ 1,24 M" delta="+14%" />
        <Kpi label="Ordenes" value="872" delta="+9%" />
        <Kpi label="Margen" value="31%" delta="-2%" up={false} />
      </div>

      <div className="flex min-h-0 flex-1 gap-2.5">
        <Card title="Ultimos 7 dias" action="Semana">
          <Bars data={bars} />
        </Card>

        <Card title="Por area">
          <div className="flex flex-col">
            <Row left="Ventas" right={<span className="text-[0.66rem] font-semibold tabular-nums" style={{ color: INK }}>46%</span>} />
            <Row left="Deposito" right={<span className="text-[0.66rem] font-semibold tabular-nums" style={{ color: INK }}>31%</span>} />
            <Row left="Administración" right={<span className="text-[0.66rem] font-semibold tabular-nums" style={{ color: INK }}>23%</span>} />
          </div>
        </Card>
      </div>
    </Window>
  )
}

/* ── 6. Reestructuracion de base de datos (oscuro) ── */

export function DataVisual() {
  return (
    <Window
      app="Datos"
      nav={["Origen", "Migración", "Modelo", "Reportes"]}
      active={1}
      tone="dark"
    >
      <Card title="Migración" action="Completa" dark>
        <div className="flex flex-col">
          <Row dark left="planilla_v3.xlsx" right={<Pill text="Migrado" tone="ok" />} />
          <Row dark left="planilla_final.xlsx" right={<Pill text="Migrado" tone="ok" />} />
          <Row dark left="copia_2024.xlsx" right={<Pill text="Duplicado" tone="idle" />} />
          <Row dark left="archivo_roto.csv" right={<Pill text="Corregido" tone="warn" />} />
        </div>
      </Card>

      <div className="flex gap-2.5">
        <Kpi dark label="Filas migradas" value="214.830" />
        <Kpi dark label="Duplicados" value="0" delta="-3.1k" />
        <Kpi dark label="Reportes" value="Auto" />
      </div>
    </Window>
  )
}

/* ── 7. Sistema de ventas centralizado (HIKE / Lunar Vintage) ── */

export function SalesVisual() {
  const channels: { name: string; pct: number; c: string }[] = [
    { name: "Tienda online", pct: 48, c: "#5b5bd6" },
    { name: "Instagram y WhatsApp", pct: 33, c: "#14b8a6" },
    { name: "Local y mayorista", pct: 19, c: "#f59e0b" },
  ]

  return (
    <Window app="Ventas" nav={["Resumen", "Pedidos", "Stock", "Clientes", "Canales"]} active={0}>
      <div className="flex gap-2.5">
        <Kpi label="Ventas del mes" value="312" delta="+18%" />
        <Kpi label="Ticket promedio" value="$ 2.480" delta="+9%" />
        <Kpi label="Sin despachar" value="7" />
      </div>

      <div className="flex min-h-0 flex-1 gap-2.5">
        <Card title="Canales conectados">
          <div className="flex flex-col gap-2">
            {channels.map((ch) => (
              <div key={ch.name}>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[0.66rem]" style={{ color: "#445063" }}>
                    {ch.name}
                  </span>
                  <span
                    className="shrink-0 text-[0.64rem] font-semibold tabular-nums"
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
                    className="h-full rounded-full"
                    style={{ width: `${ch.pct}%`, background: ch.c }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Stock" action="Sincronizado">
          <div className="flex flex-col">
            <Row left="Campera oversize" right={<Pill text="12" tone="ok" />} />
            <Row left="Buzo cuello alto" right={<Pill text="3" tone="warn" />} />
            <Row left="Pantalón cargo" right={<Pill text="27" tone="ok" />} />
          </div>
        </Card>
      </div>
    </Window>
  )
}

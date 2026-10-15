/* ─────────────────────────────────────────────
   Case visuals — simulaciones de los sistemas que construimos.
   Paneles oscuros estilo producto real sobre la tarjeta clara del caso.
   No son capturas: son mockups fieles, sin datos de clientes.
   ───────────────────────────────────────────── */

import type { ReactNode } from "react"

/* ── primitivas compartidas ── */

function Frame({
  label,
  meta,
  children,
}: {
  label: string
  meta?: string
  children: ReactNode
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950 p-4 text-white lg:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,226,143,0.16),transparent_55%)]"
      />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--brand)] opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[var(--brand)]" />
          </span>
          <span className="text-[0.64rem] uppercase tracking-[0.2em] text-white/55">
            {label}
          </span>
        </div>
        {meta ? (
          <span className="text-[0.64rem] uppercase tracking-[0.16em] text-white/32">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="relative mt-4 flex flex-1 flex-col gap-2.5">{children}</div>
    </div>
  )
}

function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-2.5">
      {children}
    </div>
  )
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "brand"
}) {
  return (
    <Tile>
      <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <p
        className={[
          "mt-1 text-[1.35rem] font-medium leading-none tracking-[-0.04em] tabular-nums",
          tone === "brand" ? "text-[var(--brand)]" : "text-white",
        ].join(" ")}
      >
        {value}
      </p>
    </Tile>
  )
}

function Line({
  left,
  right,
  state,
}: {
  left: string
  right: string
  state?: "ok" | "warn" | "idle"
}) {
  const dot =
    state === "ok"
      ? "bg-[var(--brand)]"
      : state === "warn"
        ? "bg-amber-400"
        : "bg-white/25"

  return (
    <Tile>
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
          <span className="truncate text-[0.8rem] text-white/72">{left}</span>
        </span>
        <span className="shrink-0 text-[0.78rem] font-medium tabular-nums text-white/90">
          {right}
        </span>
      </div>
    </Tile>
  )
}

function Progress({ value, caption }: { value: number; caption: string }) {
  return (
    <div className="mt-auto pt-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--brand)]"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-[0.68rem] text-white/40">{caption}</p>
    </div>
  )
}

function Bubble({ from, children }: { from: "user" | "system"; children: ReactNode }) {
  return (
    <div
      className={[
        "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-6",
        from === "user"
          ? "ml-auto border border-[rgba(99,226,143,0.3)] bg-[rgba(99,226,143,0.12)] text-white/90"
          : "border border-white/10 bg-white/[0.05] text-white/75",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

/* ── 1. Inmobiliaria: alquileres y contratos ── */

export function RentalsVisual() {
  return (
    <Frame label="Panel de alquileres" meta="Simulacion">
      <div className="grid grid-cols-2 gap-2.5">
        <Stat label="Contratos activos" value="148" />
        <Stat label="Vencen este mes" value="4" tone="brand" />
      </div>
      <Line left="Renovacion enviada" right="2" state="ok" />
      <Line left="Sin respuesta hace 9 dias" right="1" state="warn" />
      <Line left="Sin contactar" right="1" state="idle" />
      <Progress value={82} caption="Ocupacion 82% - alertas automaticas activas" />
    </Frame>
  )
}

/* ── 2. Conciliacion bancaria ── */

export function ReconciliationVisual() {
  return (
    <Frame label="Conciliacion bancaria" meta="Simulacion">
      <div className="grid grid-cols-2 gap-2.5">
        <Stat label="Movimientos" value="1.240" />
        <Stat label="Conciliados" value="1.198" tone="brand" />
      </div>
      <Line left="Transferencia - proveedor" right="match" state="ok" />
      <Line left="Debito automatico" right="match" state="ok" />
      <Line left="Diferencia de $ 1.430" right="revisar" state="warn" />
      <Progress value={96} caption="42 movimientos para revision manual" />
    </Frame>
  )
}

/* ── 3. Asistente interno con contexto ── */

export function AssistantVisual() {
  return (
    <Frame label="Asistente interno" meta="Simulacion">
      <Bubble from="user">Como se imputa una factura de exterior?</Bubble>
      <Bubble from="system">
        Segun el procedimiento interno, va a la cuenta 6.2.1 con retencion.
        Te dejo el paso a paso y el formulario.
      </Bubble>
      <Bubble from="user">Generame el asiento</Bubble>
      <Bubble from="system">
        Listo. Asiento borrador creado y asignado para revision.
      </Bubble>
      <Progress value={100} caption="Conectado a documentacion y procesos internos" />
    </Frame>
  )
}

/* ── 4. IA conectada a la base operativa ── */

export function DatabaseVisual() {
  return (
    <Frame label="Consulta sobre la base" meta="Simulacion">
      <Bubble from="user">Que propiedades quedaron sin visita esta semana?</Bubble>
      <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
          Resultado
        </p>
        <div className="mt-2 space-y-1.5">
          {[
            ["Pocitos - 2 amb.", "6 dias"],
            ["Carrasco - casa", "8 dias"],
            ["Centro - oficina", "11 dias"],
          ].map(([a, b]) => (
            <div key={a} className="flex items-center justify-between gap-3">
              <span className="truncate text-[0.8rem] text-white/72">{a}</span>
              <span className="shrink-0 text-[0.76rem] tabular-nums text-[var(--brand)]">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Line left="Tarea creada para el equipo comercial" right="auto" state="ok" />
      <Progress value={100} caption="Respuesta sobre datos reales, sin salir del flujo" />
    </Frame>
  )
}

/* ── 5. Dashboards de rendimiento ── */

export function DashboardVisual() {
  const bars = [52, 68, 44, 81, 73, 95, 62]

  return (
    <Frame label="Panel de rendimiento" meta="Simulacion">
      <div className="grid grid-cols-2 gap-2.5">
        <Stat label="Ingresos del mes" value="$ 1,24 M" />
        <Stat label="Vs. mes anterior" value="+14%" tone="brand" />
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
          Ultimos 7 dias
        </p>
        <div className="mt-3 flex h-[72px] items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={[
                "flex-1 rounded-t-[3px]",
                i === bars.length - 2 ? "bg-[var(--brand)]" : "bg-white/18",
              ].join(" ")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Progress value={100} caption="Reportes automaticos, sin cargar una planilla" />
    </Frame>
  )
}

/* ── 6. Reestructuracion de base de datos ── */

export function DataVisual() {
  return (
    <Frame label="Base reestructurada" meta="Simulacion">
      <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
          Antes
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["planilla_v3", "planilla_final", "copia_2024", "archivo_roto"].map(
            (t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.68rem] text-white/45 line-through"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
      <div className="rounded-xl border border-[rgba(99,226,143,0.28)] bg-[rgba(99,226,143,0.08)] px-3.5 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--brand)]">
          Ahora
        </p>
        <div className="mt-2 space-y-1.5">
          {[
            ["produccion", "trazable"],
            ["stock", "unificado"],
            ["reportes", "automaticos"],
          ].map(([a, b]) => (
            <div key={a} className="flex items-center justify-between gap-3">
              <span className="text-[0.8rem] text-white/80">{a}</span>
              <span className="text-[0.74rem] text-white/50">{b}</span>
            </div>
          ))}
        </div>
      </div>
      <Progress value={100} caption="Una sola fuente de verdad para toda la operacion" />
    </Frame>
  )
}

/* ── 7. Sistema de ventas centralizado (HIKE / Lunar Vintage) ── */

export function SalesVisual() {
  return (
    <Frame label="Centro de ventas" meta="Simulacion">
      <div className="grid grid-cols-2 gap-2.5">
        <Stat label="Ventas del mes" value="312" />
        <Stat label="Ticket promedio" value="+9%" tone="brand" />
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
          Canales conectados
        </p>
        <div className="mt-2.5 space-y-2">
          {[
            ["Tienda online", 48],
            ["Instagram y WhatsApp", 33],
            ["Local y mayorista", 19],
          ].map(([name, pct]) => (
            <div key={name as string}>
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-[0.78rem] text-white/72">
                  {name}
                </span>
                <span className="shrink-0 text-[0.74rem] tabular-nums text-white/90">
                  {pct}%
                </span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--brand)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Line left="Stock sincronizado entre canales" right="ok" state="ok" />
      <Progress value={100} caption="Toda la venta en un solo lugar, sin planillas paralelas" />
    </Frame>
  )
}

import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  Clock3,
  ListChecks,
  Receipt,
  Scale,
  Sparkles,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Link } from "react-router-dom"

import { Gauge } from "../components/Gauge"
import { Kpi } from "../components/Kpi"
import { PageHead } from "../components/Screen"
import {
  activity,
  clientName,
  clients,
  deadlines,
  formatDay,
  people,
  personName,
} from "../data/demoData"
import {
  clientsOf,
  hoursByWeek,
  hoursByWorkType,
  hoursThisMonth,
  openTasks,
  overdueTasks,
  pendingInvoices,
  reconciliationCounts,
  totalMinutes,
} from "../data/selectors"
import { useDemo } from "../state/DemoContext"

/** Días que faltan para una fecha, en texto corto. */
function daysLeft(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  const target = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return "hoy"
  if (diff === 1) return "mañana"
  return `en ${diff} días`
}

function ChartTooltip({ unit }: { unit: string }) {
  return (
    <Tooltip
      cursor={{ stroke: "var(--d-line)" }}
      contentStyle={{
        border: "none",
        borderRadius: 12,
        boxShadow: "0 12px 30px -14px rgba(20,22,28,.4)",
        fontSize: 12,
        fontFamily: "inherit",
      }}
      formatter={(value) => [`${value} ${unit}`, ""]}
      labelStyle={{ color: "var(--d-ink-soft)", fontSize: 11, marginBottom: 2 }}
    />
  )
}

export function Resumen() {
  const { role, user, tasks, hours, invoices, movements, para } = useDemo()

  const mine = role === "contador"
  const personId = mine ? user.id : undefined

  const myClients = clientsOf(user.id)
  const clientCount = mine ? myClients.length : clients.length

  const scopedTasks = mine ? tasks.filter((task) => task.assigneeId === user.id) : tasks
  const pending = openTasks(scopedTasks).length
  const overdue = overdueTasks(scopedTasks).length

  const monthHours = hoursThisMonth(hours, personId)
  const monthHoursValue = Math.round(totalMinutes(monthHours) / 60)

  const counts = reconciliationCounts(movements)
  const autoRate = Math.round((counts.conciliado / counts.total) * 100)
  const invoicesLeft = pendingInvoices(invoices).length

  const weekly = hoursByWeek(hours, personId)
  const byType = hoursByWorkType(monthHours, personId)
  const typeTotal = byType.reduce((sum, row) => sum + row.horas, 0)

  return (
    <>
      <PageHead
        title={para ? `Hola, ${para}` : `Hola, ${user.name.split(" ")[0]}`}
        sub={
          mine
            ? "Tus clientes, tus tareas y tus horas — todo con datos de ejemplo."
            : "El estado del estudio de un vistazo — todo con datos de ejemplo."
        }
      />

      {/* ── Fila de KPIs ─────────────────────────────────────────── */}
      <div className="d-kpis">
        <Kpi
          icon={Building2}
          label={mine ? "Mis clientes" : "Clientes activos"}
          value={`${clientCount}`}
          delta={mine ? 0 : 8}
          deltaLabel={mine ? "asignados a tu equipo" : "vs. el mes pasado"}
          tone={mine ? "neutral" : "auto"}
        />
        <Kpi
          icon={ListChecks}
          label={mine ? "Mis tareas pendientes" : "Tareas pendientes"}
          value={`${pending}`}
          delta={-6}
          deltaLabel="vs. el mes pasado"
        />
        <Kpi
          icon={AlertTriangle}
          label="Tareas vencidas"
          value={`${overdue}`}
          tone="bad"
          note="hay que actuar"
        />
        <Kpi
          icon={Clock3}
          label={mine ? "Mis horas del mes" : "Horas del mes"}
          value={`${monthHoursValue}`}
          delta={12}
          deltaLabel="vs. el mes pasado"
          highlight
        />
        <Kpi
          icon={Scale}
          label="Conciliado solo"
          value={`${autoRate}%`}
          delta={5}
          deltaLabel="de los movimientos"
        />
        <Kpi
          icon={Receipt}
          label="Facturas por confirmar"
          value={`${invoicesLeft}`}
          tone="warn"
          note="esperan revisión"
        />
      </div>

      {/* ── Horas por semana + dona ──────────────────────────────── */}
      <div className="d-grid d-grid--main">
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">
                {mine ? "Tus horas por semana" : "Horas por semana"}
              </div>
              <div className="d-card__sub">Últimas 6 semanas · en horas · ejemplo</div>
            </div>
            <span className="d-chip d-chip--green">
              {weekly[weekly.length - 1]?.horas ?? 0} h esta semana
            </span>
          </div>

          <ResponsiveContainer width="100%" height={208}>
            <AreaChart data={weekly} margin={{ top: 4, right: 6, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="d-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33604a" stopOpacity={0.26} />
                  <stop offset="100%" stopColor="#33604a" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--d-ink-soft)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--d-ink-soft)" }}
                width={44}
              />
              <ChartTooltip unit="horas" />
              <Area
                type="monotone"
                dataKey="horas"
                stroke="#33604a"
                strokeWidth={2.4}
                fill="url(#d-area)"
                dot={{ r: 3, fill: "#fff", stroke: "#33604a", strokeWidth: 2 }}
                activeDot={{ r: 5 }}
                /* Sin animación de entrada: en una demo conviene que el dato
                   esté dibujado desde el primer frame. */
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Horas por tipo de trabajo</div>
              <div className="d-card__sub">Este mes · ejemplo</div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={byType}
                  dataKey="horas"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {byType.map((row) => (
                    <Cell key={row.name} fill={row.color} />
                  ))}
                </Pie>
                <ChartTooltip unit="horas" />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeContent: "center",
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              <div className="d-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em" }}>
                {typeTotal}
              </div>
              <div className="d-muted" style={{ fontSize: 10.5 }}>
                horas
              </div>
            </div>
          </div>

          <ul style={{ display: "grid", gap: 7, marginTop: 12 }}>
            {byType.slice(0, 4).map((row) => (
              <li key={row.name} className="d-row" style={{ fontSize: 12.5 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    flexShrink: 0,
                    borderRadius: 3,
                    background: row.color,
                  }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>{row.name}</span>
                <span className="d-num d-muted">{row.horas} h</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Conciliación + vencimientos + asistente ──────────────── */}
      <div className="d-grid d-grid--3">
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Conciliación del mes</div>
              <div className="d-card__sub">Movimientos emparejados solos · ejemplo</div>
            </div>
          </div>

          <Gauge value={autoRate} label={`${counts.conciliado} de ${counts.total} movimientos`} />

          <div className="d-row" style={{ marginTop: 14, gap: 6, flexWrap: "wrap" }}>
            <span className="d-chip d-chip--ok">{counts.conciliado} conciliados</span>
            <span className="d-chip d-chip--warn">{counts.sugerido} a revisar</span>
            <span className="d-chip">{counts.pendiente} pendientes</span>
          </div>

          <Link
            to="../conciliacion"
            className="d-btn d-btn--ghost d-btn--sm d-btn--block"
            style={{ marginTop: 13 }}
          >
            Abrir conciliación
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Vencimientos próximos</div>
              <div className="d-card__sub">Próximos 20 días · ejemplo</div>
            </div>
            <CalendarClock size={16} className="d-muted" />
          </div>

          <ul style={{ display: "grid", gap: 13 }}>
            {deadlines.map((item) => {
              const left = daysLeft(item.day)
              const urgent = left === "hoy" || left === "mañana"
              return (
                <li key={item.id} className="d-row" style={{ alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                    <div className="d-muted" style={{ fontSize: 11.5 }}>
                      {item.detail} · {formatDay(item.day)}
                    </div>
                  </div>
                  <span className={urgent ? "d-chip d-chip--bad" : "d-chip d-chip--warn"}>
                    {left}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div style={{ display: "grid", gap: 13, alignContent: "start" }}>
          <div className="d-card d-card--ai">
            <div className="d-row" style={{ gap: 8 }}>
              <span
                style={{
                  display: "grid",
                  width: 27,
                  height: 27,
                  placeItems: "center",
                  borderRadius: 9,
                  background: "var(--d-ai)",
                  color: "#fff",
                }}
              >
                <Sparkles size={14} />
              </span>
              <div className="d-card__title">Asistente del estudio</div>
            </div>
            <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.55, color: "#4c3fb0" }}>
              Preguntale qué vence esta semana, cuántas horas lleva un cliente o quién lo atiende.
            </p>
            <Link
              to="../asistente"
              className="d-btn d-btn--ai d-btn--sm d-btn--block"
              style={{ marginTop: 12 }}
            >
              Preguntale al asistente
            </Link>
          </div>

          <div className="d-card">
            <div className="d-card__head" style={{ marginBottom: 12 }}>
              <div>
                <div className="d-card__title">Actividad reciente</div>
                <div className="d-card__sub">En el estudio · ejemplo</div>
              </div>
            </div>
            <ul style={{ display: "grid", gap: 11 }}>
              {activity.slice(0, 4).map((item) => (
                <li key={item.id} className="d-row" style={{ alignItems: "flex-start", gap: 9 }}>
                  <span
                    style={{
                      display: "grid",
                      width: 25,
                      height: 25,
                      flexShrink: 0,
                      placeItems: "center",
                      borderRadius: 999,
                      background: "var(--d-green-soft)",
                      color: "var(--d-green)",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {people.find((person) => person.id === item.personId)?.initials}
                  </span>
                  <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                    <strong style={{ fontWeight: 600 }}>{personName(item.personId)}</strong>{" "}
                    {item.text}
                    <div className="d-muted" style={{ fontSize: 11 }}>
                      {item.when}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Clientes con más horas ───────────────────────────────── */}
      <div className="d-grid">
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Clientes con más horas este mes</div>
              <div className="d-card__sub">Horas cargadas por el equipo · ejemplo</div>
            </div>
            <Link to="../clientes" className="d-btn d-btn--quiet d-btn--sm">
              Ver todos
              <ArrowRight size={13} />
            </Link>
          </div>

          <TopClients />
        </div>
      </div>
    </>
  )
}

/** Lista "Top" con barras de progreso, como la de la referencia 2. */
function TopClients() {
  const { hours } = useDemo()
  const month = hoursThisMonth(hours)

  const totals = new Map<string, number>()
  for (const entry of month) {
    totals.set(entry.clientId, (totals.get(entry.clientId) ?? 0) + entry.minutes)
  }

  const top = [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([clientId, minutes]) => ({ clientId, horas: Math.round(minutes / 60) }))

  const max = top[0]?.horas ?? 1

  return (
    <ul style={{ display: "grid", gap: 14 }}>
      {top.map((row, index) => (
        <li key={row.clientId}>
          <div className="d-row" style={{ fontSize: 13 }}>
            <span style={{ flex: 1, minWidth: 0, fontWeight: 500 }}>
              {clientName(row.clientId)}
            </span>
            <span className="d-num d-muted">{row.horas} h</span>
          </div>
          <div className="d-bar">
            <div
              className="d-bar__fill"
              style={{
                width: `${(row.horas / max) * 100}%`,
                // El primero va en verde lleno; el resto, más suave.
                background: index === 0 ? "var(--d-green)" : "#b9ccbf",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

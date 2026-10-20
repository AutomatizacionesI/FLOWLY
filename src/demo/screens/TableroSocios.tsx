import { AlertTriangle, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Kpi } from "../components/Kpi"
import { PageHead } from "../components/Screen"
import { clientName, clients, formatHours, formatMoney, people } from "../data/demoData"
import { hoursByClient, hoursThisMonth } from "../data/selectors"
import { useDemo } from "../state/DemoContext"

export function TableroSocios() {
  const { hours, tasks } = useDemo()

  const month = hoursThisMonth(hours)
  const totalMinutes = month.reduce((sum, entry) => sum + entry.minutes, 0)

  /* ── Carga por persona ─────────────────────────────────────────── */
  const byPerson = people
    .map((person) => {
      const minutes = month
        .filter((entry) => entry.personId === person.id)
        .reduce((sum, entry) => sum + entry.minutes, 0)
      return {
        name: person.name.split(" ")[0],
        fullName: person.name,
        horas: Math.round(minutes / 60),
        abiertas: tasks.filter(
          (task) => task.assigneeId === person.id && task.status !== "hecha",
        ).length,
      }
    })
    .sort((a, b) => b.horas - a.horas)

  const busiest = byPerson[0]

  /* ── Horas contra facturación, por cliente ─────────────────────── */
  const byClient = hoursByClient(month).map(([clientId, minutes]) => {
    const client = clients.find((item) => item.id === clientId)!
    const horas = minutes / 60
    // Cuánto deja cada hora trabajada. Es el número que muestra si un cliente
    // consume más de lo que paga.
    const porHora = horas > 0 ? client.monthlyFee / horas : 0
    return {
      clientId,
      name: clientName(clientId),
      horas: Math.round(horas),
      fee: client.monthlyFee,
      porHora: Math.round(porHora),
    }
  })

  const median =
    [...byClient].sort((a, b) => a.porHora - b.porHora)[Math.floor(byClient.length / 2)]
      ?.porHora ?? 0

  // Los que quedan bastante por debajo de la mediana son los que hay que mirar.
  const watch = byClient.filter((row) => row.porHora < median * 0.7)

  const totalFee = byClient.reduce((sum, row) => sum + row.fee, 0)

  return (
    <>
      <PageHead
        title="Tablero de socios"
        sub="Dónde se va el tiempo y qué deja cada cliente · todo con datos de ejemplo"
      />

      <div className="d-kpis">
        <Kpi
          icon={TrendingUp}
          label="Horas del mes"
          value={`${Math.round(totalMinutes / 60)}`}
          delta={12}
          deltaLabel="vs. el mes pasado"
          highlight
        />
        <Kpi
          icon={TrendingUp}
          label="Facturación del mes"
          value={formatMoney(totalFee)}
          delta={6}
          deltaLabel="ejemplo"
        />
        <Kpi
          icon={TrendingUp}
          label="Promedio por hora"
          value={formatMoney(totalMinutes > 0 ? totalFee / (totalMinutes / 60) : 0)}
          note="sobre datos de ejemplo"
        />
        <Kpi
          icon={AlertTriangle}
          label="Clientes a mirar"
          value={`${watch.length}`}
          tone="warn"
          note="consumen más de lo que dejan"
        />
      </div>

      <div className="d-grid d-grid--main">
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Carga por persona</div>
              <div className="d-card__sub">Horas cargadas este mes · ejemplo</div>
            </div>
            {busiest ? (
              <span className="d-chip d-chip--warn">
                {busiest.fullName} es quien más lleva
              </span>
            ) : null}
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={byPerson} margin={{ top: 4, right: 6, bottom: 0, left: -18 }}>
              <XAxis
                dataKey="name"
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
              <Tooltip
                cursor={{ fill: "rgba(20,22,28,.04)" }}
                contentStyle={{
                  border: "none",
                  borderRadius: 12,
                  boxShadow: "0 12px 30px -14px rgba(20,22,28,.4)",
                  fontSize: 12,
                  fontFamily: "inherit",
                }}
                formatter={(value) => [`${value} horas`, ""]}
              />
              <Bar dataKey="horas" radius={[7, 7, 0, 0]} isAnimationActive={false}>
                {byPerson.map((row, index) => (
                  <Cell key={row.name} fill={index === 0 ? "#33604a" : "#b9ccbf"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <table className="d-table" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Persona</th>
                <th className="is-num">Horas</th>
                <th className="is-num">Tareas abiertas</th>
              </tr>
            </thead>
            <tbody>
              {byPerson.map((row) => (
                <tr key={row.fullName}>
                  <td style={{ fontWeight: 500 }}>{row.fullName}</td>
                  <td className="is-num">{row.horas} h</td>
                  <td className="is-num d-muted">{row.abiertas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-card" style={{ alignSelf: "start" }}>
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Clientes a mirar</div>
              <div className="d-card__sub">Dejan menos por hora que el resto · ejemplo</div>
            </div>
          </div>

          {watch.length === 0 ? (
            <p className="d-muted" style={{ fontSize: 12.5, lineHeight: 1.6 }}>
              Ninguno se despega del resto este mes.
            </p>
          ) : (
            <ul style={{ display: "grid", gap: 13 }}>
              {watch.map((row) => (
                <li key={row.clientId}>
                  <div className="d-row" style={{ fontSize: 13 }}>
                    <span style={{ flex: 1, minWidth: 0, fontWeight: 500 }}>{row.name}</span>
                    <span className="d-chip d-chip--warn">{formatMoney(row.porHora)}/h</span>
                  </div>
                  <div className="d-muted" style={{ marginTop: 3, fontSize: 11.5 }}>
                    {row.horas} h este mes · {formatMoney(row.fee)} de honorarios
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="d-muted" style={{ marginTop: 14, fontSize: 11.5, lineHeight: 1.6 }}>
            La comparación es contra la mediana del estudio. Sirve para encontrar cuellos de
            botella, no para decidir solo con el número.
          </p>
        </div>
      </div>

      <div className="d-card" style={{ marginTop: 13 }}>
        <div className="d-card__head">
          <div>
            <div className="d-card__title">Horas contra facturación, por cliente</div>
            <div className="d-card__sub">Honorarios de ejemplo · este mes</div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="d-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th className="is-num">Horas</th>
                <th className="is-num">Honorarios</th>
                <th className="is-num">Por hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {byClient.map((row) => {
                const low = row.porHora < median * 0.7
                const high = row.porHora > median * 1.3
                return (
                  <tr key={row.clientId}>
                    <td style={{ fontWeight: 500 }}>{row.name}</td>
                    <td className="is-num">{formatHours(row.horas * 60)}</td>
                    <td className="is-num">{formatMoney(row.fee)}</td>
                    <td className="is-num">{formatMoney(row.porHora)}</td>
                    <td>
                      <span
                        className={
                          low ? "d-chip d-chip--warn" : high ? "d-chip d-chip--ok" : "d-chip"
                        }
                      >
                        {low ? "consume mucho" : high ? "deja bien" : "en la media"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

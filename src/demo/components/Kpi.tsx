import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

/**
 * Tarjeta de KPI: ícono, etiqueta, número grande y chip de variación.
 * Con `highlight` queda en verde, que es la tarjeta destacada de cada pantalla
 * (una sola, si no se aplana todo).
 */
export function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  deltaLabel,
  note,
  highlight,
  tone = "auto",
}: {
  icon: LucideIcon
  label: string
  value: string
  /** Variación en porcentaje. Positiva sube, negativa baja. */
  delta?: number
  deltaLabel?: string
  note?: string
  highlight?: boolean
  /** "auto" pinta el chip por el signo; "bad" lo fuerza a rojo (vencidas, etc.). */
  tone?: "auto" | "bad" | "warn" | "neutral"
}) {
  const up = (delta ?? 0) >= 0

  const chipClass =
    tone === "bad"
      ? "d-chip d-chip--bad"
      : tone === "warn"
        ? "d-chip d-chip--warn"
        : tone === "neutral"
          ? "d-chip"
          : up
            ? "d-chip d-chip--ok"
            : "d-chip d-chip--bad"

  return (
    <div className={`d-card d-kpi${highlight ? " d-card--green" : ""}`}>
      <div className="d-kpi__top">
        <span className="d-kpi__icon">
          <Icon size={14} />
        </span>
        {label}
      </div>

      <div className="d-kpi__value d-num">{value}</div>

      <div className="d-kpi__foot">
        {delta !== undefined ? (
          <span className={highlight ? "d-chip" : chipClass}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {up ? "+" : ""}
            {delta}%
          </span>
        ) : null}
        {deltaLabel ?? note}
      </div>
    </div>
  )
}

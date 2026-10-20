/**
 * Medidor semicircular, como el de la referencia 1: arco grueso, porcentaje
 * grande en el medio y una etiqueta corta abajo.
 */
export function Gauge({
  value,
  label,
  color = "var(--d-green)",
}: {
  /** Porcentaje de 0 a 100. */
  value: number
  label: string
  color?: string
}) {
  const safe = Math.max(0, Math.min(100, value))

  // Semicírculo de radio 70 dibujado con stroke-dasharray.
  const radius = 70
  const length = Math.PI * radius

  return (
    <div style={{ display: "grid", justifyItems: "center" }}>
      <svg
        viewBox="0 0 180 104"
        style={{ width: "100%", maxWidth: 210 }}
        role="img"
        aria-label={`${label}: ${safe}%`}
      >
        <path
          d="M 20 92 A 70 70 0 0 1 160 92"
          fill="none"
          stroke="var(--d-wash)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 20 92 A 70 70 0 0 1 160 92"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(safe / 100) * length} ${length}`}
        />
        <text
          x="90"
          y="84"
          textAnchor="middle"
          style={{
            fill: "var(--d-ink)",
            fontSize: 31,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {safe}%
        </text>
      </svg>
      <div className="d-muted" style={{ marginTop: 2, fontSize: 12, textAlign: "center" }}>
        {label}
      </div>
    </div>
  )
}

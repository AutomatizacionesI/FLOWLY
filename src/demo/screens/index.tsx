import { PartnersOnly, Placeholder } from "../components/Screen"
import type { NavItem } from "../nav"

import { Resumen } from "./Resumen"

/**
 * Reparte cada ruta a su pantalla.
 *
 * Fase 1: están el esqueleto, los datos y los permisos; las pantallas en sí
 * se construyen en las fases 2 y 3, así que por ahora muestran un marcador.
 */

const notes: Record<string, string> = {
  resumen: "El tablero del estudio (KPIs, horas por semana, vencimientos y actividad) se arma en la Fase 2.",
  clientes: "La lista de 12 clientes de ejemplo con su ficha lateral se arma en la Fase 2.",
  tareas: "El tablero y la lista de tareas se arman en la Fase 2.",
  horas: "El calendario semanal para cargar horas se arma en la Fase 2.",
  conciliacion: "La conciliación bancaria con archivos de ejemplo se arma en la Fase 2.",
  extractos: "El pasaje de extracto a asientos se arma en la Fase 3.",
  facturas: "La lectura de facturas con IA se arma en la Fase 3.",
  "asientos-cfe": "Los asientos desde CFE se arman en la Fase 3.",
  "reporte-horas": "El reporte de horas se arma en la Fase 2.",
  "tablero-socios": "El tablero de socios se arma en la Fase 3.",
  "herramientas/unir-pdfs": "La herramienta para unir PDFs se arma en la Fase 3.",
  "herramientas/pdf-a-excel": "La herramienta de PDF a Excel se arma en la Fase 3.",
  asistente: "El asistente del estudio se arma en la Fase 2.",
  administracion: "La administración de usuarios, equipos y tipos de trabajo se arma en la Fase 3.",
  "trabajemos-juntos": "La página de contacto se arma en la Fase 2.",
}

/** Las pantallas ya construidas. El resto todavía muestra un marcador. */
const built: Record<string, () => React.JSX.Element> = {
  resumen: Resumen,
}

export function Screen({ item }: { item: NavItem }) {
  const Built = built[item.path]

  const screen = Built ? (
    <Built />
  ) : (
    <Placeholder title={item.label} note={notes[item.path] ?? "Pantalla en construcción."} />
  )

  return item.partnersOnly ? <PartnersOnly>{screen}</PartnersOnly> : screen
}

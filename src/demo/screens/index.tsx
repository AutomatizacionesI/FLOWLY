import { PartnersOnly } from "../components/Screen"
import type { NavItem } from "../nav"

import { Administracion } from "./Administracion"
import { AsientosCfe } from "./AsientosCfe"
import { Asistente } from "./Asistente"
import { Clientes } from "./Clientes"
import { Conciliacion } from "./Conciliacion"
import { Extractos } from "./Extractos"
import { Facturas } from "./Facturas"
import { PdfAExcel, UnirPdfs } from "./Herramientas"
import { Horas } from "./Horas"
import { ReporteHoras } from "./ReporteHoras"
import { Resumen } from "./Resumen"
import { TableroSocios } from "./TableroSocios"
import { Tareas } from "./Tareas"
import { TrabajemosJuntos } from "./TrabajemosJuntos"

/** Reparte cada ruta a su pantalla y aplica el bloqueo por rol. */
const screens: Record<string, () => React.JSX.Element> = {
  resumen: Resumen,
  clientes: Clientes,
  tareas: Tareas,
  horas: Horas,
  conciliacion: Conciliacion,
  extractos: Extractos,
  facturas: Facturas,
  "asientos-cfe": AsientosCfe,
  "reporte-horas": ReporteHoras,
  "tablero-socios": TableroSocios,
  "herramientas/unir-pdfs": UnirPdfs,
  "herramientas/pdf-a-excel": PdfAExcel,
  asistente: Asistente,
  administracion: Administracion,
  "trabajemos-juntos": TrabajemosJuntos,
}

/** true si esa ruta tiene pantalla. La usa el recorrido guiado. */
export function isBuilt(path: string): boolean {
  return path in screens
}

export function Screen({ item }: { item: NavItem }) {
  const Found = screens[item.path]
  if (!Found) return null

  const screen = <Found />
  return item.partnersOnly ? <PartnersOnly>{screen}</PartnersOnly> : screen
}

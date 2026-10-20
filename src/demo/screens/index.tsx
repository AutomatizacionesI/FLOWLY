import { Suspense, lazy, type ComponentType } from "react"

import { PartnersOnly } from "../components/Screen"
import type { NavItem } from "../nav"

/**
 * Reparte cada ruta a su pantalla y aplica el bloqueo por rol.
 *
 * Cada pantalla se carga por separado: entrar al Resumen no baja el código de
 * las facturas, y las pantallas sin gráficos no bajan la librería de gráficos.
 */
const screens: Record<string, ComponentType> = {
  resumen: lazy(() => import("./Resumen").then((m) => ({ default: m.Resumen }))),
  clientes: lazy(() => import("./Clientes").then((m) => ({ default: m.Clientes }))),
  tareas: lazy(() => import("./Tareas").then((m) => ({ default: m.Tareas }))),
  horas: lazy(() => import("./Horas").then((m) => ({ default: m.Horas }))),
  conciliacion: lazy(() => import("./Conciliacion").then((m) => ({ default: m.Conciliacion }))),
  extractos: lazy(() => import("./Extractos").then((m) => ({ default: m.Extractos }))),
  facturas: lazy(() => import("./Facturas").then((m) => ({ default: m.Facturas }))),
  "asientos-cfe": lazy(() => import("./AsientosCfe").then((m) => ({ default: m.AsientosCfe }))),
  "reporte-horas": lazy(() => import("./ReporteHoras").then((m) => ({ default: m.ReporteHoras }))),
  "tablero-socios": lazy(() => import("./TableroSocios").then((m) => ({ default: m.TableroSocios }))),
  "herramientas/unir-pdfs": lazy(() => import("./Herramientas").then((m) => ({ default: m.UnirPdfs }))),
  "herramientas/pdf-a-excel": lazy(() => import("./Herramientas").then((m) => ({ default: m.PdfAExcel }))),
  asistente: lazy(() => import("./Asistente").then((m) => ({ default: m.Asistente }))),
  administracion: lazy(() => import("./Administracion").then((m) => ({ default: m.Administracion }))),
  "trabajemos-juntos": lazy(() =>
    import("./TrabajemosJuntos").then((m) => ({ default: m.TrabajemosJuntos })),
  ),
}

/** true si esa ruta tiene pantalla. La usa el recorrido guiado. */
export function isBuilt(path: string): boolean {
  return path in screens
}

/** Mientras baja el chunk de la pantalla. Es corto: no vale un esqueleto. */
function Loading() {
  return (
    <p className="d-muted" style={{ padding: "22px 2px" }}>
      Cargando…
    </p>
  )
}

export function Screen({ item }: { item: NavItem }) {
  const Found = screens[item.path]
  if (!Found) return null

  const screen = (
    <Suspense fallback={<Loading />}>
      <Found />
    </Suspense>
  )

  return item.partnersOnly ? <PartnersOnly>{screen}</PartnersOnly> : screen
}

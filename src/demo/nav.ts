import {
  Bot,
  Building2,
  CalendarClock,
  FileSpreadsheet,
  FileStack,
  Gauge,
  Handshake,
  LayoutDashboard,
  ListChecks,
  Receipt,
  Scale,
  Settings,
  Table2,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  path: string
  label: string
  icon: LucideIcon
  /** true cuando la pantalla es solo para socios. */
  partnersOnly?: boolean
  /** true para el ítem que queremos que salte a la vista (el de contacto). */
  highlight?: boolean
}

export type NavGroup = { title?: string; items: NavItem[] }

export const navGroups: NavGroup[] = [
  // Va primero y sin titulo de grupo: al pie del menu no lo encontraba nadie.
  {
    items: [
      { path: "trabajemos-juntos", label: "Trabajemos juntos", icon: Handshake, highlight: true },
    ],
  },
  {
    title: "Gestión",
    items: [
      { path: "resumen", label: "Resumen", icon: LayoutDashboard },
      { path: "clientes", label: "Clientes", icon: Building2 },
      { path: "tareas", label: "Tareas", icon: ListChecks },
      { path: "horas", label: "Horas", icon: CalendarClock },
    ],
  },
  {
    title: "Contabilidad",
    items: [
      { path: "conciliacion", label: "Conciliación bancaria", icon: Scale },
      { path: "extractos", label: "Extractos a asientos", icon: Table2 },
      { path: "facturas", label: "Facturas con IA", icon: Receipt },
      { path: "asientos-cfe", label: "Asientos desde CFE", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Dirección",
    items: [
      { path: "reporte-horas", label: "Reporte de horas", icon: Wallet, partnersOnly: true },
      { path: "tablero-socios", label: "Tablero de socios", icon: Gauge, partnersOnly: true },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { path: "herramientas/unir-pdfs", label: "Unir PDFs", icon: FileStack },
      { path: "herramientas/pdf-a-excel", label: "PDF a Excel", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Asistente",
    items: [{ path: "asistente", label: "Asistente del estudio", icon: Bot }],
  },
  {
    title: "Administración",
    items: [
      { path: "administracion", label: "Administración", icon: Settings, partnersOnly: true },
    ],
  },
]

/** Todas las pantallas en una sola lista, para buscar y para los permisos. */
export const allNavItems: NavItem[] = navGroups.flatMap((group) => group.items)

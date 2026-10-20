/**
 * Datos de ejemplo de la demo. Todo es inventado.
 *
 * Reglas:
 * - Nada acá sale de ningún cliente real ni de ningún otro sistema.
 * - Determinista: mismo orden y mismos números en cada carga (semilla fija).
 * - Las fechas se calculan contra "hoy", así la demo nunca se ve vieja.
 */

/* ── Generador determinista (mulberry32) ───────────────────────────── */

function makeRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const random = makeRandom(20260420)

/** Entero entre min y max, ambos incluidos. */
function int(min: number, max: number) {
  return min + Math.floor(random() * (max - min + 1))
}

function pick<T>(list: readonly T[]): T {
  return list[int(0, list.length - 1)]
}

/* ── Fechas relativas a hoy ────────────────────────────────────────── */

export const TODAY = startOfDay(new Date())

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

/** Suma (o resta) días a hoy y devuelve la fecha. */
export function daysFromToday(days: number): Date {
  const date = new Date(TODAY)
  date.setDate(date.getDate() + days)
  return date
}

/** Fecha en formato ISO corto (AAAA-MM-DD), que es como se guarda acá. */
export function isoDay(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

/* ── Personas del estudio ──────────────────────────────────────────── */

export type Role = "socio" | "contador"

export type Person = {
  id: string
  name: string
  initials: string
  role: Role
  title: string
}

export const people: Person[] = [
  { id: "p1", name: "Laura Benítez", initials: "LB", role: "socio", title: "Socia" },
  { id: "p2", name: "Martín Olivera", initials: "MO", role: "socio", title: "Socio" },
  { id: "p3", name: "Sofía Ramos", initials: "SR", role: "contador", title: "Contadora" },
  { id: "p4", name: "Diego Ferrán", initials: "DF", role: "contador", title: "Contador" },
  { id: "p5", name: "Camila Vidal", initials: "CV", role: "contador", title: "Contadora" },
  { id: "p6", name: "Nicolás Pintos", initials: "NP", role: "contador", title: "Contador" },
]

/** Quién "sos" en cada vista de la demo. */
export const currentUser: Record<Role, Person> = {
  socio: people[0],
  contador: people[2],
}

export function personName(id: string): string {
  return people.find((person) => person.id === id)?.name ?? "—"
}

/* ── Tipos de trabajo ──────────────────────────────────────────────── */

export type WorkType = { id: string; name: string; color: string }

/*
 * Paleta corta y en la misma familia que el resto de la demo. El violeta no
 * entra acá: queda reservado para lo que tiene que ver con IA.
 */
export const workTypes: WorkType[] = [
  { id: "w1", name: "Liquidación de IVA", color: "#33604a" },
  { id: "w2", name: "Balance", color: "#5c8a6e" },
  { id: "w3", name: "Sueldos y BPS", color: "#93b6a0" },
  { id: "w4", name: "Conciliación", color: "#c2a878" },
  { id: "w5", name: "Asesoramiento", color: "#7e96a8" },
  { id: "w6", name: "Trámites DGI", color: "#bdb7a8" },
]

export function workTypeName(id: string): string {
  return workTypes.find((type) => type.id === id)?.name ?? "—"
}

export function workTypeColor(id: string): string {
  return workTypes.find((type) => type.id === id)?.color ?? "#6B7080"
}

/* ── Clientes ──────────────────────────────────────────────────────── */

export type Client = {
  id: string
  name: string
  sector: string
  rut: string
  /** Responsable del cliente dentro del estudio. */
  ownerId: string
  /** Equipo asignado (incluye al responsable). */
  teamIds: string[]
  since: string
  /** Facturación mensual de ejemplo, en pesos. */
  monthlyFee: number
}

const sectors = [
  "Comercio",
  "Logística",
  "Salud",
  "Alimentos",
  "Industria",
  "Agro",
  "Inmobiliaria",
  "Servicios",
  "Construcción",
  "Gastronomía",
  "Educación",
  "Tecnología",
]

const clientNames = [
  "Ferretería Los Álamos",
  "Transportes Riomar",
  "Clínica Dental Nordeste",
  "Panadería La Espiga",
  "Textil Mirasol",
  "Agro Cañada Verde",
  "Inmobiliaria Punta Sur",
  "Taller El Piñón",
  "Óptica Claroscuro",
  "Consultora Vértice",
  "Distribuidora Pampa Azul",
  "Gimnasio Impulso",
]

export const clients: Client[] = clientNames.map((name, index) => {
  const ownerId = people[2 + (index % 4)].id
  const second = people[2 + ((index + 2) % 4)].id
  return {
    id: `c${index + 1}`,
    name,
    sector: sectors[index],
    rut: `21${(400000 + index * 1377).toString().padStart(6, "0")}001${index % 10}`,
    ownerId,
    teamIds: index % 3 === 0 ? [ownerId, second] : [ownerId],
    since: `${2016 + (index % 8)}`,
    monthlyFee: [18000, 24000, 15000, 12000, 32000, 28000, 21000, 9000, 11000, 36000, 26000, 14000][index],
  }
})

export function clientName(id: string): string {
  return clients.find((client) => client.id === id)?.name ?? "—"
}

/* ── Tareas ────────────────────────────────────────────────────────── */

export type TaskStatus = "pendiente" | "en_curso" | "en_revision" | "hecha"
export type TaskPriority = "alta" | "media" | "baja"

export type Task = {
  id: string
  title: string
  clientId: string
  assigneeId: string
  workTypeId: string
  status: TaskStatus
  priority: TaskPriority
  /** Vencimiento en ISO corto. */
  due: string
}

const taskTitles = [
  "Liquidación de IVA del mes",
  "Cierre de balance anual",
  "Alta de empleado en BPS",
  "Conciliación bancaria",
  "Declaración de IRAE",
  "Revisión de comprobantes CFE",
  "Armado de sueldos",
  "Certificado único DGI",
  "Ajuste de inventario",
  "Informe para el directorio",
  "Baja de vehículo del activo",
  "Respuesta a consulta del cliente",
]

const statuses: TaskStatus[] = ["pendiente", "en_curso", "en_revision", "hecha"]
const priorities: TaskPriority[] = ["alta", "media", "baja"]

export const tasks: Task[] = Array.from({ length: 34 }, (_, index) => {
  const client = clients[index % clients.length]
  const offset = int(-9, 24)
  const status = offset < 0 ? pick(["pendiente", "en_curso", "hecha"] as TaskStatus[]) : pick(statuses)
  return {
    id: `t${index + 1}`,
    title: taskTitles[index % taskTitles.length],
    clientId: client.id,
    assigneeId: client.teamIds[index % client.teamIds.length],
    workTypeId: workTypes[index % workTypes.length].id,
    status,
    priority: priorities[index % priorities.length],
    due: isoDay(daysFromToday(offset)),
  }
})

/** Una tarea está vencida si pasó su fecha y no está hecha. */
export function isOverdue(task: Task): boolean {
  return task.status !== "hecha" && task.due < isoDay(TODAY)
}

/* ── Horas ─────────────────────────────────────────────────────────── */

export type HourEntry = {
  id: string
  personId: string
  clientId: string
  workTypeId: string
  /** Día en ISO corto. */
  day: string
  /** Hora de inicio en minutos desde medianoche. */
  start: number
  /** Duración en minutos. */
  minutes: number
  note?: string
}

/**
 * Carga de cada semana, de la más vieja a esta.
 * El estudio no trabaja parejo todos los meses: cerca de los vencimientos se
 * amontona. Sin esto, el gráfico de horas sale una línea plana.
 */
const weekLoad = [0.55, 0.8, 1.15, 0.7, 1.3, 0.95]

/** Horas de las últimas 6 semanas, de lunes a viernes. */
export const hourEntries: HourEntry[] = (() => {
  const entries: HourEntry[] = []
  let id = 1

  for (let back = 41; back >= 0; back--) {
    const date = daysFromToday(-back)
    const weekday = date.getDay()
    if (weekday === 0 || weekday === 6) continue

    const load = weekLoad[5 - Math.floor(back / 7)] ?? 1

    for (const person of people) {
      const base = person.role === "socio" ? int(1, 2) : int(2, 3)
      const blocks = Math.max(0, Math.round(base * load))
      let start = 9 * 60
      for (let block = 0; block < blocks; block++) {
        const client = pick(clients)
        const minutes = pick([60, 90, 120, 150, 180])
        entries.push({
          id: `h${id++}`,
          personId: person.id,
          clientId: client.id,
          workTypeId: pick(workTypes).id,
          day: isoDay(date),
          start,
          minutes,
        })
        start += minutes + 30
      }
    }
  }

  return entries
})()

/* ── Facturas de proveedores (para la pantalla de IA) ──────────────── */

export type Invoice = {
  id: string
  supplier: string
  rut: string
  currency: "UYU" | "USD"
  date: string
  subtotal: number
  vatRate: 22 | 10
  category: string
  clientId: string
  status: "sin_leer" | "leida" | "confirmada"
}

export const invoices: Invoice[] = [
  {
    id: "f1",
    supplier: "Insumos del Litoral S.R.L.",
    rut: "217733440019",
    currency: "UYU",
    date: isoDay(daysFromToday(-6)),
    subtotal: 48500,
    vatRate: 22,
    category: "Insumos de oficina",
    clientId: "c1",
    status: "sin_leer",
  },
  {
    id: "f2",
    supplier: "Servicios Cañada Ltda.",
    rut: "215566210013",
    currency: "UYU",
    date: isoDay(daysFromToday(-4)),
    subtotal: 112000,
    vatRate: 22,
    category: "Servicios profesionales",
    clientId: "c6",
    status: "sin_leer",
  },
  {
    id: "f3",
    supplier: "Alimentos Rinconada S.A.",
    rut: "219911030015",
    currency: "UYU",
    date: isoDay(daysFromToday(-3)),
    subtotal: 73400,
    vatRate: 10,
    category: "Mercadería",
    clientId: "c4",
    status: "sin_leer",
  },
  {
    id: "f4",
    supplier: "Nordic Software Partners",
    rut: "214488770012",
    currency: "USD",
    date: isoDay(daysFromToday(-2)),
    subtotal: 1250,
    vatRate: 22,
    category: "Licencias de software",
    clientId: "c12",
    status: "sin_leer",
  },
]

/* ── Conciliación bancaria ─────────────────────────────────────────── */

export type Bank = { id: string; name: string; available: boolean }

export const banks: Bank[] = [
  { id: "itau", name: "Itaú", available: true },
  { id: "bbva", name: "BBVA", available: true },
  { id: "brou", name: "BROU", available: false },
  { id: "santander", name: "Santander", available: false },
]

export type MatchStatus = "conciliado" | "sugerido" | "pendiente"

export type BankMovement = {
  id: string
  date: string
  concept: string
  amount: number
  status: MatchStatus
  /** Por qué el sistema lo emparejó (o por qué lo duda). */
  reason?: string
  /** Puntaje de coincidencia, solo en los sugeridos. */
  score?: number
  bookConcept?: string
}

const concepts = [
  "Transferencia recibida",
  "Pago a proveedor",
  "Débito automático UTE",
  "Depósito en efectivo",
  "Cobro de cliente",
  "Comisión bancaria",
  "Pago de sueldos",
  "Transferencia enviada",
  "Débito ANTEL",
  "Acreditación POS",
]

export const bankMovements: BankMovement[] = (() => {
  const list: BankMovement[] = []
  let id = 1

  // 31 que concilian solos.
  for (let index = 0; index < 31; index++) {
    const amount = int(2, 180) * 500 * (index % 3 === 0 ? -1 : 1)
    list.push({
      id: `m${id++}`,
      date: isoDay(daysFromToday(-int(1, 28))),
      concept: concepts[index % concepts.length],
      amount,
      status: "conciliado",
      reason: "Monto, fecha y concepto iguales",
      bookConcept: concepts[index % concepts.length],
    })
  }

  // 5 sugeridos, cada uno con un motivo distinto de duda.
  const suggested: Array<[string, string, number, number, string]> = [
    ["Cobro de cliente", "Cobro Ferretería Los Álamos", 64500, 94, "Mismo monto, fecha a 2 días"],
    ["Pago a proveedor", "Pago Insumos del Litoral", -48500, 91, "Mismo monto, concepto parecido"],
    ["Transferencia recibida", "Transferencia Textil Mirasol", 128000, 87, "Monto igual, concepto distinto"],
    ["Débito automático UTE", "UTE factura del mes", -9800, 82, "Fecha a 3 días, monto igual"],
    ["Acreditación POS", "Ventas POS semana", 37250, 76, "Monto cercano (difiere en $150)"],
  ]

  for (const [concept, bookConcept, amount, score, reason] of suggested) {
    list.push({
      id: `m${id++}`,
      date: isoDay(daysFromToday(-int(2, 20))),
      concept,
      amount,
      status: "sugerido",
      score,
      reason,
      bookConcept,
    })
  }

  // 4 que quedan pendientes.
  for (let index = 0; index < 4; index++) {
    list.push({
      id: `m${id++}`,
      date: isoDay(daysFromToday(-int(1, 25))),
      concept: pick(concepts),
      amount: int(2, 90) * 500 * (index % 2 === 0 ? -1 : 1),
      status: "pendiente",
      reason: "Sin movimiento equivalente en el libro",
    })
  }

  return list
})()

/* ── Vencimientos próximos ─────────────────────────────────────────── */

export type Deadline = { id: string; label: string; detail: string; day: string }

export const deadlines: Deadline[] = [
  { id: "d1", label: "IVA mensual", detail: "DGI — formulario 2176", day: isoDay(daysFromToday(3)) },
  { id: "d2", label: "Aportes BPS", detail: "Nómina de 9 clientes", day: isoDay(daysFromToday(5)) },
  { id: "d3", label: "Anticipo IRAE", detail: "4 clientes alcanzados", day: isoDay(daysFromToday(9)) },
  { id: "d4", label: "Balance Textil Mirasol", detail: "Cierre de ejercicio", day: isoDay(daysFromToday(12)) },
  { id: "d5", label: "Certificado único", detail: "Renovación Transportes Riomar", day: isoDay(daysFromToday(16)) },
]

/* ── Actividad reciente ────────────────────────────────────────────── */

export type Activity = { id: string; personId: string; text: string; when: string }

export const activity: Activity[] = [
  { id: "a1", personId: "p3", text: "confirmó 6 facturas de Panadería La Espiga", when: "hace 20 minutos" },
  { id: "a2", personId: "p4", text: "cerró la conciliación de Transportes Riomar", when: "hace 1 hora" },
  { id: "a3", personId: "p5", text: "cargó 3 horas en Consultora Vértice", when: "hace 2 horas" },
  { id: "a4", personId: "p1", text: "asignó una tarea a Nicolás Pintos", when: "ayer" },
  { id: "a5", personId: "p6", text: "subió el balance de Agro Cañada Verde", when: "ayer" },
]

/* ── Documentos de ejemplo (ficha de cliente y herramientas PDF) ───── */

export type DemoDocument = { id: string; name: string; kind: string; size: string; day: string }

export const documents: DemoDocument[] = [
  { id: "doc1", name: "Balance 2025.pdf", kind: "Balance", size: "480 KB", day: isoDay(daysFromToday(-34)) },
  { id: "doc2", name: "Extracto Itaú - mes pasado.pdf", kind: "Extracto", size: "212 KB", day: isoDay(daysFromToday(-12)) },
  { id: "doc3", name: "Facturas proveedores.pdf", kind: "Comprobantes", size: "1,2 MB", day: isoDay(daysFromToday(-8)) },
  { id: "doc4", name: "Nómina BPS.pdf", kind: "Sueldos", size: "96 KB", day: isoDay(daysFromToday(-5)) },
  { id: "doc5", name: "Contrato de alquiler.pdf", kind: "Contrato", size: "320 KB", day: isoDay(daysFromToday(-60)) },
]

/* ── Formato ───────────────────────────────────────────────────────── */

export function formatMoney(amount: number, currency: "UYU" | "USD" = "UYU"): string {
  const symbol = currency === "USD" ? "US$" : "$"
  const value = Math.abs(amount).toLocaleString("es-UY", { maximumFractionDigits: 0 })
  return `${amount < 0 ? "-" : ""}${symbol} ${value}`
}

export function formatHours(minutes: number): string {
  const hours = minutes / 60
  return `${hours.toLocaleString("es-UY", { maximumFractionDigits: 1 })} h`
}

export function formatDay(iso: string): string {
  const [year, month, day] = iso.split("-")
  return `${day}/${month}/${year.slice(2)}`
}

/**
 * Cuentas derivadas de los datos de ejemplo.
 *
 * Todo pasa por acá para que las pantallas y el asistente digan siempre lo
 * mismo, y para que el rol filtre en un solo lugar.
 */

import {
  TODAY,
  clients,
  daysFromToday,
  isOverdue,
  isoDay,
  workTypes,
  type BankMovement,
  type HourEntry,
  type Invoice,
  type Role,
  type Task,
} from "./demoData"

/** Los clientes que le tocan a una persona (los de su equipo). */
export function clientsOf(personId: string) {
  return clients.filter((client) => client.teamIds.includes(personId))
}

/** Un contador solo actúa sobre los clientes de su equipo. */
export function canEditClient(role: Role, personId: string, clientId: string) {
  if (role === "socio") return true
  return clients.find((client) => client.id === clientId)?.teamIds.includes(personId) ?? false
}

/* ── Tareas ────────────────────────────────────────────────────────── */

export function openTasks(tasks: Task[]) {
  return tasks.filter((task) => task.status !== "hecha")
}

export function overdueTasks(tasks: Task[]) {
  return tasks.filter(isOverdue)
}

/* ── Horas ─────────────────────────────────────────────────────────── */

const monthStart = isoDay(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))

export function hoursThisMonth(hours: HourEntry[], personId?: string) {
  return hours.filter(
    (entry) => entry.day >= monthStart && (!personId || entry.personId === personId),
  )
}

export function totalMinutes(hours: HourEntry[]) {
  return hours.reduce((sum, entry) => sum + entry.minutes, 0)
}

/** Horas por semana, de las últimas 6 semanas, para el gráfico de área. */
export function hoursByWeek(hours: HourEntry[], personId?: string) {
  const weeks: Array<{ label: string; horas: number; from: string; to: string }> = []

  for (let week = 5; week >= 0; week--) {
    const end = daysFromToday(-week * 7)
    const start = daysFromToday(-week * 7 - 6)
    const from = isoDay(start)
    const to = isoDay(end)
    const minutes = hours
      .filter((entry) => entry.day >= from && entry.day <= to)
      .filter((entry) => !personId || entry.personId === personId)
      .reduce((sum, entry) => sum + entry.minutes, 0)

    weeks.push({
      label: week === 0 ? "Esta sem." : `${start.getDate()}/${start.getMonth() + 1}`,
      horas: Math.round(minutes / 60),
      from,
      to,
    })
  }

  return weeks
}

/** Horas por tipo de trabajo, para la dona. */
export function hoursByWorkType(hours: HourEntry[], personId?: string) {
  return workTypes
    .map((type) => ({
      name: type.name,
      color: type.color,
      horas: Math.round(
        hours
          .filter((entry) => entry.workTypeId === type.id)
          .filter((entry) => !personId || entry.personId === personId)
          .reduce((sum, entry) => sum + entry.minutes, 0) / 60,
      ),
    }))
    .filter((row) => row.horas > 0)
    .sort((a, b) => b.horas - a.horas)
}

/** Horas por cliente, ordenadas de mayor a menor. */
export function hoursByClient(hours: HourEntry[]) {
  const map = new Map<string, number>()
  for (const entry of hours) {
    map.set(entry.clientId, (map.get(entry.clientId) ?? 0) + entry.minutes)
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1])
}

/* ── Conciliación y facturas ───────────────────────────────────────── */

export function reconciliationCounts(movements: BankMovement[]) {
  return {
    conciliado: movements.filter((movement) => movement.status === "conciliado").length,
    sugerido: movements.filter((movement) => movement.status === "sugerido").length,
    pendiente: movements.filter((movement) => movement.status === "pendiente").length,
    total: movements.length,
  }
}

export function pendingInvoices(invoices: Invoice[]) {
  return invoices.filter((invoice) => invoice.status !== "confirmada")
}

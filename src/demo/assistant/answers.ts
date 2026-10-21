/**
 * El "cerebro" del asistente de la demo.
 *
 * No llama a ningún modelo: reconoce la intención por palabras clave y arma la
 * respuesta con los mismos datos que muestran las pantallas, para que nunca se
 * contradigan. Además del número, sabe buscar documentos, plantillas y
 * procedimientos del estudio, que es para lo que lo usa un contador todos los
 * días.
 */

import {
  TODAY,
  clientName,
  clients,
  daysFromToday,
  documents,
  documentsOf,
  formatDay,
  formatHours,
  formatMoney,
  isOverdue,
  isoDay,
  people,
  personName,
  procedures,
  templates,
  workTypeName,
  type BankMovement,
  type HourEntry,
  type Invoice,
  type Role,
  type Task,
} from "../data/demoData"
import { hoursByClient, hoursThisMonth, pendingInvoices } from "../data/selectors"

export type AnswerTable = { head: string[]; rows: string[][] }

export type Answer = {
  /** Texto principal, ya redactado. */
  text: string
  table?: AnswerTable
  bullets?: string[]
  /** Chip "Ver en…" que lleva a la pantalla donde está ese dato. */
  link?: { to: string; label: string }
  /** true cuando el rol no alcanza para esa información. */
  denied?: boolean
}

export type AssistantData = {
  role: Role
  personId: string
  tasks: Task[]
  hours: HourEntry[]
  invoices: Invoice[]
  movements: BankMovement[]
}

/**
 * Preguntas sugeridas: seis, una por cada cosa distinta que sabe hacer.
 * El asistente entiende bastante más (facturas, plantillas, quién atiende a un
 * cliente, carga del equipo), pero llenar la pantalla de ejemplos lo hace ver
 * como una lista de botones en vez de un asistente.
 */
export const suggestions = [
  "¿Qué tareas vencen esta semana?",
  "¿Cuántas horas se dedicaron a Textil Mirasol este mes?",
  "¿Qué movimientos quedaron pendientes de conciliar?",
  "¿Dónde está el balance de Textil Mirasol?",
  "¿Cómo se hace el alta de un empleado en BPS?",
  "Armame un reporte de horas del mes",
]

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

/** Busca el nombre de un cliente dentro de la pregunta. */
function findClient(question: string) {
  const text = normalize(question)
  return clients.find((client) => text.includes(normalize(client.name).slice(0, 10)))
}

const DENIED =
  "Esa información es solo para socios. Cambiá a vista Socio para verla."

export function answer(question: string, data: AssistantData): Answer {
  const text = normalize(question)
  const { role, personId, tasks, hours, invoices, movements } = data
  const isPartner = role === "socio"

  /* ── Documentos ──────────────────────────────────────────────── */
  if (
    text.includes("donde esta") ||
    text.includes("documento") ||
    text.includes("carpeta") ||
    text.includes("balance de") ||
    text.includes("contrato de") ||
    text.includes("extracto de")
  ) {
    const client = findClient(question)

    if (client) {
      const docs = documentsOf(client.id)
      return {
        text: `En la carpeta de ${client.name} hay ${docs.length} documentos. Estos son los más recientes:`,
        table: {
          head: ["Documento", "Tipo", "Fecha"],
          rows: docs
            .slice(0, 5)
            .map((document) => [document.name, document.kind, formatDay(document.day)]),
        },
        link: { to: "../clientes", label: "Ver en Clientes" },
      }
    }

    return {
      text: "Decime de qué cliente y te muestro su carpeta. Estos son los documentos cargados más recientemente en el estudio:",
      table: {
        head: ["Documento", "Cliente", "Fecha"],
        rows: [...documents]
          .sort((a, b) => b.day.localeCompare(a.day))
          .slice(0, 5)
          .map((document) => [document.name, clientName(document.clientId), formatDay(document.day)]),
      },
      link: { to: "../clientes", label: "Ver en Clientes" },
    }
  }

  /* ── Plantillas ──────────────────────────────────────────────── */
  if (
    text.includes("plantilla") ||
    text.includes("modelo") ||
    text.includes("machete") ||
    text.includes("formulario tipo")
  ) {
    const hit = templates.find((template) => {
      const words = normalize(template.name).split(" ").filter((word) => word.length > 4)
      return words.some((word) => text.includes(word))
    })

    if (hit) {
      return {
        text: `Sí: “${hit.name}”. ${hit.description} Se actualizó el ${formatDay(hit.updated)}.`,
        link: { to: "../clientes", label: "Abrir plantillas" },
      }
    }

    return {
      text: "Estas son las plantillas que tiene el estudio:",
      table: {
        head: ["Plantilla", "Tipo", "Actualizada"],
        rows: templates.map((template) => [template.name, template.kind, formatDay(template.updated)]),
      },
    }
  }

  /* ── Procedimientos ──────────────────────────────────────────── */
  if (
    text.includes("como se hace") ||
    text.includes("como hago") ||
    text.includes("como cargo") ||
    text.includes("procedimiento") ||
    text.includes("pasos")
  ) {
    const hit = procedures.find((procedure) => {
      const words = normalize(procedure.title).split(" ").filter((word) => word.length > 4)
      return words.some((word) => text.includes(word))
    })

    if (hit) {
      return {
        text: `Así lo hace el estudio — ${hit.title} (${hit.owner}):`,
        bullets: hit.steps,
      }
    }

    return {
      text: "Tengo estos procedimientos escritos. ¿Cuál querés?",
      bullets: procedures.map((procedure) => procedure.title),
    }
  }

  /* ── Reportes ────────────────────────────────────────────────── */
  if (text.includes("reporte") || text.includes("informe") || text.includes("armame")) {
    if (!isPartner) {
      return { text: DENIED, denied: true }
    }

    const month = hoursThisMonth(hours)
    const top = hoursByClient(month).slice(0, 6)
    const total = month.reduce((sum, entry) => sum + entry.minutes, 0)

    return {
      text: `Armé el reporte de horas del mes: ${formatHours(total)} repartidas en ${top.length} clientes. Este es el resumen por cliente (ejemplo):`,
      table: {
        head: ["Cliente", "Horas", "Honorarios"],
        rows: top.map(([clientId, minutes]) => [
          clientName(clientId),
          formatHours(minutes),
          formatMoney(clients.find((client) => client.id === clientId)?.monthlyFee ?? 0),
        ]),
      },
      link: { to: "../reporte-horas", label: "Ver en Reporte de horas" },
    }
  }

  /* ── Vencimientos ────────────────────────────────────────────── */
  if (text.includes("vence") || text.includes("vencen") || text.includes("vencid")) {
    const today = isoDay(TODAY)
    const inAWeek = isoDay(daysFromToday(7))
    const week = tasks.filter(
      (task) => task.status !== "hecha" && task.due >= today && task.due <= inAWeek,
    )
    const late = tasks.filter(isOverdue)

    return {
      text: `Esta semana vencen ${week.length} tareas${late.length > 0 ? `, y hay ${late.length} que ya están vencidas` : ""}.`,
      table: {
        head: ["Tarea", "Cliente", "Vence"],
        rows: [...late, ...week]
          .slice(0, 6)
          .map((task) => [task.title, clientName(task.clientId), formatDay(task.due)]),
      },
      link: { to: "../tareas", label: "Ver en Tareas" },
    }
  }

  /* ── Quién atiende a un cliente ──────────────────────────────── */
  if (text.includes("quien atiende") || text.includes("quien lleva") || text.includes("responsable")) {
    const client = findClient(question)
    if (!client) {
      return {
        text: "Decime de qué cliente y te digo quién lo atiende.",
        link: { to: "../clientes", label: "Ver en Clientes" },
      }
    }
    return {
      text: `A ${client.name} lo atiende ${personName(client.ownerId)}${
        client.teamIds.length > 1
          ? `, con ${client.teamIds.filter((id) => id !== client.ownerId).map(personName).join(" y ")} en el equipo`
          : ""
      }.`,
      link: { to: "../clientes", label: "Ver en Clientes" },
    }
  }

  /* ── Horas de un cliente ─────────────────────────────────────── */
  if (text.includes("hora") && findClient(question)) {
    const client = findClient(question)!
    const month = hoursThisMonth(hours).filter((entry) => entry.clientId === client.id)
    const minutes = month.reduce((sum, entry) => sum + entry.minutes, 0)
    const byType = new Map<string, number>()
    for (const entry of month) {
      byType.set(entry.workTypeId, (byType.get(entry.workTypeId) ?? 0) + entry.minutes)
    }

    return {
      text: `Este mes se dedicaron ${formatHours(minutes)} a ${client.name}, en ${month.length} registros.`,
      table: {
        head: ["Tipo de trabajo", "Horas"],
        rows: [...byType.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([typeId, value]) => [workTypeName(typeId), formatHours(value)]),
      },
      link: { to: "../horas", label: "Ver en Horas" },
    }
  }

  /* ── Clientes que más horas consumen ─────────────────────────── */
  if (text.includes("mas horas") || text.includes("consumen") || text.includes("mas tiempo")) {
    const month = hoursThisMonth(hours)
    const top = hoursByClient(month).slice(0, 5)

    return {
      text: "Estos son los clientes que más horas llevan este mes:",
      table: {
        head: ["Cliente", "Horas"],
        rows: top.map(([clientId, minutes]) => [clientName(clientId), formatHours(minutes)]),
      },
      link: { to: "../clientes", label: "Ver en Clientes" },
    }
  }

  /* ── Facturas sin confirmar ──────────────────────────────────── */
  if (text.includes("factura")) {
    const left = pendingInvoices(invoices)
    if (left.length === 0) {
      return {
        text: "No quedó ninguna factura sin confirmar.",
        link: { to: "../facturas", label: "Ver en Facturas" },
      }
    }
    return {
      text: `Quedan ${left.length} facturas sin confirmar.`,
      table: {
        head: ["Proveedor", "Fecha", "Total"],
        rows: left.map((invoice) => [
          invoice.supplier,
          formatDay(invoice.date),
          formatMoney(invoice.subtotal * (1 + invoice.vatRate / 100), invoice.currency),
        ]),
      },
      link: { to: "../facturas", label: "Ver en Facturas" },
    }
  }

  /* ── Movimientos pendientes ──────────────────────────────────── */
  if (text.includes("movimiento") || text.includes("concilia")) {
    const pending = movements.filter((movement) => movement.status === "pendiente")
    const suggested = movements.filter((movement) => movement.status === "sugerido")

    return {
      text: `Quedaron ${pending.length} movimientos pendientes y ${suggested.length} sugeridos esperando que alguien los revise.`,
      table: {
        head: ["Fecha", "Concepto", "Importe"],
        rows: [...suggested, ...pending]
          .slice(0, 6)
          .map((movement) => [
            formatDay(movement.date),
            movement.concept,
            formatMoney(movement.amount),
          ]),
      },
      link: { to: "../conciliacion", label: "Ver en Conciliación" },
    }
  }

  /* ── Carga de trabajo del equipo (solo socios) ───────────────── */
  if (text.includes("carga") || text.includes("cada persona") || text.includes("equipo")) {
    if (!isPartner) {
      return { text: DENIED, denied: true }
    }

    const month = hoursThisMonth(hours)
    const rows = people.map((person) => {
      const minutes = month
        .filter((entry) => entry.personId === person.id)
        .reduce((sum, entry) => sum + entry.minutes, 0)
      const open = tasks.filter(
        (task) => task.assigneeId === person.id && task.status !== "hecha",
      ).length
      return [person.name, formatHours(minutes), `${open}`]
    })

    return {
      text: "Así está repartida la carga este mes:",
      table: { head: ["Persona", "Horas", "Tareas abiertas"], rows },
      link: { to: "../tablero-socios", label: "Ver en Tablero de socios" },
    }
  }

  /* ── Mis horas ───────────────────────────────────────────────── */
  if (text.includes("mis horas") || (text.includes("hora") && text.includes("yo"))) {
    const month = hoursThisMonth(hours, personId)
    const minutes = month.reduce((sum, entry) => sum + entry.minutes, 0)
    return {
      text: `Llevás ${formatHours(minutes)} cargadas este mes, en ${month.length} registros.`,
      link: { to: "../horas", label: "Ver en Horas" },
    }
  }

  /* ── Sin coincidencia ────────────────────────────────────────── */
  return {
    text: "En esta demo respondo a estas preguntas. En tu estudio, el asistente responde sobre tus datos reales. ¿Probás con alguna de estas?",
  }
}

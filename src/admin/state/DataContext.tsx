import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

import type { EstadoLead, TipoMovimiento } from "../config"
import { db, supabase } from "../lib/supabase"
import type {
  Cliente,
  ClienteForm,
  Costo,
  Hora,
  Lead,
  LeadForm,
  Movimiento,
  Perfil,
  Proyecto,
  ProyectoForm,
  Tarea,
  TareaForm,
} from "../lib/types"

import { useAuth } from "./AuthContext"

type DataValue = {
  cargando: boolean
  error: string | null
  leads: Lead[]
  tareas: Tarea[]
  perfiles: Perfil[]
  clientes: Cliente[]
  proyectos: Proyecto[]
  /** false mientras la base no tenga las tablas de clientes y proyectos (0005). */
  modeloListo: boolean
  recargar: () => Promise<void>

  crearLead: (form: LeadForm) => Promise<Lead | null>
  editarLead: (id: string, patch: Partial<Lead>) => Promise<void>
  moverLead: (id: string, estado: EstadoLead, orden?: number) => Promise<void>
  borrarLead: (id: string) => Promise<void>

  movimientosDe: (leadId: string) => Promise<Movimiento[]>
  registrar: (leadId: string, tipo: TipoMovimiento, detalle: string) => Promise<void>

  crearTarea: (form: TareaForm) => Promise<void>
  editarTarea: (id: string, patch: Partial<Tarea>) => Promise<void>
  alternarTarea: (id: string, hecha: boolean) => Promise<void>
  borrarTarea: (id: string) => Promise<void>

  crearCliente: (form: ClienteForm) => Promise<Cliente | null>
  editarCliente: (id: string, patch: Partial<Cliente>) => Promise<void>

  crearProyecto: (form: ProyectoForm) => Promise<void>
  editarProyecto: (id: string, patch: Partial<ProyectoForm>) => Promise<void>
  /** Convierte un lead en cliente (si no lo era) y crea su proyecto, todo junto. */
  confirmarLead: (
    leadId: string,
    datos: { monto_usd: number; nombre: string; arr_usd: number; confirmado_en: string },
  ) => Promise<boolean>

  horasDe: (proyectoId: string) => Promise<Hora[]>
  registrarHoras: (h: Omit<Hora, "id">) => Promise<void>
  borrarHora: (id: string) => Promise<void>
  costosDe: (proyectoId: string) => Promise<Costo[]>
  registrarCosto: (c: Omit<Costo, "id">) => Promise<void>
  borrarCosto: (id: string) => Promise<void>
}

const Ctx = createContext<DataValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const { session, perfil } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [perfiles, setPerfiles] = useState<Perfil[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [modeloListo, setModeloListo] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const recargar = useCallback(async () => {
    if (!supabase) return
    setError(null)

    const [l, t, p, c, pr] = await Promise.all([
      db().from("leads").select("*").order("orden", { ascending: true }),
      db().from("tareas").select("*").order("vence", { ascending: true, nullsFirst: false }),
      db().from("perfiles").select("id, nombre, email, color").order("nombre"),
      db().from("clientes").select("*").order("nombre"),
      db().from("proyectos_resumen").select("*").order("confirmado_en", { ascending: false }),
    ])

    const fallo = l.error ?? t.error ?? p.error
    if (fallo) {
      setError(
        fallo.message.includes("does not exist")
          ? "Faltan las tablas en Supabase: corré supabase/migrations/0001_panel_admin.sql."
          : fallo.message,
      )
    } else {
      setLeads((l.data ?? []) as Lead[])
      setTareas((t.data ?? []) as Tarea[])
      setPerfiles((p.data ?? []) as Perfil[])

      // Si todavía no se corrió la 0005, el panel sigue andando sin clientes
      // ni proyectos en vez de romperse.
      if (c.error || pr.error) {
        setModeloListo(false)
        setClientes([])
        setProyectos([])
      } else {
        setModeloListo(true)
        setClientes((c.data ?? []) as Cliente[])
        setProyectos((pr.data ?? []) as Proyecto[])
      }
    }
    setCargando(false)
  }, [])

  useEffect(() => {
    if (!session) return
    void recargar()
  }, [session, recargar])

  // Si el otro toca algo, acá se ve sin recargar la página.
  const pendiente = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const cliente = supabase
    if (!cliente || !session) return

    const refrescar = () => {
      if (pendiente.current) clearTimeout(pendiente.current)
      pendiente.current = setTimeout(() => void recargar(), 400)
    }

    const canal = cliente
      .channel("panel-spike")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, refrescar)
      .on("postgres_changes", { event: "*", schema: "public", table: "tareas" }, refrescar)
      .on("postgres_changes", { event: "*", schema: "public", table: "clientes" }, refrescar)
      .on("postgres_changes", { event: "*", schema: "public", table: "proyectos" }, refrescar)
      .on("postgres_changes", { event: "*", schema: "public", table: "horas" }, refrescar)
      .on("postgres_changes", { event: "*", schema: "public", table: "costos_proyecto" }, refrescar)
      .subscribe()

    return () => {
      if (pendiente.current) clearTimeout(pendiente.current)
      void cliente.removeChannel(canal)
    }
  }, [session, recargar])

  const value = useMemo<DataValue>(() => {
    /** Los leads nuevos entran arriba de todo en su columna. */
    const ordenTope = (estado: EstadoLead) =>
      Math.min(0, ...leads.filter((l) => l.estado === estado).map((l) => l.orden)) - 1

    return {
      cargando,
      error,
      leads,
      tareas,
      perfiles,
      clientes,
      proyectos,
      modeloListo,
      recargar,

      async crearLead(form) {
        const { data, error: falla } = await db()
          .from("leads")
          .insert({ ...form, orden: ordenTope(form.estado) })
          .select()
          .single()

        if (falla) {
          setError(falla.message)
          return null
        }

        const lead = data as Lead
        setLeads((prev) => [lead, ...prev])
        return lead
      },

      async editarLead(id, patch) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
        const { error: falla } = await db().from("leads").update(patch).eq("id", id)
        if (falla) {
          setError(falla.message)
          void recargar()
        }
      },

      async moverLead(id, estado, orden) {
        const destino = orden ?? ordenTope(estado)
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, estado, orden: destino } : l)))

        const anterior = leads.find((l) => l.id === id)
        await db().from("leads").update({ estado, orden: destino }).eq("id", id)

        // El cambio de columna queda escrito en la historia del lead.
        if (anterior && anterior.estado !== estado) {
          await db()
            .from("lead_movimientos")
            .insert({
              lead_id: id,
              tipo: "estado",
              detalle: `Pasó de ${anterior.estado} a ${estado}`,
              autor_id: perfil?.id ?? null,
              cuenta_contacto: false,
            })
        }
      },

      async borrarLead(id) {
        setLeads((prev) => prev.filter((l) => l.id !== id))
        setTareas((prev) => prev.filter((t) => t.lead_id !== id))
        await db().from("leads").delete().eq("id", id)
      },

      async movimientosDe(leadId) {
        const { data } = await db()
          .from("lead_movimientos")
          .select("*")
          .eq("lead_id", leadId)
          .order("creado_en", { ascending: false })
        return (data ?? []) as Movimiento[]
      },

      async registrar(leadId, tipo, detalle) {
        await db().from("lead_movimientos").insert({
          lead_id: leadId,
          tipo,
          detalle,
          autor_id: perfil?.id ?? null,
          cuenta_contacto: tipo !== "nota",
        })

        // El trigger corre `ultimo_contacto`; lo reflejamos sin ir y volver.
        if (tipo !== "nota") {
          const ahora = new Date().toISOString()
          setLeads((prev) =>
            prev.map((l) => (l.id === leadId ? { ...l, ultimo_contacto: ahora } : l)),
          )
        }
      },

      async crearTarea(form) {
        const { data, error: falla } = await db().from("tareas").insert(form).select().single()
        if (falla) {
          setError(falla.message)
          return
        }
        setTareas((prev) => [...prev, data as Tarea])
      },

      async editarTarea(id, patch) {
        setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
        await db().from("tareas").update(patch).eq("id", id)
      },

      async alternarTarea(id, hecha) {
        setTareas((prev) =>
          prev.map((t) =>
            t.id === id
              ? { ...t, hecha, completada_en: hecha ? new Date().toISOString() : null }
              : t,
          ),
        )
        await db().from("tareas").update({ hecha }).eq("id", id)
      },

      async borrarTarea(id) {
        setTareas((prev) => prev.filter((t) => t.id !== id))
        await db().from("tareas").delete().eq("id", id)
      },

      async crearCliente(form) {
        const { data, error: falla } = await db().from("clientes").insert(form).select().single()
        if (falla) {
          setError(falla.code === "23505" ? "Ya hay un cliente con ese nombre." : falla.message)
          return null
        }
        const cliente = data as Cliente
        setClientes((prev) => [...prev, cliente].sort((a, b) => a.nombre.localeCompare(b.nombre)))
        return cliente
      },

      async editarCliente(id, patch) {
        setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
        const { error: falla } = await db().from("clientes").update(patch).eq("id", id)
        if (falla) setError(falla.message)
        // `comercial` cambia qué proyectos cuentan: la vista se recalcula en la base.
        void recargar()
      },

      async crearProyecto(form) {
        const { error: falla } = await db().from("proyectos").insert(form)
        if (falla) setError(falla.message)
        await recargar()
      },

      async editarProyecto(id, patch) {
        const { error: falla } = await db().from("proyectos").update(patch).eq("id", id)
        if (falla) setError(falla.message)
        await recargar()
      },

      async confirmarLead(leadId, datos) {
        const { error: falla } = await db().rpc("confirmar_lead", {
          p_lead_id: leadId,
          p_monto_usd: datos.monto_usd,
          p_nombre: datos.nombre,
          p_arr_usd: datos.arr_usd,
          p_confirmado_en: datos.confirmado_en,
        })
        if (falla) {
          setError(falla.message)
          return false
        }

        const anterior = leads.find((l) => l.id === leadId)
        if (anterior && anterior.estado !== "ganado") {
          await db()
            .from("lead_movimientos")
            .insert({
              lead_id: leadId,
              tipo: "estado",
              detalle: `Pasó de ${anterior.estado} a ganado (proyecto confirmado)`,
              autor_id: perfil?.id ?? null,
              cuenta_contacto: false,
            })
        }
        await recargar()
        return true
      },

      async horasDe(proyectoId) {
        const { data } = await db()
          .from("horas")
          .select("*")
          .eq("proyecto_id", proyectoId)
          .order("fecha", { ascending: false })
        return (data ?? []) as Hora[]
      },

      async registrarHoras(h) {
        const { error: falla } = await db().from("horas").insert(h)
        if (falla) setError(falla.message)
        await recargar()
      },

      async borrarHora(id) {
        await db().from("horas").delete().eq("id", id)
        await recargar()
      },

      async costosDe(proyectoId) {
        const { data } = await db()
          .from("costos_proyecto")
          .select("*")
          .eq("proyecto_id", proyectoId)
          .order("fecha", { ascending: false })
        return (data ?? []) as Costo[]
      },

      async registrarCosto(c) {
        const { error: falla } = await db().from("costos_proyecto").insert(c)
        if (falla) setError(falla.message)
        await recargar()
      },

      async borrarCosto(id) {
        await db().from("costos_proyecto").delete().eq("id", id)
        await recargar()
      },
    }
  }, [cargando, error, leads, tareas, perfiles, clientes, proyectos, modeloListo, recargar, perfil])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDatos() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useDatos fuera del DataProvider")
  return ctx
}

/** Nombre del responsable, o "Sin asignar". */
export function useNombre() {
  const { perfiles } = useDatos()
  return useCallback(
    (id: string | null) => perfiles.find((p) => p.id === id)?.nombre ?? "Sin asignar",
    [perfiles],
  )
}

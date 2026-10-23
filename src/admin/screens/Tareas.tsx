import { Check, CheckSquare, Pencil, Plus, Sparkles, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"

import { FormTarea } from "../components/FormTarea"
import { PanelLead } from "../components/PanelLead"
import { Avatar, Vacio } from "../components/piezas"
import { Shell } from "../components/Shell"
import { prioridadLabel, prioridadTono } from "../config"
import { corta, cuando, diasHasta } from "../lib/fechas"
import type { Lead, Tarea } from "../lib/types"
import { useAuth } from "../state/AuthContext"
import { useDatos, useNombre } from "../state/DataContext"

/**
 * Los grupos salen de la fecha, no de una columna en la base: "vencidas"
 * arriba porque es lo que no puede esperar, y "sin fecha" al final porque es
 * lo que todavía nadie se comprometió a hacer.
 */
function agrupar(tareas: Tarea[]) {
  const grupos: { titulo: string; tono?: string; items: Tarea[] }[] = [
    { titulo: "Vencidas", tono: "var(--a-bad)", items: [] },
    { titulo: "Hoy", tono: "var(--a-warn)", items: [] },
    { titulo: "Esta semana", items: [] },
    { titulo: "Más adelante", items: [] },
    { titulo: "Sin fecha", items: [] },
  ]

  for (const t of tareas) {
    const dias = diasHasta(t.vence)
    if (dias === null) grupos[4].items.push(t)
    else if (dias < 0) grupos[0].items.push(t)
    else if (dias === 0) grupos[1].items.push(t)
    else if (dias <= 7) grupos[2].items.push(t)
    else grupos[3].items.push(t)
  }

  return grupos.filter((g) => g.items.length > 0)
}

/* ── Una tarea ──────────────────────────────────────────────────────── */

function Fila({
  t,
  lead,
  nombreDe,
  alternar,
  borrar,
  editar,
  abrirLead,
}: {
  t: Tarea
  lead: Lead | null
  nombreDe: (id: string | null) => string
  alternar: (id: string, hecha: boolean) => Promise<void>
  borrar: (id: string) => Promise<void>
  editar: (t: Tarea) => void
  abrirLead: (id: string) => void
}) {
  const dias = diasHasta(t.vence)

  return (
    <div className={`a-tarea${t.hecha ? " is-hecha" : ""}`}>
      <button
        type="button"
        className={`a-check${t.hecha ? " is-on" : ""}`}
        onClick={() => void alternar(t.id, !t.hecha)}
        aria-label={t.hecha ? "Marcar como pendiente" : "Marcar como hecha"}
      >
        <Check size={12} strokeWidth={3.4} />
      </button>

      <div className="a-tarea__cuerpo">
        <div className="a-tarea__titulo">{t.titulo}</div>
        {t.detalle ? <div className="a-tarea__detalle">{t.detalle}</div> : null}

        <div className="a-tarea__meta">
          <span
            className="a-chip a-chip--estado"
            style={{ "--tono": prioridadTono(t.prioridad) } as React.CSSProperties}
          >
            {prioridadLabel(t.prioridad)}
          </span>

          {t.vence ? (
            <span
              className={`a-chip${
                !t.hecha && dias !== null && dias < 0
                  ? " a-chip--bad"
                  : !t.hecha && dias === 0
                    ? " a-chip--warn"
                    : ""
              }`}
            >
              {cuando(t.vence)} · {corta(t.vence)}
            </span>
          ) : null}

          {lead ? (
            <button type="button" className="a-chip" onClick={() => abrirLead(lead.id)}>
              {lead.empresa}
            </button>
          ) : null}

          {t.responsable_id ? (
            <Avatar chico nombre={nombreDe(t.responsable_id)} />
          ) : (
            <span className="a-chip">Sin asignar</span>
          )}
        </div>
      </div>

      <div className="a-tarea__acciones">
        <button
          type="button"
          className="a-btn a-btn--fantasma a-btn--icono a-btn--sm"
          onClick={() => editar(t)}
          aria-label="Editar"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          className="a-btn a-btn--fantasma a-btn--icono a-btn--sm"
          onClick={() => void borrar(t.id)}
          aria-label="Borrar"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

/* ── Pantalla ───────────────────────────────────────────────────────── */

export function Tareas() {
  const { tareas, leads, cargando, alternarTarea, borrarTarea } = useDatos()
  const { perfil } = useAuth()
  const nombreDe = useNombre()

  const [quien, setQuien] = useState<"todas" | "mias">("todas")
  const [nueva, setNueva] = useState(false)
  const [editando, setEditando] = useState<Tarea | null>(null)
  const [verHechas, setVerHechas] = useState(false)
  const [leadAbierto, setLeadAbierto] = useState<string | null>(null)

  const { pendientes, hechas } = useMemo(() => {
    const mias = (t: Tarea) => quien === "todas" || t.responsable_id === perfil?.id
    const orden = (a: Tarea, b: Tarea) => (a.vence ?? "9999").localeCompare(b.vence ?? "9999")

    return {
      pendientes: tareas.filter((t) => !t.hecha && mias(t)).sort(orden),
      hechas: tareas
        .filter((t) => t.hecha && mias(t))
        .sort((a, b) => (b.completada_en ?? "").localeCompare(a.completada_en ?? "")),
    }
  }, [tareas, quien, perfil])

  const fila = (t: Tarea) => (
    <Fila
      key={t.id}
      t={t}
      lead={leads.find((l) => l.id === t.lead_id) ?? null}
      nombreDe={nombreDe}
      alternar={alternarTarea}
      borrar={borrarTarea}
      editar={setEditando}
      abrirLead={setLeadAbierto}
    />
  )

  const grupos = agrupar(pendientes)

  return (
    <Shell
      titulo="Tareas"
      bajada={`${pendientes.length} pendientes`}
      acciones={
        <>
          <div className="a-seg">
            <button
              type="button"
              className={quien === "todas" ? "is-on" : ""}
              onClick={() => setQuien("todas")}
            >
              Todas
            </button>
            <button
              type="button"
              className={quien === "mias" ? "is-on" : ""}
              onClick={() => setQuien("mias")}
            >
              Mías
            </button>
          </div>

          <button type="button" className="a-btn a-btn--primario" onClick={() => setNueva(true)}>
            <Plus size={15} /> Tarea
          </button>
        </>
      }
    >
      <div className="a-scroll">
        <div className="a-glass a-card">
          {cargando ? (
            <div style={{ display: "grid", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="a-skel" style={{ height: 64 }} />
              ))}
            </div>
          ) : pendientes.length === 0 ? (
            <Vacio
              icono={<Sparkles size={26} />}
              titulo={quien === "mias" ? "No tenés nada pendiente" : "No hay tareas pendientes"}
              texto="Lo que anoten acá no se pierde."
            >
              <button
                type="button"
                className="a-btn a-btn--primario"
                style={{ marginTop: 6 }}
                onClick={() => setNueva(true)}
              >
                <Plus size={15} /> Nueva tarea
              </button>
            </Vacio>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {grupos.map((g) => (
                <div key={g.titulo}>
                  <div className="a-lista__titulo" style={g.tono ? { color: g.tono } : undefined}>
                    {g.titulo}
                    <span className="a-col__cuenta a-num">{g.items.length}</span>
                  </div>
                  <div className="a-lista">{g.items.map(fila)}</div>
                </div>
              ))}
            </div>
          )}

          {hechas.length > 0 ? (
            <div style={{ marginTop: 18 }}>
              <button
                type="button"
                className="a-btn a-btn--fantasma a-btn--sm"
                onClick={() => setVerHechas((v) => !v)}
              >
                <CheckSquare size={14} />
                {verHechas ? "Ocultar" : "Ver"} {hechas.length}{" "}
                {hechas.length === 1 ? "hecha" : "hechas"}
              </button>

              {verHechas ? (
                <div className="a-lista" style={{ marginTop: 10 }}>
                  {hechas.slice(0, 40).map(fila)}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {nueva ? <FormTarea cerrar={() => setNueva(false)} /> : null}
      {editando ? <FormTarea tarea={editando} cerrar={() => setEditando(null)} /> : null}
      {leadAbierto ? (
        <PanelLead
          lead={leads.find((l) => l.id === leadAbierto)!}
          cerrar={() => setLeadAbierto(null)}
        />
      ) : null}
    </Shell>
  )
}

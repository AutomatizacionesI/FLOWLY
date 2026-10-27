import { Clock, Plus, Receipt, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import {
  estadoProyectoLabel,
  estadoProyectoTono,
  estadosProyecto,
  tiposCosto,
  type EstadoProyecto,
  type TipoCosto,
} from "../config"
import { aInput, corta, monto } from "../lib/fechas"
import type { Costo, Hora, Proyecto } from "../lib/types"
import { useDatos, useNombre } from "../state/DataContext"

import { Avatar, Campo, Panel, Vacio } from "./piezas"

/** Las horas y los costos no vienen con el proyecto: se piden al abrirlo. */
function useDetalle(proyectoId: string) {
  const { horasDe, costosDe, proyectos } = useDatos()
  const [horas, setHoras] = useState<Hora[] | null>(null)
  const [costos, setCostos] = useState<Costo[] | null>(null)

  // `proyectos` cambia en cada escritura, así que sirve de señal para releer.
  useEffect(() => {
    let vivo = true
    void horasDe(proyectoId).then((h) => vivo && setHoras(h))
    void costosDe(proyectoId).then((c) => vivo && setCostos(c))
    return () => {
      vivo = false
    }
  }, [proyectoId, horasDe, costosDe, proyectos])

  return { horas, costos }
}

/* ── Alta de horas ──────────────────────────────────────────────────── */

function AltaHoras({ proyectoId, cerrar }: { proyectoId: string; cerrar: () => void }) {
  const { registrarHoras, perfiles } = useDatos()
  const [fecha, setFecha] = useState(aInput(new Date()))
  const [cantidad, setCantidad] = useState(1)
  const [persona, setPersona] = useState<string | null>(perfiles[0]?.id ?? null)
  const [detalle, setDetalle] = useState("")
  const [guardando, setGuardando] = useState(false)

  return (
    <form
      className="a-form a-form--2"
      style={{ marginTop: 10 }}
      onSubmit={async (e) => {
        e.preventDefault()
        if (guardando) return
        setGuardando(true)
        await registrarHoras({
          proyecto_id: proyectoId,
          persona_id: persona,
          fecha,
          horas: cantidad,
          detalle: detalle.trim() || null,
        })
        setGuardando(false)
        cerrar()
      }}
    >
      <Campo label="Fecha">
        <input
          className="a-input"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </Campo>
      <Campo label="Horas">
        <input
          className="a-input"
          type="number"
          min="0.25"
          step="0.25"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          required
        />
      </Campo>
      <Campo label="Quién" ancho>
        <select
          className="a-select"
          value={persona ?? ""}
          onChange={(e) => setPersona(e.target.value || null)}
        >
          <option value="">Sin asignar</option>
          {perfiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </Campo>
      <Campo label="En qué" ancho>
        <input
          className="a-input"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          placeholder="Qué se hizo"
        />
      </Campo>
      <div className="a-pie a-ancho">
        <button type="button" className="a-btn a-btn--sm" onClick={cerrar}>
          Cancelar
        </button>
        <button type="submit" className="a-btn a-btn--sm a-btn--primario" disabled={guardando}>
          Anotar
        </button>
      </div>
    </form>
  )
}

/* ── Alta de costos ─────────────────────────────────────────────────── */

function AltaCosto({ proyectoId, cerrar }: { proyectoId: string; cerrar: () => void }) {
  const { registrarCosto } = useDatos()
  const [fecha, setFecha] = useState(aInput(new Date()))
  const [tipo, setTipo] = useState<TipoCosto>("infra")
  const [concepto, setConcepto] = useState("")
  const [montoUsd, setMontoUsd] = useState(0)
  const [guardando, setGuardando] = useState(false)

  return (
    <form
      className="a-form a-form--2"
      style={{ marginTop: 10 }}
      onSubmit={async (e) => {
        e.preventDefault()
        if (guardando) return
        setGuardando(true)
        await registrarCosto({
          proyecto_id: proyectoId,
          fecha,
          tipo,
          concepto: concepto.trim(),
          monto_usd: montoUsd,
        })
        setGuardando(false)
        cerrar()
      }}
    >
      <Campo label="Fecha">
        <input
          className="a-input"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </Campo>
      <Campo label="Monto (US$)">
        <input
          className="a-input"
          type="number"
          min="0"
          step="1"
          value={montoUsd}
          onChange={(e) => setMontoUsd(Number(e.target.value))}
          required
        />
      </Campo>
      <Campo label="Tipo">
        <select
          className="a-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoCosto)}
        >
          {tiposCosto.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Campo>
      <Campo label="Concepto">
        <input
          className="a-input"
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          placeholder="Servidor, licencia, …"
          required
        />
      </Campo>
      <div className="a-pie a-ancho">
        <button type="button" className="a-btn a-btn--sm" onClick={cerrar}>
          Cancelar
        </button>
        <button type="submit" className="a-btn a-btn--sm a-btn--primario" disabled={guardando}>
          Anotar
        </button>
      </div>
    </form>
  )
}

/* ── Panel ──────────────────────────────────────────────────────────── */

export function PanelProyecto({ proyecto, cerrar }: { proyecto: Proyecto; cerrar: () => void }) {
  const { editarProyecto, borrarHora, borrarCosto, perfiles } = useDatos()
  const nombreDe = useNombre()
  const { horas, costos } = useDetalle(proyecto.id)

  const [cargandoHoras, setCargandoHoras] = useState(false)
  const [cargandoCosto, setCargandoCosto] = useState(false)

  const quien = (id: string | null) => perfiles.find((p) => p.id === id)?.nombre ?? "Sin asignar"

  return (
    <Panel cerrar={cerrar} etiqueta={proyecto.nombre}>
      <div className="a-sheet__top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 620, letterSpacing: "-0.028em" }}>
            {proyecto.nombre}
          </h2>
          <div style={{ fontSize: 12.5, color: "var(--a-ink-faint)", marginTop: 2 }}>
            {proyecto.cliente}
            {proyecto.comercial ? "" : " · interno"}
          </div>
        </div>
        <button type="button" className="a-btn a-btn--fantasma a-btn--sm" onClick={cerrar}>
          Cerrar
        </button>
      </div>

      <div className="a-sheet__cuerpo">
        <div className="a-seg" style={{ flexWrap: "wrap", display: "flex", marginBottom: 16 }}>
          {estadosProyecto.map((e) => (
            <button
              key={e.id}
              type="button"
              className={proyecto.estado === e.id ? "is-on" : ""}
              onClick={() => void editarProyecto(proyecto.id, { estado: e.id as EstadoProyecto })}
            >
              {e.label}
            </button>
          ))}
        </div>

        <div className="a-datos">
          <div className="a-dato">
            <span>Confirmado</span>
            <b>{monto(proyecto.monto_usd)}</b>
          </div>
          <div className="a-dato">
            <span>Cotizado</span>
            <b>{proyecto.cotizado_usd ? monto(proyecto.cotizado_usd) : "—"}</b>
          </div>
          <div className="a-dato">
            <span>Horas</span>
            <b>{proyecto.horas || 0} h</b>
          </div>
          <div className="a-dato">
            <span>Por hora</span>
            <b>{proyecto.usd_por_hora ? `${monto(proyecto.usd_por_hora)}/h` : "—"}</b>
          </div>
          <div className="a-dato">
            <span>Costos</span>
            <b>{monto(proyecto.costos_usd || 0)}</b>
          </div>
          <div className="a-dato">
            <span>Margen</span>
            <b style={{ color: proyecto.margen_usd < 0 ? "var(--a-bad)" : "var(--a-verde)" }}>
              {monto(proyecto.margen_usd)}
            </b>
          </div>
          <div className="a-dato">
            <span>Fecha</span>
            <b>{corta(proyecto.confirmado_en)}</b>
          </div>
          <div className="a-dato">
            <span>Mantenimiento</span>
            <b>
              {proyecto.arr_usd ? `${monto(proyecto.arr_usd)} / año` : "—"}
              {proyecto.arr_usd && proyecto.arr_baja_en ? " (de baja)" : ""}
            </b>
          </div>
        </div>

        {proyecto.repo_url || proyecto.drive_url ? (
          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            {proyecto.repo_url ? (
              <a
                className="a-btn a-btn--sm"
                href={proyecto.repo_url}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            ) : null}
            {proyecto.drive_url ? (
              <a
                className="a-btn a-btn--sm"
                href={proyecto.drive_url}
                target="_blank"
                rel="noreferrer"
              >
                Drive
              </a>
            ) : null}
          </div>
        ) : null}

        {proyecto.notas ? (
          <>
            <div className="a-lista__titulo">Notas</div>
            <p style={{ fontSize: 13, color: "var(--a-ink-soft)", margin: "0 0 18px" }}>
              {proyecto.notas}
            </p>
          </>
        ) : null}

        {/* ── Horas ── */}
        <div className="a-card__top" style={{ marginBottom: 8 }}>
          <Clock size={15} style={{ color: "var(--a-info)" }} />
          <h2 style={{ fontSize: 14, margin: 0 }}>Horas</h2>
          <button
            type="button"
            className="a-btn a-btn--sm a-btn--fantasma"
            onClick={() => setCargandoHoras((v) => !v)}
          >
            <Plus size={14} /> Anotar
          </button>
        </div>

        {cargandoHoras ? (
          <AltaHoras proyectoId={proyecto.id} cerrar={() => setCargandoHoras(false)} />
        ) : null}

        {horas === null ? (
          <div className="a-skel" style={{ height: 44 }} />
        ) : horas.length === 0 ? (
          <Vacio chico titulo="Sin horas" texto="Lo que le dediquen va acá." />
        ) : (
          <div className="a-lista" style={{ marginBottom: 18 }}>
            {horas.map((h) => (
              <div key={h.id} className="a-tarea">
                <div className="a-tarea__cuerpo">
                  <div className="a-tarea__titulo">
                    {h.horas} h · {quien(h.persona_id)}
                  </div>
                  {h.detalle ? <div className="a-tarea__detalle">{h.detalle}</div> : null}
                  <div className="a-tarea__meta">
                    <span className="a-chip">{corta(h.fecha)}</span>
                  </div>
                </div>
                <div className="a-tarea__acciones">
                  <button
                    type="button"
                    className="a-btn a-btn--sm a-btn--fantasma a-btn--icono"
                    onClick={() => void borrarHora(h.id)}
                    title="Borrar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Costos ── */}
        <div className="a-card__top" style={{ marginBottom: 8, marginTop: 18 }}>
          <Receipt size={15} style={{ color: "var(--a-warn)" }} />
          <h2 style={{ fontSize: 14, margin: 0 }}>Costos</h2>
          <button
            type="button"
            className="a-btn a-btn--sm a-btn--fantasma"
            onClick={() => setCargandoCosto((v) => !v)}
          >
            <Plus size={14} /> Anotar
          </button>
        </div>

        {cargandoCosto ? (
          <AltaCosto proyectoId={proyecto.id} cerrar={() => setCargandoCosto(false)} />
        ) : null}

        {costos === null ? (
          <div className="a-skel" style={{ height: 44 }} />
        ) : costos.length === 0 ? (
          <Vacio chico titulo="Sin costos" texto="Infra, licencias y terceros van acá." />
        ) : (
          <div className="a-lista">
            {costos.map((c) => (
              <div key={c.id} className="a-tarea">
                <div className="a-tarea__cuerpo">
                  <div className="a-tarea__titulo">{c.concepto}</div>
                  <div className="a-tarea__meta">
                    <span className="a-chip">{corta(c.fecha)}</span>
                    <span className="a-chip">
                      {tiposCosto.find((t) => t.id === c.tipo)?.label ?? c.tipo}
                    </span>
                    <span className="a-lead__valor">{monto(c.monto_usd)}</span>
                  </div>
                </div>
                <div className="a-tarea__acciones">
                  <button
                    type="button"
                    className="a-btn a-btn--sm a-btn--fantasma a-btn--icono"
                    onClick={() => void borrarCosto(c.id)}
                    title="Borrar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="a-sheet__pie">
        <span
          className="a-chip a-chip--estado"
          style={{ "--tono": estadoProyectoTono(proyecto.estado) } as React.CSSProperties}
        >
          {estadoProyectoLabel(proyecto.estado)}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--a-ink-faint)" }}>
          {nombreDe(proyecto.responsable_id)}
        </span>
        <Avatar nombre={nombreDe(proyecto.responsable_id)} chico />
      </div>
    </Panel>
  )
}

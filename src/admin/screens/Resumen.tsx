import {
  AlertCircle,
  CheckSquare,
  Flame,
  Plus,
  Repeat,
  Snowflake,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FormLead } from "../components/FormLead"
import { FormTarea } from "../components/FormTarea"
import { PanelLead } from "../components/PanelLead"
import { Avatar, ChipEstado, Vacio } from "../components/piezas"
import { Shell } from "../components/Shell"
import { DIAS_SIN_CONTACTO, estados, estadosAbiertos } from "../config"
import { cuando, diasDesde, diasHasta, hace, monto, vencida } from "../lib/fechas"
import type { Lead } from "../lib/types"
import { useAuth } from "../state/AuthContext"
import { useDatos, useNombre } from "../state/DataContext"

/* ── Tarjeta de número ──────────────────────────────────────────────── */

function Kpi({
  icono: Icono,
  label,
  valor,
  pie,
  tono,
}: {
  icono: typeof Target
  label: string
  valor: string
  pie?: string
  tono?: string
}) {
  return (
    <div className="a-glass a-card">
      <span className="a-kpi__icono" style={tono ? { color: tono } : undefined}>
        <Icono size={15} />
      </span>
      <div className="a-kpi__label">{label}</div>
      <div className="a-kpi__valor" style={tono ? { color: tono } : undefined}>
        {valor}
      </div>
      {pie ? <div className="a-kpi__pie">{pie}</div> : null}
    </div>
  )
}

/* ── Embudo ─────────────────────────────────────────────────────────── */

function Embudo({ leads }: { leads: Lead[] }) {
  const total = Math.max(1, ...estados.map((e) => leads.filter((l) => l.estado === e.id).length))

  return (
    <div style={{ display: "grid", gap: 9 }}>
      {estados.map((e) => {
        const n = leads.filter((l) => l.estado === e.id).length
        return (
          <div key={e.id} style={{ display: "grid", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
              <span className="a-punto" style={{ "--tono": e.tono } as React.CSSProperties} />
              {e.label}
              <span className="a-col__cuenta a-num">{n}</span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 99,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(n / total) * 100}%`,
                  borderRadius: 99,
                  background: e.tono,
                  boxShadow: `0 0 12px ${e.tono}88`,
                  transition: "width 500ms cubic-bezier(.2,.8,.3,1)",
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Pantalla ───────────────────────────────────────────────────────── */

export function Resumen() {
  const { leads, tareas, cargando, alternarTarea, clientes, proyectos, modeloListo } = useDatos()
  const { perfil } = useAuth()
  const nombreDe = useNombre()
  const navegar = useNavigate()

  const [nuevoLead, setNuevoLead] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState(false)
  const [abierto, setAbierto] = useState<Lead | null>(null)

  const datos = useMemo(() => {
    const activos = leads.filter((l) => estadosAbiertos.includes(l.estado))

    // Lo que hay que atender hoy: el seguimiento venció o es para hoy.
    const paraHoy = activos
      .filter((l) => (diasHasta(l.proximo_seguimiento) ?? 1) <= 0)
      .sort((a, b) => (a.proximo_seguimiento ?? "").localeCompare(b.proximo_seguimiento ?? ""))

    // Los que se enfrían: hace rato que no se habla y nadie agendó nada.
    const frios = activos
      .filter((l) => !paraHoy.includes(l))
      .filter((l) => (diasDesde(l.ultimo_contacto) ?? 999) >= DIAS_SIN_CONTACTO)
      .sort((a, b) => (a.ultimo_contacto ?? "").localeCompare(b.ultimo_contacto ?? ""))

    const pendientes = tareas
      .filter((t) => !t.hecha)
      .sort((a, b) => (a.vence ?? "9999").localeCompare(b.vence ?? "9999"))

    const hoyTareas = pendientes.filter((t) => (diasHasta(t.vence) ?? 1) <= 0)

    // Por la fecha de cierre y no por la de edición: si no, un trabajo viejo
    // pasaba a contar como del mes apenas alguien le corregía una nota.
    const mes = new Date().toISOString().slice(0, 7)
    const ganadosMes = leads.filter(
      (l) => l.estado === "ganado" && l.cerrado_en?.startsWith(mes),
    )

    // Clientes a los que hay que volver a hablarles aunque no tengan nada
    // abierto: el seguimiento posventa, que antes no existía.
    const clientesHoy = clientes
      .filter((c) => (diasHasta(c.proximo_seguimiento) ?? 1) <= 0)
      .sort((a, b) => (a.proximo_seguimiento ?? "").localeCompare(b.proximo_seguimiento ?? ""))

    // Ganados por una vía que no fue el alta de proyecto: quedarían sin sumar.
    const conProyecto = new Set(proyectos.map((p) => p.lead_id).filter(Boolean))
    const sinProyecto = modeloListo
      ? leads.filter((l) => l.estado === "ganado" && !conProyecto.has(l.id))
      : []

    return {
      activos,
      paraHoy,
      frios,
      pendientes,
      hoyTareas,
      ganadosMes,
      clientesHoy,
      sinProyecto,
      pipeline: activos.reduce((s, l) => s + (l.valor_estimado ?? 0), 0),
      // Histórico y no del mes: el generado es todo lo que se confirmó.
      // La vista ya resolvió qué cuenta (no cancelado, cliente comercial).
      generado: proyectos.filter((p) => p.cuenta_generado).reduce((s, p) => s + p.monto_usd, 0),
      cuentanGenerado: proyectos.filter((p) => p.cuenta_generado).length,
      // El mantenimiento vigente. Va aparte: no es plata del mismo tipo.
      arr: proyectos.filter((p) => p.cuenta_arr).reduce((s, p) => s + p.arr_usd, 0),
      cuentanArr: proyectos.filter((p) => p.cuenta_arr).length,
      // Sin el modelo nuevo se sigue mostrando lo de antes.
      ganado: ganadosMes.reduce((s, l) => s + (l.valor_estimado ?? 0), 0),
      recurrente: leads
        .filter((l) => l.estado === "ganado")
        .reduce((s, l) => s + (l.mantenimiento_anual ?? 0), 0),
    }
  }, [leads, tareas, clientes, proyectos, modeloListo])

  const saludo = (() => {
    const h = new Date().getHours()
    if (h < 6) return "Buenas noches"
    if (h < 13) return "Buen día"
    if (h < 20) return "Buenas tardes"
    return "Buenas noches"
  })()

  return (
    <Shell
      titulo={
        <>
          <span className="a-solo-ancho">
            {saludo}
            {perfil ? `, ${perfil.nombre.split(" ")[0]}` : ""}
          </span>
          <span className="a-solo-angosto">Resumen</span>
        </>
      }
      bajada={
        datos.paraHoy.length + datos.hoyTareas.length > 0
          ? `${datos.paraHoy.length + datos.hoyTareas.length} cosas para hoy`
          : "No hay nada vencido. Todo al día."
      }
      acciones={
        <>
          <button type="button" className="a-btn" onClick={() => setNuevaTarea(true)}>
            <CheckSquare size={15} /> Tarea
          </button>
          <button
            type="button"
            className="a-btn a-btn--primario"
            onClick={() => setNuevoLead(true)}
          >
            <Plus size={15} /> Lead
          </button>
        </>
      }
    >
      <div className="a-scroll">
        {cargando ? (
          <div className="a-grid a-grid--kpi">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="a-skel" style={{ height: 136 }} />
            ))}
          </div>
        ) : (
          <>
            {/* Un ganado sin proyecto no suma al generado y no se ve en ningún
                lado: pasa cuando se cambia el estado por fuera del alta. */}
            {datos.sinProyecto.length > 0 ? (
              <div className="a-aviso" style={{ marginBottom: 14 }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ flex: 1 }}>
                  {datos.sinProyecto.length === 1
                    ? `${datos.sinProyecto[0].empresa} figura como ganado pero no tiene proyecto, así que no suma al generado.`
                    : `Hay ${datos.sinProyecto.length} leads ganados sin proyecto, así que no suman al generado.`}
                </span>
                <button
                  type="button"
                  className="a-btn a-btn--sm"
                  onClick={() => setAbierto(datos.sinProyecto[0])}
                >
                  Completar
                </button>
              </div>
            ) : null}

            <div className="a-grid a-grid--kpi" style={{ marginBottom: 14 }}>
              <Kpi
                icono={Wallet}
                label="Pipeline abierto"
                valor={monto(datos.pipeline)}
                pie={`${datos.activos.length} leads en juego`}
              />
              <Kpi
                icono={Flame}
                label="Para seguir hoy"
                valor={String(datos.paraHoy.length)}
                pie={datos.paraHoy.length === 0 ? "Nada vencido" : "Seguimientos vencidos o de hoy"}
                tono={datos.paraHoy.length > 0 ? "var(--a-bad)" : undefined}
              />
              <Kpi
                icono={CheckSquare}
                label="Tareas pendientes"
                valor={String(datos.pendientes.length)}
                pie={
                  datos.hoyTareas.length > 0
                    ? `${datos.hoyTareas.length} para hoy o vencidas`
                    : "Ninguna vencida"
                }
                tono={datos.hoyTareas.length > 0 ? "var(--a-warn)" : undefined}
              />
              {modeloListo ? (
                <>
                  <Kpi
                    icono={TrendingUp}
                    label="Generado"
                    valor={monto(datos.generado)}
                    pie={`${datos.cuentanGenerado} ${datos.cuentanGenerado === 1 ? "proyecto" : "proyectos"} · histórico`}
                    tono={datos.generado > 0 ? "var(--a-verde)" : undefined}
                  />
                  <Kpi
                    icono={Repeat}
                    label="Mantenimientos"
                    valor={monto(datos.arr)}
                    pie={
                      datos.cuentanArr > 0
                        ? `por año · ${datos.cuentanArr} vigentes`
                        : "ninguno vigente"
                    }
                    tono={datos.arr > 0 ? "var(--a-info)" : undefined}
                  />
                </>
              ) : (
                <Kpi
                  icono={TrendingUp}
                  label="Ganado este mes"
                  valor={monto(datos.ganado)}
                  pie={
                    datos.recurrente > 0
                      ? `${datos.ganadosMes.length} cerrados · ${monto(datos.recurrente)} por año en mantenimientos`
                      : `${datos.ganadosMes.length} cerrados`
                  }
                  tono={datos.ganadosMes.length > 0 ? "var(--a-verde)" : undefined}
                />
              )}
            </div>

            <div className="a-grid a-grid--2">
              {/* ── Lo de hoy ── */}
              <div style={{ display: "grid", gap: 14, minWidth: 0 }}>
                <div className="a-glass a-card">
                  <div className="a-card__top">
                    <Target size={16} style={{ color: "var(--a-bad)" }} />
                    <h2>Hay que hablarles</h2>
                    <button
                      type="button"
                      className="a-btn a-btn--sm a-btn--fantasma"
                      onClick={() => navegar("/leads")}
                    >
                      Ver todos
                    </button>
                  </div>

                  {datos.paraHoy.length === 0 ? (
                    <Vacio
                      chico
                      icono={<Sparkles size={20} />}
                      titulo="Ningún seguimiento vencido"
                      texto="Los que tengan fecha para hoy aparecen acá."
                    />
                  ) : (
                    <div className="a-lista">
                      {datos.paraHoy.slice(0, 6).map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          className="a-lead"
                          onClick={() => setAbierto(l)}
                        >
                          <div className="a-lead__empresa">
                            {vencida(l.proximo_seguimiento) ? <span className="a-frio" /> : null}
                            {l.empresa}
                          </div>
                          <div className="a-lead__contacto">
                            Último contacto: {hace(l.ultimo_contacto).toLowerCase()}
                          </div>
                          <div className="a-lead__pie">
                            <ChipEstado estado={l.estado} />
                            <span
                              className={`a-chip${vencida(l.proximo_seguimiento) ? " a-chip--bad" : " a-chip--warn"}`}
                            >
                              {cuando(l.proximo_seguimiento)}
                            </span>
                            <span className="a-lead__valor">
                              {monto(l.valor_estimado, l.moneda)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Clientes a los que toca volver a hablarles aunque no
                      tengan nada abierto. Es el seguimiento posventa. */}
                  {datos.clientesHoy.length > 0 ? (
                    <>
                      <div className="a-lista__titulo" style={{ marginTop: 14 }}>
                        Clientes
                        <span className="a-col__cuenta">{datos.clientesHoy.length}</span>
                      </div>
                      <div className="a-lista">
                        {datos.clientesHoy.slice(0, 4).map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className="a-lead"
                            onClick={() => navegar("/clientes")}
                          >
                            <div className="a-lead__empresa">
                              {vencida(c.proximo_seguimiento) ? <span className="a-frio" /> : null}
                              {c.nombre}
                            </div>
                            <div className="a-lead__contacto">
                              Último contacto: {hace(c.ultimo_contacto).toLowerCase()}
                            </div>
                            <div className="a-lead__pie">
                              <span
                                className={`a-chip${vencida(c.proximo_seguimiento) ? " a-chip--bad" : " a-chip--warn"}`}
                              >
                                {cuando(c.proximo_seguimiento)}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="a-glass a-card">
                  <div className="a-card__top">
                    <CheckSquare size={16} style={{ color: "var(--a-warn)" }} />
                    <h2>Tareas pendientes</h2>
                    <button
                      type="button"
                      className="a-btn a-btn--sm a-btn--fantasma"
                      onClick={() => navegar("/tareas")}
                    >
                      Ver todas
                    </button>
                  </div>

                  {datos.pendientes.length === 0 ? (
                    <Vacio
                      chico
                      icono={<Sparkles size={20} />}
                      titulo="Nada pendiente"
                      texto="Cuando agreguen tareas aparecen acá."
                    />
                  ) : (
                    <div className="a-lista">
                      {datos.pendientes.slice(0, 6).map((t) => {
                        const lead = leads.find((l) => l.id === t.lead_id)
                        return (
                          <div key={t.id} className="a-tarea">
                            <button
                              type="button"
                              className="a-check"
                              onClick={() => void alternarTarea(t.id, true)}
                              aria-label="Marcar como hecha"
                            >
                              <CheckSquare size={12} strokeWidth={3} />
                            </button>
                            <div className="a-tarea__cuerpo">
                              <div className="a-tarea__titulo">{t.titulo}</div>
                              <div className="a-tarea__meta">
                                {t.vence ? (
                                  <span
                                    className={`a-chip${vencida(t.vence) ? " a-chip--bad" : ""}`}
                                  >
                                    {cuando(t.vence)}
                                  </span>
                                ) : null}
                                {lead ? <span className="a-chip">{lead.empresa}</span> : null}
                                {t.responsable_id ? (
                                  <Avatar chico nombre={nombreDe(t.responsable_id)} />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Columna derecha ── */}
              <div style={{ display: "grid", gap: 14, minWidth: 0, alignContent: "start" }}>
                <div className="a-glass a-card">
                  <div className="a-card__top">
                    <Target size={16} />
                    <h2>Embudo</h2>
                  </div>
                  <Embudo leads={leads} />
                </div>

                <div className="a-glass a-card">
                  <div className="a-card__top">
                    <Snowflake size={16} style={{ color: "var(--a-info)" }} />
                    <h2>Se están enfriando</h2>
                  </div>

                  {datos.frios.length === 0 ? (
                    <Vacio
                      chico
                      titulo="Ninguno frío"
                      texto={`Con todos hablaron en los últimos ${DIAS_SIN_CONTACTO} días.`}
                    />
                  ) : (
                    <div className="a-lista">
                      {datos.frios.slice(0, 5).map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          className="a-lead"
                          onClick={() => setAbierto(l)}
                        >
                          <div className="a-lead__empresa">{l.empresa}</div>
                          <div className="a-lead__pie">
                            <ChipEstado estado={l.estado} />
                            <span className="a-chip">{hace(l.ultimo_contacto)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {nuevoLead ? <FormLead cerrar={() => setNuevoLead(false)} /> : null}
      {nuevaTarea ? <FormTarea cerrar={() => setNuevaTarea(false)} /> : null}
      {abierto ? (
        <PanelLead
          lead={leads.find((l) => l.id === abierto.id) ?? abierto}
          cerrar={() => setAbierto(null)}
        />
      ) : null}
    </Shell>
  )
}

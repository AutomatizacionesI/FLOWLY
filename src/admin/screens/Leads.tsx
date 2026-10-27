import { Columns3, List, Plus, Search, Users } from "lucide-react"
import { useMemo, useState } from "react"

import { FormConfirmar } from "../components/FormConfirmar"
import { FormLead } from "../components/FormLead"
import { PanelLead } from "../components/PanelLead"
import { Avatar, ChipEstado, Vacio } from "../components/piezas"
import { Shell } from "../components/Shell"
import { DIAS_SIN_CONTACTO, estados, origenLabel, type EstadoLead } from "../config"
import { corta, cuando, diasDesde, hace, monto, vencida } from "../lib/fechas"
import type { Lead } from "../lib/types"
import { useDatos, useNombre } from "../state/DataContext"

/** Hace rato que no se habla: el punto rojo de la tarjeta. */
const frio = (l: Lead) => (diasDesde(l.ultimo_contacto) ?? 999) >= DIAS_SIN_CONTACTO

/* ── Tarjeta del kanban ─────────────────────────────────────────────── */

function Tarjeta({
  lead,
  abrir,
  arrastrando,
  onArrastrar,
}: {
  lead: Lead
  abrir: () => void
  arrastrando: boolean
  onArrastrar: (id: string | null) => void
}) {
  const nombreDe = useNombre()

  return (
    <div
      className={`a-lead${arrastrando ? " is-arrastrando" : ""}`}
      role="button"
      tabIndex={0}
      draggable
      onDragStart={() => onArrastrar(lead.id)}
      onDragEnd={() => onArrastrar(null)}
      onClick={abrir}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), abrir())}
    >
      <div className="a-lead__empresa">
        {frio(lead) ? <span className="a-frio" title="Hace rato que no hablan" /> : null}
        {lead.empresa}
      </div>
      {lead.contacto ? <div className="a-lead__contacto">{lead.contacto}</div> : null}

      <div className="a-lead__pie">
        <span className="a-chip">{hace(lead.ultimo_contacto)}</span>
        {lead.proximo_seguimiento ? (
          <span className={`a-chip${vencida(lead.proximo_seguimiento) ? " a-chip--bad" : ""}`}>
            {cuando(lead.proximo_seguimiento)}
          </span>
        ) : null}
        {lead.responsable_id ? <Avatar chico nombre={nombreDe(lead.responsable_id)} /> : null}
        {lead.valor_estimado ? (
          <span className="a-lead__valor">{monto(lead.valor_estimado, lead.moneda)}</span>
        ) : null}
      </div>
    </div>
  )
}

/* ── Pantalla ───────────────────────────────────────────────────────── */

export function Leads() {
  const { leads, cargando, moverLead, modeloListo } = useDatos()
  const nombreDe = useNombre()

  const [vista, setVista] = useState<"kanban" | "lista">("kanban")
  const [busca, setBusca] = useState("")
  const [nuevo, setNuevo] = useState<EstadoLead | null>(null)
  const [abierto, setAbierto] = useState<string | null>(null)
  const [llevando, setLlevando] = useState<string | null>(null)
  const [destino, setDestino] = useState<EstadoLead | null>(null)
  /** Lead que se soltó en "Ganado" y está esperando que le pongan monto. */
  const [confirmando, setConfirmando] = useState<string | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return leads
    return leads.filter((l) =>
      [l.empresa, l.contacto, l.email, l.telefono, l.notas]
        .filter(Boolean)
        .some((campo) => (campo as string).toLowerCase().includes(q)),
    )
  }, [leads, busca])

  const porEstado = (id: EstadoLead) =>
    filtrados.filter((l) => l.estado === id).sort((a, b) => a.orden - b.orden)

  function soltar(estado: EstadoLead) {
    // Ganar no es sólo cambiar de columna: de ahí sale el proyecto, y sin
    // proyecto el generado no se entera. Así que primero se pide el monto.
    if (llevando && estado === "ganado" && modeloListo) {
      const yaEstaba = leads.find((l) => l.id === llevando)?.estado === "ganado"
      if (!yaEstaba) setConfirmando(llevando)
    } else if (llevando) {
      void moverLead(llevando, estado)
    }
    setLlevando(null)
    setDestino(null)
  }

  const lead = leads.find((l) => l.id === abierto)
  const aConfirmar = leads.find((l) => l.id === confirmando)

  return (
    <Shell
      titulo="Leads"
      bajada={`${filtrados.length} en total`}
      acciones={
        <>
          <div className="a-buscador">
            <Search size={15} />
            <input
              className="a-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar empresa, contacto, nota…"
            />
          </div>

          <div className="a-seg">
            <button
              type="button"
              className={vista === "kanban" ? "is-on" : ""}
              onClick={() => setVista("kanban")}
              title="Tablero"
            >
              <Columns3 size={14} />
            </button>
            <button
              type="button"
              className={vista === "lista" ? "is-on" : ""}
              onClick={() => setVista("lista")}
              title="Lista"
            >
              <List size={14} />
            </button>
          </div>

          <button type="button" className="a-btn a-btn--primario" onClick={() => setNuevo("nuevo")}>
            <Plus size={15} /> Lead
          </button>
        </>
      }
    >
      <div className="a-scroll">
        {cargando ? (
          <div style={{ display: "flex", gap: 12 }}>
            {estados.map((e) => (
              <div key={e.id} className="a-skel" style={{ height: 320, flex: "1 0 260px" }} />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="a-glass a-card">
            <Vacio
              icono={<Users size={26} />}
              titulo="Todavía no hay leads"
              texto="Cargá el primero y arrancá a seguirlo."
            >
              <button
                type="button"
                className="a-btn a-btn--primario"
                style={{ marginTop: 6 }}
                onClick={() => setNuevo("nuevo")}
              >
                <Plus size={15} /> Nuevo lead
              </button>
            </Vacio>
          </div>
        ) : vista === "kanban" ? (
          <div className="a-kanban">
            {estados.map((e) => {
              const columna = porEstado(e.id)
              const plata = columna.reduce((s, l) => s + (l.valor_estimado ?? 0), 0)

              return (
                <div
                  key={e.id}
                  className={`a-col${destino === e.id ? " is-destino" : ""}`}
                  onDragOver={(ev) => {
                    ev.preventDefault()
                    setDestino(e.id)
                  }}
                  onDragLeave={() => setDestino((d) => (d === e.id ? null : d))}
                  onDrop={() => soltar(e.id)}
                >
                  <div className="a-col__top">
                    <span
                      className="a-punto"
                      style={{ "--tono": e.tono } as React.CSSProperties}
                    />
                    {e.label}
                    <span className="a-col__cuenta a-num">{columna.length}</span>
                  </div>

                  {plata > 0 ? <div className="a-col__monto">{monto(plata)}</div> : null}

                  {columna.map((l) => (
                    <Tarjeta
                      key={l.id}
                      lead={l}
                      abrir={() => setAbierto(l.id)}
                      arrastrando={llevando === l.id}
                      onArrastrar={setLlevando}
                    />
                  ))}

                  <button
                    type="button"
                    className="a-btn a-btn--fantasma a-btn--sm a-col__add"
                    onClick={() => setNuevo(e.id)}
                  >
                    <Plus size={14} /> Agregar
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="a-glass a-card">
            <div className="a-wrap-tabla">
              <table className="a-tabla">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Estado</th>
                    <th>Último contacto</th>
                    <th>Próximo</th>
                    <th>Lo sigue</th>
                    <th>Entró por</th>
                    <th style={{ textAlign: "right" }}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((l) => (
                    <tr key={l.id} onClick={() => setAbierto(l.id)}>
                      <td>
                        <div className="a-tabla__empresa">
                          {frio(l) ? (
                            <span
                              className="a-frio"
                              style={{ display: "inline-block", marginRight: 6 }}
                            />
                          ) : null}
                          {l.empresa}
                        </div>
                        <div className="a-tabla__sub">{l.contacto ?? "Sin contacto"}</div>
                      </td>
                      <td>
                        <ChipEstado estado={l.estado} />
                      </td>
                      <td className="a-tabla__sub">
                        {hace(l.ultimo_contacto)}
                        <div style={{ fontSize: 11 }}>{corta(l.ultimo_contacto)}</div>
                      </td>
                      <td>
                        {l.proximo_seguimiento ? (
                          <span
                            className={`a-chip${vencida(l.proximo_seguimiento) ? " a-chip--bad" : ""}`}
                          >
                            {cuando(l.proximo_seguimiento)}
                          </span>
                        ) : (
                          <span className="a-tabla__sub">—</span>
                        )}
                      </td>
                      <td>
                        {l.responsable_id ? (
                          <span
                            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                          >
                            <Avatar chico nombre={nombreDe(l.responsable_id)} />
                            {nombreDe(l.responsable_id)}
                          </span>
                        ) : (
                          <span className="a-tabla__sub">Sin asignar</span>
                        )}
                      </td>
                      <td className="a-tabla__sub">{origenLabel(l.origen)}</td>
                      <td className="a-num" style={{ textAlign: "right" }}>
                        {monto(l.valor_estimado, l.moneda)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtrados.length === 0 ? (
              <Vacio chico titulo="Nada con esa búsqueda" texto="Probá con otra palabra." />
            ) : null}
          </div>
        )}
      </div>

      {nuevo ? <FormLead estadoInicial={nuevo} cerrar={() => setNuevo(null)} /> : null}
      {lead ? <PanelLead lead={lead} cerrar={() => setAbierto(null)} /> : null}
      {aConfirmar ? (
        <FormConfirmar lead={aConfirmar} cerrar={() => setConfirmando(null)} />
      ) : null}
    </Shell>
  )
}

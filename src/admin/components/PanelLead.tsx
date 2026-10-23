import {
  Building2,
  CalendarClock,
  CheckSquare,
  FileText,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"

import {
  estados,
  movimientos as tiposMovimiento,
  origenLabel,
  type EstadoLead,
  type TipoMovimiento,
} from "../config"
import { corta, cuando, enDias, hace, larga, monto, vencida } from "../lib/fechas"
import type { Lead, Movimiento } from "../lib/types"
import { useDatos, useNombre } from "../state/DataContext"

import { FormLead } from "./FormLead"
import { FormTarea } from "./FormTarea"
import { Panel, Vacio } from "./piezas"

const iconoMov: Record<TipoMovimiento, typeof Phone> = {
  nota: FileText,
  llamada: Phone,
  reunion: Users,
  mail: Mail,
  whatsapp: MessageCircle,
  propuesta: Send,
  estado: CalendarClock,
}

/** Solo dígitos: es lo que quiere wa.me. */
const aWhatsapp = (tel: string) => tel.replace(/\D/g, "")

export function PanelLead({ lead, cerrar }: { lead: Lead; cerrar: () => void }) {
  const { tareas, editarLead, borrarLead, movimientosDe, registrar, alternarTarea } = useDatos()
  const nombreDe = useNombre()

  const [historia, setHistoria] = useState<Movimiento[] | null>(null)
  const [tipo, setTipo] = useState<TipoMovimiento>("whatsapp")
  const [texto, setTexto] = useState("")
  const [editando, setEditando] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState(false)
  const [confirmar, setConfirmar] = useState(false)

  const recargarHistoria = () => void movimientosDe(lead.id).then(setHistoria)

  useEffect(() => {
    let vivo = true
    setHistoria(null)
    void movimientosDe(lead.id).then((m) => vivo && setHistoria(m))
    return () => {
      vivo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead.id])

  const suyas = tareas.filter((t) => t.lead_id === lead.id)
  const pendientes = suyas.filter((t) => !t.hecha)

  async function anotar(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim()) return
    await registrar(lead.id, tipo, texto.trim())
    setTexto("")
    recargarHistoria()
  }

  return (
    <Panel cerrar={cerrar} etiqueta={`Lead ${lead.empresa}`}>
      <div className="a-sheet__top">
        <span className="a-kpi__icono" style={{ marginBottom: 0 }}>
          <Building2 size={15} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "16px", fontWeight: 620, letterSpacing: "-0.028em" }}>
            {lead.empresa}
          </div>
          <div style={{ fontSize: "12.5px", color: "var(--a-ink-faint)" }}>
            {lead.contacto ?? "Sin contacto"} · entró por {origenLabel(lead.origen)}
          </div>
        </div>
        <button
          type="button"
          className="a-btn a-btn--fantasma a-btn--icono"
          onClick={() => setEditando(true)}
          title="Editar"
        >
          <Pencil size={15} />
        </button>
        <button type="button" className="a-btn a-btn--fantasma a-btn--icono" onClick={cerrar}>
          <X size={17} />
        </button>
      </div>

      <div className="a-sheet__cuerpo">
        {/* El estado se cambia acá mismo: es el gesto más frecuente. */}
        <div style={{ marginBottom: 16 }}>
          <div className="a-seg" style={{ flexWrap: "wrap", display: "flex" }}>
            {estados.map((e) => (
              <button
                key={e.id}
                type="button"
                className={lead.estado === e.id ? "is-on" : ""}
                onClick={() => void editarLead(lead.id, { estado: e.id as EstadoLead })}
              >
                {e.corto}
              </button>
            ))}
          </div>
        </div>

        <div className="a-datos">
          <div className="a-dato">
            <span>Último contacto</span>
            <b style={{ color: lead.ultimo_contacto ? undefined : "var(--a-bad)" }}>
              {hace(lead.ultimo_contacto)}
            </b>
          </div>
          <div className="a-dato">
            <span>Próximo seguimiento</span>
            <b style={{ color: vencida(lead.proximo_seguimiento) ? "var(--a-bad)" : undefined }}>
              {cuando(lead.proximo_seguimiento)}
            </b>
          </div>
          <div className="a-dato">
            <span>Valor estimado</span>
            <b>{monto(lead.valor_estimado, lead.moneda)}</b>
          </div>
          <div className="a-dato">
            <span>Lo sigue</span>
            <b>{nombreDe(lead.responsable_id)}</b>
          </div>
        </div>

        {/* Agendar el próximo toque sin salir de acá. */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "var(--a-ink-faint)", alignSelf: "center" }}>
            Volver a hablar:
          </span>
          {[
            { label: "Mañana", dias: 1 },
            { label: "En 3 días", dias: 3 },
            { label: "En una semana", dias: 7 },
            { label: "En 15 días", dias: 15 },
          ].map((o) => (
            <button
              key={o.dias}
              type="button"
              className="a-btn a-btn--sm"
              onClick={() => void editarLead(lead.id, { proximo_seguimiento: enDias(o.dias) })}
            >
              {o.label}
            </button>
          ))}
        </div>

        {(lead.telefono || lead.email) && (
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {lead.telefono ? (
              <a
                className="a-btn"
                href={`https://wa.me/${aWhatsapp(lead.telefono)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            ) : null}
            {lead.email ? (
              <a className="a-btn" href={`mailto:${lead.email}`}>
                <Mail size={15} /> Mail
              </a>
            ) : null}
            {lead.telefono ? (
              <a className="a-btn" href={`tel:${lead.telefono}`}>
                <Phone size={15} /> Llamar
              </a>
            ) : null}
          </div>
        )}

        {lead.notas ? (
          <div className="a-dato" style={{ marginBottom: 18 }}>
            <span>Notas</span>
            <b style={{ fontWeight: 440, whiteSpace: "pre-wrap" }}>{lead.notas}</b>
          </div>
        ) : null}

        {/* ── Tareas del lead ── */}
        <div className="a-card__top" style={{ marginBottom: 10 }}>
          <h2 style={{ fontSize: "13px" }}>
            Tareas {pendientes.length > 0 ? `(${pendientes.length})` : ""}
          </h2>
          <button
            type="button"
            className="a-btn a-btn--sm"
            onClick={() => setNuevaTarea(true)}
          >
            <Plus size={14} /> Agregar
          </button>
        </div>

        {suyas.length === 0 ? (
          <Vacio
            chico
            icono={<CheckSquare size={20} />}
            titulo="Sin tareas"
            texto="Lo que haya que hacer con este lead va acá."
          />
        ) : (
          <div className="a-lista" style={{ marginBottom: 18 }}>
            {suyas.map((t) => (
              <div key={t.id} className={`a-tarea${t.hecha ? " is-hecha" : ""}`}>
                <button
                  type="button"
                  className={`a-check${t.hecha ? " is-on" : ""}`}
                  onClick={() => void alternarTarea(t.id, !t.hecha)}
                  aria-label={t.hecha ? "Marcar como pendiente" : "Marcar como hecha"}
                >
                  <CheckSquare size={12} strokeWidth={3} />
                </button>
                <div className="a-tarea__cuerpo">
                  <div className="a-tarea__titulo">{t.titulo}</div>
                  {t.vence ? (
                    <div className="a-tarea__meta">
                      <span
                        className={`a-chip${!t.hecha && vencida(t.vence) ? " a-chip--bad" : ""}`}
                      >
                        {cuando(t.vence)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Historia ── */}
        <div className="a-card__top" style={{ marginTop: 20, marginBottom: 10 }}>
          <h2 style={{ fontSize: "13px" }}>Historia</h2>
        </div>

        <form onSubmit={anotar} style={{ display: "grid", gap: 8, marginBottom: 16 }}>
          <div className="a-seg" style={{ flexWrap: "wrap", display: "flex" }}>
            {tiposMovimiento
              .filter((m) => m.id !== "estado")
              .map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={tipo === m.id ? "is-on" : ""}
                  onClick={() => setTipo(m.id)}
                >
                  {m.label}
                </button>
              ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="a-input"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Qué se habló"
            />
            <button type="submit" className="a-btn a-btn--primario" disabled={!texto.trim()}>
              <Send size={14} />
            </button>
          </div>
        </form>

        {historia === null ? (
          <div className="a-skel" style={{ height: 70 }} />
        ) : historia.length === 0 ? (
          <Vacio
            chico
            titulo="Todavía no hay movimientos"
            texto="Cada vez que hablen, anotalo acá y la fecha de último contacto se actualiza sola."
          />
        ) : (
          <div className="a-timeline">
            {historia.map((m) => {
              const Icono = iconoMov[m.tipo] ?? FileText
              return (
                <div key={m.id} className="a-mov">
                  <span className="a-mov__icono">
                    <Icono size={13} />
                  </span>
                  <div>
                    <div className="a-mov__texto">{m.detalle}</div>
                    <div className="a-mov__meta">
                      {tiposMovimiento.find((t) => t.id === m.tipo)?.label} ·{" "}
                      {larga(m.creado_en)}
                      {m.autor_id ? ` · ${nombreDe(m.autor_id)}` : ""}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="a-sheet__pie">
        <span style={{ fontSize: 11.5, color: "var(--a-ink-faint)" }}>
          Creado el {corta(lead.creado_en)}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {confirmar ? (
            <>
              <button
                type="button"
                className="a-btn a-btn--sm a-btn--fantasma"
                onClick={() => setConfirmar(false)}
              >
                No
              </button>
              <button
                type="button"
                className="a-btn a-btn--sm a-btn--peligro"
                onClick={async () => {
                  await borrarLead(lead.id)
                  cerrar()
                }}
              >
                Sí, borrar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="a-btn a-btn--sm a-btn--fantasma"
              onClick={() => setConfirmar(true)}
            >
              <Trash2 size={14} /> Borrar
            </button>
          )}
        </div>
      </div>

      {editando ? <FormLead lead={lead} cerrar={() => setEditando(false)} /> : null}
      {nuevaTarea ? <FormTarea leadId={lead.id} cerrar={() => setNuevaTarea(false)} /> : null}
    </Panel>
  )
}

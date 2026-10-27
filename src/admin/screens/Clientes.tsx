import { Building2, Pencil, Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"

import { FormCliente } from "../components/FormCliente"
import { ChipEstado, Vacio } from "../components/piezas"
import { Shell } from "../components/Shell"
import { estadoProyectoLabel, estadoProyectoTono } from "../config"
import { corta, cuando, enDias, hace, monto, vencida } from "../lib/fechas"
import type { Cliente } from "../lib/types"
import { useDatos, useNombre } from "../state/DataContext"

/**
 * Los clientes: lo que persiste cuando el lead ya se ganó o se perdió.
 *
 * La pantalla se arma alrededor de dos preguntas: qué nos dejó cada uno, y a
 * quién hace rato que no le hablamos. Por eso cada ficha muestra sus
 * proyectos y su seguimiento en el mismo lugar.
 */
function Ficha({ cliente, editar }: { cliente: Cliente; editar: () => void }) {
  const { proyectos, leads, editarCliente } = useDatos()
  const nombreDe = useNombre()

  const suyos = proyectos.filter((p) => p.cliente_id === cliente.id)
  const abiertos = leads.filter(
    (l) => l.cliente_id === cliente.id && l.estado !== "ganado" && l.estado !== "perdido",
  )

  const generado = suyos.filter((p) => p.cuenta_generado).reduce((s, p) => s + p.monto_usd, 0)
  const arr = suyos.filter((p) => p.cuenta_arr).reduce((s, p) => s + p.arr_usd, 0)
  const horas = suyos.reduce((s, p) => s + (p.horas || 0), 0)

  return (
    <div className="a-glass a-card">
      <div className="a-card__top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {vencida(cliente.proximo_seguimiento) ? <span className="a-frio" /> : null}
            {cliente.nombre}
            {cliente.comercial ? null : <span className="a-chip">Interno</span>}
          </h2>
          <div style={{ fontSize: 12, color: "var(--a-ink-faint)", marginTop: 2 }}>
            {cliente.contacto ? `${cliente.contacto} · ` : ""}
            {suyos.length} {suyos.length === 1 ? "proyecto" : "proyectos"}
            {horas > 0 ? ` · ${horas} h` : ""}
          </div>
        </div>
        <button type="button" className="a-btn a-btn--sm a-btn--fantasma" onClick={editar}>
          <Pencil size={14} /> Editar
        </button>
      </div>

      <div className="a-datos" style={{ marginBottom: 12 }}>
        <div className="a-dato">
          <span>Generado</span>
          <b>{monto(generado)}</b>
        </div>
        <div className="a-dato">
          <span>Mantenimiento</span>
          <b>{arr ? `${monto(arr)} / año` : "—"}</b>
        </div>
        <div className="a-dato">
          <span>Último contacto</span>
          <b style={{ color: cliente.ultimo_contacto ? undefined : "var(--a-bad)" }}>
            {hace(cliente.ultimo_contacto)}
          </b>
        </div>
        <div className="a-dato">
          <span>Volver a hablarle</span>
          <b style={{ color: vencida(cliente.proximo_seguimiento) ? "var(--a-bad)" : undefined }}>
            {cuando(cliente.proximo_seguimiento)}
          </b>
        </div>
      </div>

      {/* Agendar el próximo toque sin abrir el formulario. */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--a-ink-faint)", alignSelf: "center" }}>
          Volver a hablarle:
        </span>
        {[
          { label: "En un mes", dias: 30 },
          { label: "En 3 meses", dias: 90 },
          { label: "En 6 meses", dias: 180 },
        ].map((o) => (
          <button
            key={o.dias}
            type="button"
            className="a-btn a-btn--sm"
            onClick={() =>
              void editarCliente(cliente.id, { proximo_seguimiento: enDias(o.dias) })
            }
          >
            {o.label}
          </button>
        ))}
      </div>

      {suyos.length > 0 ? (
        <div className="a-lista">
          {suyos.map((p) => (
            <div key={p.id} className="a-tarea">
              <div className="a-tarea__cuerpo">
                <div className="a-tarea__titulo">{p.nombre}</div>
                <div className="a-tarea__meta">
                  <span
                    className="a-chip a-chip--estado"
                    style={{ "--tono": estadoProyectoTono(p.estado) } as React.CSSProperties}
                  >
                    {estadoProyectoLabel(p.estado)}
                  </span>
                  <span className="a-chip">{corta(p.confirmado_en)}</span>
                  <span className="a-lead__valor">{monto(p.monto_usd)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {abiertos.length > 0 ? (
        <>
          <div className="a-lista__titulo" style={{ marginTop: 12 }}>
            Pedidos abiertos
            <span className="a-col__cuenta">{abiertos.length}</span>
          </div>
          <div className="a-lista">
            {abiertos.map((l) => (
              <div key={l.id} className="a-tarea">
                <div className="a-tarea__cuerpo">
                  <div className="a-tarea__titulo">{l.empresa}</div>
                  <div className="a-tarea__meta">
                    <ChipEstado estado={l.estado} />
                    <span className="a-lead__valor">{monto(l.valor_estimado, l.moneda)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {cliente.notas ? (
        <p style={{ fontSize: 12.5, color: "var(--a-ink-faint)", margin: "12px 0 0" }}>
          {cliente.notas}
        </p>
      ) : null}

      <div style={{ fontSize: 11.5, color: "var(--a-ink-faint)", marginTop: 10 }}>
        Lo sigue {nombreDe(cliente.responsable_id)}
      </div>
    </div>
  )
}

export function Clientes() {
  const { clientes, cargando, modeloListo } = useDatos()

  const [busca, setBusca] = useState("")
  const [verInternos, setVerInternos] = useState(false)
  const [nuevo, setNuevo] = useState(false)
  const [editando, setEditando] = useState<Cliente | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return clientes
      .filter((c) => verInternos || c.comercial)
      .filter((c) =>
        !q
          ? true
          : [c.nombre, c.contacto, c.email, c.notas]
              .filter(Boolean)
              .some((campo) => (campo as string).toLowerCase().includes(q)),
      )
      // Primero los que hay que atender.
      .sort((a, b) => {
        const va = vencida(a.proximo_seguimiento) ? 0 : 1
        const vb = vencida(b.proximo_seguimiento) ? 0 : 1
        return va - vb || a.nombre.localeCompare(b.nombre)
      })
  }, [clientes, busca, verInternos])

  const internos = clientes.filter((c) => !c.comercial).length

  return (
    <Shell
      titulo="Clientes"
      bajada={modeloListo ? `${filtrados.length} en total` : "Falta correr la migración."}
      acciones={
        <>
          <div className="a-buscador">
            <Search size={15} />
            <input
              className="a-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar cliente…"
            />
          </div>
          {internos > 0 ? (
            <div className="a-seg">
              <button
                type="button"
                className={verInternos ? "" : "is-on"}
                onClick={() => setVerInternos(false)}
              >
                Comerciales
              </button>
              <button
                type="button"
                className={verInternos ? "is-on" : ""}
                onClick={() => setVerInternos(true)}
              >
                Todos
              </button>
            </div>
          ) : null}
          <button
            type="button"
            className="a-btn a-btn--primario"
            onClick={() => setNuevo(true)}
            disabled={!modeloListo}
          >
            <Plus size={15} /> Cliente
          </button>
        </>
      }
    >
      <div className="a-scroll">
        {cargando ? (
          <div className="a-skel" style={{ height: 280 }} />
        ) : !modeloListo ? (
          <Vacio
            icono={<Building2 size={22} />}
            titulo="Todavía no hay clientes"
            texto="Falta correr la migración 0005 en el SQL Editor de Supabase."
          />
        ) : filtrados.length === 0 ? (
          <Vacio
            icono={<Building2 size={22} />}
            titulo={busca ? "Nada con esa búsqueda" : "Ningún cliente todavía"}
            texto={
              busca
                ? "Probá con otra palabra."
                : "Cuando ganes un lead, su cliente se crea solo."
            }
          />
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {filtrados.map((c) => (
              <Ficha key={c.id} cliente={c} editar={() => setEditando(c)} />
            ))}
          </div>
        )}
      </div>

      {nuevo ? <FormCliente cerrar={() => setNuevo(false)} /> : null}
      {editando ? (
        <FormCliente cliente={editando} cerrar={() => setEditando(null)} />
      ) : null}
    </Shell>
  )
}

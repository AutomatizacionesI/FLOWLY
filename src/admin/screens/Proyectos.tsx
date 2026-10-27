import { Briefcase, Search } from "lucide-react"
import { useMemo, useState } from "react"

import { PanelProyecto } from "../components/PanelProyecto"
import { Punto, Vacio } from "../components/piezas"
import { Shell } from "../components/Shell"
import { estadoProyectoLabel, estadoProyectoTono } from "../config"
import { corta, monto } from "../lib/fechas"
import { useDatos } from "../state/DataContext"

/**
 * Los trabajos confirmados, con lo que dejaron y lo que costaron.
 *
 * Va en tabla y no en tarjetas: acá lo que se compara son números entre
 * filas, y para eso una tabla se lee mucho mejor que un tablero.
 */
export function Proyectos() {
  const { proyectos, cargando, modeloListo } = useDatos()

  const [busca, setBusca] = useState("")
  const [verInternos, setVerInternos] = useState(false)
  const [abierto, setAbierto] = useState<string | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return proyectos
      .filter((p) => verInternos || p.comercial)
      .filter((p) =>
        !q
          ? true
          : [p.nombre, p.cliente, p.notas]
              .filter(Boolean)
              .some((campo) => (campo as string).toLowerCase().includes(q)),
      )
  }, [proyectos, busca, verInternos])

  const totales = useMemo(
    () => ({
      generado: filtrados.filter((p) => p.cuenta_generado).reduce((s, p) => s + p.monto_usd, 0),
      horas: filtrados.reduce((s, p) => s + (p.horas || 0), 0),
      margen: filtrados.filter((p) => p.cuenta_generado).reduce((s, p) => s + p.margen_usd, 0),
    }),
    [filtrados],
  )

  const proyecto = proyectos.find((p) => p.id === abierto)
  const internos = proyectos.filter((p) => !p.comercial).length

  return (
    <Shell
      titulo="Proyectos"
      bajada={
        modeloListo
          ? `${filtrados.length} en total · ${monto(totales.generado)} generado · ${totales.horas} h`
          : "Falta correr la migración de clientes y proyectos."
      }
      acciones={
        <>
          <div className="a-buscador">
            <Search size={15} />
            <input
              className="a-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar proyecto o cliente…"
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
        </>
      }
    >
      <div className="a-scroll">
        {cargando ? (
          <div className="a-skel" style={{ height: 320 }} />
        ) : !modeloListo ? (
          <Vacio
            icono={<Briefcase size={22} />}
            titulo="Todavía no hay proyectos"
            texto="Falta correr la migración 0005 en el SQL Editor de Supabase."
          />
        ) : filtrados.length === 0 ? (
          <Vacio
            icono={<Briefcase size={22} />}
            titulo={busca ? "Nada con esa búsqueda" : "Ningún proyecto todavía"}
            texto={
              busca
                ? "Probá con otra palabra."
                : "Cuando ganes un lead y le pongas monto, el proyecto aparece acá."
            }
          />
        ) : (
          <div className="a-glass a-card">
            <div className="a-wrap-tabla">
              <table className="a-tabla">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Estado</th>
                    <th style={{ textAlign: "right" }}>Monto</th>
                    <th style={{ textAlign: "right" }}>Horas</th>
                    <th style={{ textAlign: "right" }}>US$/h</th>
                    <th style={{ textAlign: "right" }}>Margen</th>
                    <th style={{ textAlign: "right" }}>Mant.</th>
                    <th>Confirmado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((p) => (
                    <tr key={p.id} onClick={() => setAbierto(p.id)}>
                      <td>
                        <div className="a-tabla__empresa">{p.nombre}</div>
                        <div className="a-tabla__sub">
                          {p.cliente}
                          {p.comercial ? "" : " · interno"}
                        </div>
                      </td>
                      <td>
                        <span
                          className="a-chip a-chip--estado"
                          style={
                            { "--tono": estadoProyectoTono(p.estado) } as React.CSSProperties
                          }
                        >
                          {estadoProyectoLabel(p.estado)}
                        </span>
                      </td>
                      <td className="a-num" style={{ textAlign: "right" }}>
                        {monto(p.monto_usd)}
                      </td>
                      <td className="a-num" style={{ textAlign: "right" }}>
                        {p.horas ? `${p.horas} h` : "—"}
                      </td>
                      <td className="a-num" style={{ textAlign: "right" }}>
                        {p.usd_por_hora ? monto(p.usd_por_hora) : "—"}
                      </td>
                      <td
                        className="a-num"
                        style={{
                          textAlign: "right",
                          color: p.margen_usd < 0 ? "var(--a-bad)" : undefined,
                        }}
                      >
                        {monto(p.margen_usd)}
                      </td>
                      <td className="a-num" style={{ textAlign: "right" }}>
                        {p.arr_usd ? (
                          <span style={{ opacity: p.cuenta_arr ? 1 : 0.45 }}>
                            {monto(p.arr_usd)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="a-tabla__sub">{corta(p.confirmado_en)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} style={{ color: "var(--a-ink-faint)", fontSize: 12 }}>
                      <Punto tono="var(--a-verde)" /> Lo que cuenta para el generado
                    </td>
                    <td className="a-num" style={{ textAlign: "right", fontWeight: 600 }}>
                      {monto(totales.generado)}
                    </td>
                    <td className="a-num" style={{ textAlign: "right", fontWeight: 600 }}>
                      {totales.horas} h
                    </td>
                    <td />
                    <td className="a-num" style={{ textAlign: "right", fontWeight: 600 }}>
                      {monto(totales.margen)}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>

      {proyecto ? <PanelProyecto proyecto={proyecto} cerrar={() => setAbierto(null)} /> : null}
    </Shell>
  )
}

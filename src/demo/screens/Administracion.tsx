import { Plus } from "lucide-react"
import { useState } from "react"

import { PageHead } from "../components/Screen"
import { clients, people, workTypes, type Client } from "../data/demoData"
import { useDemo } from "../state/DemoContext"

type Tab = "usuarios" | "equipos" | "trabajos"

const tabs: Array<[Tab, string]> = [
  ["usuarios", "Usuarios y roles"],
  ["equipos", "Equipos"],
  ["trabajos", "Tipos de trabajo"],
]

export function Administracion() {
  const { toast } = useDemo()
  const [tab, setTab] = useState<Tab>("usuarios")

  // La matriz de equipos se edita de verdad dentro de la sesión.
  const [teams, setTeams] = useState<Record<string, string[]>>(
    Object.fromEntries(clients.map((client) => [client.id, client.teamIds])),
  )

  const contadores = people.filter((person) => person.role === "contador")

  /** Rota entre: sin asignar → miembro → responsable → sin asignar. */
  const cycle = (client: Client, personId: string) => {
    setTeams((current) => {
      const team = current[client.id] ?? []
      const isOwner = team[0] === personId
      const isMember = team.includes(personId)

      if (!isMember) return { ...current, [client.id]: [...team, personId] }
      if (!isOwner) return { ...current, [client.id]: [personId, ...team.filter((id) => id !== personId)] }
      return { ...current, [client.id]: team.filter((id) => id !== personId) }
    })
  }

  return (
    <>
      <PageHead
        title="Administración"
        sub="Usuarios, equipos y tipos de trabajo · datos de ejemplo"
      />

      <div className="d-card">
        <div className="d-card__head">
          <div className="d-row" style={{ gap: 4, flexWrap: "wrap" }}>
            {tabs.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`d-btn d-btn--sm ${tab === key ? "d-btn--primary" : "d-btn--ghost"}`}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="d-btn d-btn--ghost d-btn--sm"
            onClick={() => toast("En tu sistema esto abre el alta. En la demo no se guarda nada.")}
          >
            <Plus size={13} />
            Agregar
          </button>
        </div>

        {tab === "usuarios" ? (
          <table className="d-table">
            <thead>
              <tr>
                <th>Persona</th>
                <th>Rol</th>
                <th className="is-num">Clientes a cargo</th>
                <th>Acceso</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => {
                const owned = Object.values(teams).filter((team) => team[0] === person.id).length
                return (
                  <tr key={person.id}>
                    <td style={{ fontWeight: 500 }}>{person.name}</td>
                    <td>
                      <span
                        className={person.role === "socio" ? "d-chip d-chip--green" : "d-chip"}
                      >
                        {person.title}
                      </span>
                    </td>
                    <td className="is-num">{owned}</td>
                    <td className="d-muted" style={{ fontSize: 12 }}>
                      {person.role === "socio"
                        ? "Todo el sistema"
                        : "Sus clientes, sus horas y sus facturas"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : null}

        {tab === "equipos" ? (
          <>
            <p className="d-muted" style={{ marginBottom: 13, fontSize: 12.5, lineHeight: 1.6 }}>
              Tocá una celda para rotar entre sin asignar, miembro y responsable. De esto dependen
              los permisos de cada contador.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table className="d-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    {contadores.map((person) => (
                      <th key={person.id} style={{ textAlign: "center" }}>
                        {person.initials}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    const team = teams[client.id] ?? []
                    return (
                      <tr key={client.id}>
                        <td style={{ fontWeight: 500 }}>{client.name}</td>
                        {contadores.map((person) => {
                          const isOwner = team[0] === person.id
                          const isMember = team.includes(person.id)
                          return (
                            <td key={person.id} style={{ textAlign: "center" }}>
                              <button
                                type="button"
                                className={
                                  isOwner
                                    ? "d-chip d-chip--green"
                                    : isMember
                                      ? "d-chip"
                                      : "d-chip"
                                }
                                style={
                                  isMember
                                    ? { cursor: "pointer" }
                                    : {
                                        cursor: "pointer",
                                        background: "transparent",
                                        color: "#c3c0b6",
                                        border: "1px dashed var(--d-line)",
                                      }
                                }
                                onClick={() => cycle(client, person.id)}
                                aria-label={`${person.name} en ${client.name}: ${
                                  isOwner ? "responsable" : isMember ? "miembro" : "sin asignar"
                                }`}
                              >
                                {isOwner ? "Responsable" : isMember ? "Miembro" : "—"}
                              </button>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {tab === "trabajos" ? (
          <table className="d-table">
            <thead>
              <tr>
                <th>Tipo de trabajo</th>
                <th>Color en los gráficos</th>
                <th>Se usa en</th>
              </tr>
            </thead>
            <tbody>
              {workTypes.map((type) => (
                <tr key={type.id}>
                  <td style={{ fontWeight: 500 }}>{type.name}</td>
                  <td>
                    <span className="d-row" style={{ gap: 8 }}>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: 4,
                          background: type.color,
                        }}
                      />
                      <span className="d-muted d-num" style={{ fontSize: 12 }}>
                        {type.color}
                      </span>
                    </span>
                  </td>
                  <td className="d-muted" style={{ fontSize: 12 }}>
                    Horas, tareas y reportes
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  )
}

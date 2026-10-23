import { AlertCircle, Loader2, Zap } from "lucide-react"
import { useState } from "react"

import { Campo } from "../components/piezas"
import { useAuth } from "../state/AuthContext"

/**
 * Puerta del panel. No hay registro: los dos usuarios se crean a mano desde
 * Supabase, así nadie que caiga en /admin de casualidad puede entrar.
 */
export function Login() {
  const { entrar } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [entrando, setEntrando] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (entrando) return

    setEntrando(true)
    setError(null)
    const falla = await entrar(email.trim(), password)
    if (falla) {
      setError(falla)
      setEntrando(false)
    }
  }

  return (
    <div className="a-login">
      <div className="a-glass a-login__caja">
        <span className="a-login__marca">
          <Zap size={22} strokeWidth={2.4} />
        </span>

        <h1>Panel de Spike</h1>
        <p>Leads y tareas del equipo.</p>

        <form className="a-login__form" onSubmit={enviar}>
          <Campo label="Mail">
            <input
              className="a-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vos@spike.com"
              autoComplete="username"
              autoFocus
              required
            />
          </Campo>

          <Campo label="Contraseña">
            <input
              className="a-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </Campo>

          {error ? (
            <div className="a-aviso">
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          ) : null}

          <button type="submit" className="a-btn a-btn--primario" disabled={entrando}>
            {entrando ? (
              <>
                <Loader2 size={15} className="a-girando" /> Entrando
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="a-login__pie">
          Panel interno. No se enlaza desde el sitio ni se indexa.
        </div>
      </div>
    </div>
  )
}

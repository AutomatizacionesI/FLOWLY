import { KeyRound } from "lucide-react"

/**
 * Lo que se ve si el panel todavía no tiene las credenciales de Supabase.
 * Mejor esto que una pantalla en blanco: dice exactamente qué falta.
 */
export function Setup() {
  return (
    <div className="a-setup">
      <div className="a-glass a-setup__caja">
        <span className="a-kpi__icono">
          <KeyRound size={15} />
        </span>

        <h1>Falta conectar Supabase</h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--a-ink-faint)" }}>
          El panel está listo; solo le faltan las credenciales del proyecto.
        </p>

        <ol>
          <li>
            Creá un proyecto en <code>supabase.com</code> (región más cercana: São Paulo).
          </li>
          <li>
            En el SQL Editor, pegá y corré el archivo{" "}
            <code>supabase/migrations/0001_panel_admin.sql</code> del repo.
          </li>
          <li>
            En <strong>Authentication → Users</strong>, creá un usuario por persona con
            &ldquo;Create new user&rdquo; y su contraseña. En{" "}
            <strong>Authentication → Sign In / Providers</strong>, dejá el registro cerrado.
          </li>
          <li>
            Copiá la URL y la <code>anon key</code> de <strong>Settings → API</strong> a un
            archivo <code>.env.local</code> en la raíz del proyecto:
            <pre className="a-pre">
              {"VITE_SUPABASE_URL=https://xxxx.supabase.co\nVITE_SUPABASE_ANON_KEY=eyJ..."}
            </pre>
          </li>
          <li>
            Reiniciá <code>npm run dev</code>. En Vercel, las mismas dos variables van en
            Settings → Environment Variables.
          </li>
        </ol>
      </div>
    </div>
  )
}

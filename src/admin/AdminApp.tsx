import { AlertCircle, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { ADMIN_BASE } from "./config"
import { configurado } from "./lib/supabase"
import { Clientes } from "./screens/Clientes"
import { Leads } from "./screens/Leads"
import { Login } from "./screens/Login"
import { Proyectos } from "./screens/Proyectos"
import { Resumen } from "./screens/Resumen"
import { Setup } from "./screens/Setup"
import { Tareas } from "./screens/Tareas"
import { AuthProvider, useAuth } from "./state/AuthContext"
import { DataProvider, useDatos } from "./state/DataContext"

import "./admin.css"

/**
 * Panel interno de Spike: leads, seguimiento y tareas.
 *
 * Vive en /admin, en su propio chunk. La landing no lo enlaza ni lo carga, y
 * el rewrite de vercel.json lo deja fuera de los buscadores. Sin sesión de
 * Supabase no se ve nada: la puerta es el login, y las policies de la base
 * cierran por detrás.
 */

/** Ni el panel ni su título salen en los buscadores. */
function useFueraDeBuscadores() {
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)

    const anterior = document.title
    document.title = "Panel · Spike"

    return () => {
      meta.remove()
      document.title = anterior
    }
  }, [])
}

/** Error de la base: faltan tablas, se cayó la conexión, etc. */
function Falla() {
  const { error, recargar } = useDatos()
  if (!error) return null

  return (
    <div className="a-aviso a-aviso--flotante" role="alert">
      <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
      <span style={{ flex: 1 }}>{error}</span>
      <button type="button" className="a-btn a-btn--sm" onClick={() => void recargar()}>
        Reintentar
      </button>
    </div>
  )
}

function Rutas() {
  const { session } = useAuth()

  // Todavía no sabemos si hay sesión guardada: no mostramos ni panel ni login.
  if (session === undefined) {
    return (
      <div className="a-login">
        <Loader2 size={22} className="a-girando" style={{ opacity: 0.5 }} />
      </div>
    )
  }

  if (session === null) return <Login />

  return (
    <DataProvider>
      <BrowserRouter basename={ADMIN_BASE}>
        <Falla />
        <Routes>
          <Route index element={<Navigate to="resumen" replace />} />
          <Route path="resumen" element={<Resumen />} />
          <Route path="leads" element={<Leads />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="tareas" element={<Tareas />} />
          <Route path="*" element={<Navigate to="resumen" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default function AdminApp() {
  useFueraDeBuscadores()

  return (
    <div className="a-root">
      <div className="a-aura">
        <span />
      </div>
      {configurado ? (
        <AuthProvider>
          <Rutas />
        </AuthProvider>
      ) : (
        <Setup />
      )}
    </div>
  )
}

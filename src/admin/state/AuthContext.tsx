import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import type { Perfil } from "../lib/types"
import { configurado, supabase } from "../lib/supabase"

type AuthValue = {
  /** null = sin sesión. undefined = todavía no sabemos. */
  session: Session | null | undefined
  perfil: Perfil | null
  entrar: (email: string, password: string) => Promise<string | null>
  salir: () => Promise<void>
  renombrar: (nombre: string) => Promise<void>
}

const Ctx = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(
    configurado ? undefined : null,
  )
  const [perfil, setPerfil] = useState<Perfil | null>(null)

  // Sesión guardada + cualquier cambio posterior (login, logout, refresh).
  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: sub } = supabase.auth.onAuthStateChange((_evento, nueva) => {
      setSession(nueva)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  // El perfil acompaña a la sesión: nombre y color para mostrar quién es quién.
  useEffect(() => {
    if (!supabase || !session?.user) {
      setPerfil(null)
      return
    }

    let vivo = true

    supabase
      .from("perfiles")
      .select("id, nombre, email, color")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!vivo) return
        setPerfil(
          (data as Perfil | null) ?? {
            id: session.user.id,
            nombre: session.user.email?.split("@")[0] ?? "Equipo",
            email: session.user.email ?? null,
            color: "#63e28f",
          },
        )
      })

    return () => {
      vivo = false
    }
  }, [session?.user])

  const value = useMemo<AuthValue>(
    () => ({
      session,
      perfil,

      async entrar(email, password) {
        if (!supabase) return "El panel todavía no tiene las credenciales de Supabase."
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error) return null
        return error.message === "Invalid login credentials"
          ? "Mail o contraseña incorrectos."
          : error.message
      },

      async salir() {
        await supabase?.auth.signOut()
      },

      async renombrar(nombre) {
        if (!supabase || !session?.user) return
        await supabase.from("perfiles").update({ nombre }).eq("id", session.user.id)
        setPerfil((p) => (p ? { ...p, nombre } : p))
      },
    }),
    [session, perfil],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useAuth fuera del AuthProvider")
  return ctx
}

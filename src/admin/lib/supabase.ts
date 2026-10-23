import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Cliente de Supabase del panel.
 *
 * Las credenciales salen de .env.local (no va al repo). Si todavía no están,
 * `supabase` queda en null y el panel muestra la pantalla de configuración en
 * vez de romper con una pantalla en blanco.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const configurado = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = configurado
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "spike-panel-auth",
      },
    })
  : null

/** Usar adentro de las pantallas, donde ya sabemos que hay sesión. */
export function db(): SupabaseClient {
  if (!supabase) throw new Error("Supabase sin configurar")
  return supabase
}

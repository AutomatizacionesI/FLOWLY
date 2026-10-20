import { useEffect } from "react"

/**
 * Cierra con la tecla Escape. Todo lo que se abre encima de la pantalla
 * (modales, fichas, avisos) tiene que poder cerrarse sin usar el mouse.
 */
export function useEscape(onClose: () => void) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])
}

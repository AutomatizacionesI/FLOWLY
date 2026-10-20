import { Lock } from "lucide-react"
import type { ReactNode } from "react"

import { texts } from "../config"
import { useDemo } from "../state/DemoContext"

/** Encabezado común de cada pantalla. */
export function PageHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="d-page-head">
      <h1 className="d-page-title">{title}</h1>
      {sub ? <p className="d-page-sub">{sub}</p> : null}
    </div>
  )
}

/**
 * Envuelve las pantallas que son solo para socios. Si entra un contador
 * (por el menú o pegando la URL), muestra un estado vacío amable, nunca un error.
 */
export function PartnersOnly({ children }: { children: ReactNode }) {
  const { role, setRole, toast } = useDemo()

  if (role === "socio") return <>{children}</>

  return (
    <div className="d-locked">
      <div className="d-locked__icon">
        <Lock size={20} />
      </div>
      <h2 style={{ marginTop: 16, fontSize: 17, fontWeight: 600 }}>{texts.lockedTitle}</h2>
      <p className="d-muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
        En el sistema real, cada persona ve lo que le corresponde según su rol en el estudio.
      </p>
      <button
        type="button"
        className="d-btn d-btn--primary"
        style={{ marginTop: 18 }}
        onClick={() => {
          setRole("socio")
          toast(texts.roleChanged("Socio"))
        }}
      >
        {texts.lockedAction}
      </button>
    </div>
  )
}

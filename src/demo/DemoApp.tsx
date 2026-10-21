import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { Shell } from "./components/Shell"
import { Tour } from "./components/Tour"
import { WelcomeModal } from "./components/WelcomeModal"
import { DEMO_BASE } from "./config"
import { allNavItems } from "./nav"
import { Screen } from "./screens"
import { DemoProvider } from "./state/DemoContext"

import "./demo.css"

/**
 * Demo clickeable de un sistema de gestión para estudios contables.
 * Vive aparte del resto del sitio: estilos propios, datos propios, sin red.
 */

/** La demo no se indexa hasta que Tatu lo apruebe. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)

    const previousTitle = document.title
    document.title = "Demo para estudios contables"

    return () => {
      meta.remove()
      document.title = previousTitle
    }
  }, [])
}

export default function DemoApp() {
  useNoIndex()

  return (
    <DemoProvider>
      <div className="demo-root">
        <BrowserRouter basename={DEMO_BASE}>
          <Shell>
            <Routes>
              <Route index element={<Navigate to="resumen" replace />} />
              {allNavItems.map((item) => (
                <Route key={item.path} path={item.path} element={<Screen item={item} />} />
              ))}
              <Route path="*" element={<Navigate to="resumen" replace />} />
            </Routes>
          </Shell>
          <WelcomeModal />
          <Tour />
        </BrowserRouter>
      </div>
    </DemoProvider>
  )
}

import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"

/**
 * El sitio y la demo contable se cargan por separado: cada uno es su propio
 * chunk, así la landing no arrastra el peso de la demo (ni la demo los
 * estilos de la landing).
 */

const isDemo = window.location.pathname.startsWith("/democontable")

const Landing = lazy(() => import("./Landing"))
const DemoApp = lazy(() => import("./demo/DemoApp"))

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={null}>{isDemo ? <DemoApp /> : <Landing />}</Suspense>
  </StrictMode>,
)

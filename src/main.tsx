import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"

/**
 * El sitio, la demo contable y el panel interno se cargan por separado: cada
 * uno es su propio chunk, así la landing no arrastra el peso de los otros (ni
 * ellos los estilos de la landing).
 */

const ruta = window.location.pathname
const isDemo = ruta.startsWith("/democontable")
const isAdmin = ruta.startsWith("/admin")

const Landing = lazy(() => import("./Landing"))
const DemoApp = lazy(() => import("./demo/DemoApp"))
const AdminApp = lazy(() => import("./admin/AdminApp"))

const App = isAdmin ? AdminApp : isDemo ? DemoApp : Landing

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)

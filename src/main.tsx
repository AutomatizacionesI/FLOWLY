import { StrictMode, Suspense, lazy } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

/**
 * El sitio, la demo contable y el panel interno se cargan por separado: cada
 * uno es su propio chunk, así la landing no arrastra el peso de los otros (ni
 * ellos los estilos de la landing).
 *
 * La landing viene prerenderizada en el HTML (ver `scripts/prerender.mjs`):
 * si `#root` ya trae contenido, React lo hidrata en vez de pintarlo de cero.
 * El panel y la demo no se prerenderizan; como comparten el mismo
 * `index.html`, vacían `#root` antes de montar.
 */

const ruta = window.location.pathname
const isDemo = ruta.startsWith("/democontable")
const isAdmin = ruta.startsWith("/admin")
const root = document.getElementById("root")!

if (!isAdmin && !isDemo && root.hasChildNodes()) {
  import("./Landing").then(({ default: Landing }) => {
    hydrateRoot(
      root,
      <StrictMode>
        <Landing />
      </StrictMode>,
    )
  })
} else {
  const Landing = lazy(() => import("./Landing"))
  const DemoApp = lazy(() => import("./demo/DemoApp"))
  const AdminApp = lazy(() => import("./admin/AdminApp"))

  const App = isAdmin ? AdminApp : isDemo ? DemoApp : Landing

  root.replaceChildren()
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </StrictMode>,
  )
}

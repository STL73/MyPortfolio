import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import Nav from "./components/Nav"
import RouteTransition from "./components/RouteTransition"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import { SectionThemeProvider } from "./context/SectionThemeContext"

// Home is eager: it is the route almost every visit starts on, so splitting it
// would only add a round trip before the first paint. Everything else is not.
const Footer = lazy(() => import("./sections/Footer"))
const MossCaseStudy = lazy(() => import("./pages/projects/Moss"))
const NotFound = lazy(() => import("./pages/NotFound"))

// Variant comparison page. Registered only in development, so it is never in a
// production bundle and never reachable on the live site. Delete it, and the
// route below, once the choices it exists to settle have been made.
const Lab = import.meta.env.DEV ? lazy(() => import("./pages/Lab")) : null

function App() {
  return (
    <>
      {/* Skip link. Visible only on focus, and ahead of the nav in the tab
          order so it is the first thing a keyboard reaches. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-on-accent focus:rounded-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Nav />

      {/* Nav and Footer sit outside the Routes because they are the same on
          every page. Only the middle changes. */}
      <SectionThemeProvider theme="dark">
        <main id="main-content" className="relative">
          {/* The fallback reserves a full viewport so the page does not jump
              as chunks arrive. */}
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <RouteTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/moss" element={<MossCaseStudy />} />
              {Lab && <Route path="/lab" element={<Lab />} />}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteTransition>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </SectionThemeProvider>
    </>
  )
}

export default App

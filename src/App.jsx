import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import Nav from "./components/Nav"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import { SectionThemeProvider } from "./context/SectionThemeContext"

// Home is eager: it is the route almost every visit starts on, so splitting it
// would only add a round trip before the first paint. Everything else is not.
const Footer = lazy(() => import("./sections/Footer"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <>
      {/* Skip link. Visible only on focus, and ahead of the nav in the tab
          order so it is the first thing a keyboard reaches. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-on-accent focus:rounded-md focus:font-semibold"
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
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

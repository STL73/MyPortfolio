import { lazy, Suspense } from "react"
import Hero from "./sections/Hero"
import Nav from "./components/Nav"
import { SectionThemeProvider } from "./context/SectionThemeContext"

const About = lazy(() => import("./sections/About"))
const Projects = lazy(() => import("./sections/Projects"))
const Skills = lazy(() => import("./sections/Skills"))
const Education = lazy(() => import("./sections/Education"))
const Contact = lazy(() => import("./sections/Contact"))
const Footer = lazy(() => import("./sections/Footer"))

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-indigo focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <Nav />
      {/* Single provider wraps all sections — context value is static "dark" */}
      <SectionThemeProvider theme="dark">
        <main id="main-content" className="relative">
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
            <Projects />
            <Skills />
            <Education />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </SectionThemeProvider>
    </>
  )
}

export default App

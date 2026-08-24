import { lazy } from "react"
import Hero from "../sections/Hero"

// Everything below the fold is code-split. Hero is the exception because it is
// the first thing painted -- lazy-loading it would trade a smaller entry chunk
// for a slower largest-contentful-paint, which is the wrong way round.
const About = lazy(() => import("../sections/About"))
const Projects = lazy(() => import("../sections/Projects"))
const Skills = lazy(() => import("../sections/Skills"))
const Education = lazy(() => import("../sections/Education"))
const Contact = lazy(() => import("../sections/Contact"))

/**
 * The landing page: the whole narrative in one scroll.
 *
 * A recruiter gives a portfolio well under a minute, so the story is not split
 * across tabs -- anything that needs a click is depth, not biography. The
 * project case studies are the only pages that earn their own route.
 */
// Projects sits above About deliberately. A recruiter wants evidence before
// biography: the work is the argument and the story is why it is credible,
// not the other way round. It also puts Moss -- the only live, shipped thing
// -- immediately below the fold.
const Home = () => (
  <>
    <Hero />
    <Projects />
    <About />
    <Skills />
    <Education />
    <Contact />
  </>
)

export default Home

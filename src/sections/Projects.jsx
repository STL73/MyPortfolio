import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "../components/ProjectCard"
import { projectsData } from "../constants"

const Projects = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".projects-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".projects-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = projectsData

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">What I&apos;ve built</div>
      <h2 id="projects-heading" className="section-title projects-title">
        My <span>Projects</span>
      </h2>

      {featured && <ProjectCard {...featured} featured={true} />}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects

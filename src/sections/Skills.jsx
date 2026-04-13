import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skillsData, MARQUEE_ITEMS } from "../constants"
import SkillCard from "../components/SkillCard"

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".skills-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".skills-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">What I work with</div>
      <h2 id="skills-heading" className="section-title skills-title">
        My <span>Skills</span>
      </h2>

      {/* 2×2 Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillsData.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>

      {/* Marquee strip */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-inner">
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="marquee-item">
                <span>◆</span> {item}
              </span>
            ))}
          </div>
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item) => (
              <span key={`${item}-2`} className="marquee-item">
                <span>◆</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

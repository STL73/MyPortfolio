import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import home1 from "../assets/images/home1.png"
import { PERSONAL } from "../constants"

const About = () => {
  const cvUrl = PERSONAL?.cv || "#"
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      })
        .fromTo(".about-title",      { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(".about-photo-col",  { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
        .fromTo(".about-content-col",{ x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
        .fromTo(".about-stat-card",  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.5)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" aria-labelledby="about-heading" style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="section-label about-title">Who I am</div>
      <h2 id="about-heading" className="section-title about-title">
        About <span>Me</span>
      </h2>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left — photo card */}
        <div style={{ position: "relative", maxWidth: "320px", margin: "0 auto" }} className="mb-10 md:mb-0 about-photo-col">
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "16px",
              border: "1px solid #1e293b",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={home1}
              alt="Slav Lambov — Frontend Developer"
              loading="lazy"
              width="320"
              height="400"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Bottom gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #080d1a88, transparent)",
              }}
            />
            {/* Name badge */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(8,13,26,0.9)",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                padding: "10px 20px",
                textAlign: "center",
                whiteSpace: "nowrap",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#f1f5f9",
                }}
              >
                Slav Lambov
              </div>
              <div style={{ fontSize: "11px", color: "#6366f1", marginTop: "2px" }}>
                Frontend Developer
              </div>
            </div>
          </div>
          {/* Decorative accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-16px",
              right: "-16px",
              width: "80px",
              height: "80px",
              background: "#6366f1",
              borderRadius: "16px",
              opacity: 0.15,
              zIndex: -1,
            }}
          />
        </div>

        {/* Right — content */}
        <div className="about-content-col">
          <p
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "20px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            I&apos;m a{" "}
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>Frontend Developer</strong>{" "}
            passionate about building polished, high-performance web experiences. I specialise in{" "}
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>React</strong> and{" "}
            clean, high-performance web interfaces, with a strong eye for design and detail.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "28px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            I enjoy the intersection of engineering and aesthetics — writing clean code that also
            looks and feels great. When I&apos;m not building UIs, I&apos;m exploring new tools,
            design systems, and open-source projects.
          </p>

          {/* Info chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {[
              { icon: "📍", text: "UK · Bulgaria (remote)" },
              { icon: "🎓", text: "Computer Science" },
              { icon: "✅", text: "Open to work" },
              { icon: "🌐", text: "Remote friendly" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  color: "#94a3b8",
                  fontSize: "13px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <span aria-hidden="true">{icon}</span> {text}
              </span>
            ))}
          </div>

          {/* CV buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="ds-btn-primary">
              View CV
            </a>
            <a href={cvUrl} download className="ds-btn-ghost">
              Download CV ↓
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            style={{ paddingTop: "32px", borderTop: "1px solid #1e293b" }}
          >
            {[
              { number: "3+", label: "Years experience" },
              { number: "10+", label: "Technologies" },
              { number: "20+", label: "Projects built" },
            ].map(({ number, label }) => (
              <div
                key={label}
                className="ds-card about-stat-card"
                style={{ textAlign: "center", padding: "20px 12px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#6366f1",
                    letterSpacing: "-1px",
                  }}
                >
                  {number}
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

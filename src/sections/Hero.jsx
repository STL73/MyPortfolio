import { useEffect, useRef } from "react"
import gsap from "gsap"
import avatarPhoto from "../assets/images/home1.png"

const Hero = () => {
  const tlRef = useRef(null)
  const heroRef = useRef(null)

  // Pause ring CSS animations when Hero scrolls off-screen to save compositor frames
  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle("rings-paused", !entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
    tlRef.current
      .fromTo(".hero-badge", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".hero-avatar", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7 }, 0.2)
      .fromTo(".hero-name", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      .fromTo(".hero-role", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
      .fromTo(".hero-tagline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.65)
      .fromTo(".hero-ctas", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.75)
      .fromTo(".hero-badges", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)

    return () => tlRef.current?.kill()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      className="hero-section"
    >
      {/* Background radial glow — decorative, kept inline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f120 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Available badge */}
      <div className="hero-badge">
        <span className="available-dot" />
        Available for work
      </div>

      {/* Avatar */}
      <div className="hero-avatar">
        <div className="avatar-ring-outer" aria-hidden="true" />
        <div className="avatar-ring-inner" aria-hidden="true" />
        <img
          src={avatarPhoto}
          alt="Slav Lambov — Frontend Developer"
          width="140"
          height="140"
        />
      </div>

      {/* Name */}
      <h1 id="hero-heading" className="hero-name">
        Slav Lambov
      </h1>

      {/* Role */}
      <p className="hero-role">Frontend Developer</p>

      {/* Location — local SEO signal */}
      <p className="hero-location">
        <span aria-hidden="true">📍</span> Manchester, UK · Open to remote
      </p>

      {/* Tagline */}
      <p className="hero-tagline">
        Building fast, accessible web experiences with a sharp eye for design and performance.
      </p>

      {/* CTA buttons */}
      <div className="hero-ctas">
        <a
          href="#contact"
          className="ds-btn-primary"
          style={{ fontSize: "14px", padding: "12px 28px", borderRadius: "8px" }}
        >
          Hire Me
        </a>
        <a
          href="#projects"
          className="ds-btn-ghost"
          style={{ fontSize: "14px", padding: "12px 28px", borderRadius: "8px" }}
        >
          View Projects ↓
        </a>
      </div>

      {/* Tech badges */}
      <div className="hero-badges">
        {["React", "JavaScript", "Tailwind CSS", "GSAP", "Vite"].map((tech) => (
          <span key={tech} className="hero-tech-badge">{tech}</span>
        ))}
      </div>

      {/* Scroll indicator — decorative, kept inline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#94a3b8",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "34px",
            border: "1px solid #94a3b8",
            borderRadius: "999px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "6px",
              background: "#6366f1",
              borderRadius: "999px",
              animation: "scroll-wheel-new 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}

export default Hero

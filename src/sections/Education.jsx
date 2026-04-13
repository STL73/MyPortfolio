import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { educationData, certificatesData } from "../constants"
import EduCard from "../components/EduCard"
import CertificateCard from "../components/CertificateCard"

const Education = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".edu-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".edu-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
        .fromTo(
          ".cert-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          0.5
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">Background</div>
      <h2 id="education-heading" className="section-title edu-title">
        Education &amp; <span>Credentials</span>
      </h2>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginBottom: "64px",
        }}
      >
        {/* Vertical line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "20px",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, #6366f144 10%, #6366f144 90%, transparent)",
          }}
        />
        {educationData.map((item) => (
          <EduCard key={item.id} {...item} />
        ))}
      </div>

      {/* Certificates */}
      {certificatesData?.length > 0 && (
        <>
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "24px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Certificates
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificatesData.map((cert) => (
              <CertificateCard key={cert.id} {...cert} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Education

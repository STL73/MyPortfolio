import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PERSONAL } from "../constants"

// Formspree endpoint ID — stored in .env as VITE_FORMSPREE_ID
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      })
        .fromTo(".contact-heading",  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(".contact-info-col", { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
        .fromTo(".contact-form-col", { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const labelStyle = {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 500,
    letterSpacing: "0.5px",
    fontFamily: "var(--font-dm-sans)",
    marginBottom: "6px",
    display: "block",
  }

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-heading" style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      <div className="section-label contact-heading">Let&apos;s talk</div>
      <h2 id="contact-heading" className="section-title contact-heading">
        Get In <span>Touch</span>
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "#94a3b8",
          marginBottom: "48px",
          maxWidth: "480px",
          lineHeight: 1.6,
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Open to new opportunities, freelance work, or just a chat. Drop me a message and I&apos;ll
        get back to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        {/* Left: info cards */}
        <div
          className="mb-8 md:mb-0 contact-info-col"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          {[
            { icon: "✉️", label: "Email", value: PERSONAL.email },
            { icon: "📍", label: "Location", value: PERSONAL.location },
            { icon: "✅", label: "Status", value: PERSONAL.workStatus },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="contact-info-card"
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#6366f115",
                  border: "1px solid #6366f122",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "4px",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#f1f5f9",
                    fontWeight: 500,
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}

          {/* Social buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "LinkedIn", icon: "🔗", href: PERSONAL?.linkedin || "#" },
              { label: "GitHub", icon: "🐙", href: PERSONAL?.github || "#" },
            ].map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
              >
                <span style={{ fontSize: "16px" }} aria-hidden="true">{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="ds-card contact-form-col" style={{ padding: "32px" }}>
          {/* aria-live="polite" announces status changes to screen readers */}
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }} aria-live="polite" aria-atomic="true">
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  marginBottom: "8px",
                }}
              >
                Message sent!
              </p>
              <p style={{ fontSize: "14px", color: "#94a3b8", fontFamily: "var(--font-dm-sans)" }}>
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="contact-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="contact-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={labelStyle}>
                  Subject{" "}
                  <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="contact-input"
                />
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-required="true"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  rows={5}
                  className="contact-input"
                  style={{ resize: "vertical", minHeight: "120px" }}
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  aria-live="assertive"
                  style={{ fontSize: "13px", color: "#f87171", fontFamily: "var(--font-dm-sans)" }}
                >
                  Something went wrong. Please email directly at{" "}
                  <a href={`mailto:${PERSONAL?.email}`} style={{ color: "#6366f1" }}>
                    {PERSONAL?.email}
                  </a>
                </p>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: "", email: "", subject: "", message: "" })
                    setStatus("idle")
                  }}
                  className="ds-btn-ghost"
                  style={{
                    flex: "0 0 auto",
                    padding: "13px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="ds-btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "13px 24px",
                    borderRadius: "8px",
                    opacity: status === "sending" ? 0.6 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Message ↗"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact

import { useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { navLinks } from "../constants/index"

const Nav = () => {
  const [activeLink, setActiveLink] = useState(() => window.location.hash || "#home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Guard: suppress observer updates while a nav-click scroll is in progress
  const isScrollingRef = useRef(false)
  const scrollTimerRef = useRef(null)

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => setActiveLink(window.location.hash || "#home")
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return
    const handleClick = (e) => {
      if (!e.target.closest("header")) setIsMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [isMenuOpen])

  // IntersectionObserver — active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            const id = `#${entry.target.id}`
            setActiveLink(id)
            if (window.location.hash !== id) window.history.replaceState(null, "", id)
          }
        })
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => {
      sections.forEach((s) => observer.unobserve(s))
      clearTimeout(scrollTimerRef.current)
    }
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 48px",
        height: "64px",
        background: "rgba(8,13,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "18px",
          color: "#f1f5f9",
          letterSpacing: "-0.5px",
          textDecoration: "none",
        }}
      >
        Slav<span style={{ color: "#6366f1" }}>.</span>
      </a>

      {/* Desktop links */}
      <nav aria-label="Main navigation">
        <ul
          className="max-lg:hidden flex"
          style={{ gap: "32px", listStyle: "none", margin: 0, padding: 0 }}
        >
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`nav-link${activeLink === item.href ? " nav-link--active" : ""}`}
                onClick={() => {
                  setActiveLink(item.href)
                  isScrollingRef.current = true
                  clearTimeout(scrollTimerRef.current)
                  scrollTimerRef.current = setTimeout(() => { isScrollingRef.current = false }, 1000)
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop CTA */}
      <a href="#contact" className="nav-cta max-lg:hidden">
        Hire Me
      </a>

      {/* Mobile toggle */}
      <button
        className="lg:hidden"
        onClick={() => setIsMenuOpen((o) => !o)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
        style={{
          background: "none",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <nav aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveLink(item.href)
                  setIsMenuOpen(false)
                }}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  color: activeLink === item.href ? "#6366f1" : "#94a3b8",
                  textDecoration: "none",
                  fontFamily: "var(--font-dm-sans)",
                  background: activeLink === item.href ? "#6366f108" : "transparent",
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                marginTop: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 500,
                color: "#fff",
                background: "#6366f1",
                textDecoration: "none",
                textAlign: "center",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Nav

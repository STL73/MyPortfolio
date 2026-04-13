import { navLinks, socialMedia, PERSONAL } from "../constants"

const Footer = () => (
  <footer
    className="px-6 pt-12 pb-8 md:px-12"
    style={{
      borderTop: "1px solid #1e293b",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle radial glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "200px",
        background: "radial-gradient(ellipse at bottom, #6366f10a 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "32px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a
            href="#home"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.5px",
              textDecoration: "none",
            }}
          >
            Slav<span style={{ color: "#6366f1" }}>.</span>
          </a>
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              maxWidth: "260px",
              lineHeight: 1.6,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {PERSONAL.tagline}
          </p>
        </div>

        {/* Nav links — two-column grid */}
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Footer navigation">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="footer-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {socialMedia.map((item) => (
            <a
              key={item.alt}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
              className="footer-social-btn"
            >
              <item.src aria-hidden="true" style={{ width: "16px", height: "16px" }} />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1e293b", marginBottom: "24px" }} />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          © {new Date().getFullYear()} <span style={{ color: "#94a3b8" }}>Slav Lambov</span>. All
          rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="footer-back-top"
        >
          Back to top
          <span
            className="arrow-box"
            style={{
              width: "24px",
              height: "24px",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              transition: "border-color 0.2s",
            }}
          >
            ↑
          </span>
        </button>
      </div>
    </div>
  </footer>
)

export default Footer

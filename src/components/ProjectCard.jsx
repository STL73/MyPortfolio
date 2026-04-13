const STATUS_CONFIG = {
  live: {
    label: "Live",
    style: { background: "#052e16", border: "1px solid #16a34a44", color: "#4ade80" },
    dot: true,
  },
  wip: {
    label: "In Progress",
    style: { background: "#1c1917", border: "1px solid #78716c44", color: "#a8a29e" },
    dot: false,
  },
  private: {
    label: "Private",
    style: { background: "#1c1917", border: "1px solid #78716c44", color: "#a8a29e" },
    dot: false,
  },
}

const ProjectCard = ({
  title,
  description,
  technologies = [],
  image,
  status = "live",
  liveUrl,
  githubUrl,
  featured = false,
}) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.wip

  if (featured) {
    return (
      <div
        className="projects-card grid grid-cols-1 md:grid-cols-2"
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "24px",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6366f133"
          e.currentTarget.style.boxShadow = "0 0 40px #6366f110"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#1e293b"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        {/* Preview */}
        <div
          style={{
            background: image ? "none" : "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
            minHeight: "280px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 50%, #6366f120 0%, transparent 70%)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#6366f122",
                  letterSpacing: "-2px",
                }}
              >
                01
              </span>
            </>
          )}
          {/* Status badge */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: "999px",
              fontFamily: "var(--font-dm-sans)",
              ...cfg.style,
            }}
          >
            {cfg.dot && (
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 5px #4ade80",
                  animation: "badge-pulse 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
            )}
            {cfg.label}
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              lineHeight: 1.7,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {technologies.map((t) => (
              <span
                key={t}
                style={{
                  background: "#6366f111",
                  border: "1px solid #6366f122",
                  color: "#a5b4fc",
                  fontSize: "11px",
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-primary"
                style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "6px" }}
              >
                ↗ Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-ghost"
                style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "6px" }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Grid card (non-featured)
  return (
    <div
      className="projects-card"
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6366f133"
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 8px 32px #6366f110"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e293b"
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Preview strip */}
      <div
        style={{
          background: image ? "none" : "linear-gradient(135deg, #1e1b4b, #0f172a)",
          height: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 50%, #6366f115 0%, transparent 70%)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "28px",
                fontWeight: 800,
                color: "#6366f122",
                letterSpacing: "-1px",
              }}
            >
              {String(technologies.length + 2).padStart(2, "0")}
            </span>
          </>
        )}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "10px",
            fontWeight: 500,
            padding: "3px 8px",
            borderRadius: "999px",
            fontFamily: "var(--font-dm-sans)",
            ...cfg.style,
          }}
        >
          {cfg.label}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "16px",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            lineHeight: 1.6,
            marginBottom: "12px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  background: "#6366f111",
                  border: "1px solid #6366f122",
                  color: "#a5b4fc",
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                color: "#6366f1",
                textDecoration: "none",
                fontWeight: 600,
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

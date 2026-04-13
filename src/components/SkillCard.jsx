const ICON_MAP = {
  Frontend: "⚡",
  Design: "🎨",
  Delivery: "🚀",
  Backend: "🗄️",
}

const SkillCard = ({ title, description, skills = [], icon }) => {
  const emoji = icon || ICON_MAP[title] || "💡"

  return (
    <div className="skills-card ds-card" style={{ padding: "28px" }}>
      {/* Icon */}
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
          fontSize: "20px",
          marginBottom: "16px",
        }}
      >
        {emoji}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "16px",
          fontWeight: 700,
          color: "#f1f5f9",
          marginBottom: "4px",
        }}
      >
        {title}
      </div>

      {/* Description */}
      {description && (
        <div
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginBottom: "20px",
            lineHeight: 1.5,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </div>
      )}

      {/* Skill chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#0d1829",
              border: "1px solid #1e293b",
              color: "#94a3b8",
              fontSize: "12px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "6px",
              fontFamily: "var(--font-dm-sans)",
              cursor: "default",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#6366f1",
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillCard

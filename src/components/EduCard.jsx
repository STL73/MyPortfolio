const EduCard = ({ period, title, institution, description }) => (
  <div
    className="edu-card"
    style={{
      display: "flex",
      gap: "32px",
      paddingBottom: "40px",
      position: "relative",
    }}
  >
    {/* Dot */}
    <div
      style={{
        flexShrink: 0,
        width: "41px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "4px",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#6366f1",
          boxShadow: "0 0 8px #6366f166",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>

    {/* Card */}
    <div className="ds-card" style={{ flex: 1, padding: "24px 28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "17px",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </div>
        <span
          style={{
            background: "#6366f111",
            border: "1px solid #6366f122",
            color: "#a5b4fc",
            fontSize: "11px",
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {period}
        </span>
      </div>
      {institution && (
        <div
          style={{
            fontSize: "13px",
            color: "#6366f1",
            fontWeight: 500,
            marginBottom: "10px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {institution}
        </div>
      )}
      {description && (
        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            lineHeight: 1.7,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </p>
      )}
    </div>
  </div>
)

export default EduCard

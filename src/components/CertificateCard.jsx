const CertificateCard = ({ title, issuer, date, fileUrl }) => {
  const handleView = () => {
    if (fileUrl) window.open(fileUrl, "_blank")
  }

  return (
    <div
      className="cert-card"
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        cursor: fileUrl ? "pointer" : "default",
      }}
      onClick={handleView}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6366f133"
        e.currentTarget.style.boxShadow = "0 0 24px #6366f10d"
        e.currentTarget.style.transform = "translateY(-3px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e293b"
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.transform = "translateY(0)"
      }}
      role={fileUrl ? "button" : undefined}
      tabIndex={fileUrl ? 0 : undefined}
      aria-label={fileUrl ? `View certificate: ${title}` : undefined}
      onKeyDown={(e) => {
        /* Allow keyboard users to activate the card with Enter or Space */
        if (fileUrl && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          handleView()
        }
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          background: "#6366f115",
          border: "1px solid #6366f122",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        🏆
      </div>

      {/* Info */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.2px",
            lineHeight: 1.3,
            marginBottom: "4px",
          }}
        >
          {title}
        </div>
        {issuer && (
          <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "var(--font-dm-sans)" }}>
            {issuer}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
          borderTop: "1px solid #1e293b",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            fontWeight: 500,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {date}
        </span>
        {fileUrl && (
          <span
            style={{
              fontSize: "11px",
              color: "#6366f1",
              fontWeight: 600,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            View ↗
          </span>
        )}
      </div>
    </div>
  )
}

export default CertificateCard

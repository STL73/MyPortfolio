/**
 * Why the theme is read before React mounts.
 *
 * Two orderings of the same four steps. The bug is not that anything is wrong
 * in the second row -- it is that the first paint happens before the stored
 * preference has been read, so the wrong theme is shown and then corrected,
 * which a reader sees as a white flash on every single load.
 *
 * Drawn from `client/index.html` in the Moss repository: an inline IIFE in the
 * head reads localStorage, falls back to prefers-color-scheme, and sets
 * data-theme on the document element before the body or the module script.
 *
 * The accent marks the correct first paint, because that is the entire payoff.
 */
const STEP_WIDTH = 158
const GAP = 14

const ROWS = [
  {
    id: "effect",
    label: "Read it in an effect",
    tone: "muted",
    steps: ["parse HTML", "paint · wrong theme", "React mounts", "repaint · correct"],
    flashAfter: 1,
  },
  {
    id: "inline",
    label: "Read it before the paint",
    tone: "accent",
    steps: ["parse HTML", "inline script reads", "paint · correct", "React mounts"],
    accentAt: 2,
  },
]

const ThemeOrderDiagram = () => (
  <svg
    viewBox="0 0 700 196"
    className="h-auto w-full"
    role="img"
    aria-label="Reading the theme in an effect paints the wrong theme first and corrects it, causing a flash. Reading it in an inline script before the paint shows the correct theme immediately."
  >
    {ROWS.map((row, rowIndex) => {
      const y = rowIndex * 100 + 30
      return (
        <g key={row.id}>
          <text
            x="0"
            y={y - 12}
            className="font-mono"
            fontSize="10"
            fill={row.tone === "accent" ? "var(--sf-aurora-500)" : "var(--sf-text-mid)"}
          >
            {row.label.toUpperCase()}
          </text>

          {row.steps.map((step, index) => {
            const x = index * (STEP_WIDTH + GAP)
            const isAccent = row.accentAt === index
            return (
              <g key={step}>
                <rect
                  x={x}
                  y={y}
                  width={STEP_WIDTH}
                  height="38"
                  rx="3"
                  fill="none"
                  stroke={isAccent ? "var(--sf-aurora-500)" : "var(--sf-border)"}
                />
                <text
                  x={x + STEP_WIDTH / 2}
                  y={y + 23}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="10"
                  fill={isAccent ? "var(--sf-aurora-500)" : "var(--sf-text-mid)"}
                >
                  {step}
                </text>

                {index < row.steps.length - 1 && (
                  <line
                    x1={x + STEP_WIDTH}
                    y1={y + 19}
                    x2={x + STEP_WIDTH + GAP}
                    y2={y + 19}
                    stroke="var(--sf-border)"
                  />
                )}

                {/* The cost, marked where it happens. */}
                {row.flashAfter === index && (
                  <text
                    x={x + STEP_WIDTH / 2}
                    y={y + 54}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="9"
                    fill="var(--sf-text-mid)"
                  >
                    ↑ white flash, every load
                  </text>
                )}
              </g>
            )
          })}
        </g>
      )
    })}
  </svg>
)

export default ThemeOrderDiagram

/**
 * Where the catalogue's data comes from, and where it would be swapped.
 *
 * Drawn from the Moss repository rather than from memory: `lib/api.js` has
 * exactly three non-test importers -- `routes/Products.jsx`,
 * `routes/ProductDetail.jsx` and `sections/FeaturedProducts.jsx` -- and it
 * imports `data/products.js`. The three exports named are the three it has.
 *
 * The accent is on the module itself, because the module is the point: it is
 * the single seam where mock data becomes real data. A diagram that highlighted
 * the boxes either side would be drawing the parts that do not matter.
 *
 * The dashed edge is the only speculative thing on it, and it is dashed for
 * exactly that reason -- the Postgres port is decided and not built.
 */
const ModuleBoundaryDiagram = () => (
  <svg
    viewBox="0 0 760 210"
    className="h-auto w-full"
    role="img"
    aria-label="Three components import one API module, which today reads a mock catalogue file and would later read a database instead."
  >
    <defs>
      <marker
        id="mb-arrow"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path d="M0 0 L8 4 L0 8 z" fill="var(--sf-text-mid)" />
      </marker>
    </defs>

    {/* The three consumers */}
    {[
      { y: 18, label: "routes/Products.jsx" },
      { y: 88, label: "routes/ProductDetail.jsx" },
      { y: 158, label: "sections/FeaturedProducts.jsx" },
    ].map((box) => (
      <g key={box.label}>
        <rect
          x="0"
          y={box.y}
          width="212"
          height="34"
          rx="3"
          fill="none"
          stroke="var(--sf-border)"
        />
        <text
          x="14"
          y={box.y + 22}
          className="font-mono"
          fontSize="11"
          fill="var(--sf-text-mid)"
        >
          {box.label}
        </text>
        <line
          x1="212"
          y1={box.y + 17}
          x2="274"
          y2="103"
          stroke="var(--sf-border)"
          markerEnd="url(#mb-arrow)"
        />
      </g>
    ))}

    {/* The seam */}
    <rect
      x="280"
      y="84"
      width="180"
      height="38"
      rx="3"
      fill="none"
      stroke="var(--sf-aurora-500)"
    />
    <text
      x="370"
      y="108"
      textAnchor="middle"
      className="font-mono"
      fontSize="12"
      fill="var(--sf-aurora-500)"
    >
      lib/api.js
    </text>
    {/* The exports sit under the box rather than inside it. Set within a
        180px box at any legible size they overflowed both edges. */}
    <text
      x="370"
      y="140"
      textAnchor="middle"
      className="font-mono"
      fontSize="9"
      fill="var(--sf-text-mid)"
    >
      getProducts · getProduct · getRelated
    </text>

    {/* Today */}
    <line
      x1="460"
      y1="94"
      x2="548"
      y2="62"
      stroke="var(--sf-border)"
      markerEnd="url(#mb-arrow)"
    />
    <rect
      x="556"
      y="45"
      width="204"
      height="34"
      rx="3"
      fill="none"
      stroke="var(--sf-border)"
    />
    <text
      x="570"
      y="67"
      className="font-mono"
      fontSize="11"
      fill="var(--sf-text-mid)"
    >
      data/products.js
    </text>
    <text x="570" y="34" className="font-mono" fontSize="9" fill="var(--sf-text-mid)">
      TODAY
    </text>

    {/* Later */}
    <line
      x1="460"
      y1="112"
      x2="548"
      y2="148"
      stroke="var(--sf-border)"
      strokeDasharray="4 4"
      markerEnd="url(#mb-arrow)"
    />
    <rect
      x="556"
      y="131"
      width="204"
      height="34"
      rx="3"
      fill="none"
      stroke="var(--sf-border)"
      strokeDasharray="4 4"
    />
    <text
      x="570"
      y="153"
      className="font-mono"
      fontSize="11"
      fill="var(--sf-text-mid)"
    >
      Postgres · Drizzle
    </text>
    <text x="570" y="184" className="font-mono" fontSize="9" fill="var(--sf-text-mid)">
      DECIDED, NOT BUILT
    </text>
  </svg>
)

export default ModuleBoundaryDiagram

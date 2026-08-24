/**
 * The Cloudflare deep-link trap, which is the reason one line of config
 * matters more than the rest of the deployment put together.
 *
 * The failure is specific and quiet: clicking through from the homepage works,
 * because the router never asks the host for anything. Opening the same URL
 * cold asks the host for a file that does not exist. Pages used to infer
 * single-page routing from a missing 404.html and Workers does not, so without
 * `not_found_handling` the second path returns a 404 while the first keeps
 * working -- which is why it survives a casual check and breaks every link
 * anyone shares.
 *
 * Verified against `client/wrangler.jsonc` in the Moss repository.
 *
 * The accent is on the branch that makes it work, not on the failure. A
 * diagram that highlights the bug teaches the bug; this one teaches the fix.
 */
const DeepLinkDiagram = () => (
  <svg
    viewBox="0 0 720 250"
    className="h-auto w-full"
    role="img"
    aria-label="Clicking a link inside the app is handled by the router and always works. Opening the same URL directly asks the Worker for a file that does not exist: without not_found_handling it returns 404, with it the Worker serves index.html and the router resolves the route."
  >
    <defs>
      <marker
        id="dl-arrow"
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

    {/* Path one: never leaves the browser */}
    <text x="0" y="16" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      CLICKED INSIDE THE APP
    </text>
    <rect x="0" y="26" width="200" height="36" rx="3" fill="none" stroke="var(--sf-border)" />
    <text x="14" y="49" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      link to /products/x
    </text>
    <line x1="200" y1="44" x2="248" y2="44" stroke="var(--sf-border)" markerEnd="url(#dl-arrow)" />
    <rect x="256" y="26" width="200" height="36" rx="3" fill="none" stroke="var(--sf-border)" />
    <text x="270" y="49" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      router handles it
    </text>
    <line x1="456" y1="44" x2="504" y2="44" stroke="var(--sf-border)" markerEnd="url(#dl-arrow)" />
    <text x="514" y="49" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      page renders
    </text>

    {/* Path two: reaches the host */}
    <text x="0" y="108" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      OPENED COLD, OR REFRESHED
    </text>
    <rect x="0" y="118" width="200" height="36" rx="3" fill="none" stroke="var(--sf-border)" />
    <text x="14" y="141" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      GET /products/x
    </text>
    <line x1="200" y1="136" x2="248" y2="136" stroke="var(--sf-border)" markerEnd="url(#dl-arrow)" />
    <rect x="256" y="118" width="200" height="36" rx="3" fill="none" stroke="var(--sf-border)" />
    <text x="270" y="141" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      Worker: no such file
    </text>

    {/* Without the line */}
    <line x1="456" y1="128" x2="504" y2="100" stroke="var(--sf-border)" markerEnd="url(#dl-arrow)" />
    <text x="514" y="96" className="font-mono" fontSize="10" fill="var(--sf-text-mid)">
      404
    </text>
    <text x="514" y="112" className="font-mono" fontSize="9" fill="var(--sf-text-mid)">
      without the setting
    </text>

    {/* With it */}
    <line x1="456" y1="146" x2="504" y2="180" stroke="var(--sf-aurora-500)" markerEnd="url(#dl-arrow)" />
    <rect x="504" y="162" width="216" height="36" rx="3" fill="none" stroke="var(--sf-aurora-500)" />
    <text x="518" y="185" className="font-mono" fontSize="10" fill="var(--sf-aurora-500)">
      index.html · router resolves
    </text>
    {/* Anchored to the right edge rather than positioned from the left. Set
        from x=504 it ran to 747 in a 720-wide viewBox and was clipped -- the
        kind of overflow that is invisible in a screenshot at page scale and
        obvious the moment anyone zooms. */}
    <text
      x="720"
      y="220"
      textAnchor="end"
      className="font-mono"
      fontSize="9"
      fill="var(--sf-text-mid)"
    >
      not_found_handling: &quot;single-page-application&quot;
    </text>
  </svg>
)

export default DeepLinkDiagram

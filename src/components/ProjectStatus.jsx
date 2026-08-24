// The stored keys are terse; these are what a reader should see. "wip" in
// particular has to go -- it is jargon, and to anyone outside the trade it
// reads as either an acronym or a typo.
const STATUS_LABELS = {
  live: "Live",
  wip: "In progress",
  private: "Private",
}

/**
 * A project's status, in mono because it is a checkable fact rather than a
 * claim about quality.
 *
 * Only "live" takes the accent, and that is the point of colouring it at all:
 * exactly one project here is deployed and running, so aurora marks the one
 * thing a reader can go and use right now. Colouring all four would spend the
 * accent on decoration and leave the real distinction invisible.
 */
const ProjectStatus = ({ status }) => {
  const label = STATUS_LABELS[status]
  if (!label) return null

  const isLive = status === "live"

  return (
    <span
      className={`inline-flex items-baseline gap-2 font-mono text-xs tracking-mono ${
        isLive ? "text-accent" : "text-ink-muted"
      }`}
    >
      {/* A dot, and a still one.
          Only the live project gets it, so it marks the single thing a reader
          can go and use rather than decorating every status. It does not pulse:
          a looped pulse on a status element is the most recognisable AI-slop
          motion pattern there is, and a motion audit flags any instance of it.
          The colour and the dot together are enough. */}
      {isLive && (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 self-center rounded-full bg-accent"
        />
      )}
      {label}
    </span>
  )
}

export default ProjectStatus

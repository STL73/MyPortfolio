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

  return (
    <span
      className={`font-mono text-xs tracking-mono ${
        status === "live" ? "text-accent" : "text-ink-muted"
      }`}
    >
      {label}
    </span>
  )
}

export default ProjectStatus

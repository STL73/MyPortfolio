/**
 * The heading every section shares.
 *
 * A title in display type, an optional figure in mono, and a hairline under
 * both. The rule is the only structural device on the page and it does one
 * honest job: it separates. Numbered eyebrows were the alternative and they
 * would be a lie -- 01 / 02 / 03 implies a sequence, and the sections are not
 * one; a reader can take About before Projects and lose nothing.
 *
 * `meta` is mono because mono means verifiable on this site. It is for counts
 * and dates, never for a claim.
 */
const SectionHeading = ({ id, title, meta }) => (
  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-6">
    <h2 id={id} className="text-2xl text-ink">
      {title}
    </h2>
    {meta && (
      <p className="font-mono text-xs tracking-mono text-ink-muted">{meta}</p>
    )}
  </header>
)

export default SectionHeading

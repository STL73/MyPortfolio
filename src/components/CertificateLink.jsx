/**
 * One downloadable certificate.
 *
 * Two lines, not three columns. Spreading title, issuer and file details
 * across the full width made the title wrap onto a second line while the
 * issuer and the size floated far off to the right with nothing between them:
 * three things at the same visual weight and no relationship shown between
 * any of them.
 *
 * The file type and weight are shown because the link opens a PDF, and a link
 * that silently hands someone a file is the kind of small dishonesty that
 * makes people stop clicking. Both sit in mono: they are facts about the file,
 * not claims about its contents.
 */
const CertificateLink = ({ certificate }) => (
  <li className="border-t border-line">
    <a
      href={certificate.fileUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col gap-1 px-2 py-4 transition-colors duration-150 hover:bg-surface"
    >
      <span className="text-ink transition-colors duration-150 group-hover:text-accent">
        {certificate.title}
      </span>
      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm text-ink-muted">{certificate.issuer}</span>
        <span className="font-mono text-xs tracking-mono text-ink-muted">
          {certificate.date} · PDF · {certificate.fileSize}
        </span>
      </span>
    </a>
  </li>
)

export default CertificateLink

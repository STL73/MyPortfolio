/**
 * One downloadable certificate.
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
      className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 transition-colors duration-150 hover:bg-surface"
    >
      <span className="flex-1 text-ink group-hover:text-accent">
        {certificate.title}
      </span>
      <span className="text-sm text-ink-muted">{certificate.issuer}</span>
      <span className="font-mono text-xs tracking-mono text-ink-low">
        {certificate.date} · PDF · {certificate.fileSize}
      </span>
    </a>
  </li>
)

export default CertificateLink

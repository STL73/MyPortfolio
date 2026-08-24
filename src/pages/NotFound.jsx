import { Link } from "react-router"
import { primaryAction } from "../lib/actionStyles"

/**
 * The 404.
 *
 * Cloudflare's _redirects rule serves index.html for every unmatched path, so
 * a wrong URL reaches the router rather than the host's own error page. That
 * makes this the only 404 the site has, and it is a real page: same nav, same
 * ground, a way back rather than a dead end.
 */
const NotFound = () => (
  <section className="flex min-h-screen items-center justify-center px-6">
    <div className="max-w-measure text-center">
      {/* Mono for the code itself -- it is a figure, which is the one job
          IBM Plex Mono has in this system. */}
      <p className="font-mono text-sm tracking-mono text-accent">404</p>

      <h1 className="mt-4 text-3xl text-ink">This page does not exist</h1>

      <p className="mt-6 text-lg text-ink-muted">
        The link is either out of date or slightly wrong. Nothing is broken at your end.
      </p>

      <Link
        to="/"
        className={`mt-10 ${primaryAction()}`}
      >
        Back to the homepage
      </Link>
    </div>
  </section>
)

export default NotFound

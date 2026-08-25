import { useState } from "react"
import { PERSONAL } from "../constants/index"
import { primaryAction } from "../lib/actionStyles"

// Not a secret. Anything prefixed VITE_ is inlined into the client bundle at
// build time, and a Formspree form ID is a public endpoint by design -- it
// names the form, it does not authorise anything. It is in .env only so it can
// differ between a test form and the real one.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Your email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
]

const EMPTY = { name: "", email: "", subject: "", message: "" }

/**
 * The contact form.
 *
 * Every failure path ends at the email address. A contact form that fails
 * quietly is worse than no contact form: someone has written a message, sent
 * it, and been told nothing, and they do not try again. So the error state
 * names the address, and the component refuses to render a form at all when
 * it has no endpoint to post to.
 *
 * That last case is a real one rather than defensive padding. The ID lives in
 * .env, .env is not in the repository, and a host that builds without it would
 * otherwise ship a form posting to "/f/undefined" -- broken in exactly the way
 * nobody notices until an enquiry never arrives.
 */
const ContactForm = () => {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState("idle")

  if (!FORMSPREE_ID) {
    return (
      <p className="text-ink-muted">
        The form is unavailable on this build.{" "}
        <a
          href={`mailto:${PERSONAL.email}`}
          className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          Email me directly
        </a>{" "}
        and it reaches the same inbox.
      </p>
    )
  }

  const handleChange = (event) =>
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        setStatus("error")
        return
      }

      setForm(EMPTY)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  const isSending = status === "sending"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Hover at half accent, focus at full. The fields had a focus state and
          no hover at all, so a pointer crossing them got no answer to "is this
          interactive?" until it clicked -- the one control on the site that
          stayed silent. Half strength keeps the distinction: hover says the
          field is live, focus says you are in it. It is the same two-step the
          cards use in `surfaceStyles`. */}
      {FIELDS.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          {/* Real labels, not placeholders. A placeholder disappears the moment
              someone types, so the one time they need to check which box they
              are in is the one time it is gone. */}
          <label
            htmlFor={`contact-${field.name}`}
            className="font-mono text-xs tracking-mono text-ink-muted"
          >
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            value={form[field.name]}
            onChange={handleChange}
            className="rounded-sm border border-line bg-night-900 px-4 py-3 text-ink transition-colors duration-150 hover:border-accent/50 focus:border-accent"
          />
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs tracking-mono text-ink-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="resize-y rounded-sm border border-line bg-night-900 px-4 py-3 text-ink transition-colors duration-150 hover:border-accent/50 focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className={`self-start ${primaryAction()} disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none`}
      >
        {isSending ? "Sending…" : "Send message"}
      </button>

      {/* Announced rather than only shown. Someone using a screen reader gets
          no feedback at all from text that simply appears. */}
      <p role="status" aria-live="polite" className="text-sm">
        {status === "sent" && (
          <span className="text-accent">
            Sent. I will get back to you.
          </span>
        )}
        {status === "error" && (
          <span className="text-ink-muted">
            That did not send. Email{" "}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {PERSONAL.email}
            </a>{" "}
            instead and it reaches the same inbox.
          </span>
        )}
      </p>
    </form>
  )
}

export default ContactForm

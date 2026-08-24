import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import CareerTracks from "../components/CareerTracks"
import { HERO, PERSONAL, careerTracks } from "../constants/index"

/**
 * The hero states the thesis and gets out of the way.
 *
 * It is left-weighted rather than centred. A centred stack with an avatar in a
 * ring is what the previous version did and what most portfolios do; reading a
 * long sentence down the left edge is faster, and it leaves the right side to
 * breathe rather than filling it because it is there.
 */
const Hero = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      // matchMedia is what makes reduced motion correct rather than merely
      // handled: the timeline is never built for those users, so the finished
      // state is what renders, and GSAP reverts it if the preference changes
      // mid-session.
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.32 },
        })

        tl.from('[data-hero="eyebrow"]', { autoAlpha: 0, y: 8, duration: 0.24 })
          // The sentence rises as one block. Animating it word by word is the
          // stock "AI wrote this page" move, and it makes a claim take three
          // times as long to become readable as it does to read.
          .from('[data-hero="claim"]', { autoAlpha: 0, y: 14 }, "-=0.1")
          .from('[data-hero="turn"]', { autoAlpha: 0, y: 14 }, "-=0.22")
          .from('[data-hero="track-meta"]', { autoAlpha: 0, y: 6, stagger: 0.08 }, "-=0.14")
          // The rules draw left to right, in the order the tracks began. This
          // is the one moment on the page carrying meaning rather than polish,
          // so it is the only stagger long enough to notice.
          .from(
            '[data-hero="track-rule"]',
            { scaleX: 0, duration: 0.42, stagger: 0.14 },
            "-=0.28",
          )
          .from('[data-hero="spark"]', { autoAlpha: 0, scale: 0.4, duration: 0.24 }, "-=0.08")
          .from('[data-hero="cta"]', { autoAlpha: 0, y: 10 }, "-=0.2")
      })
    },
    { scope: root },
  )

  return (
    <section
      id="home"
      ref={root}
      aria-labelledby="hero-heading"
      className="sf-textured flex min-h-svh items-center px-6 pt-24 pb-16 sm:px-10 lg:px-16"
    >
      <div className="w-full max-w-wide">
        <p
          data-hero="eyebrow"
          className="font-mono text-sm tracking-mono text-ink-muted"
        >
          {HERO.eyebrow}
        </p>

        {/* One heading, two sentences. The turn drops to muted ink so the eye
            takes the assertion first and the pivot second -- hierarchy from
            colour rather than from a second size, which keeps the block solid. */}
        {/* max-w-4xl, not 3xl. The sentence is long, and a narrower measure
            costs a sixth line of 60px display type -- which was enough to push
            the calls to action off a 900px viewport entirely. */}
        <h1
          id="hero-heading"
          className="mt-8 max-w-4xl text-3xl leading-[1.08] text-ink"
        >
          <span data-hero="claim" className="block">
            {HERO.claim}
          </span>
          <span data-hero="turn" className="mt-2 block text-ink-muted">
            {HERO.turn}
          </span>
        </h1>

        <div className="mt-14">
          <CareerTracks tracks={careerTracks} />
        </div>

        {/* The entrance animates this wrapper, not the buttons inside it.

            GSAP and CSS must not own the same properties on the same element.
            The buttons carry `transition` and a hover lift; GSAP was animating
            their opacity, visibility and transform, so the two re-interpolated
            each other every frame and the tween stuck at its start state --
            both calls to action invisible on every load. GSAP also leaves an
            inline transform behind, which would have overridden the hover
            lift even if the tween had finished. One element, one owner. */}
        <div data-hero="cta" className="mt-16 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
          >
            See the work
          </a>
          <a
            href={PERSONAL.cv}
            className="rounded-md border border-line px-6 py-3 font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

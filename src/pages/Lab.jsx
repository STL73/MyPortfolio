import CareerTracks from "../components/CareerTracks"
import ProjectStatus from "../components/ProjectStatus"
import { primaryAction, secondaryAction } from "../lib/actionStyles"
import portrait from "../assets/images/slav-portrait.webp"
import { ABOUT, HERO, SKILLS, careerTracks, projectsData } from "../constants/index"

/**
 * A comparison page for motion and layout variants. Development only.
 *
 * Registered in App.jsx behind `import.meta.env.DEV`, so it is never in a
 * production bundle and never reachable on the live site. It exists to settle
 * arguments by hovering rather than by describing, and it gets deleted once
 * the choices are made.
 *
 * Every variant is built from the real tokens and the real data, because a
 * variant built from placeholder greys tells you nothing about whether it
 * works on this page.
 */

const secondary = projectsData.slice(1)

const Lab = () => (
  <div className="px-6 py-24 sm:px-10 lg:px-16">
    <style>{`
      /* @property is what makes an angle interpolable. Without a declared
         type the browser treats a custom property as a string and swaps
         rather than animates it. */
      @property --lab-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes lab-spin { to { --lab-angle: 360deg; } }

      /* B1: four segments, not a two-stop blend. Conic starts at 12 o'clock,
         so 315-45deg is the top, 45-135 the right, and so on -- top and
         bottom take one ink, left and right the other. Hard stops keep the
         quadrants readable while it turns. */
      .lab-conic {
        position: relative;
        isolation: isolate;
        border-radius: var(--sf-radius-md);
      }
      .lab-conic::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        padding: 1px;
        background: conic-gradient(
          from var(--lab-angle),
          var(--sf-aurora-500) 0deg 45deg,
          var(--sf-text-mid) 45deg 135deg,
          var(--sf-aurora-500) 135deg 225deg,
          var(--sf-text-mid) 225deg 315deg,
          var(--sf-aurora-500) 315deg 360deg
        );
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
        opacity: 0.7;
        transition: opacity 150ms;
      }
      .lab-conic:hover::before {
        opacity: 1;
        animation: lab-spin 2.2s linear infinite;
      }

      /* B2: the same four quadrants, blended rather than hard-edged. */
      .lab-conic-soft::before {
        background: conic-gradient(
          from var(--lab-angle),
          var(--sf-aurora-500),
          var(--sf-text-mid) 90deg,
          var(--sf-aurora-500) 180deg,
          var(--sf-text-mid) 270deg,
          var(--sf-aurora-500) 360deg
        );
      }

      /* C1: the sweep, at an alpha that actually registers.
         The first attempt used near-white at 28% over an aurora fill. The
         mechanism was fine -- the band was in place and travelling -- but
         aurora is already a very light colour, so a translucent white over it
         changed almost nothing. Visible needs roughly 70%. */
      .lab-sweep { position: relative; overflow: hidden; }
      .lab-sweep::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          100deg,
          transparent 35%,
          rgba(255, 255, 255, 0.7) 50%,
          transparent 65%
        );
        transform: translateX(-120%);
        transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .lab-sweep:hover::after { transform: translateX(120%); }

      /* C2: the other way round -- a dark band raking across the bright fill,
         which on a light button reads more like light moving over a surface. */
      .lab-sweep-dark::after {
        background: linear-gradient(
          100deg,
          transparent 35%,
          rgba(16, 10, 40, 0.35) 50%,
          transparent 65%
        );
      }

      /* D: two shades drawing in from opposite corners. */
      .lab-draw { position: relative; }
      .lab-draw::before,
      .lab-draw::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        transition: width 200ms ease-out, height 200ms ease-out 200ms;
      }
      .lab-draw::before { top: 0; left: 0; border-top: 1px solid var(--sf-aurora-500); border-left: 1px solid var(--sf-aurora-500); }
      .lab-draw::after { right: 0; bottom: 0; border-bottom: 1px solid var(--sf-text-mid); border-right: 1px solid var(--sf-text-mid); }
      .lab-draw:hover::before,
      .lab-draw:hover::after { width: 100%; height: 100%; }

      /* Status indicator options. The slow pulse is what the pre-redesign
         site had; a motion audit flags any looped pulse on a status element
         as the single most recognisable AI-slop pattern there is, so it is
         here to be compared rather than assumed. */
      @keyframes lab-status-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.45; transform: scale(0.82); }
      }
      .lab-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: var(--sf-aurora-500);
      }
      .lab-dot-pulse { animation: lab-status-pulse 2s ease-in-out infinite; }
      .lab-dot-ring {
        position: relative;
      }
      .lab-dot-ring::after {
        content: "";
        position: absolute;
        inset: -4px;
        border-radius: 9999px;
        border: 1px solid var(--sf-aurora-500);
        opacity: 0.35;
      }
      @media (prefers-reduced-motion: reduce) {
        .lab-dot-pulse { animation: none; }
      }

      /* His idea, built honestly: a card showing a slice until hovered. */
      .lab-peek { max-height: 5.5rem; overflow: hidden; transition: max-height 320ms cubic-bezier(0.22, 1, 0.36, 1); }
      .lab-peek:hover, .lab-peek:focus-within { max-height: 32rem; }

      @media (prefers-reduced-motion: reduce) {
        .lab-conic:hover::before { animation: none; }
        .lab-sweep::after { transition: none; }
        .lab-draw::before, .lab-draw::after { transition: none; }
        .lab-peek { transition: none; }
      }
    `}</style>

    <div className="mx-auto flex max-w-wide flex-col gap-24">
      <header>
        <p className="font-mono text-xs tracking-mono text-accent">
          development only &#183; not in the production bundle
        </p>
        <h1 className="mt-3 text-3xl text-ink">Variants</h1>
        <p className="mt-4 max-w-measure text-lg text-ink-muted">
          Hover everything. Screenshots cannot show any of this, which is the entire reason the page
          exists.
        </p>
      </header>

      <Group
        title="Hero layout"
        note="A is what ships: stacked and left-weighted, with the right side open. B moves the career tracks beside the headline, which fills the width and makes the hero shorter -- the calls to action were falling below the fold at 900px."
      >
        <Labelled label="A · stacked (current)">
          <div className="w-full border border-line/50 p-8">
            <p className="font-mono text-sm tracking-mono text-ink-muted">{HERO.eyebrow}</p>
            <h2 className="mt-8 max-w-4xl text-3xl leading-[1.08] text-ink">
              <span className="block">{HERO.claim}</span>
              <span className="mt-2 block text-ink-muted">{HERO.turn}</span>
            </h2>
            <div className="mt-14">
              <CareerTracks tracks={careerTracks} />
            </div>
            <div className="mt-16 flex flex-wrap items-center gap-4">
              <span className={primaryAction()}>See the work</span>
              <span className={secondaryAction()}>Download CV</span>
            </div>
          </div>
        </Labelled>

        <Labelled label="B · tracks beside the headline">
          <div className="w-full border border-line/50 p-8">
            <p className="font-mono text-sm tracking-mono text-ink-muted">{HERO.eyebrow}</p>
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl leading-[1.08] text-ink">
                  <span className="block">{HERO.claim}</span>
                  <span className="mt-2 block text-ink-muted">{HERO.turn}</span>
                </h2>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <span className={primaryAction()}>See the work</span>
                  <span className={secondaryAction()}>Download CV</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <CareerTracks tracks={careerTracks} />
              </div>
            </div>
          </div>
        </Labelled>
      </Group>

      <Group
        title="Buttons"
        note="B1 and B2 are the four-quadrant border, spinning on hover rather than forever. C1 and C2 are the sweep at an alpha you can actually see."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Labelled label="A · current">
            <button
              type="button"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="B1 · conic, hard quadrants">
            <button
              type="button"
              className="lab-conic rounded-md bg-night-800 px-6 py-3 font-semibold text-ink transition-colors duration-150 hover:text-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="B2 · conic, blended">
            <button
              type="button"
              className="lab-conic lab-conic-soft rounded-md bg-night-800 px-6 py-3 font-semibold text-ink transition-colors duration-150 hover:text-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="C1 · sweep, light">
            <button
              type="button"
              className="lab-sweep rounded-md bg-accent px-6 py-3 font-semibold text-on-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="C2 · sweep, dark">
            <button
              type="button"
              className="lab-sweep lab-sweep-dark rounded-md bg-accent px-6 py-3 font-semibold text-on-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="D · two-tone draw">
            <button
              type="button"
              className="lab-draw rounded-md bg-night-700 px-6 py-3 font-semibold text-ink"
            >
              See the work
            </button>
          </Labelled>
        </div>
      </Group>

      <Group
        title="Button shape"
        note="The design system's radius scale is 2px default, 3px cards, 6px large surfaces. Buttons are not cards, so 2px is what the system actually asks for. Everything currently ships at 3px. The pill is off-system entirely and is here for comparison, not as a candidate."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "0 · square", radius: "0px" },
            { label: "2px · system default", radius: "var(--sf-radius-sm)" },
            { label: "3px · current (card radius)", radius: "var(--sf-radius-md)" },
            { label: "6px · large-surface radius", radius: "var(--sf-radius-lg)" },
            { label: "pill · off-system", radius: "9999px" },
          ].map((shape) => (
            <Labelled key={shape.label} label={shape.label}>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  style={{ borderRadius: shape.radius }}
                  className="bg-accent px-6 py-3 font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
                >
                  See the work
                </button>
                <button
                  type="button"
                  style={{ borderRadius: shape.radius }}
                  className="border border-line px-6 py-3 font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
                >
                  Download CV
                </button>
              </div>
            </Labelled>
          ))}
        </div>
      </Group>

      <Group
        title="Card radius"
        note="One definition drives every card on the site, so this is a single edit in src/lib/surfaceStyles.js. The design system's scale is 2px default, 3px cards, 6px large surfaces -- 12px is outside it and is here for comparison, not as a candidate."
      >
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "0 · square", radius: "0px" },
            { label: "2px · default", radius: "var(--sf-radius-sm)" },
            { label: "3px · card (current)", radius: "var(--sf-radius-md)" },
            { label: "6px · large surface", radius: "var(--sf-radius-lg)" },
            { label: "12px · off-system", radius: "12px" },
          ].map((shape) => (
            <Labelled key={shape.label} label={shape.label}>
              <div className="flex w-full flex-col gap-4">
                <div
                  style={{ borderRadius: shape.radius }}
                  className="border border-line bg-night-700/40 p-6"
                >
                  <span className="text-lg text-ink">Comfortable</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    Reach for these without looking things up
                  </span>
                  <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                    HTML · CSS · JavaScript
                  </p>
                </div>
                <div
                  style={{ borderRadius: shape.radius }}
                  className="border border-accent/40 bg-accent/5 p-6"
                >
                  <span className="text-lg text-ink">Learning now</span>
                  <span className="mt-1 block text-sm text-ink-muted">The honest gaps</span>
                  <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                    REST API design · ORMs
                  </p>
                </div>
              </div>
            </Labelled>
          ))}
        </div>
      </Group>

      <Group
        title="Secondary projects"
        note="Three ways to present the three projects that are not Moss."
      >
        <Labelled label="A · rows (current)">
          <div className="w-full">
            {secondary.map((project) => (
              <article
                key={project.id}
                className="group relative grid gap-4 border-t border-line py-6 pl-0 transition-[padding-left] duration-200 hover:pl-4 md:grid-cols-12 md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-0 w-px scale-y-0 bg-accent transition-transform duration-200 group-hover:scale-y-100"
                />
                <h3 className="text-lg text-ink transition-colors duration-200 group-hover:text-accent md:col-span-4">
                  {project.title}
                </h3>
                <p className="text-sm text-ink-muted md:col-span-8">
                  {project.description.slice(0, 130)}&#8230;
                </p>
              </article>
            ))}
          </div>
        </Labelled>

        <Labelled label="B · cards, all visible">
          <div className="grid w-full gap-4 md:grid-cols-3">
            {secondary.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col rounded-lg border border-line bg-night-700/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50"
              >
                <ProjectStatus status={project.status} />
                <h3 className="mt-3 text-lg text-ink transition-colors duration-200 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">
                  {project.description.slice(0, 110)}&#8230;
                </p>
              </article>
            ))}
          </div>
        </Labelled>

        <Labelled label="C · peek, expands on hover (your idea)">
          <div className="grid w-full gap-4 md:grid-cols-3">
            {secondary.map((project) => (
              <article
                key={project.id}
                tabIndex={0}
                className="lab-peek rounded-lg border border-line bg-night-700/40 p-6"
              >
                <h3 className="text-lg text-ink">{project.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{project.description}</p>
              </article>
            ))}
          </div>
        </Labelled>
      </Group>

      <Group
        title="The Live status"
        note="The pre-redesign site pulsed this. A motion audit flags any looped pulse on a status element as the most recognisable AI-slop pattern there is -- so all four are here rather than one being assumed."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Labelled label="A · plain text (current)">
            <span className="font-mono text-xs tracking-mono text-accent">Live</span>
          </Labelled>

          <Labelled label="B · static dot">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot" />
              Live
            </span>
          </Labelled>

          <Labelled label="C · dot with a ring">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot lab-dot-ring" />
              Live
            </span>
          </Labelled>

          <Labelled label="D · slow pulse (what you had)">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot lab-dot-pulse" />
              Live
            </span>
          </Labelled>
        </div>
      </Group>

      <Group
        title="Skills layout"
        note="Four tiers, three arrangements. The fourth tier names the gaps and is the most valuable block, so whichever layout wins has to keep it as readable as the first three."
      >
        <Labelled label="A · rows (current)">
          <dl className="w-full">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-8"
              >
                <dt className="md:col-span-4">
                  <span className="text-lg text-ink">{tier.label}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
                </dt>
                <dd className="font-mono text-sm tracking-mono text-ink-muted md:col-span-8">
                  {tier.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="B · four columns">
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="border-t border-line pt-4">
                <h3 className="text-ink">{tier.label}</h3>
                <p className="mt-1 text-sm text-ink-muted">{tier.note}</p>
                <ul className="mt-4 flex list-none flex-col gap-2">
                  {tier.items.map((item) => (
                    <li key={item} className="font-mono text-xs tracking-mono text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Labelled>

        <Labelled label="C · cards, gaps tier accented">
          <div className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-md border p-6 ${
                  tier.id === "learning"
                    ? "border-accent/40 bg-accent/5"
                    : "border-line bg-night-700/40"
                }`}
              >
                <h3 className="text-lg text-ink">{tier.label}</h3>
                <p className="mt-1 text-sm text-ink-muted">{tier.note}</p>
                <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                  {tier.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Labelled>
      </Group>

      <Group
        title="About, right-hand space"
        note="The dead space is ~540px to the right of the portrait."
      >
        <Labelled label="A · current, left-weighted">
          <div className="flex w-full gap-20">
            <div className="max-w-measure text-lg text-ink-muted">{ABOUT.paragraphs[0]}</div>
            <img src={portrait} alt="" className="h-64 w-auto rounded-lg border border-line" />
          </div>
        </Labelled>

        <Labelled label="B · three columns, full width">
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="col-span-5 text-lg text-ink-muted">{ABOUT.paragraphs[0]}</div>
            <img
              src={portrait}
              alt=""
              className="col-span-3 w-full rounded-lg border border-line"
            />
            <dl className="col-span-3 col-start-10 flex flex-col gap-6">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-xs tracking-mono text-ink-low">{fact.label}</dt>
                  <dd className="mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Labelled>
      </Group>
    </div>
  </div>
)

const Group = ({ title, note, children }) => (
  <section className="flex flex-col gap-8">
    <div className="border-b border-line pb-4">
      <h2 className="text-2xl text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-muted">{note}</p>
    </div>
    {children}
  </section>
)

const Labelled = ({ label, children }) => (
  <div className="flex w-full flex-col items-start gap-3">
    <span className="font-mono text-xs tracking-mono text-ink-low">{label}</span>
    {children}
  </div>
)

export default Lab

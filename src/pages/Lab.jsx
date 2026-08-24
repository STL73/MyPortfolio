import ProjectStatus from "../components/ProjectStatus"
import portrait from "../assets/images/slav-portrait.webp"
import { ABOUT, projectsData } from "../constants/index"

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
          Hover everything. Screenshots cannot show any of this, which is the
          entire reason the page exists.
        </p>
      </header>

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
                <p className="mt-3 text-sm text-ink-muted">
                  {project.description}
                </p>
              </article>
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
            <div className="max-w-measure text-lg text-ink-muted">
              {ABOUT.paragraphs[0]}
            </div>
            <img src={portrait} alt="" className="h-64 w-auto rounded-lg border border-line" />
          </div>
        </Labelled>

        <Labelled label="B · three columns, full width">
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="col-span-5 text-lg text-ink-muted">
              {ABOUT.paragraphs[0]}
            </div>
            <img
              src={portrait}
              alt=""
              className="col-span-3 w-full rounded-lg border border-line"
            />
            <dl className="col-span-3 col-start-10 flex flex-col gap-6">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-xs tracking-mono text-ink-low">
                    {fact.label}
                  </dt>
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

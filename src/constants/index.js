import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "../assets/icons"
import mossShot from "../assets/images/projects/moss-storefront.jpg"

const base = import.meta.env.BASE_URL

export const PERSONAL = {
  email: "hello@spireforge.co.uk",
  linkedin: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
  github: "https://github.com/STL73",
  cv: `${base}resume/CV.pdf`,
  site: "https://spireforge.co.uk",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@spireforge.co.uk",
  location: "UK · Open to remote (incl. Bulgaria)",
  workStatus: "Open to work",
  tagline: "Frontend Developer building fast, accessible web experiences.",
}

/**
 * Hero copy.
 *
 * The largest type on the page is a sentence, not a name. Nobody hires on the
 * strength of a name, and every other portfolio in the pile sets it at 96px --
 * so the space goes to the one claim that is true of Slav and almost nobody
 * else applying for the same roles.
 *
 * `claim` and `turn` are two sentences rather than one string so the second can
 * drop to muted ink: the eye takes the assertion, then the pivot.
 */
export const HERO = {
  eyebrow: "Manchester, UK · open to work",
  claim: "For eight years I ran a supermarket.",
  turn: "Now I build the software that would have made the job easier.",
}

/**
 * The two career tracks, drawn as parallel lanes under the hero.
 *
 * They do not converge and they are not a before-and-after. Both are still
 * running: the degree was taken in the evenings across 2021-2025 without the
 * day job stopping, and it has not stopped now. That concurrency is the fact
 * the rest of the page hangs off, so it gets the signature element.
 *
 * `offset` is where the lane's rule begins, as a percentage of the full span,
 * so the computing lane visibly starts inside the other one. No absolute start
 * year is shown because none is recorded anywhere -- "13 years" is the figure
 * that is actually verifiable, and it is the one that lands harder anyway.
 */
export const careerTracks = [
  {
    id: "work",
    label: "retail & warehouse management",
    figure: "13 years",
    offset: 0,
  },
  {
    id: "computing",
    label: "computing",
    figure: "2021 →",
    offset: 46,
  },
]

/**
 * About copy.
 *
 * Every figure here is checked against the record rather than rounded up:
 * thirteen years across retail and warehouse management, eight of them as
 * Store Manager at BILLA in Bulgaria, a department at KAUFLAND before that,
 * and a BSc (Hons) Computing from Arden at First Class, 77.7%, 2021-2025.
 *
 * The current job is named. A recruiter reads an unexplained gap worse than
 * they read warehouse work, and the whole argument of this page is that the
 * degree was done on top of a full-time job rather than instead of one --
 * which does not hold if the full-time job is quietly left out.
 *
 * The third paragraph gives the limit away before the reader finds it. That is
 * the same move the GitHub profile and the Moss README make, and it is the
 * reason anything else here gets believed.
 */
export const ABOUT = {
  heading: "How I got here",
  // No meta. It held "BSc (Hons) Computing · First Class, 77.7% · 2025",
  // which is Education's fact, stated in Education's own meta, and stated a
  // third time in the third paragraph below. SectionHeading's rule is that
  // meta is for counts and dates, never for a claim -- a classification is a
  // claim, and it belongs to the section that owns it.
  paragraphs: [
    "I spent thirteen years in retail and warehouse management — eight of them running a BILLA store in Bulgaria, and a department at KAUFLAND before that. Running a shop is logistics under time pressure: stock that has to be on the shelf, rotas that have to work, and a floor that opens at seven whether or not last night went to plan.",
    "I started the Computing degree at Arden in 2021 and finished it in 2025 with a First at 77.7%, studying in the evenings without taking time off work. I am still working full time, currently as a warehouse operative at Great Bear in Manchester, and building in the hours around it.",
    "None of that is a substitute for commercial development experience and I would not claim it is. What it does mean is that deadlines, handovers and being the person answerable when something breaks are not new to me. Only the tools are.",
    "I am looking for a junior developer role, and I take freelance work as Spireforge alongside it.",
  ],
  facts: [
    { label: "Based", value: "Manchester, UK" },
    { label: "Languages", value: "Bulgarian, English" },
    { label: "Looking for", value: "A junior developer role" },
    { label: "Freelance", value: "As Spireforge" },
  ],
}

/**
 * Skills, in tiers, because a flat list is a claim that everything on it is
 * equally true.
 *
 * The previous version listed Testing, SEO, Branding, Handoff, Prototyping and
 * REST APIs twice, none of which survives contact with the repository. One
 * inflated claim costs the reader their trust in every other line on the page,
 * and this page is asking to be believed about a career change.
 *
 * The split is the one already used on the GitHub profile README, and the
 * fourth tier is the point of the whole thing: naming what is missing is what
 * makes the first three tiers worth reading.
 *
 * Contents are taken from the skills audit done against 18 graded Arden
 * submissions rather than from memory, which is why Java, Python for data
 * science and Azure CI/CD appear at all -- an earlier version of this list
 * both omitted them and invented other things.
 */
export const SKILLS = {
  heading: "What I can actually do",
  note: "Split by how I know it, not by category. Everything in the third tier is evidenced by graded coursework rather than by a payslip, and I would rather say which is which than let someone find out in an interview.",
  tiers: [
    {
      id: "comfortable",
      label: "Comfortable",
      note: "Reach for these without looking things up",
      // "SQL" used to sit here as its own entry. It is the basic SQL and it is
      // what MySQL and Oracle were driven with, so the two engines carry it --
      // and it stops the same word appearing in two tiers, where it read as a
      // contradiction rather than as two different depths of the same thing.
      items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "PHP", "MySQL", "Oracle"],
    },
    {
      id: "working",
      label: "Working in",
      note: "Used on the projects above, still building fluency",
      items: [
        "React",
        "Vite",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Git",
        "GitHub",
        "GSAP",
      ],
    },
    {
      id: "academic",
      label: "From the degree, not from a job",
      note: "Built and graded, never shipped commercially",
      // What the degree covered in detail is no longer listed here. Advanced
      // SQL and its four clauses, role-based access control, networking,
      // security and CI/CD moved into the Education timeline, against the
      // level that actually taught them -- which is a better home for them
      // than a tier that has to state them without saying when or where.
      items: ["Java (OOP)", "Python", "pandas", "scikit-learn", "Azure", "XAMPP"],
    },
    {
      id: "learning",
      label: "Learning now",
      note: "The honest gaps, and what I am working through",
      items: ["TypeScript", "Next.js", "ORMs", "REST APIs"],
    },
  ],
}

export const CONTACT = {
  heading: "Get in touch",
  intro: "I am looking for a junior developer role, and I take freelance work alongside it. If you have either, or just want to ask something, the form goes straight to my inbox and so does the email address.",
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "My Projects" },
  { href: "#about", label: "About Me" },
  { href: "#skills", label: "My Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]


export const educationData = [
  {
    id: 1,
    period: "2021 - 2025",
    type: "Degree",
    title: "BSc in Computing Sciences",
    institution: "Arden University, Manchester",
    description: "Software engineering, web development, UI/UX foundations.",
  },
]

/**
 * The four levels of the Arden degree.
 *
 * Renamed from `experienceData`, which was actively misleading: it reads as
 * employment history and contains none, and the site went years without
 * mentioning a thirteen-year career partly because this name made it look
 * like that ground was already covered.
 *
 * Ordered newest first. The levels are a real sequence -- Level 6 cannot
 * happen before Level 4 -- which is the one place on this site where ordinal
 * labels carry information rather than decorate a list.
 *
 * SOURCED FROM THE ACTUAL COURSEWORK, not from memory and not from the module
 * titles. Two passes were needed. The first read the transcript this site
 * already serves at `public/certificates/results.pdf`, which fixed the level
 * each module belongs to and added Level 3 -- the degree ran 25/10/2021 to
 * 24/11/2025 and the site claimed "2021 - 2025" while showing only 2022
 * onward, so a reader who counted lost a year. The second read the submitted
 * assignments themselves in `D:/My Files/ARDEN`, which is the only thing that
 * could say what was built inside each module, and it contradicted four
 * claims that had looked safe:
 *
 *   - Web Authoring had NO JavaScript. Eight pages of hand-written HTML and
 *     CSS, flexbox and media queries. The site had claimed JavaScript.
 *   - Distributed and Cloud Computing has NO CI/CD. The one mention of CI/CD
 *     anywhere in four years is a single recommending sentence inside the
 *     System Analysis report -- a suggestion in a design document, not
 *     something built. What the module does have is a real Azure
 *     architecture, which is the stronger claim anyway.
 *   - Data Analysis and Visualisation was Excel, not Python. Python belongs
 *     to Data Mining, a year later.
 *   - Oracle WAS used, and the report is the wrong place to look. Its prose
 *     is deliberately DBMS-agnostic; the screenshots inside it are not, and
 *     they show Oracle APEX 22.2.1 for Introduction to Databases and
 *     phpMyAdmin on MySQL for Advanced Databases. A text search found
 *     nothing because the evidence was never text.
 *
 * The rule this settles: a module title tells you the subject, never the
 * work -- and a submission is not only its prose. Three passes were needed,
 * and each tier of evidence looked complete until the next one contradicted
 * it: transcript, then report text, then the screenshots and source inside
 * the report.
 *
 * Where a line names a technology after an em dash, that is what the
 * assignment actually used -- a recruiter scanning for "Java" or "Azure"
 * finds nothing in a list of academic module titles.
 *
 * No `description` field any more. The topics replaced it and nothing
 * rendered both.
 */
export const degreeLevels = [
  {
    id: 1,
    period: "Level 6 (2024-2025)",
    type: "Specialisation",
    title: "Advanced Development & Cloud",
    topics: [
      "Computing Project \u2014 the Manchester Event Portal: 125 PHP files in MVC, PDO, bcrypt",
      "Web Application Development \u2014 WorldQuiz: PHP and MySQL, user and admin roles",
      "Distributed and Cloud Computing \u2014 Azure App Service, MySQL Flexible Server, private VNet",
      "Data Mining \u2014 Python, pandas and scikit-learn: regression and Random Forest",
      "Managing Innovation and Change \u2014 IoT in third-party logistics, FMEA risk assessment",
    ],
  },
  {
    id: 2,
    period: "Level 5 (2023-2024)",
    type: "Core Skills",
    title: "Software Engineering & Data",
    topics: [
      "Object-Oriented Programming \u2014 Java, modelled in UML first",
      "Advanced Databases \u2014 MySQL: EERD, indexes, views, stored procedures, triggers",
      "System Analysis and Design \u2014 use cases and data-flow diagrams to level 2",
      "Data Analysis and Visualisation \u2014 Excel: cleaning, validation, pivots, distributions",
      "Human Computer Interaction \u2014 personas, prototype, Nielsen heuristics, think-aloud tests",
      "IT Project Management \u2014 PRINCE2: business case, work breakdown, critical path",
    ],
  },
  {
    id: 3,
    period: "Level 4 (2022-2023)",
    type: "Foundations",
    title: "Web & Programming Fundamentals",
    topics: [
      "Introduction to Web Authoring \u2014 an eight-page site in hand-written HTML and CSS",
      "Introduction to Programming \u2014 Java, from algorithm to pseudocode to code",
      "Introduction to Databases \u2014 ERD to third normal form, then SQL in Oracle APEX",
      "Introduction to Computer Systems and Security \u2014 architecture, network models, threats",
      "Productivity and Collaboration Tools for Learning and Work",
      "Introduction to Academic Skills and Professional Development",
    ],
  },
  {
    id: 4,
    period: "Level 3 (2021-2022)",
    type: "Entry",
    title: "Study Skills & Business Context",
    topics: [
      "Using Numeracy, Data and IT \u2014 ratios, percentages, descriptive statistics",
      "Technology in Organisations \u2014 cloud service models, security and privacy",
      "The Structure of Business",
      "Values, Ethics and Working Collaboratively",
      "Research Skills and Using Information",
      "Developing Academic Skills",
    ],
  },
]

export const certificatesData = [
  {
    id: 1,
    title: "BSc in Computing Sciences",
    issuer: "Arden University, Manchester",
    date: "2025",
    fileUrl: `${base}certificates/diploma.pdf`,
    fileSize: "282KB",
  },
  {
    id: 2,
    title: "Arden Achievement Certificate",
    issuer: "Arden University",
    date: "2023",
    fileUrl: `${base}certificates/arden-achieve-certificate.pdf`,
    fileSize: "195KB",
  },
  {
    id: 3,
    title: "Program Results",
    issuer: "Arden University, Manchester",
    date: "2025",
    fileUrl: `${base}certificates/results.pdf`,
    fileSize: "409KB",
  },
]


export const projectsData = [
  {
    id: 1,
    year: "2026",
    title: "Moss — preserved-moss storefront",
    description:
      "A storefront for a preserved-moss decorations business, deployed and running on a custom domain. React 19 client with every route lazy-loaded, a mock catalogue held behind a single API module so the swap to real data is one file, and a colour-contrast contract asserted in tests against the stylesheet itself. The Express API is half-built: authentication works, the product and order routes are still stubs.",
    technologies: ["React 19", "Vite", "Tailwind", "Express", "MongoDB", "Vitest"],
    image: mossShot,
    status: "live",
    caseStudyUrl: "/projects/moss",
    liveUrl: "https://mossart.spireforge.co.uk",
    githubUrl: "https://github.com/STL73/Moss",
  },
  {
    id: 2,
    year: "2026",
    title: "WorldQuiz",
    description:
      "A geography quiz over 46 landmarks, with a token economy, server-side progress that survives the session, and role-gated admin dashboards for managing questions and users. It started as my Level 6 Web Application Development coursework in PHP and MySQL, deployed on the university's hosting. I am rebuilding it now — it already looks nothing like the submitted version, and the stack may not stay the same either.",
    technologies: ["PHP", "MySQLi", "JavaScript", "CSS"],
    image: null,
    status: "wip",
    liveUrl: null,
    githubUrl: "https://github.com/STL73/WorldQuiz",
  },
  {
    id: 3,
    year: "2025",
    title: "Manchester Event Portal",
    description:
      "Final-year project, graded First Class: an events portal for visitors, organisers and admins, each with their own dashboard. 125 PHP files in a strict controller/model/view split, every query a prepared PDO statement, bcrypt at cost 12, and hardened sessions with regeneration and a 30-minute timeout. Favourites, notifications, audit logs, and a scheduled job that emails you before an event you saved. Tested rather than assumed — Lighthouse scores 100 on accessibility, 84 on performance, with zero layout shift.",
    technologies: ["PHP", "MySQL", "PDO", "Tailwind v4", "PHPMailer"],
    image: null,
    status: "private",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 4,
    year: "2026",
    title: "This portfolio",
    description:
      "The site you are reading. React 19 and Vite, everything below the fold code-split behind a Suspense boundary, GSAP scroll animations that respect prefers-reduced-motion, and all copy centralised in one constants file. Source is public; it is not yet deployed to its own domain.",
    technologies: ["React 19", "Vite", "Tailwind v4", "GSAP"],
    image: null,
    status: "wip",
    liveUrl: null,
    githubUrl: "https://github.com/STL73/MyPortfolio",
  },
]

// Marquee strip items for the Skills section ticker

export const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", link: "#home" },
      { name: "My Projects", link: "#projects" },
      { name: "About Me", link: "#about" },
      { name: "My Skills", link: "#skills" },
      { name: "Education", link: "#education" },
      { name: "Contact", link: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [{ name: "Resume/CV", link: `${base}resume/CV.pdf` }],
  },
  {
    title: "Connect",
    links: [
      {
        name: "hello@spireforge.co.uk",
        link: "mailto:hello@spireforge.co.uk",
      },
      {
        name: "LinkedIn Profile",
        link: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
      },
      { name: "GitHub", link: "https://github.com/STL73" },
    ],
  },
]

/**
 * Social links for the footer.
 *
 * `label` is what a screen reader announces for the link, so it names the
 * destination rather than the picture on the button. The previous values were
 * "linkedin logo" and the like, which describes the icon and tells someone
 * following the link nothing about where it goes.
 */
export const socialMedia = [
  {
    src: FaLinkedinIn,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
  },
  { src: FaGithub, label: "GitHub", link: "https://github.com/STL73" },
  {
    src: FaInstagram,
    label: "Instagram",
    link: "https://www.instagram.com/slavitl73/",
  },
]

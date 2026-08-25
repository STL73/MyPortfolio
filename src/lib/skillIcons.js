import {
  SiCss3,
  SiExpress,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiOracle,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiXampp,
} from "react-icons/si"
import { VscAzure } from "react-icons/vsc"

/**
 * Skill name to brand mark.
 *
 * Only products appear here, and that is the rule rather than an accident of
 * what happened to be available. A concept -- ORMs, REST APIs, role-based
 * access control -- has no logo, and giving it a generic glyph instead means
 * inventing a symbol that says nothing the word did not. Where a tier holds
 * concepts, it goes without marks entirely, which reads as a category
 * difference rather than as missing assets.
 *
 * Azure comes from the VS Code set: Simple Icons dropped it, and every name
 * you would guess (`SiMicrosoftazure`, `SiAzure`) does not exist.
 *
 * A name with no entry renders as a bare pill. That is deliberate and must
 * stay working -- it is what lets a tier mix the two if it ever needs to.
 */
export const SKILL_ICONS = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  PHP: SiPhp,
  MySQL: SiMysql,
  Oracle: SiOracle,
  React: SiReact,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  GSAP: SiGreensock,
  "Java (OOP)": SiOpenjdk,
  Python: SiPython,
  pandas: SiPandas,
  "scikit-learn": SiScikitlearn,
  Azure: VscAzure,
  XAMPP: SiXampp,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
}

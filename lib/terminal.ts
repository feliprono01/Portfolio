import { SECTIONS, getSection } from "@/content/sections";
import { HERO } from "@/content/hero";
import { PHILOSOPHY_PARAGRAPHS, PERSONAL_INFO, EDUCATION } from "@/content/about";
import { SKILL_CATEGORIES, LEVEL_LABEL } from "@/content/skills";
import { ROLE, QUESTS } from "@/content/experience";
import { CERTIFICATIONS } from "@/content/certifications";
import { PROJECTS } from "@/content/projects";
import { CONTACT_LINKS } from "@/content/contact";

export interface TerminalLine {
  text: string;
  tone?: "error" | "accent" | "muted";
}

export type TerminalAction =
  | { type: "navigate"; path: string }
  | { type: "clear" }
  | { type: "close" };

export interface TerminalResult {
  lines: TerminalLine[];
  action?: TerminalAction;
}

const line = (text: string, tone?: TerminalLine["tone"]): TerminalLine => ({ text, tone });

/** Section slugs accept both the URL slug and the short id, case-insensitive. */
function resolveSection(token: string) {
  const t = token.toLowerCase().trim();
  if (t === "hub" || t === "inicio" || t === "home" || t === "~" || t === "/") {
    return { path: "/", label: "Hub" };
  }
  const bySlug = SECTIONS.find((s) => s.path === `/${t}` || s.path.slice(1) === t);
  if (bySlug) return bySlug;
  const byId = getSection(t);
  if (byId) return byId;
  return null;
}

const SECTION_FILES: Record<string, () => TerminalLine[]> = {
  "sobre-mi": () => [
    ...PHILOSOPHY_PARAGRAPHS.flatMap((p) => [line(p.text), line("")]),
    ...PERSONAL_INFO.map((i) => line(`${i.label}: ${i.value}`)),
    line(""),
    ...EDUCATION.map((e) => line(`${e.career} — ${e.institution} (${e.dates}, ${e.status})`)),
  ],
  habilidades: () =>
    SKILL_CATEGORIES.flatMap((cat) => [
      line(`${cat.title}:`, "accent"),
      ...cat.skills.map((s) => line(`  ${s.name} — ${LEVEL_LABEL[s.level]}`)),
      line(""),
    ]),
  experiencia: () => [
    line(`${ROLE.title} — ${ROLE.context} (${ROLE.period})`, "accent"),
    line(ROLE.description),
    line(""),
    ...QUESTS.flatMap((q) => [line(`[${q.status}] ${q.title} — ${q.client}`), line(`  ${q.text}`)]),
  ],
  certificaciones: () =>
    CERTIFICATIONS.map((c) => line(`${c.title} — ${c.institution} (${c.date}, ${c.hours}hs)`)),
  proyectos: () =>
    PROJECTS.map((p) => line(`${p.title} [${p.category}] — ${p.description}`)),
  contacto: () => CONTACT_LINKS.map((c) => line(`${c.label}: ${c.value}`)),
};

const COMMANDS: Record<string, string> = {
  help: "muestra esta ayuda",
  ls: "lista los niveles — probá `ls proyectos`",
  cd: "navega a un nivel — ej: `cd proyectos`, `cd hub`",
  cat: "muestra el contenido de un nivel — ej: `cat sobre-mi.txt`",
  whoami: "quién soy",
  contacto: "datos de contacto — `contacto --email`",
  clear: "limpia la pantalla",
  exit: "cierra la terminal",
};

export function getCompletions(input: string): string[] {
  const parts = input.split(" ");
  if (parts.length === 1) {
    const partial = parts[0].toLowerCase();
    return Object.keys(COMMANDS).filter((c) => c.startsWith(partial) && c !== partial);
  }

  const cmd = parts[0].toLowerCase();
  const partial = parts[parts.length - 1].toLowerCase();
  if (cmd === "cd") {
    const names = ["hub", ...SECTIONS.map((s) => s.path.slice(1))];
    return names.filter((n) => n.startsWith(partial) && n !== partial);
  }
  if (cmd === "cat") {
    const names = Object.keys(SECTION_FILES).map((s) => `${s}.txt`);
    return names.filter((n) => n.startsWith(partial) && n !== partial);
  }
  return [];
}

export function runCommand(raw: string): TerminalResult {
  const input = raw.trim();
  if (!input) return { lines: [] };

  const [cmd, ...args] = input.split(/\s+/);
  const command = cmd.toLowerCase();

  switch (command) {
    case "help":
      return {
        lines: [
          line("Comandos disponibles:", "accent"),
          ...Object.entries(COMMANDS).map(([name, desc]) => line(`  ${name.padEnd(10)} ${desc}`)),
        ],
      };

    case "ls": {
      if (args[0]?.toLowerCase() === "proyectos") {
        return { lines: [line("proyectos/", "accent"), ...PROJECTS.map((p) => line(`  ${p.title}`))] };
      }
      return {
        lines: [
          line("niveles/", "accent"),
          ...SECTIONS.map((s) => line(`  ${s.path.slice(1)}/`)),
          line(""),
          line("Tip: `ls proyectos` para ver el detalle de cada uno.", "muted"),
        ],
      };
    }

    case "cd": {
      if (!args[0]) return { lines: [line("uso: cd <nivel>  (ej: cd proyectos)", "error")] };
      const target = resolveSection(args[0]);
      if (!target) {
        return {
          lines: [
            line(`cd: no existe el nivel "${args[0]}"`, "error"),
            line("Probá `ls` para ver los niveles disponibles.", "muted"),
          ],
        };
      }
      return { lines: [line(`Viajando a ${target.label}...`, "accent")], action: { type: "navigate", path: target.path } };
    }

    case "cat": {
      if (!args[0]) return { lines: [line("uso: cat <archivo>  (ej: cat sobre-mi.txt)", "error")] };
      const name = args[0].toLowerCase().replace(/\.txt$/, "");
      const file = SECTION_FILES[name];
      if (!file) {
        return {
          lines: [
            line(`cat: no se encuentra "${args[0]}"`, "error"),
            line(
              `Archivos disponibles: ${Object.keys(SECTION_FILES).map((s) => `${s}.txt`).join(", ")}`,
              "muted"
            ),
          ],
        };
      }
      return { lines: file() };
    }

    case "whoami":
      return {
        lines: [
          line(`felipe — ${HERO.titleTop} ${HERO.titleBottom}`, "accent"),
          line(HERO.description),
          line(""),
          line("Más detalle: `cat sobre-mi.txt` o `cd sobre-mi`.", "muted"),
        ],
      };

    case "contacto": {
      const flag = args[0]?.toLowerCase();
      const map: Record<string, string> = {
        "--email": "email",
        "--phone": "phone",
        "--telefono": "phone",
        "--linkedin": "linkedin",
        "--github": "github",
      };
      if (flag && map[flag]) {
        const found = CONTACT_LINKS.find((c) => c.icon === map[flag]);
        return { lines: found ? [line(found.value)] : [line("No encontrado.", "error")] };
      }
      return {
        lines: [
          line("uso: contacto --email | --phone | --linkedin | --github", "muted"),
          ...CONTACT_LINKS.map((c) => line(`  ${c.label}: ${c.value}`)),
        ],
      };
    }

    case "clear":
      return { lines: [], action: { type: "clear" } };

    case "exit":
    case "quit":
    case "q":
      return { lines: [], action: { type: "close" } };

    case "sudo":
      return { lines: [line("Lindo intento. Acá el único root soy yo.", "error")] };

    default:
      return {
        lines: [
          line(`bash: ${command}: comando no encontrado`, "error"),
          line("¿Probaste `help`? No, en serio, probalo.", "muted"),
        ],
      };
  }
}

export type SectionId =
  | "about"
  | "skills"
  | "experience"
  | "certifications"
  | "projects"
  | "contact";

export interface SectionDef {
  id: SectionId;
  path: string;
  label: string;
  tagline: string;
}

/**
 * Single source of truth for every "level" of the site: the hub's level
 * select grid, the HUD's progress bar and quick-warp menu, the footer nav,
 * and (later) the terminal's `cd`/`ls` commands all read from this list
 * instead of each keeping their own copy.
 */
export const SECTIONS: SectionDef[] = [
  { id: "about", path: "/sobre-mi", label: "Sobre mí", tagline: "Ficha de personaje" },
  { id: "skills", path: "/habilidades", label: "Habilidades", tagline: "Inventario de tecnologías" },
  { id: "experience", path: "/experiencia", label: "Experiencia", tagline: "Registro de misiones" },
  { id: "certifications", path: "/certificaciones", label: "Certificaciones", tagline: "Logros desbloqueados" },
  { id: "projects", path: "/proyectos", label: "Proyectos", tagline: "Estante de cartuchos" },
  { id: "contact", path: "/contacto", label: "Contacto", tagline: "Enviar un mensaje" },
];

export function getSection(id: string): SectionDef | undefined {
  return SECTIONS.find((s) => s.id === id);
}

export function getSectionByPath(path: string): SectionDef | undefined {
  return SECTIONS.find((s) => s.path === path);
}

export function getAdjacentSections(id: SectionId): { prev: SectionDef | null; next: SectionDef | null } {
  const idx = SECTIONS.findIndex((s) => s.id === id);
  return {
    prev: idx > 0 ? SECTIONS[idx - 1] : null,
    next: idx >= 0 && idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null,
  };
}

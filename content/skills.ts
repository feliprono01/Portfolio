/**
 * Qualitative, not self-rated: derived from how often each technology
 * actually shows up across Experience/Projects, not a made-up percentage.
 */
export type SkillLevel = 1 | 2 | 3;

export const LEVEL_LABEL: Record<SkillLevel, string> = {
  1: "Novato",
  2: "Intermedio",
  3: "Avanzado",
};

export interface Skill {
  name: string;
  level: SkillLevel;
}

export type SkillCategoryIcon = "frontend" | "backend" | "database" | "tools";

export interface SkillCategory {
  title: string;
  icon: SkillCategoryIcon;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Mobile",
    icon: "frontend",
    skills: [
      { name: "React", level: 3 },
      { name: "JavaScript (ES6+)", level: 3 },
      { name: "HTML5 / CSS3", level: 3 },
      { name: "React Native (Expo)", level: 2 },
      { name: "WebGL (Basic)", level: 1 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: "backend",
    skills: [
      { name: "Java (POO)", level: 3 },
      { name: "Spring Boot", level: 3 },
      { name: "RESTful APIs", level: 3 },
      { name: "Spring Security", level: 2 },
      { name: "Python (Basics)", level: 1 },
    ],
  },
  {
    title: "Database & DevOps",
    icon: "database",
    skills: [
      { name: "MySQL / SQL", level: 3 },
      { name: "Modelado de Datos", level: 2 },
      { name: "Docker", level: 2 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "tools",
    skills: [
      { name: "Git / GitHub", level: 3 },
      { name: "Metodologías Ágiles", level: 2 },
      { name: "AI-Assisted Development", level: 2 },
    ],
  },
];

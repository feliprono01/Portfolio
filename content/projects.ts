export type ProjectCategory = "Todas" | "Frontend" | "Backend" | "FullStack";

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  badges: string[];
  tags: string[];
  repo: string | null;
  demo: string | null;
  featured: boolean;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = ["Todas", "Frontend", "Backend", "FullStack"];

export const PROJECTS: Project[] = [
  {
    title: "Sistema de Almuerzo para Empresas",
    category: "FullStack",
    description:
      "Sistema integral para la gestión de almuerzos corporativos. Plataforma web y aplicación mobile consumiendo la misma API REST, permitiendo a empleados realizar pedidos y a administradores gestionar menús y reportes.",
    badges: ["CLIENT/UI", "REST API", "MOBILE"],
    tags: ["HTML", "CSS", "JavaScript", "Spring Boot", "React Native", "Expo Go"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "Historias Clínicas — Psiquiatría",
    category: "FullStack",
    description:
      "Sistema para almacenar y gestionar pacientes del área psiquiátrica junto con su evolución clínica. Implementación de seguridad robusta para protección de datos sensibles de salud mental.",
    badges: ["CLIENT/UI", "REST API", "AUTH"],
    tags: ["React", "Tailwind CSS", "Spring Boot", "Spring Security", "MySQL"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "RDAM",
    category: "FullStack",
    description:
      "Sistema RDAM para el Poder Judicial de la provincia de Santa Fe. Permite la solicitud de certificados por parte de los ciudadanos y la carga de los mismos por parte de los operadores. Arquitectura fullstack con autenticación, roles y deploy containerizado.",
    badges: ["CLIENT/UI", "REST API", "AUTH"],
    tags: ["React", "Tailwind CSS", "Spring Boot", "Spring Security", "MySQL", "Docker"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "Portfolio Personal",
    category: "Frontend",
    description:
      "Portfolio profesional para mostrar capacidades, experiencia y proyectos. Diseño moderno con animaciones, modo oscuro y rendimiento optimizado.",
    badges: ["CLIENT/UI", "SSG"],
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    repo: null,
    demo: null,
    featured: true,
  },
];

export const BADGE_ACCENT: Record<string, "primary" | "secondary"> = {
  "CLIENT/UI": "secondary",
  "REST API": "secondary",
  MOBILE: "primary",
  AUTH: "primary",
  SSG: "secondary",
};

export const CHARACTER = {
  name: "Felipe Prono",
  class: "Full Stack Developer",
  origin: "Santa Fe, Argentina",
};

export const PHILOSOPHY_PARAGRAPHS: { text: string; strong?: string[] }[] = [
  {
    text: "Mi filosofía de desarrollo se basa en la convergencia entre la ingeniería de software tradicional y la potencia de la Inteligencia Artificial. No veo a la IA como un reemplazo, sino como un multiplicador de capacidades que me permite entregar soluciones robustas en tiempos optimizados. Mi enfoque es construir sistemas escalables donde la precisión del código y la innovación inteligente trabajen en sintonía.",
    strong: ["multiplicador de capacidades"],
  },
  {
    text: "Desarrollador Fullstack enfocado en la construcción de ecosistemas digitales de alto rendimiento. Mi especialidad abarca desde el desarrollo Frontend moderno hasta la lógica de negocio en el Backend, garantizando la integración perfecta de APIs y bases de datos. Aplico metodologías asistidas por IA para maximizar la calidad del código y la velocidad de entrega.",
    strong: ["Frontend moderno", "Backend"],
  },
];

export type PersonalInfoIcon = "location" | "education" | "availability" | "languages";

export const PERSONAL_INFO: { icon: PersonalInfoIcon; label: string; value: string }[] = [
  { icon: "location", label: "Ubicación", value: "Santa Fe, Argentina" },
  { icon: "education", label: "Formación", value: "IES — Tec. Desarrollo de Software" },
  { icon: "availability", label: "Disponibilidad", value: "Full-time · Sin restricción horaria" },
  { icon: "languages", label: "Idiomas", value: "Español nativo · Inglés avanzado" },
];

export interface EducationEntry {
  institution: string;
  career: string;
  dates: string;
  status: "En curso" | "En pausa";
  description: string;
  progress?: number;
  subjectsApproved?: number;
  subjectsTotal?: number;
}

export const EDUCATION: EducationEntry[] = [
  {
    institution: "IES (Instituto de Educación Superior)",
    career: "Tecnicatura Superior en Desarrollo de Software",
    dates: "2024 — 2026",
    progress: 70,
    status: "En curso",
    description:
      "Formación técnica superior en algoritmos, estructuras de datos, POO, bases de datos y arquitectura de software. Inglés técnico B2 integrado.",
  },
  {
    institution: "ISPC (Instituto Superior Politécnico de Córdoba)",
    career: "Tecnicatura Superior en Desarrollo Web y Aplicaciones Móviles",
    dates: "2022 — 2026",
    subjectsApproved: 9,
    subjectsTotal: 14,
    status: "En pausa",
    description:
      "Formación técnica en desarrollo web y aplicaciones móviles. 9 materias de 14 aprobadas.",
  },
];

export const CERT_SUMMARY = "Desarrollo Web, Python y Full Stack Junior.";

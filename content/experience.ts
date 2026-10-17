export const ROLE = {
  title: "Desarrollador Full Stack",
  context: "Proyectos Independientes",
  modality: "Independiente · Remoto",
  period: "2024 — Presente",
  description:
    "Desarrollo end-to-end de sistemas web y mobile para clientes de distintos rubros. Gestión autónoma del ciclo completo: relevamiento de requerimientos, diseño de arquitectura, desarrollo, seguridad y puesta en producción.",
};

export interface Quest {
  title: string;
  client: string;
  status: "Completada" | "En progreso";
  text: string;
  tags: string[];
}

export const QUESTS: Quest[] = [
  {
    title: "Historias Clínicas — Psiquiatría",
    client: "Sector salud",
    status: "Completada",
    text: "Sistema de gestión de historias clínicas para el área psiquiátrica, con arquitectura MVC y Spring Security para garantizar confidencialidad de datos sensibles de pacientes.",
    tags: ["React", "Tailwind CSS", "Spring Boot", "Spring Security", "MySQL"],
  },
  {
    title: "Almuerzos Corporativos",
    client: "Gestión interna de empresas",
    status: "Completada",
    text: "Solución multiplataforma de gestión de almuerzos: app mobile con React Native + Expo y versión web, ambas consumiendo la misma API REST en Spring Boot.",
    tags: ["React Native", "Expo", "HTML/CSS/JS", "Spring Boot", "MySQL"],
  },
  {
    title: "RDAM — Certificados Digitales",
    client: "i2t",
    status: "Completada",
    text: "Plataforma de emisión de certificados digitales con autenticación por email, pasarela de pagos, roles (administrador/operador) y panel de gestión. Deploy containerizado.",
    tags: ["React", "Tailwind CSS", "Spring Boot", "MySQL", "Docker"],
  },
  {
    title: "Facturación Agropecuaria",
    client: "PyME del sector agro",
    status: "En progreso",
    text: "Sistema de facturación con cálculo automático de impuestos y percepciones. Fase de análisis y diseño, trabajando con el cliente en la definición de requerimientos.",
    tags: ["Análisis de requerimientos", "Arquitectura"],
  },
];

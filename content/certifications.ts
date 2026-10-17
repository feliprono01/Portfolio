export type CertAccent = "primary" | "secondary";

export interface Certification {
  title: string;
  institution: string;
  issuer: string | null;
  hours: number;
  date: string;
  badgeLabel: string;
  official: boolean;
  file: string;
  accent: CertAccent;
  featured: boolean;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Desarrollador Full Stack Junior",
    institution: "Instituto Superior Politécnico Córdoba (ISPC)",
    issuer: "Ministerio de Educación — Provincia de Córdoba",
    hours: 300,
    date: "Agosto 2023",
    badgeLabel: "Título oficial del Estado",
    official: true,
    file: "/certs/fullstack-junior-ispc.pdf",
    accent: "primary",
    featured: true,
  },
  {
    title: "Programador",
    institution: "Instituto Superior Politécnico Córdoba (ISPC)",
    issuer: "Ministerio de Educación — Provincia de Córdoba",
    hours: 364,
    date: "Agosto 2023",
    badgeLabel: "Título oficial del Estado",
    official: true,
    file: "/certs/programador-ispc.pdf",
    accent: "secondary",
    featured: false,
  },
  {
    title: "Desarrollo Web",
    institution: "Coderhouse",
    issuer: "Certificado por PedidosYa",
    hours: 38,
    date: "Julio 2023",
    badgeLabel: "Certificado",
    official: false,
    file: "/certs/desarrollo-web-coderhouse.png",
    accent: "secondary",
    featured: false,
  },
  {
    title: "Programming Essentials in Python",
    institution: "Instituto Superior Politécnico Córdoba / Cisco",
    issuer: null,
    hours: 75,
    date: "Abril 2023",
    badgeLabel: "Certificado oficial",
    official: false,
    file: "/certs/python-essentials-ispc.pdf",
    accent: "primary",
    featured: false,
  },
];

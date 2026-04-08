import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/providers/MotionProvider";
import CursorTrail from "@/components/CursorTrail";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Felipe Prono — Desarrollador de Software",
    template: "%s | Felipe Prono",
  },
  description:
    "Portfolio profesional de Felipe Prono. Desarrollador de Software con visión en innovación tecnológica, integrando IA en la arquitectura de aplicaciones.",
  keywords: [
    "portfolio",
    "desarrollador",
    "software",
    "React",
    "Next.js",
    "TypeScript",
    "IA",
    "inteligencia artificial",
  ],
  authors: [{ name: "Felipe Prono" }],
  creator: "Felipe Prono",
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Felipe Prono — Desarrollador de Software",
    description:
      "Portfolio profesional. Desarrollador de Software especializado en innovación tecnológica e IA.",
    siteName: "Felipe Prono Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Prono — Desarrollador de Software",
    description:
      "Portfolio profesional. Desarrollador de Software especializado en innovación tecnológica e IA.",
    creator: "@feliprono",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${syne.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
        <CursorTrail />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/providers/MotionProvider";
import CursorTrail from "@/components/CursorTrail";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Theme init (avoids flash of wrong theme) ──────────────────────────────────
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://felipeprono.dev"),
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
  themeColor: "#1A1814",
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
      className={`${chakraPetch.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
        <CursorTrail />
      </body>
    </html>
  );
}

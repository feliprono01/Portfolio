import type { Metadata, Viewport } from "next";
import {
  Chakra_Petch,
  Inter,
  JetBrains_Mono,
  Orbitron,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import "./globals.css";
import MotionProvider from "@/providers/MotionProvider";
import StoreHydrator from "@/providers/StoreHydrator";
import CrtOverlay from "@/components/fx/CrtOverlay";
import PixelCursor from "@/components/fx/PixelCursor";
import { DEFAULT_SKIN, SKIN_IDS } from "@/lib/skins";
import { STORE_KEY } from "@/lib/store";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Only the default skin's display font is preloaded; the rest load on demand.
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323", display: "swap" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start", display: "swap", preload: false });
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-chakra", display: "swap", preload: false });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-orbitron", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter", display: "swap", preload: false });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jetbrains", display: "swap" });

const fontVariables = [vt323, pressStart, chakraPetch, orbitron, inter, jetbrainsMono].map((f) => f.variable).join(" ");

// ─── Skin init (runs before first paint; also honors ?skin=<id>) ─────────────
const skinInitScript = `
(function () {
  var ids = ${JSON.stringify(SKIN_IDS)};
  var def = ${JSON.stringify(DEFAULT_SKIN)};
  var key = ${JSON.stringify(STORE_KEY)};
  var root = document.documentElement;
  try {
    var raw = localStorage.getItem(key);
    var data = raw ? JSON.parse(raw) : null;
    var skin = data && data.state && data.state.skin;
    var q = new URLSearchParams(location.search).get("skin");
    if (q && ids.indexOf(q) > -1) {
      skin = q;
      data = data || { state: {}, version: 0 };
      data.state = data.state || {};
      data.state.skin = q;
      localStorage.setItem(key, JSON.stringify(data));
    }
    root.setAttribute("data-skin", ids.indexOf(skin) > -1 ? skin : def);
  } catch (e) {
    root.setAttribute("data-skin", def);
  }
})();
`;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://felipeprono.vercel.app"),
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
  themeColor: "#0a0f0a",
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
      className={fontVariables}
      data-skin={DEFAULT_SKIN}
      data-crt="on"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skinInitScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <StoreHydrator />
        <MotionProvider>{children}</MotionProvider>
        <CrtOverlay />
        <PixelCursor />
      </body>
    </html>
  );
}

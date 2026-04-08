import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Google Fonts ────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },

      // ─── Color Palette ───────────────────────────────────────────────
      colors: {
        bg: {
          primary:   "#000000",
          secondary: "#0a0a0a",
          elevated:  "#111111",
          muted:     "#1a1a1a",
        },
        text: {
          primary:   "#ffffff",
          secondary: "#a8a8a8",
          muted:     "#666666",
          disabled:  "#444444",
        },
        border: {
          subtle:  "#1a1a1a",
          default: "#2a2a2a",
          strong:  "#444444",
          white:   "#ffffff",
        },
        gray: {
          50:  "#f9f9f9",
          100: "#ededed",
          200: "#d4d4d4",
          300: "#b0b0b0",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#2a2a2a",
          800: "#1a1a1a",
          900: "#111111",
          950: "#0a0a0a",
        },
        surface: "#111111",
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ─── Box Shadows ─────────────────────────────────────────────────
      boxShadow: {
        card:      "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
        "card-lg": "0 4px 24px rgba(0,0,0,0.6)",
        inset:     "inset 0 1px 0 rgba(255,255,255,0.05)",
        white:     "0 0 20px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.03)",
      },

      // ─── Keyframes & Animations ──────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "shimmer-white": {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        blob: "blob 8s ease-in-out infinite",
        "blob-slow": "blob 12s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "shimmer-white": "shimmer-white 3s linear infinite",
      },

      // ─── Background Gradients ────────────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;

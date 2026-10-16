import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Fonts ───────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // ─── Color Palette ───────────────────────────────────────────────
      // Semantic tokens use rgb(var(..) / <alpha-value>) so Tailwind's
      // opacity modifiers (bg-bg-primary/40) resolve correctly while the
      // underlying values still swap between light/dark via CSS vars.
      colors: {
        bg: {
          primary: "rgb(var(--color-bg-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-surface-rgb) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-elevated-rgb) / <alpha-value>)",
          muted: "rgb(var(--color-surface-elevated-rgb) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary-rgb) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted-rgb) / <alpha-value>)",
          disabled: "rgb(var(--color-text-muted-rgb) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--color-border-rgb) / <alpha-value>)",
          default: "rgb(var(--color-border-rgb) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong-rgb) / <alpha-value>)",
          white: "rgb(var(--color-text-primary-rgb) / <alpha-value>)",
        },
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        accent: {
          primary: "rgb(var(--color-accent-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-accent-secondary-rgb) / <alpha-value>)",
        },

        // Raw arcade palette — fixed across themes, used for decoration
        arcade: {
          mustard: "#E0A245",
          sage: "#6E9077",
          sand: "#F5C97A",
          rust: "#9D6A3D",
          olive: "#5E5E3A",
          brown: "#4F473A",
        },

        // Neutral ramp kept for existing components, retuned warm
        gray: {
          50: "var(--color-text-primary)",
          100: "var(--color-text-primary)",
          200: "var(--color-text-secondary)",
          300: "var(--color-text-secondary)",
          400: "var(--color-text-muted)",
          500: "var(--color-text-muted)",
          600: "var(--color-border-strong)",
          700: "var(--color-border)",
          800: "var(--color-surface-elevated)",
          900: "var(--color-surface)",
          950: "var(--color-bg)",
        },
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ─── Box Shadows ─────────────────────────────────────────────────
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.25)",
        "card-lg": "0 4px 24px rgba(0,0,0,0.5)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)",
        mustard: "0 0 24px rgba(224,162,69,0.25)",
        sage: "0 0 24px rgba(110,144,119,0.25)",
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
        "pixel-wave": {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "pixel-wave": "pixel-wave 1.6s ease-in-out infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
      },

      backgroundImage: {
        "octa-pattern":
          "radial-gradient(circle, var(--color-border) 1px, transparent 1.5px)",
      },
      backgroundSize: {
        octa: "18px 18px",
      },
    },
  },
  plugins: [],
};

export default config;

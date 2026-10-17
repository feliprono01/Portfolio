export type SkinId = "phosphor" | "gameboy" | "earth" | "arcade";

export const DEFAULT_SKIN: SkinId = "phosphor";

export interface Skin {
  id: SkinId;
  name: string;
  tagline: string;
  /** Three colors shown as a preview chip in the selector. */
  swatches: [string, string, string];
  themeColor: string;
}

export const SKINS: Skin[] = [
  {
    id: "phosphor",
    name: "Fósforo CRT",
    tagline: "Verde sobre negro, monitor de laboratorio",
    swatches: ["#0a0f0a", "#33ff66", "#ffb000"],
    themeColor: "#0a0f0a",
  },
  {
    id: "gameboy",
    name: "Game Boy",
    tagline: "Cuatro tonos de verde, pantalla LCD",
    swatches: ["#0f380f", "#306230", "#9bbc0f"],
    themeColor: "#9bbc0f",
  },
  {
    id: "earth",
    name: "Tierra",
    tagline: "Mostaza y salvia, consola de los 70",
    swatches: ["#1a1814", "#e0a245", "#6e9077"],
    themeColor: "#1a1814",
  },
  {
    id: "arcade",
    name: "Arcade neón",
    tagline: "Magenta y cian, salón de recreativas",
    swatches: ["#0b0618", "#ff2bd6", "#19e6ff"],
    themeColor: "#0b0618",
  },
];

export const SKIN_IDS = SKINS.map((s) => s.id);

export function isSkinId(value: unknown): value is SkinId {
  return typeof value === "string" && (SKIN_IDS as string[]).includes(value);
}

export const LOADING_TIPS = [
  "Felipe también labura con Docker.",
  "Probá el código Konami en cualquier pantalla: ↑↑↓↓←→←→BA.",
  "Podés cambiar de skin de consola desde cualquier nivel.",
  "La ficha de Habilidades no usa autoevaluación — el nivel sale de uso real en proyectos.",
  "RDAM es un sistema real, hecho para el Poder Judicial de Santa Fe.",
  "El formulario de Contacto manda el mensaje de verdad, no es una simulación.",
  "El monitor del hub es three.js hecho con primitivas, sin modelos 3D importados.",
  "Hay un efecto CRT real con Bloom en el canvas, no solo en CSS.",
  "El sitio entero corre en Next.js + TypeScript + Tailwind.",
  "Cada logro que desbloqueás queda guardado en tu navegador.",
];

export function randomTip(): string {
  return LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
}

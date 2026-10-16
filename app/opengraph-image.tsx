import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Felipe Prono — Desarrollador de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MUSTARD = "#e0a245";
const SAGE = "#6e9077";
const BG = "#1a1814";
const TEXT = "#f2e8d5";
const BORDER = "#4f473a";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px 100px",
          background: BG,
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Dot grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            opacity: 0.25,
          }}
        >
          {Array.from({ length: 24 * 13 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 2, height: 2, background: BORDER, display: "flex" }} />
            </div>
          ))}
        </div>

        {/* Overline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: SAGE,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          <span>{"<"}</span>
          <span>Felipe Prono</span>
          <span>{"/>"}</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 700,
            fontSize: 108,
            lineHeight: 1.02,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: TEXT, display: "flex" }}>Software</span>
          <span style={{ color: MUSTARD, display: "flex" }}>Developer</span>
        </div>

        {/* Stack chips */}
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {["REACT", "SPRING BOOT", "JAVA", "MYSQL"].map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 20px",
                fontSize: 20,
                color: TEXT,
                background: "#2b2720",
                border: `1px solid ${BORDER}`,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

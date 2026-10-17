import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Felipe Prono — Desarrollador de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#33ff66";
const ACCENT_2 = "#ffb000";
const BG = "#0a0f0a";
const TEXT = "#d6f5d6";
const BORDER = "#1f3a1f";

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
            color: ACCENT_2,
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
          <span style={{ color: ACCENT, display: "flex" }}>Developer</span>
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
                background: "#162216",
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

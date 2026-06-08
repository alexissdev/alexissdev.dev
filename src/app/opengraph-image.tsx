import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alexis Costa — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0e0816 0%, #160d22 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(168,85,247,0.25)",
              borderRadius: 999,
              padding: "8px 20px",
              background: "rgba(168,85,247,0.06)",
              color: "rgba(192,132,252,0.8)",
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer · Buenos Aires 🇦🇷
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              display: "flex",
              gap: 20,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "white" }}>Hi, I&apos;m</span>
            <span style={{ color: "#a855f7" }}>Alexis</span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              textAlign: "center",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Building modern web applications, APIs and scalable systems.
          </p>

          {/* URL */}
          <p
            style={{
              fontSize: 16,
              color: "rgba(168,85,247,0.6)",
              marginTop: 8,
            }}
          >
            alexissdev.dev
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}

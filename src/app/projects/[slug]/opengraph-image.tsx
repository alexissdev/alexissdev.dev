import { ImageResponse } from "next/og";
import { getRepository } from "@/lib/github";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const repo = await getRepository(slug).catch(() => null);

  const name = repo?.name ?? slug;
  const description = repo?.description ?? "";
  const language = repo?.language ?? "";
  const stars = repo?.stargazersCount ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0e0816 0%, #160d22 100%)",
          fontFamily: "sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Top — site label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
          <span style={{ color: "rgba(168,85,247,0.7)", fontSize: 14, letterSpacing: "0.1em" }}>
            ALEXISSDEV.DEV / PROJECTS
          </span>
        </div>

        {/* Middle — project info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {repo?.featured && (
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(192,132,252,0.8)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  borderRadius: 999,
                  padding: "4px 12px",
                  background: "rgba(168,85,247,0.08)",
                }}
              >
                Featured
              </span>
            )}
            {language && (
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{language}</span>
            )}
          </div>

          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              margin: 0,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>

          {description && (
            <p
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
                maxWidth: 700,
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom — stats */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>⭐ {stars} stars</span>
          </div>
          <span style={{ fontSize: 14, color: "rgba(168,85,247,0.5)" }}>alexissdev.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

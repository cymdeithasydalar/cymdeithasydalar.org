import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #1e3a1e 0%, #2d6a2d 60%, #4a9e4a 100%)",
          padding: "60px",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            Cymdeithas y Dalar
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#b3e5b3",
              textAlign: "center",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            Community Allotment
          </div>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#4a9e4a",
              borderRadius: "2px",
              marginTop: "8px",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#cdeccd",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Grow Together — Thrive Together
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

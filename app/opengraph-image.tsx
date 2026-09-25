import { ImageResponse } from "next/og"

import { defaultDescription, siteName } from "@/lib/seo"

export const alt = siteName
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(145deg, #1b241d 0%, #315e13 42%, #7fcc2f 100%)",
          color: "#f7fbf5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          KCIC
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.08,
            maxWidth: 900,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            lineHeight: 1.4,
            maxWidth: 820,
            opacity: 0.92,
          }}
        >
          {defaultDescription}
        </div>
      </div>
    ),
    { ...size }
  )
}

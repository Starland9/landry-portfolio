import type { ReactNode } from "react";

// Shared look of the Open Graph images: Terre palette, no gradient, no effect.
export const ogSize = { width: 1200, height: 630 };

const colors = {
  bg: "#f7f5f0",
  fg: "#1a1714",
  muted: "#5c554d",
  border: "#e0d9cd",
  accent: "#a83a14",
};

export function OgFrame({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: colors.bg,
        color: colors.fg,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 26, color: colors.muted, letterSpacing: 1 }}>
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.02,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 38,
            color: colors.muted,
            lineHeight: 1.3,
            maxWidth: 980,
          }}
        >
          {subtitle}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `2px solid ${colors.fg}`,
          paddingTop: 24,
          fontSize: 26,
        }}
      >
        {footer}
        <div
          style={{
            display: "flex",
            width: 56,
            height: 8,
            background: colors.accent,
          }}
        />
      </div>
    </div>
  );
}

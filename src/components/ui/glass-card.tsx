import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GlassElevation = "surface" | "raised" | "overlay" | "modal";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  elevation?: GlassElevation;
}

const elevationStyles: Record<GlassElevation, string> = {
  surface: "bg-neutral-900/70 backdrop-blur-sm border-white/[0.06] shadow-none",
  raised: "bg-neutral-900/80 backdrop-blur-md border-white/[0.08] shadow-lg",
  overlay: "bg-neutral-900/85 backdrop-blur-xl border-white/[0.10] shadow-2xl",
  modal:
    "bg-neutral-900/90 backdrop-blur-2xl border-white/[0.12] shadow-2xl shadow-cyan-500/10",
};

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  elevation = "raised",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl",
        elevationStyles[elevation],
        hover &&
          "transition-all duration-500 hover:scale-[1.02] hover:bg-neutral-800/90 hover:border-white/15 hover:shadow-2xl hover:shadow-cyan-500/10",
        glow && "shadow-lg shadow-cyan-500/10",
        className,
      )}
    >
      {/* Grain texture subtile style Apple */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />
      {/* Bottom highlight */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

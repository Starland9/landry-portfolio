import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: GlassButtonProps) {
  const baseClasses =
    "relative backdrop-blur-xl border rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/50 text-white hover:from-cyan-500/30 hover:to-purple-600/30 hover:shadow-lg hover:shadow-cyan-500/25",
    secondary:
      "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-lg",
    outline:
      "bg-transparent border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";

interface GlassButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: GlassButtonProps) {
  const baseClasses =
    "relative backdrop-blur-xl border rounded-xl font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block text-center overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/40 text-white hover:from-cyan-500/30 hover:to-purple-600/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20",
    secondary:
      "bg-white/[0.08] border-white/15 text-white hover:bg-white/[0.15] hover:border-white/25 hover:shadow-lg",
    outline:
      "bg-transparent border-cyan-400/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/15",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const commonContent = (
    <>
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
      >
        {commonContent}
      </a>
    );
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {commonContent}
    </button>
  );
}

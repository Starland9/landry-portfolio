import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom tokens of globals.css, otherwise `text-h2` and
// `text-fg` would be seen as two colours and one of them silently dropped.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "lead", "meta", "figure"],
      color: [
        "bg",
        "surface",
        "frame",
        "fg",
        "muted",
        "border",
        "border-strong",
        "accent",
        "accent-hover",
        "on-accent",
        "ok",
        "err",
      ],
      radius: ["control", "frame"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function resolvedTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Light/dark switch. The icon is chosen by CSS from <html data-theme>, so the
 * first paint is right even before hydration; the label follows the state.
 */
export function ThemeToggle({
  toDark,
  toLight,
}: {
  toDark: string;
  toLight: string;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(resolvedTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(resolvedTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page only.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? toLight : toDark}
      className="inline-grid size-10 place-items-center rounded-control text-fg transition-colors hover:bg-frame"
    >
      <Moon
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        className="theme-icon-moon"
      />
      <Sun
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        className="theme-icon-sun"
      />
    </button>
  );
}

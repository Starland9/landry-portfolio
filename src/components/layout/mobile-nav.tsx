"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-links";

/** Small-screen menu: a button that shows a plain panel under the header (no animation). */
export function MobileNav({
  items,
  label,
  menuLabel,
}: {
  items: NavItem[];
  label: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 items-center rounded-control border border-border px-3 text-sm font-medium text-fg transition-colors hover:bg-frame"
      >
        {menuLabel}
      </button>
      <nav
        id={panelId}
        aria-label={label}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-bg"
      >
        <ul className="page-container pt-2 pb-4">
          {items.map((item) => {
            const active = item.match !== undefined && pathname.startsWith(item.match);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center justify-between border-b border-border text-lg font-medium text-fg no-underline hover:no-underline",
                    active && "text-accent",
                  )}
                >
                  {item.label}
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

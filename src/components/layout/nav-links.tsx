"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; match?: string };

/** Desktop navigation; the current section gets aria-current and a 2 px accent bar. */
export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="hidden md:block">
      <ul className="flex gap-1">
        {items.map((item) => {
          const active = item.match !== undefined && pathname.startsWith(item.match);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-10 items-center rounded-control px-3 font-medium text-muted no-underline transition-colors hover:bg-frame hover:text-fg hover:no-underline",
                  active &&
                    "text-fg after:absolute after:inset-x-3 after:-bottom-3 after:h-0.5 after:bg-accent",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

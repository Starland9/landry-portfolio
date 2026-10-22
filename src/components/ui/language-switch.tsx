"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * FR / EN links to the same page in the other language. Plain links (full page
 * load) so the proxy stores the choice in the `locale` cookie, even without JS.
 */
export function LanguageSwitch({
  current,
  label,
  names,
}: {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
}) {
  const pathname = usePathname();

  // Keep the query string (e.g. /work?type=mobile) when JavaScript is available.
  const keepQuery = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.search = window.location.search;
  };

  return (
    <ul aria-label={label} className="flex items-center font-mono text-meta">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <li key={locale}>
            <a
              href={switchLocalePath(pathname, locale)}
              hrefLang={locale}
              lang={locale}
              title={names[locale]}
              aria-current={active ? "true" : undefined}
              onClick={active ? undefined : keepQuery}
              className={cn(
                "inline-flex min-h-10 min-w-9 items-center justify-center rounded-control text-muted no-underline transition-colors hover:bg-frame hover:text-fg hover:no-underline",
                active &&
                  "font-medium text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:underline",
              )}
            >
              <span className="sr-only">{names[locale]}</span>
              <span aria-hidden="true">{locale.toUpperCase()}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

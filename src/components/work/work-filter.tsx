import Link from "next/link";
import { getProjects, projectTypes, type Locale, type ProjectType } from "@/content";
import { localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

/** Type filter as plain links (?type=…): shareable, works without JavaScript. */
export function WorkFilter({ current, locale, m }: { current?: ProjectType; locale: Locale; m: Messages }) {
  const base = localePath(locale, "/work");
  const options = [
    { key: "all", label: m.work.all, href: base, count: getProjects().length, active: !current },
    ...projectTypes.map((type) => ({
      key: type,
      label: m.types[type],
      href: `${base}?type=${type}`,
      count: getProjects(type).length,
      active: current === type,
    })),
  ];

  return (
    <nav aria-label={m.work.filterLabel} className="mt-10 mb-12">
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.key}>
            <Link
              href={option.href}
              aria-current={option.active ? "page" : undefined}
              scroll={false}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium no-underline transition-colors hover:no-underline",
                option.active
                  ? "border-fg bg-fg text-bg hover:text-bg"
                  : "border-border-strong text-fg hover:border-fg hover:text-fg",
              )}
            >
              {option.label}
              <span className={cn("font-mono text-meta", option.active ? "text-bg/80" : "text-muted")}>
                {option.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

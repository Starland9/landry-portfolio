import Link from "next/link";
import {
  getProject,
  period,
  t,
  tList,
  type Experience,
  type Locale,
} from "@/content";
import { localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";

/**
 * Experience rows: period · role and company · description.
 * `short` shows the one-sentence summary (home), otherwise the full highlights.
 */
export function ExperienceList({
  items,
  locale,
  m,
  variant = "short",
}: {
  items: Experience[];
  locale: Locale;
  m: Messages;
  variant?: "short" | "full";
}) {
  return (
    <ul className="border-b border-border">
      {items.map((item) => (
        <li
          key={`${item.start}-${item.company.en}`}
          className="grid gap-x-8 gap-y-2 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)]"
        >
          <span className="font-mono text-meta text-muted">
            {period(item.start, item.end, m.common.present)}
          </span>
          <h3 className="text-[1.0625rem] leading-snug">
            {t(item.role, locale)}
            <span className="block font-normal text-muted">
              {t(item.company, locale)}
            </span>
          </h3>
          {variant === "short" ? (
            <p className="text-muted">{t(item.summary, locale)}</p>
          ) : (
            <div>
              <ul className="space-y-2 text-muted">
                {tList(item.highlights, locale).map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-5 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2.5 before:bg-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              {item.projects && item.projects.length > 0 && (
                <p className="mt-3 text-sm text-muted">
                  {m.common.projects} :{" "}
                  {item.projects.map((slug, index) => (
                    <span key={slug}>
                      {index > 0 && ", "}
                      <Link href={localePath(locale, `/work/${slug}`)}>
                        {getProject(slug)?.title ?? slug}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

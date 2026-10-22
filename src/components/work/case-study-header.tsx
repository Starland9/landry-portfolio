import { t, type Locale, type Project } from "@/content";
import type { Messages } from "@/i18n/get-messages";
import { buttonClasses } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/links";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const LINK_ORDER = ["store", "live", "code"] as const;

export function CaseStudyHeader({ project, locale, m }: { project: Project; locale: Locale; m: Messages }) {
  const links = LINK_ORDER.flatMap((kind) => {
    const href = project.links[kind];
    return href ? [{ kind, href }] : [];
  });

  const meta = [m.typesLong[project.type], String(project.year), t(project.team, locale)];

  return (
    <header className="py-12">
      <p className="font-mono text-meta text-muted">{meta.join(" · ")}</p>
      <h1 className="mt-4 text-h1">{project.title}</h1>
      <p className="mt-6 max-w-[46rem] text-lead text-muted">{t(project.headline, locale)}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        {links.map((link, index) => (
          <ExternalLink
            key={link.kind}
            href={link.href}
            externalLabel={m.common.externalSite}
            className={buttonClasses(index === 0 ? "primary" : "secondary")}
          >
            {m.links[link.kind]}
          </ExternalLink>
        ))}
        <StatusBadge>{m.status[project.status]}</StatusBadge>
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <dl className="mt-12 grid border-y border-border sm:grid-cols-3">
          {project.highlights.map((highlight, index) => (
            <div
              key={highlight.value.en}
              className={cn(
                "flex flex-col-reverse py-6 sm:pr-6",
                index > 0 && "border-t border-border sm:border-t-0 sm:border-l sm:pl-6",
              )}
            >
              <dt className="text-sm text-muted">{t(highlight.label, locale)}</dt>
              <dd className="text-figure font-semibold tabular-nums">{t(highlight.value, locale)}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

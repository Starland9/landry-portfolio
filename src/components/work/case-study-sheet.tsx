import { t, type Locale, type Project } from "@/content";
import type { Messages } from "@/i18n/get-messages";
import { ExternalLink } from "@/components/ui/links";

/** Project facts, sticky beside the case study on wide screens. */
export function CaseStudySheet({
  project,
  locale,
  m,
}: {
  project: Project;
  locale: Locale;
  m: Messages;
}) {
  const rows = [
    { label: m.caseStudy.sheet.type, value: m.typesLong[project.type] },
    { label: m.caseStudy.sheet.year, value: String(project.year) },
    ...(project.duration
      ? [
          {
            label: m.caseStudy.sheet.duration,
            value: t(project.duration, locale),
          },
        ]
      : []),
    { label: m.caseStudy.sheet.team, value: t(project.team, locale) },
    { label: m.caseStudy.sheet.status, value: m.status[project.status] },
  ];

  return (
    <aside aria-label={m.caseStudy.sheetLabel}>
      <dl className="text-sm xl:sticky xl:top-24">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[110px_1fr] gap-3 border-b border-border py-3 first:border-t xl:grid-cols-1 xl:gap-0.5"
          >
            <dt className="font-mono text-meta text-muted">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-border py-3 xl:grid-cols-1 xl:gap-0.5">
          <dt className="font-mono text-meta text-muted">
            {m.caseStudy.sheet.code}
          </dt>
          <dd className="font-medium">
            {project.links.code ? (
              <ExternalLink
                href={project.links.code}
                externalLabel={m.common.externalSite}
                className="inline-flex items-center gap-1"
              >
                GitHub
              </ExternalLink>
            ) : (
              m.caseStudy.codePrivate
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

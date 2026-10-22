import type { Metadata } from "next";
import { firstProjectYear, getProjects, projectCount, projectTypes, type ProjectType } from "@/content";
import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getMessages } from "@/i18n/get-messages";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { WorkFilter } from "@/components/work/work-filter";

const isProjectType = (value: unknown): value is ProjectType =>
  typeof value === "string" && (projectTypes as readonly string[]).includes(value);

export async function generateMetadata(): Promise<Metadata> {
  const { locale, m } = await getMessages();
  return buildMetadata({ locale, path: "/work", title: m.meta.work.title, description: m.meta.work.description });
}

export default async function WorkPage({ searchParams }: PageProps<"/[locale]/work">) {
  const { type } = await searchParams;
  const filter = isProjectType(type) ? type : undefined;
  const { locale, m } = await getMessages();
  const projects = getProjects(filter);

  return (
    <div className="page-container pt-12 pb-section">
      <h1 className="text-h1">{m.work.title}</h1>
      <p className="mt-4 max-w-lead text-lead text-muted">
        {format(m.work.intro, { count: projectCount(), year: firstProjectYear() })}
      </p>

      <WorkFilter current={filter} locale={locale} m={m} />

      {projects.length > 0 ? (
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} m={m} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-frame border border-border bg-surface p-8">
          <p>{m.work.empty}</p>
          <ButtonLink href={localePath(locale, "/work")} variant="secondary" className="mt-4">
            {m.work.showAll}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

import { getFeaturedProjects, projectCount } from "@/content";
import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { ArrowLink } from "@/components/ui/links";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHead } from "@/components/ui/section-head";

export async function FeaturedWork() {
  const { locale, m } = await getMessages();

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="page-container pb-section"
    >
      <SectionHead
        id="work-title"
        title={m.home.featured}
        action={
          <ArrowLink href={localePath(locale, "/work")}>
            {m.common.allProjects}
            <span className="font-mono text-meta font-normal text-muted">
              {projectCount()}
            </span>
          </ArrowLink>
        }
      />
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {getFeaturedProjects().map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} m={m} />
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, getProjects, t } from "@/content";
import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getMessages } from "@/i18n/get-messages";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ImageFrame } from "@/components/ui/image-frame";
import { CaseStudyBody } from "@/components/work/case-study-body";
import { CaseStudyHeader } from "@/components/work/case-study-header";
import { CaseStudySheet } from "@/components/work/case-study-sheet";
import { NextProject } from "@/components/work/next-project";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const { locale, m } = await getMessages();
  return buildMetadata({
    locale,
    path: `/work/${slug}`,
    title: format(m.meta.caseStudy, { title: project.title }),
    description: t(project.headline, locale),
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { locale, m } = await getMessages();

  return (
    <>
      <div className="page-container">
        <Breadcrumbs
          label={m.nav.breadcrumb}
          items={[
            { href: localePath(locale), label: m.nav.home },
            { href: localePath(locale, "/work"), label: m.nav.work },
          ]}
          current={project.title}
        />
        <CaseStudyHeader project={project} locale={locale} m={m} />
        <ImageFrame
          image={project.image}
          alt={t(project.image.alt, locale)}
          ratio="16/9"
          sizes="(min-width: 1152px) 1072px, 92vw"
          eager
        />
      </div>

      <div className="page-container grid gap-12 py-section xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
        <CaseStudySheet project={project} locale={locale} m={m} />
        <CaseStudyBody project={project} locale={locale} m={m} />
      </div>

      <div className="page-container pb-section">
        <NextProject project={getNextProject(slug)} locale={locale} m={m} />
      </div>
    </>
  );
}

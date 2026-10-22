import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { t, type Locale, type Project } from "@/content";
import { localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { ButtonLink } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";

export function NextProject({
  project,
  locale,
  m,
}: {
  project: Project;
  locale: Locale;
  m: Messages;
}) {
  return (
    <div className="grid gap-8 border-t border-fg pt-6 md:grid-cols-2 md:items-start">
      <Link
        href={localePath(locale, `/work/${project.slug}`)}
        className="group grid grid-cols-[140px_minmax(0,1fr)] items-center gap-6 text-fg no-underline hover:text-fg hover:no-underline focus-visible:rounded-frame focus-visible:outline-offset-[6px]"
      >
        <ImageFrame
          image={project.image}
          alt=""
          sizes="140px"
          className="p-2.5 group-hover:border-border-strong"
        />
        <div>
          <p className="font-mono text-meta text-muted">
            {m.caseStudy.nextProject}
          </p>
          <p className="mt-1 flex items-center gap-2 text-h2 font-semibold">
            <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
              {project.title}
            </span>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0 text-muted transition-[color,translate] group-hover:translate-x-[3px] group-hover:text-fg"
            />
          </p>
          <p className="mt-1 text-muted">{t(project.headline, locale)}</p>
        </div>
      </Link>

      <div className="grid content-start gap-4">
        <p className="text-lead">{m.caseStudy.similar}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`${localePath(locale)}#contact`}>
            {m.home.contact}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "/work")} variant="secondary">
            {m.common.allProjects}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

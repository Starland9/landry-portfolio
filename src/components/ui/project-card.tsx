import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { t, type Locale, type Project } from "@/content";
import { localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/get-messages";
import { ImageFrame } from "./image-frame";

const CARD_SIZES = "(min-width: 1152px) 540px, (min-width: 720px) 48vw, 92vw";

/** Whole card is a single link to the case study. */
export function ProjectCard({
  project,
  locale,
  m,
  headingLevel = "h3",
}: {
  project: Project;
  locale: Locale;
  m: Messages;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const badge = project.links.store ? m.store : m.status[project.status];

  return (
    <Link
      href={localePath(locale, `/work/${project.slug}`)}
      className="group block text-fg no-underline hover:text-fg hover:no-underline focus-visible:rounded-frame focus-visible:outline-offset-[6px]"
    >
      {/* Decorative here: the title and headline below name the link; the case study has the full alt text. */}
      <ImageFrame
        image={project.image}
        alt=""
        sizes={CARD_SIZES}
        className="group-hover:border-border-strong"
      />
      <div className="mt-4 flex justify-between gap-4 font-mono text-meta text-muted">
        <span>
          {m.types[project.type]} · {project.year}
        </span>
        <span>{badge}</span>
      </div>
      <Heading className="mt-2 flex items-center gap-2 text-h3">
        <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
          {project.title}
        </span>
        <ArrowRight
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="shrink-0 text-muted transition-[color,translate] group-hover:translate-x-[3px] group-hover:text-fg"
        />
      </Heading>
      <p className="mt-1 max-w-[34rem] text-muted">{t(project.headline, locale)}</p>
    </Link>
  );
}

import type { ReactNode } from "react";
import { t, tList, type Locale, type Project } from "@/content";
import type { Messages } from "@/i18n/get-messages";

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="[&+&]:mt-16">
      <h2 id={id} className="flex items-baseline gap-3 text-h2">
        <span className="font-mono text-meta font-normal text-muted">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-4 text-[1.0625rem] leading-[1.7]">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-[22px] before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-2.5 before:bg-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Problem → solution → role → impact → features → stack. */
export function CaseStudyBody({
  project,
  locale,
  m,
}: {
  project: Project;
  locale: Locale;
  m: Messages;
}) {
  const s = m.caseStudy.sections;
  return (
    <article className="max-w-prose">
      <Section id="problem" number="01" title={s.problem}>
        <p>{t(project.problem, locale)}</p>
      </Section>
      <Section id="solution" number="02" title={s.solution}>
        <p>{t(project.solution, locale)}</p>
      </Section>
      <Section id="role" number="03" title={s.role}>
        <List items={tList(project.role, locale)} />
      </Section>
      <Section id="impact" number="04" title={s.impact}>
        <List items={tList(project.impact, locale)} />
      </Section>
      <Section id="features" number="05" title={s.features}>
        <List items={tList(project.features, locale)} />
      </Section>
      <Section id="stack" number="06" title={s.stack}>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-control border border-border px-2.5 py-1 font-mono text-meta"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}

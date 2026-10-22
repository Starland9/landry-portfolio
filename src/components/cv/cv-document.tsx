import type { ReactNode } from "react";
import {
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProfile,
  getSpokenLanguages,
  getStack,
  t,
  tList,
  type Locale,
  type Project,
} from "@/content";
import type { Messages } from "@/i18n/get-messages";

const shortUrl = (url: string) =>
  url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

function projectLink(project: Project) {
  if (project.links.store)
    return { href: project.links.store, label: "Google Play" };
  if (project.links.live)
    return { href: project.links.live, label: shortUrl(project.links.live) };
  if (project.links.code)
    return { href: project.links.code, label: shortUrl(project.links.code) };
  return null;
}

function CvSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="mt-10 break-inside-avoid-page print:mt-5"
    >
      <h2
        id={id}
        className="border-b border-border pb-2 font-mono text-meta tracking-wide text-muted uppercase print:pb-1 print:text-[8pt]"
      >
        {title}
      </h2>
      <div className="mt-4 print:mt-2">{children}</div>
    </section>
  );
}

/** The CV, built from the same content as the rest of the site. */
export function CvDocument({ locale, m }: { locale: Locale; m: Messages }) {
  const profile = getProfile();
  const education = getEducation();
  const languages = getSpokenLanguages();
  const contacts = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: profile.siteUrl, label: shortUrl(profile.siteUrl) },
    { href: profile.social.linkedin, label: shortUrl(profile.social.linkedin) },
    { href: profile.social.github, label: shortUrl(profile.social.github) },
  ];

  return (
    <article className="rounded-frame border border-border bg-surface p-[clamp(20px,5vw,56px)] print:rounded-none print:border-0 print:bg-transparent print:p-0 print:text-[9.5pt] print:leading-snug">
      <header>
        <p className="text-h1 font-semibold print:text-[22pt] print:leading-tight">
          {profile.fullName}
        </p>
        <p className="mt-2 text-lead text-muted print:mt-0.5 print:text-[11pt]">
          {t(profile.role, locale).replace(/\.$/, "")} ·{" "}
          {t(profile.location, locale)}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm print:mt-2 print:text-[8.5pt]">
          {contacts.map((contact) => (
            <li key={contact.href}>
              <a href={contact.href} className="text-fg">
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <CvSection id="cv-profile" title={m.cv.profile}>
        <p className="max-w-prose">{t(profile.bio, locale)}</p>
      </CvSection>

      <CvSection id="cv-experience" title={m.cv.experience}>
        <ul className="space-y-5 print:space-y-2.5">
          {getExperience().map((item) => (
            <li
              key={`${item.start}-${item.company.en}`}
              className="break-inside-avoid"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {t(item.role, locale)}{" "}
                  <span className="font-normal text-muted">
                    · {t(item.company, locale)}
                  </span>
                </h3>
                <span className="font-mono text-meta text-muted print:text-[8pt]">
                  {item.start} — {item.end ?? m.common.present}
                </span>
              </div>
              <ul className="mt-1.5 space-y-1 text-muted">
                {tList(item.highlights, locale).map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 before:absolute before:top-[0.75em] before:left-0 before:h-px before:w-2 before:bg-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection id="cv-projects" title={m.cv.projects}>
        <ul className="space-y-3 print:space-y-1.5">
          {getFeaturedProjects().map((project) => {
            const link = projectLink(project);
            return (
              <li key={project.slug} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {project.title}{" "}
                    <span className="font-mono text-meta font-normal text-muted print:text-[8pt]">
                      {m.types[project.type]} · {project.year}
                    </span>
                  </h3>
                  {link && (
                    <a
                      href={link.href}
                      className="text-sm text-fg print:text-[8.5pt]"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
                <p className="text-muted">{t(project.headline, locale)}</p>
              </li>
            );
          })}
        </ul>
      </CvSection>

      <CvSection id="cv-skills" title={m.cv.skills}>
        <dl className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[minmax(0,12rem)_1fr] print:grid-cols-[38mm_1fr] print:gap-y-0.5">
          {getStack().map((group) => (
            <div key={group.id} className="contents">
              <dt className="font-medium">{t(group.label, locale)}</dt>
              <dd className="text-muted">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </CvSection>

      {education.length > 0 && (
        <CvSection id="cv-education" title={m.cv.education}>
          <ul className="space-y-2">
            {education.map((item) => (
              <li
                key={`${item.school}-${item.title.en}`}
                className="flex flex-wrap justify-between gap-x-4"
              >
                <span>
                  <span className="font-semibold">{t(item.title, locale)}</span>{" "}
                  <span className="text-muted">· {item.school}</span>
                </span>
                {(item.start || item.end) && (
                  <span className="font-mono text-meta text-muted">
                    {[item.start, item.end].filter(Boolean).join(" — ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CvSection>
      )}

      {languages.length > 0 && (
        <CvSection id="cv-languages" title={m.cv.languages}>
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {languages.map((item) => (
              <li key={item.language.en}>
                <span className="font-semibold">
                  {t(item.language, locale)}
                </span>{" "}
                <span className="text-muted">· {t(item.level, locale)}</span>
              </li>
            ))}
          </ul>
        </CvSection>
      )}
    </article>
  );
}

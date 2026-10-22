import type { Metadata } from "next";
import {
  getEducation,
  getExperience,
  getProfile,
  getSpokenLanguages,
  getStack,
  t,
} from "@/content";
import { getMessages } from "@/i18n/get-messages";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import { GithubStats } from "@/components/about/github-stats";
import { TicTacToe } from "@/components/about/tic-tac-toe";
import { ExperienceList } from "@/components/home/experience-list";
import { SectionHead } from "@/components/ui/section-head";

// GitHub figures are refreshed at most once an hour.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, m } = await getMessages();
  return buildMetadata({
    locale,
    path: "/about",
    title: m.meta.about.title,
    description: m.meta.about.description,
  });
}

export default async function AboutPage() {
  const { locale, m } = await getMessages();
  const profile = getProfile();
  const education = getEducation();
  const languages = getSpokenLanguages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(locale)),
        }}
      />
      <div className="page-container pt-12 pb-section">
        <h1 className="text-h1">{m.about.title}</h1>
        <p className="mt-6 max-w-prose text-lead">{t(profile.bio, locale)}</p>
        <p className="mt-4 font-mono text-meta text-muted">
          {t(profile.location, locale)} · {profile.timezone}
        </p>
      </div>

      <section
        aria-labelledby="about-experience"
        className="page-container pb-section"
      >
        <SectionHead id="about-experience" title={m.about.experience} />
        <ExperienceList
          items={getExperience()}
          locale={locale}
          m={m}
          variant="full"
        />
      </section>

      <section
        aria-labelledby="about-stack"
        className="page-container pb-section"
      >
        <SectionHead id="about-stack" title={m.about.stack} />
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {getStack().map((group) => (
            <div key={group.id}>
              <dt className="font-semibold">{t(group.label, locale)}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-control border border-border px-2.5 py-1 font-mono text-meta"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {education.length > 0 && (
        <section
          aria-labelledby="about-education"
          className="page-container pb-section"
        >
          <SectionHead id="about-education" title={m.about.education} />
          <ul className="space-y-3">
            {education.map((item) => (
              <li
                key={`${item.school}-${item.title.en}`}
                className="flex flex-wrap justify-between gap-x-6"
              >
                <span>
                  <span className="font-semibold">{t(item.title, locale)}</span>{" "}
                  <span className="text-muted">· {item.school}</span>
                </span>
                <span className="font-mono text-meta text-muted">
                  {[item.start, item.end].filter(Boolean).join(" — ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {languages.length > 0 && (
        <section
          aria-labelledby="about-languages"
          className="page-container pb-section"
        >
          <SectionHead id="about-languages" title={m.about.languages} />
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {languages.map((item) => (
              <li key={item.language.en}>
                <span className="font-semibold">
                  {t(item.language, locale)}
                </span>{" "}
                <span className="text-muted">· {t(item.level, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="about-github"
        className="page-container pb-section"
      >
        <SectionHead id="about-github" title={m.about.github.title} />
        <GithubStats locale={locale} m={m} />
      </section>

      <section
        aria-labelledby="about-bonus"
        className="page-container pb-section"
      >
        <SectionHead id="about-bonus" title={m.about.bonus.title} />
        <p className="mb-6 text-muted">{m.about.bonus.intro}</p>
        <TicTacToe m={m.about.bonus} />
      </section>
    </>
  );
}

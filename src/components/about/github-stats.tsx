import { getProfile, type Locale } from "@/content";
import { format } from "@/i18n/format";
import type { Messages } from "@/i18n/messages";
import { getGithubStats } from "@/lib/github";
import { ExternalLink } from "@/components/ui/links";

export async function GithubStats({
  locale,
  m,
}: {
  locale: Locale;
  m: Messages;
}) {
  const stats = await getGithubStats();
  const profileUrl = getProfile().social.github;
  const g = m.about.github;

  const profileLink = (
    <ExternalLink
      href={profileUrl}
      externalLabel={m.common.externalSite}
      className="inline-flex items-center gap-1 font-medium"
    >
      {g.profile}
    </ExternalLink>
  );

  if (!stats) {
    return (
      <div className="rounded-frame border border-border bg-surface p-6">
        <p className="text-muted">{g.unavailable}</p>
        <p className="mt-3">{profileLink}</p>
      </div>
    );
  }

  const figures = [
    { value: stats.publicRepos, label: g.repos },
    { value: stats.followers, label: g.followers },
    { value: stats.memberSince, label: g.since },
  ];
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(stats.fetchedAt),
  );

  return (
    <div>
      <dl className="grid border-y border-border sm:grid-cols-3">
        {figures.map((figure, index) => (
          <div
            key={figure.label}
            className={
              index > 0
                ? "flex flex-col-reverse border-t border-border py-5 sm:border-t-0 sm:border-l sm:pl-6"
                : "flex flex-col-reverse py-5 sm:pr-6"
            }
          >
            <dt className="text-sm text-muted">{figure.label}</dt>
            <dd className="text-figure font-semibold tabular-nums">
              {figure.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-muted">
        <span>{format(g.updated, { date: updated })}</span>
        {profileLink}
      </p>
    </div>
  );
}

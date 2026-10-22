import Image from "next/image";
import { firstProjectYear, getProfile, projectCount, t } from "@/content";
import { localePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getMessages } from "@/i18n/get-messages";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/links";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export async function Hero() {
  const { locale, m } = await getMessages();
  const profile = getProfile();
  const photo = profile.photo;

  const facts = [
    { label: m.home.facts.basedIn, value: `${t(profile.location, locale)} · ${profile.timezone}` },
    { label: m.home.facts.stack, value: profile.mainStack.join(" · ") },
    {
      label: m.home.facts.shipped,
      value: format(m.home.facts.shippedValue, { count: projectCount(), year: firstProjectYear() }),
    },
  ];

  return (
    <section aria-labelledby="hero-title" className="page-container pt-8 pb-section lg:pt-[clamp(48px,8vw,104px)]">
      <div className={cn("grid items-end gap-12", photo && "lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16")}>
        <div>
          <div className="flex items-center gap-3">
            {photo && (
              <Image
                src={photo.src}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover lg:hidden"
              />
            )}
            {profile.availability.open && <StatusBadge>{t(profile.availability.label, locale)}</StatusBadge>}
          </div>

          <h1 id="hero-title" className="mt-6 text-display">
            {profile.fullName}
            <span className="block font-medium text-muted">{t(profile.role, locale)}</span>
          </h1>

          <p className="mt-6 max-w-lead text-lead">{t(profile.lead, locale)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <ButtonLink href="#work">{m.home.viewWork}</ButtonLink>
            <ButtonLink href={localePath(locale, "/cv")} variant="secondary">
              {m.home.viewCv}
            </ButtonLink>
            <ArrowLink href="#contact" className="min-h-12 sm:ml-2">
              {m.home.contact}
            </ArrowLink>
          </div>

          <p className="mt-6 text-sm text-muted">
            {t(profile.freelanceNote, locale)} <a href="#contact">{m.home.freelanceCta}</a>.
          </p>
        </div>

        {photo && (
          <figure className="hidden lg:block">
            <Image
              src={photo.src}
              alt={m.home.photoAlt}
              width={photo.width}
              height={photo.height}
              sizes="300px"
              priority
              className="aspect-[4/5] w-full rounded-frame border border-border object-cover"
            />
          </figure>
        )}
      </div>

      <dl className="mt-12 grid border-t border-border sm:grid-cols-3 sm:border-b">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={cn(
              "grid grid-cols-[120px_1fr] gap-4 border-b border-border py-3 sm:grid-cols-1 sm:gap-1 sm:border-b-0 sm:py-4 sm:pr-4",
              index > 0 && "sm:border-l sm:pl-4",
            )}
          >
            <dt className="font-mono text-meta text-muted">{fact.label}</dt>
            <dd className="font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

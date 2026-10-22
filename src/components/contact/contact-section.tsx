import type { ReactNode } from "react";
import { getProfile } from "@/content";
import { getMessages } from "@/i18n/get-messages";
import { ExternalLink } from "@/components/ui/links";
import { SectionHead } from "@/components/ui/section-head";

/** Contact block of the home page: direct details on the left, the form on the right. */
export async function ContactSection({ form }: { form?: ReactNode }) {
  const { m } = await getMessages();
  const profile = getProfile();
  const social = [
    { href: profile.social.linkedin, label: "LinkedIn" },
    { href: profile.social.github, label: "GitHub" },
    { href: profile.social.x, label: "X" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="page-container pb-section">
      <SectionHead id="contact-title" title={m.contact.title} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="max-w-[30rem] text-lead">{m.contact.lead}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-semibold tracking-[-0.01em] wrap-anywhere"
          >
            {profile.email}
          </a>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {social.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  externalLabel={m.common.externalSite}
                  className="inline-flex min-h-11 items-center gap-1.5 font-medium text-fg no-underline hover:text-accent hover:no-underline"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        {form}
      </div>
    </section>
  );
}

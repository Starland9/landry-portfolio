import { getProfile } from "@/content";
import { getMessages } from "@/i18n/get-messages";

export async function SiteFooter() {
  const { m } = await getMessages();
  const profile = getProfile();
  const links = [
    { href: `mailto:${profile.email}`, label: m.common.email },
    { href: profile.social.github, label: "GitHub" },
    { href: profile.social.linkedin, label: "LinkedIn" },
    { href: "#top", label: m.common.backToTop },
  ];

  return (
    <footer className="border-t border-border py-12 text-sm text-muted print:hidden">
      <div className="page-container flex flex-wrap items-center justify-between gap-6">
        <p>
          {profile.fullName} — {m.footer.tagline} © {new Date().getFullYear()}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-10 items-center text-muted hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

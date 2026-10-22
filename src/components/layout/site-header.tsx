import Link from "next/link";
import { getProfile } from "@/content";
import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { NavLinks, type NavItem } from "./nav-links";

export async function SiteHeader() {
  const { locale, m } = await getMessages();
  const items: NavItem[] = [
    { href: localePath(locale, "/work"), label: m.nav.work, match: localePath(locale, "/work") },
    { href: localePath(locale, "/about"), label: m.nav.about, match: localePath(locale, "/about") },
    { href: localePath(locale, "/cv"), label: m.nav.cv, match: localePath(locale, "/cv") },
    { href: `${localePath(locale)}#contact`, label: m.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg print:hidden">
      <div className="relative page-container flex h-16 items-center gap-4">
        <Link
          href={localePath(locale)}
          className="mr-auto text-[1.0625rem] font-semibold whitespace-nowrap text-fg no-underline hover:text-fg hover:no-underline"
        >
          {getProfile().fullName}
        </Link>
        <NavLinks items={items} label={m.nav.label} />
        <div className="flex items-center gap-1">
          <LanguageSwitch current={locale} label={m.nav.language} names={m.nav.languageNames} />
          <ThemeToggle toDark={m.theme.toDark} toLight={m.theme.toLight} />
          <MobileNav items={items} label={m.nav.label} menuLabel={m.nav.menu} />
        </div>
      </div>
    </header>
  );
}

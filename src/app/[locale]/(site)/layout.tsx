import { getMessages } from "@/i18n/get-messages";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const { m } = await getMessages();
  return (
    <>
      <SkipLink label={m.nav.skip} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

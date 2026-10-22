import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/content";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { ThemeScript } from "@/components/ui/theme-script";
import "../globals.css";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { m } = await getMessages();
  return {
    metadataBase: new URL(getProfile().siteUrl),
    title: { default: m.meta.home.title, template: `%s | ${getProfile().fullName}` },
    description: m.meta.home.description,
    authors: [{ name: getProfile().fullName, url: getProfile().siteUrl }],
    creator: getProfile().fullName,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#13110f" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, m } = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="auto"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body id="top">
        <SkipLink label={m.nav.skip} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

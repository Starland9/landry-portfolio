import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/content";
import {
  LOCALE_COOKIE,
  isLocale,
  localePath,
  negotiateLocale,
  type Locale,
} from "@/i18n/config";
import { messagesFor } from "@/i18n/messages";
import { ButtonLink } from "@/components/ui/button";
import { ThemeScript } from "@/components/ui/theme-script";
import "./globals.css";

// Server-rendered 404 for every unknown URL. The root layout is the dynamic [locale]
// segment, so Next.js cannot render [locale]/not-found on the server; this page can.
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  // Metadata only, never the largest text: keep it off the critical path.
  preload: false,
});

/** Language from the URL (header set by the proxy), else cookie / Accept-Language. */
async function currentLocale(): Promise<Locale> {
  const h = await headers();
  const fromUrl = h.get("x-locale");
  if (isLocale(fromUrl)) return fromUrl;
  return negotiateLocale(
    (await cookies()).get(LOCALE_COOKIE)?.value,
    h.get("accept-language"),
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const m = messagesFor(await currentLocale());
  return {
    title: `${m.notFound.title} | ${getProfile().fullName}`,
    robots: { index: false },
  };
}

export default async function GlobalNotFound() {
  const locale = await currentLocale();
  const m = messagesFor(locale);
  const other: Locale = locale === "fr" ? "en" : "fr";

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
      <body>
        <header className="border-b border-border">
          <div className="page-container flex h-16 items-center justify-between gap-4">
            <Link
              href={localePath(locale)}
              className="font-semibold text-fg no-underline hover:text-fg"
            >
              {getProfile().fullName}
            </Link>
            <a
              href={localePath(other)}
              hrefLang={other}
              lang={other}
              className="inline-flex min-h-10 items-center font-mono text-meta text-muted"
            >
              {m.nav.languageNames[other]}
            </a>
          </div>
        </header>
        <main className="page-container py-[clamp(64px,10vw,128px)]">
          <p className="font-mono text-meta text-muted">404</p>
          <h1 className="mt-4 text-h1">{m.notFound.title}</h1>
          <p className="mt-6 max-w-lead text-lead text-muted">
            {m.notFound.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale)}>{m.notFound.home}</ButtonLink>
            <ButtonLink href={localePath(locale, "/work")} variant="secondary">
              {m.notFound.work}
            </ButtonLink>
          </div>
        </main>
      </body>
    </html>
  );
}

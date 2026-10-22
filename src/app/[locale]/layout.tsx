import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/content";
import { locales } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { ThemeScript } from "@/components/ui/theme-script";
import "../globals.css";

// `subsets` = subsets preloaded; latin-ext glyphs (œ…) still load on demand.
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

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { m } = await getMessages();
  return {
    metadataBase: new URL(getProfile().siteUrl),
    title: {
      default: m.meta.home.title,
      template: `%s | ${getProfile().fullName}`,
    },
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

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { locale } = await getMessages();

  // Root layout: document, fonts and theme only. The page chrome lives in (site)/layout.tsx
  // so that (site)/not-found.tsx is a nested boundary, rendered on the server.
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
      <body id="top">{children}</body>
    </html>
  );
}

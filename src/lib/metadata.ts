import type { Metadata } from "next";

export const siteConfig = {
  name: "Landry Simo — Software Engineer",
  description:
    "Software engineer building production web and mobile applications. Specialized in Flutter, Django, Next.js, and the systems behind them.",
  url: "https://portfolio.starland9.dev",
  ogImage: "https://portfolio.starland9.dev/og-image.jpg",
  links: {
    github: "https://github.com/Starland9",
    linkedin: "https://www.linkedin.com/in/landry-simo9/",
    twitter: "https://x.com/starland237",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | Landry Simo`,
  },
  description: siteConfig.description,
  keywords: [
    "software engineer",
    "flutter developer",
    "django developer",
    "next.js",
    "typescript",
    "python",
    "mobile development",
    "web development",
    "full-stack",
    "portfolio",
    "remote engineer",
  ],
  authors: [
    {
      name: "Landry Simo",
      url: siteConfig.url,
    },
  ],
  creator: "Landry Simo",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@starland237",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

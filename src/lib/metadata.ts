import type { Metadata } from "next";

export const siteConfig = {
  name: "Starland9 Portfolio",
  description:
    "Portfolio de Starland9, développeur Full-Stack passionné par les technologies modernes et les interfaces utilisateur révolutionnaires.",
  url: "https://starland9.dev",
  ogImage: "https://starland9.dev/og-image.jpg",
  links: {
    github: "https://github.com/Starland9",
    linkedin: "https://linkedin.com/in/starland9",
    twitter: "https://twitter.com/starland9",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "développeur",
    "full-stack",
    "react",
    "nextjs",
    "typescript",
    "nodejs",
    "portfolio",
    "web developer",
    "frontend",
    "backend",
    "javascript",
  ],
  authors: [
    {
      name: "Starland9",
      url: siteConfig.url,
    },
  ],
  creator: "Starland9",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
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
    creator: "@starland9",
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

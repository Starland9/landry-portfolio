import type { Metadata } from "next";
import { getProfile, t, type Locale } from "@/content";
import { localePath, locales } from "@/i18n/config";

type BuildMetadataInput = {
  locale: Locale;
  /** Path without the language prefix, e.g. "/work/secret" ("/" for home). */
  path: string;
  title: string;
  description: string;
  /** Use the title as is instead of the "%s | Landry Simo" template. */
  absoluteTitle?: boolean;
};

/** Title, description, canonical URL, hreflang alternates and social cards for a page. */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const url = localePath(locale, path);
  // The page-level openGraph object replaces the inherited one, so the shared image is
  // declared here; a case study's own opengraph-image file still takes precedence.
  const image = {
    url: `${localePath(locale)}/opengraph-image`,
    width: 1200,
    height: 630,
  };
  const languages = Object.fromEntries(
    locales.map((l) => [l, localePath(l, path)]),
  );
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: getProfile().fullName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** schema.org Person, for the home and about pages. */
export function personJsonLd(locale: Locale) {
  const profile = getProfile();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.handle,
    jobTitle: t(profile.role, locale).replace(/\.$/, ""),
    email: `mailto:${profile.email}`,
    url: new URL(localePath(locale), profile.siteUrl).toString(),
    sameAs: [profile.social.github, profile.social.linkedin, profile.social.x],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
  };
}

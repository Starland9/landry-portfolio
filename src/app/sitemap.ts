import type { MetadataRoute } from "next";
import { getProfile, getProjects } from "@/content";
import { localePath, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getProfile().siteUrl;
  const url = (path: string, locale: (typeof locales)[number]) =>
    new URL(localePath(locale, path), base).toString();
  const paths = [
    "/",
    "/work",
    "/about",
    "/cv",
    ...getProjects().map((project) => `/work/${project.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(path, locale),
      changeFrequency:
        path === "/" || path === "/work"
          ? ("monthly" as const)
          : ("yearly" as const),
      priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, url(path, l)])),
      },
    })),
  );
}

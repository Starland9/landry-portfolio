// Pure module (no path aliases): imported by the proxy, the app and node tests.

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Picks the visitor's language: a valid saved cookie first, then the first
 * supported language of Accept-Language by descending q, then English.
 */
export function negotiateLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (isLocale(cookieValue)) return cookieValue;

  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q === undefined ? 1 : Number.parseFloat(q.slice(2));
      return {
        base: tag.trim().toLowerCase().split("-")[0] ?? "",
        weight: Number.isFinite(weight) ? weight : 0,
        index,
      };
    })
    .filter((entry) => entry.base !== "" && entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  for (const { base } of ranked) {
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/** Same page in another language: replaces (or adds) the first path segment. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments[0] = target;
  else segments.unshift(target);
  return `/${segments.join("/")}`;
}

/** Path of a page in a given language, e.g. localePath("fr", "/work") → "/fr/work". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

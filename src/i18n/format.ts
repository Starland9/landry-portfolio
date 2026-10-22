// Pure helpers (no path aliases): used by the app and node tests.

/** Replaces {name} placeholders. Unknown placeholders are left as is. */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const NBSP = "\u00a0"; // no-break space
const NNBSP = "\u202f"; // narrow no-break space (thousands)

/**
 * French typography: content is written with plain spaces; this puts
 * non-breaking spaces before : ; ! ? » %, after « and inside thousands (9 000).
 */
export function frenchTypography(text: string): string {
  return text
    .replace(/ ([:;!?»%])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NNBSP}$2`);
}

/** Applies frenchTypography to every string of a nested object or array. */
export function deepFrenchTypography<T>(value: T): T {
  if (typeof value === "string") return frenchTypography(value) as T;
  if (Array.isArray(value)) return value.map(deepFrenchTypography) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, inner]) => [
        key,
        deepFrenchTypography(inner),
      ]),
    ) as T;
  }
  return value;
}

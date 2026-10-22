import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import en from "./messages/en.json";
import frSource from "./messages/fr.json";
import { isLocale, type Locale } from "./config";
import { deepFrenchTypography } from "./format";

export type Messages = typeof en;

// Type check: a key missing from fr.json fails `tsc` (and `next build`).
const frChecked: Messages = frSource;

const messages: Record<Locale, Messages> = {
  en,
  fr: deepFrenchTypography(frChecked),
};

/** Current language, read from the [locale] segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

/** Messages for an explicit language (Server Actions, metadata routes). */
export function messagesFor(locale: Locale): Messages {
  return messages[locale];
}

/** Current language and its messages (Server Components only). */
export async function getMessages(): Promise<{ locale: Locale; m: Messages }> {
  const locale = await getLocale();
  return { locale, m: messages[locale] };
}

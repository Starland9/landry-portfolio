import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { messagesFor, type Messages } from "./messages";

export { messagesFor, type Messages };

/** Current language, read from the [locale] segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

/** Current language and its messages (Server Components only). */
export async function getMessages(): Promise<{ locale: Locale; m: Messages }> {
  const locale = await getLocale();
  return { locale, m: messagesFor(locale) };
}

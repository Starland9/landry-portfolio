// Messages by language, without next/root-params: safe in Server Actions,
// metadata routes and any server code that receives the language explicitly.
import en from "./messages/en.json";
import frSource from "./messages/fr.json";
import type { Locale } from "./config";
import { deepFrenchTypography } from "./format";

export type Messages = typeof en;

// Type check: a key missing from fr.json fails `tsc` (and `next build`).
const frChecked: Messages = frSource;

const messages: Record<Locale, Messages> = {
  en,
  fr: deepFrenchTypography(frChecked),
};

export function messagesFor(locale: Locale): Messages {
  return messages[locale];
}

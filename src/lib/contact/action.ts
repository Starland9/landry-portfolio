"use server";

import { headers } from "next/headers";
import { messagesFor } from "@/i18n/messages";
import { sendContactMail } from "./mailer";
import { createDuplicateGuard, createRateLimiter } from "./rate-limit";
import {
  normalizeContact,
  validateContact,
  type FieldErrors,
} from "./validate";

type Values = { name: string; email: string; reason: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: FieldErrors; values: Values }
  | { status: "rate-limited"; values: Values }
  | { status: "error"; values: Values };

const MIN_FILL_TIME_MS = 3000;
const limiter = createRateLimiter();
const duplicates = createDuplicateGuard();

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/** Contact form handler. Works with and without JavaScript (contracts/contact-action.md). */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData);
  const input = normalizeContact(raw);
  const values: Values = {
    name: input.name,
    email: input.email,
    reason: input.reason,
    message: input.message,
  };

  // Bots: filled honeypot or a form submitted faster than a human could. Pretend it worked.
  const startedAt = Number(raw.startedAt);
  if (typeof raw.website === "string" && raw.website !== "")
    return { status: "success" };
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS)
    return { status: "success" };

  const errors = validateContact(
    input,
    messagesFor(input.locale).contact.errors,
  );
  if (Object.keys(errors).length > 0)
    return { status: "invalid", errors, values };

  // Double click or resubmission of the same message: send it only once.
  const fingerprint = `${input.email.toLowerCase()}|${input.message}`;
  if (duplicates.isDuplicate(fingerprint)) return { status: "success" };

  if (!limiter.check(await clientIp()))
    return { status: "rate-limited", values };

  try {
    await sendContactMail(input);
    duplicates.remember(fingerprint);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] sending failed:", error);
    return { status: "error", values };
  }
}

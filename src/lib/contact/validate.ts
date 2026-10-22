// Pure module (no path aliases): shared by the form (instant feedback) and the
// Server Action (source of truth), and tested with node --test.

export const reasons = ["job", "freelance", "other"] as const;
export type Reason = (typeof reasons)[number];

export type ContactInput = {
  name: string;
  email: string;
  reason: Reason;
  message: string;
  locale: "fr" | "en";
};

export type ContactField = "name" | "email" | "message";
export type FieldErrors = Partial<Record<ContactField, string>>;

export type ErrorMessages = {
  name: string;
  email: string;
  messageShort: string;
  messageLong: string;
};

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) => (typeof value === "string" ? value : "");

/** Turns raw form fields into a clean input (trimmed, safe defaults). */
export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  const reason = text(raw.reason);
  return {
    name: text(raw.name).trim(),
    email: text(raw.email).trim(),
    reason: (reasons as readonly string[]).includes(reason)
      ? (reason as Reason)
      : "other",
    message: text(raw.message).trim(),
    locale: raw.locale === "fr" ? "fr" : "en",
  };
}

/** Returns one message per invalid field (empty object when valid). */
export function validateContact(
  input: ContactInput,
  messages: ErrorMessages,
): FieldErrors {
  const errors: FieldErrors = {};

  if (
    input.name.length < LIMITS.nameMin ||
    input.name.length > LIMITS.nameMax ||
    /[\r\n]/.test(input.name)
  ) {
    errors.name = messages.name;
  }

  if (input.email.length > LIMITS.emailMax || !EMAIL.test(input.email)) {
    errors.email = messages.email;
  }

  if (input.message.length < LIMITS.messageMin)
    errors.message = messages.messageShort;
  else if (input.message.length > LIMITS.messageMax)
    errors.message = messages.messageLong;

  return errors;
}

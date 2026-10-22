"use client";

import { CircleAlert, Check } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { sendContactMessage, type ContactState } from "@/lib/contact/action";
import {
  LIMITS,
  normalizeContact,
  reasons,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact/validate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Messages } from "@/i18n/messages";

type Props = {
  locale: "fr" | "en";
  email: string;
  m: Messages["contact"];
};

const FIELDS: ContactField[] = ["name", "email", "message"];
const inputClasses =
  "w-full rounded-control border border-border-strong bg-bg px-3.5 py-3 text-base text-fg transition-colors hover:border-fg focus-visible:border-accent focus-visible:outline-offset-1 aria-[invalid=true]:border-err";

function withEmail(template: string, email: string): ReactNode {
  const [before, after] = template.split("{email}");
  return (
    <>
      {before}
      <a href={`mailto:${email}`}>{email}</a>
      {after}
    </>
  );
}

export function ContactForm({ locale, email, m }: Props) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    {
      status: "idle",
    },
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [startedAt, setStartedAt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Time trap: set when the form becomes interactive (empty without JS, which skips the check).
  useEffect(() => setStartedAt(String(Date.now())), []);

  const errors: FieldErrors =
    clientErrors ?? (state.status === "invalid" ? state.errors : {});
  const values = "values" in state ? state.values : undefined;

  const focusFirstInvalid = (fieldErrors: FieldErrors) => {
    const first = FIELDS.find((field) => fieldErrors[field]);
    if (first)
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  // Server-side refusal (e.g. without client checks): move focus to the first invalid field.
  useEffect(() => {
    if (state.status === "invalid") focusFirstInvalid(state.errors);
  }, [state]);

  // Instant feedback with the same rules as the server; the server stays the source of truth.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const input = normalizeContact(
      Object.fromEntries(new FormData(event.currentTarget)),
    );
    const found = validateContact(input, m.errors);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      focusFirstInvalid(found);
    } else {
      setClientErrors(null);
    }
  };

  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        className="flex items-start gap-1.5 text-sm font-medium text-err"
      >
        <CircleAlert
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="mt-px shrink-0"
        />
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: ContactField) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-6 rounded-frame border border-border bg-surface p-[clamp(20px,4vw,32px)]"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          {m.fields.name}
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          minLength={LIMITS.nameMin}
          maxLength={LIMITS.nameMax}
          defaultValue={values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          className={cn(inputClasses, "min-h-12")}
        />
        {fieldError("name")}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          {m.fields.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={LIMITS.emailMax}
          defaultValue={values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          className={cn(inputClasses, "min-h-12")}
        />
        {fieldError("email")}
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">{m.fields.reason}</legend>
        <div className="flex flex-wrap gap-2">
          {reasons.map((reason) => (
            <label key={reason} className="relative cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={reason}
                defaultChecked={(values?.reason ?? "job") === reason}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-10 items-center rounded-full border border-border-strong px-3.5 text-sm font-medium transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-fg">
                {m.reasons[reason]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          {m.fields.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.messageMax}
          rows={6}
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          className={cn(inputClasses, "min-h-36 resize-y")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot: invisible to people, tempting for bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div role="status" aria-live="polite">
        {state.status === "success" && !clientErrors && (
          <p className="flex items-start gap-3 rounded-control border border-ok p-4 font-medium">
            <Check
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-ok"
            />
            {m.success}
          </p>
        )}
        {state.status === "rate-limited" && (
          <p className="flex items-start gap-3 rounded-control border border-err p-4 font-medium">
            <CircleAlert
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-err"
            />
            <span>{withEmail(m.rateLimited, email)}</span>
          </p>
        )}
        {state.status === "error" && (
          <p className="flex items-start gap-3 rounded-control border border-err p-4 font-medium">
            <CircleAlert
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-err"
            />
            <span>{withEmail(m.error, email)}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[22rem] text-sm text-muted">{m.note}</p>
        <Button
          type="submit"
          disabled={pending}
          aria-busy={pending || undefined}
        >
          {pending ? m.sending : m.submit}
        </Button>
      </div>
    </form>
  );
}

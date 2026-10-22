import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { getProfile } from "@/content";
import { messagesFor } from "@/i18n/messages";
import type { ContactInput } from "./validate";

let transport: Transporter | undefined;

/** SMTP transport from the environment; prints messages to the console in dev without SMTP. */
function getTransport(): { transport: Transporter; preview: boolean } {
  const host = process.env.SMTP_HOST;
  if (!host) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "[contact] SMTP_HOST is not set: messages cannot be sent.",
      );
    }
    return {
      transport: nodemailer.createTransport({ jsonTransport: true }),
      preview: true,
    };
  }
  if (!transport) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
    transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
  }
  return { transport, preview: false };
}

export async function sendContactMail(input: ContactInput): Promise<void> {
  const { transport: mailer, preview } = getTransport();
  const profile = getProfile();
  const reason = messagesFor("fr").contact.reasons[input.reason];
  const to = process.env.CONTACT_TO || profile.email;
  const from =
    process.env.CONTACT_FROM || process.env.SMTP_USER || profile.email;

  const info = await mailer.sendMail({
    from,
    to,
    replyTo: { name: input.name, address: input.email },
    subject: `[Portfolio] ${reason} — ${input.name}`.replace(/[\r\n]+/g, " "),
    text: [
      `Nom : ${input.name}`,
      `E-mail : ${input.email}`,
      `Motif : ${reason}`,
      `Langue du site : ${input.locale}`,
      `Date : ${new Date().toISOString()}`,
      "",
      input.message,
    ].join("\n"),
  });

  if (preview)
    console.info(
      "[contact] SMTP not configured, message not sent:\n",
      info.message.toString(),
    );
}

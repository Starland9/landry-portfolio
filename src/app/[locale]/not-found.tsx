import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const { locale, m } = await getMessages();
  return (
    <div className="mx-auto max-w-page px-[clamp(16px,4vw,40px)] py-[clamp(64px,10vw,128px)]">
      <p className="font-mono text-meta text-muted">404</p>
      <h1 className="mt-4 text-h1">{m.notFound.title}</h1>
      <p className="mt-6 max-w-lead text-lead text-muted">{m.notFound.text}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={localePath(locale)}>{m.notFound.home}</ButtonLink>
        <ButtonLink href={localePath(locale, "/work")} variant="secondary">
          {m.notFound.work}
        </ButtonLink>
      </div>
    </div>
  );
}

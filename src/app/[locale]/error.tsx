"use client";

import { useParams } from "next/navigation";
import en from "@/i18n/messages/en.json";
import fr from "@/i18n/messages/fr.json";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale: string }>();
  const m = (params.locale === "fr" ? fr : en).error;

  return (
    <div className="mx-auto max-w-page px-[clamp(16px,4vw,40px)] py-[clamp(64px,10vw,128px)]">
      <h1 className="text-h1">{m.title}</h1>
      <p className="mt-6 max-w-lead text-lead text-muted">{m.text}</p>
      <Button className="mt-8" onClick={reset}>
        {m.retry}
      </Button>
    </div>
  );
}

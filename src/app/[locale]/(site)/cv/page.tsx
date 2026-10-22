import type { Metadata } from "next";
import { getMessages } from "@/i18n/get-messages";
import { buildMetadata } from "@/lib/seo";
import { CvDocument } from "@/components/cv/cv-document";
import { PrintButton } from "@/components/cv/print-button";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, m } = await getMessages();
  return buildMetadata({ locale, path: "/cv", title: m.meta.cv.title, description: m.meta.cv.description });
}

export default async function CvPage() {
  const { locale, m } = await getMessages();

  return (
    <div className="page-container pt-12 pb-section print:p-0">
      <div className="mx-auto max-w-[52rem]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-h1">{m.cv.title}</h1>
            <p className="mt-2 text-sm text-muted">{m.cv.printHint}</p>
          </div>
          <PrintButton label={m.cv.print} />
        </div>
        <CvDocument locale={locale} m={m} />
      </div>
    </div>
  );
}

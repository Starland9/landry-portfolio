import { ImageResponse } from "next/og";
import { getProfile, getProject, t } from "@/content";
import { isLocale } from "@/i18n/config";
import { messagesFor } from "@/i18n/messages";
import { OgFrame, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Landry Simo — case study";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const m = messagesFor(locale);
  const project = getProject(slug);
  const profile = getProfile();

  return new ImageResponse(
    <OgFrame
      eyebrow={
        project
          ? `${m.typesLong[project.type]} · ${project.year}`
          : profile.fullName
      }
      title={project?.title ?? profile.fullName}
      subtitle={project ? t(project.headline, locale) : t(profile.role, locale)}
      footer={
        <div
          style={{ display: "flex" }}
        >{`${profile.fullName} — ${t(profile.role, locale).replace(/\.$/, "")}`}</div>
      }
    />,
    size,
  );
}

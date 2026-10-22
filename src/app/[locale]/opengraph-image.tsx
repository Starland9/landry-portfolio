import { ImageResponse } from "next/og";
import { getProfile, t } from "@/content";
import { isLocale } from "@/i18n/config";
import { OgFrame, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Landry Simo — portfolio";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const profile = getProfile();

  return new ImageResponse(
    <OgFrame
      eyebrow={`${t(profile.location, locale)} · ${profile.siteUrl.replace("https://", "")}`}
      title={profile.fullName}
      subtitle={t(profile.role, locale)}
      footer={
        <div style={{ display: "flex" }}>{profile.mainStack.join(" · ")}</div>
      }
    />,
    size,
  );
}

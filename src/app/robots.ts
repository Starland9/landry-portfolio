import type { MetadataRoute } from "next";
import { getProfile } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const base = getProfile().siteUrl;
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

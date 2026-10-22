import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  isLocale,
  negotiateLocale,
} from "@/i18n/config";

export const LOCALE_HEADER = "x-locale";
const slugs = new Set(projects.map((project) => project.slug));

// Every page lives under /fr or /en. Unprefixed URLs are sent to the visitor's
// language; the last language visited is remembered in a cookie (works without JS).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first)) {
    // Tell the global 404 page which language to use.
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, first);

    // Unknown case study: serve the server-rendered global 404 (an unmatched route).
    const unknownProject = segments[1] === "work" && segments.length === 3 && !slugs.has(segments[2] ?? "");
    const response = unknownProject
      ? NextResponse.rewrite(new URL(`/${first}/404`, request.url), { request: { headers } })
      : NextResponse.next({ request: { headers } });

    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return response;
  }

  const locale = negotiateLocale(
    request.cookies.get(LOCALE_COOKIE)?.value,
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, sitemap.xml, robots.txt…).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

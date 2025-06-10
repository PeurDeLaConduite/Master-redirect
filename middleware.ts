// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Laissez passer ces URLs pour que robots.txt et sitemap.xml soient servis
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/img") ||
    pathname.startsWith("/css") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // 2) Détection device
  const ua = req.headers.get("user-agent") || "";
  const isTablet =
    /(iPad|Tablet)/i.test(ua) ||
    (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
  const isMobile =
    !isTablet &&
    /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // 3) Choix du hostname cible (mobile ou desktop)
  const targetHost = isMobile
    ? "mobile.peur-de-la-conduite.fr"
    : "desktop.peur-de-la-conduite.fr";

  // 4) Construisez l’URL de destination
  const url = req.nextUrl.clone();
  url.hostname = targetHost;
  url.protocol = "https:";       // assure HTTPS
  url.port = "";                 // pas de port explicite
  url.pathname = pathname;       // conserve /blog, /services…
  url.search = search;           // conserve query strings

  // 5) Rewrite : Next.js proxy la requête sans changer l’URL client
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*",  // applique à toutes les routes
};

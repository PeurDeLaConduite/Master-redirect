// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Laissez passer ces URLs pour que robots.txt, sitemap.xml et favicon soient servis sans rewrite
  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2) Détection device
  const ua = req.headers.get("user-agent") || "";
  const isTablet =
    /(iPad|Tablet)/i.test(ua) ||
    (/(Android)/i.test(ua) && !/Mobile/i.test(ua)) || !/(Android)/i.test(ua);
  const isMobile =
    !isTablet &&
    /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // 3) Choix du hostname cible
  const host = isMobile
    ? "mobile.peur-de-la-conduite.fr"
    : "desktop.peur-de-la-conduite.fr";

  // 4) Construction de l’URL de destination pour le rewrite
  const targetUrl = new URL(`${pathname}${search}`, `https://${host}`);

  // 5) Rewrite (proxy interne) et ajout du cookie
  const res = NextResponse.rewrite(targetUrl);
  res.cookies.set("deviceType", isMobile ? "mobile" : "desktop", {
    path: "/",
    domain: ".peur-de-la-conduite.fr",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res;
}

export const config = {
  matcher: "/:path*",  // applique à toutes les routes
};

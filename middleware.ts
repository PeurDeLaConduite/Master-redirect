// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
  
    // Exclure ces chemins statiques importants
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
  
    const ua = req.headers.get("user-agent") || "";
    const isTablet =
      /(iPad|Tablet)/i.test(ua) ||
      (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
    const isMobile =
      !isTablet &&
      /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
    const targetHost = isMobile
      ? "mobile.peur-de-la-conduite.fr"
      : "desktop.peur-de-la-conduite.fr";
  
    const url = req.nextUrl.clone();
    url.hostname = targetHost;
    url.protocol = "https:";
    url.port = "";
  
    return NextResponse.rewrite(url);
  }
  
  export const config = {
    matcher: "/:path*",
  };

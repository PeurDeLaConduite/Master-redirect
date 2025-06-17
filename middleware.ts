import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
    const { pathname, search } = request.nextUrl;

    // Laisse passer robots.txt, sitemap, favicon
    if (
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml" ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // Récupère deviceType depuis les cookies (si déjà posé)
    const deviceTypeCookie = request.cookies.get("deviceType")?.value;

    let isMobile;

    if (deviceTypeCookie === "mobile") {
        isMobile = true;
    } else if (deviceTypeCookie === "desktop") {
        isMobile = false;
    } else {
        // Détection User-Agent si pas de cookie
        const ua = request.headers.get("user-agent") || "";
        const isTablet =
            /(iPad|Tablet)/i.test(ua) ||
            (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
        isMobile =
            !isTablet &&
            /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    }

    // Cible l’URL selon le device
    const hostname = isMobile
        ? "mobile.peur-de-la-conduite.fr"
        : "desktop.peur-de-la-conduite.fr";
    const targetUrl = new URL(`${pathname}${search}`, `https://${hostname}`);

    // Réécrit la réponse
    const response = NextResponse.rewrite(targetUrl);

    // Pose (ou met à jour) le cookie
    response.cookies.set("deviceType", isMobile ? "mobile" : "desktop", {
        path: "/",
        domain: ".peur-de-la-conduite.fr",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return response;
}

export const config = { matcher: "/:path*" };

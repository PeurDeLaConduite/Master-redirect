// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    // 1️⃣ Exceptions : on sert ces fichiers directement
    if (
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml" ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // 2️⃣ Détection device
    const ua = req.headers.get("user-agent") || "";
    const isTablet =
        /(iPad|Tablet)/i.test(ua) ||
        (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
    const isMobile =
        !isTablet &&
        /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    const host = isMobile
        ? "mobile.peur-de-la-conduite.fr"
        : "desktop.peur-de-la-conduite.fr";

    // 3️⃣ Reconstruction de l’URL cible en conservant path + query
    const targetUrl = new URL(`${pathname}${search}`, `https://${host}`);

    // 4️⃣ Redirection temporaire (302)
    const res = NextResponse.redirect(targetUrl, 302);

    // 5️⃣ Cookie deviceType
    res.cookies.set("deviceType", isMobile ? "mobile" : "desktop", {
        path: "/",
        domain: ".peur-de-la-conduite.fr",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return res;
}

// Appliquer à TOUTES les routes
export const config = {
    matcher: "/:path*",
};

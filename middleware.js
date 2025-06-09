import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1️⃣ Exceptions : on laisse passer robots.txt, sitemap.xml et favicon.ico
    if (
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml" ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // 2️⃣ Si c'est un bot (Googlebot, etc.), on ne redirige pas non plus
    const ua = req.headers.get("user-agent") || "";
    const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(ua);
    if (isBot) {
        return NextResponse.next();
    }

    // 3️⃣ Pour TOUTES les autres routes sous "/" (y compris /tarifs, /blog…)
    //    on applique la logique device
    const isTablet =
        /(iPad|Tablet)/i.test(ua) ||
        (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
    const isMobile =
        !isTablet &&
        /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // Choix du sous-domaine
    const host = isMobile
        ? "mobile.peur-de-la-conduite.fr"
        : "desktop.peur-de-la-conduite.fr";

    // Conserver le chemin complet (/tarifs, /blog/mon-article…)
    const url = req.nextUrl.clone();
    url.host = host;

    // On renvoie un redirect 302 (ou 301 si vous préférez permanent)
    return NextResponse.redirect(url, 302);
}

// Appliquer ce middleware à toutes les routes
export const config = {
    matcher: "/:path*",
};

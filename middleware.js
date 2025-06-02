import { NextResponse } from "next/server";

export function middleware(req) {
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

    // Vraie détection tablette : iPad OU Android mais PAS mobile
    const isTablet =
        /(iPad|Tablet)/i.test(userAgent) ||
        (/(Android)/i.test(userAgent) && !/(Mobile)/i.test(userAgent));

    const isMobile =
        !isTablet && /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isBot) return NextResponse.next();

    let deviceType = "desktop";
    let redirectUrl = "https://desktop.peur-de-la-conduite.fr/#slider";
    if (isMobile) {
        deviceType = "mobile";
        redirectUrl = "https://mobile.peur-de-la-conduite.fr/#slider";
    }
    // ici tablette = desktop, pas de redirection mobile

    const response = NextResponse.redirect(new URL(redirectUrl, req.url));
    response.cookies.set("deviceType", deviceType, {
        path: "/",
        domain: ".peur-de-la-conduite.fr",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return response;
}

export const config = {
    matcher: "/",
};

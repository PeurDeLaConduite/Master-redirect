import { NextResponse } from "next/server";
export function middleware(request) {
    const { pathname, search } = request.nextUrl;
    if (
        pathname.startsWith("/css/") ||
        pathname.startsWith("/img/") ||
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml" ||
        pathname.startsWith("/favicon")
    ) {
        return NextResponse.next();
    }
    const deviceTypeCookie = request.cookies.get("deviceType")?.value;
    let isMobile;
    if (deviceTypeCookie === "mobile") {
        isMobile = true;
    } else if (deviceTypeCookie === "desktop") {
        isMobile = false;
    } else {
        const ua = request.headers.get("user-agent") || "";
        const isTablet =
            /(iPad|Tablet)/i.test(ua) ||
            (/(Android)/i.test(ua) && !/Mobile/i.test(ua));
        isMobile =
            !isTablet &&
            /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    }
    const hostname = isMobile
        ? "mobile.peur-de-la-conduite.fr"
        : "desktop.peur-de-la-conduite.fr";
    const targetUrl = new URL(`${pathname}${search}`, `https://${hostname}`);
    const response = NextResponse.rewrite(targetUrl);
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

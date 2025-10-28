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
    const deviceType = request.cookies.get("deviceType")?.value;

    // 🎯 Desktop → redirige vers le domaine desktop
    if (deviceType === "desktop") {
        return NextResponse.rewrite(
            new URL(
                `${pathname}${search}`,
                "https://desktop.peur-de-la-conduite.fr"
            )
        );
    }

    // 🎯 Mobile OU cookie absent → redirige vers le domaine mobile
    return NextResponse.rewrite(
        new URL(`${pathname}${search}`, "https://mobile.peur-de-la-conduite.fr")
    );
}

export const config = {
    matcher: ["/:path*"],
};

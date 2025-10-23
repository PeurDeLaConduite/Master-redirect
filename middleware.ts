import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookie = request.cookies.get("deviceType")?.value;

  if (cookie === "desktop") {
    return NextResponse.rewrite(
      new URL(`${pathname}${search}`, "https://desktop.peur-de-la-conduite.fr")
    );
  } 
  if (cookie === "mobile") {
    return NextResponse.rewrite(
      new URL(`${pathname}${search}`, "https://mobile.peur-de-la-conduite.fr")
    );
  } 

  // Si cookie mobile OU aucun cookie → on redirige vers mobile
  return NextResponse.rewrite(
    new URL(`${pathname}${search}`, "https://mobile.peur-de-la-conduite.fr")
  );
}

export const config = {
  matcher: ["/:path*"],
};
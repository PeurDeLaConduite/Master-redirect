import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware pour rediriger les utilisateurs vers les versions mobile ou desktop
 * du site https://peur-de-la-conduite.fr en fonction de leur user-agent.
 * Gère également la diffusion des fichiers robots.txt, sitemap.xml et favicon.ico.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Laisser passer ces URLs pour que robots.txt, sitemap.xml et favicon.ico soient servis
  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2) Détection de l'appareil (mobile, tablette, desktop)
  const ua = req.headers.get("user-agent") ?? "";
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

  // 4) Construire l'URL de destination tout en forçant HTTPS
  const url = req.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = targetHost;
  url.port = "";
  url.pathname = pathname;
  url.search = search;

  // 5) Actions supplémentaires (ex. authentification, journaux, cache, etc.)
  // TODO: ajouter ici vos actions :
  //  - redirection vers page de login si non-authentifié
  //  - ajout d'en-têtes de sécurité (CSP, HSTS, etc.)
  //  - journalisation des requêtes
  //  - gestion du cache ou des cookies,
  //  etc.

  // 6) Réécriture : Next.js proxy la requête sans changer l'URL client
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*", // Appliquer ce middleware à toutes les routes
};

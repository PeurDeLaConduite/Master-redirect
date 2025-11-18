import type { Metadata } from "next";
export const metadata: Metadata  = {
    title: "Peur de la conduite",
    description: "Coach amoxophobie, surmonter la peur de la conduite",
    icons: {
        icon: "/img/favicon/logo.svg",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/",
        media: {
            "only screen and (max-width: 900px)":
                "https://mobile.peur-de-la-conduite.fr/",
            "only screen and (min-width: 900px)":
                "https://desktop.peur-de-la-conduite.fr/",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr-FR">
            <head />
            <body>{children}</body>
        </html>
    );
}
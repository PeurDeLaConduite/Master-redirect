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
        canonical: "https://peur-de-la-conduite.fr",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr-FR">
            <head>
                <link
                    rel="preload"
                    href="/img/retroviseur.svg"
                    as="image"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "@id": "https://www.peur-de-la-conduite.fr/",
                            name: "Peur de la conduite - Coaching Auto",
                            image: [
                                "/img/about/avatar.webp",
                            ],
                            url: "https://www.peur-de-la-conduite.fr/",
                            telephone: "+33 6 74 25 91 81",
                            email: "contact.peurdelaconduite@gmail.com",
                            description:
                                "Coaching individuel pour surmonter l'amaxophobie, gérer le stress, réussir l'examen de conduite et reprendre confiance au volant.",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "17 Allée Didier Daurat",
                                addressLocality: "Le Havre",
                                addressRegion: "Normandie",
                                postalCode: "76620",
                                addressCountry: "FR",
                            },
                            geo: {
                                "@type": "GeoCoordinates",
                                latitude: "49.5051",
                                longitude: "0.1604",
                            },
                            openingHoursSpecification: [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: [
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                    ],
                                    opens: "07:00",
                                    closes: "20:00",
                                },
                            ],
                            priceRange: "39.99€ - 59.99€",
                            offers: [
                                {
                                    "@type": "Offer",
                                    name: "Coaching Conducteurs Débutants",
                                    price: "39.99",
                                    priceCurrency: "EUR",
                                },
                                {
                                    "@type": "Offer",
                                    name:
                                        "Coaching Conducteurs Confirmés (Amaxophobie)",
                                    price: "49.99",
                                    priceCurrency: "EUR",
                                },
                            ],
                            sameAs: [
                                "http://www.youtube.com/@MounirBouakkaz-r4i",
                                "https://wa.me/33674259181",
                                "https://www.tiktok.com/@peur.de.la.condui?_t=ZN-8taHCRDnmnH&_r=1",
                                "https://www.instagram.com/peurdelaconduite.fr/",
                                "https://www.facebook.com/profile.php?id=61567260421073",
                                "https://www.linkedin.com/in/mounir-bouakkaz",
                            ],
                            founder: {
                                "@type": "Person",
                                name: "Mounir Bouakkaz",
                            },
                        }),
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

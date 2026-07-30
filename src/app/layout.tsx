import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Lora, Lato } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import { getLocale } from "next-intl/server";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
    variable: "--font-cormorant-garamond",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap",
});

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "Uniglo Diamonds",
    description: "Best Diamonds in Antwerp",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    return (
        <html lang={locale}>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KWXEHQ73V7" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KWXEHQ73V7');
            `}</Script>
            <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">{`
                {
                    "@context": "https://schema.org/",
                    "@type": "WebSite",
                    "name": "Uniglo Diamonds",
                    "url": "https://www.uniglodiamonds.com/",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.uniglodiamonds.com/diamond-manufacturing{search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }
            `}</Script>
            <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">{`
                {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Uniglo Diamonds",
                    "alternateName": "Uniglo diamonds",
                    "url": "https://www.uniglodiamonds.com/",
                    "logo": "https://www.uniglodiamonds.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FUniglo-Logo-Horizontal1.07dfee8a.png&w=384&q=75",
                    "sameAs": [
                        "https://www.instagram.com/uniglodiamonds/",
                        "https://be.linkedin.com/company/uniglodiamonds"
                    ]
                }
            `}</Script>
            <body
                className={`${geistSans.variable} ${cormorantGaramond.variable} ${lora.variable} ${lato.variable} antialiased `}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

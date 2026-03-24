import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Lora, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard"; // Import the new guard
import Script from "next/script";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
                {" "}
                <AuthProvider>
                    <div className="md:h-41 bg-brand-gradient h-20" />
                    <Navbar />
                    <main className="relative z-0">
                        {/* Wrap children with RouteGuard */}
                        <RouteGuard>{children}</RouteGuard>
                    </main>
                    <Footer />
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}

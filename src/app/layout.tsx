import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Lora, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard"; // Import the new guard

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

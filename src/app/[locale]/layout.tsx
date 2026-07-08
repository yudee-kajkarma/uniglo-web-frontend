import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate that the locale is valid
    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    // Provide messages to the client
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
                <div className="md:h-41 bg-brand-gradient h-20" />
                <Navbar />
                <main className="relative z-0">
                    <RouteGuard>{children}</RouteGuard>
                </main>
                <Footer />
                <Toaster />
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
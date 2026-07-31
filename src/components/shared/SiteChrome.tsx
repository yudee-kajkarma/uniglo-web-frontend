import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import RouteGuard from "@/components/auth/RouteGuard";

// Shared page chrome (navbar, footer, route guard) for routes that live
// outside the [locale] segment — the (admin)/(superadmin) groups and
// /profile. These paths are excluded from the i18n middleware, so next-intl
// falls back to English; the client provider is needed here because Navbar
// and Footer call useTranslations and no [locale] layout sits above them.
export default async function SiteChrome({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="md:h-41 bg-brand-gradient h-20" />
            <Navbar />
            <main className="relative z-0">
                <RouteGuard>{children}</RouteGuard>
            </main>
            <Footer />
            <Toaster />
        </NextIntlClientProvider>
    );
}

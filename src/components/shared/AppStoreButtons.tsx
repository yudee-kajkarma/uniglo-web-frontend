"use client";

import { useTranslations } from "next-intl";

// The https URLs are what gets rendered, so the markup is identical on server
// and client and the links stay crawlable/shareable. On a phone the click is
// redirected to the native scheme so it lands straight in the store app
// instead of the mobile web page.
const APP_STORE = {
    web: "https://apps.apple.com/in/app/uniglo-diamonds/id6760025753",
    native: "itms-apps://apps.apple.com/in/app/uniglo-diamonds/id6760025753",
};

const PLAY_STORE = {
    web: "https://play.google.com/store/apps/details?id=com.uniglo.diamonds.app&pcampaignid=web_share",
    native: "market://details?id=com.uniglo.diamonds.app",
};

function AppleIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
    );
}

function GooglePlayIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <path fill="#00A0FF" d="M3 1.5 13.5 12 3 22.5z" />
            <path fill="#00E676" d="M3 1.5 17.15 9.85 13.5 12z" />
            <path fill="#FF3A44" d="M3 22.5 17.15 14.15 13.5 12z" />
            <path fill="#FFC400" d="M13.5 12 17.15 9.85 20.8 12 17.15 14.15z" />
        </svg>
    );
}

function detectNativeHref(store: "ios" | "android") {
    if (typeof navigator === "undefined") return null;
    const ua = navigator.userAgent;

    if (store === "android" && /android/i.test(ua)) {
        return PLAY_STORE.native;
    }
    if (
        store === "ios" &&
        (/iPad|iPhone|iPod/.test(ua) ||
            // iPadOS 13+ reports itself as a Mac
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
    ) {
        return APP_STORE.native;
    }
    return null;
}

export default function AppStoreButtons({
    className = "",
}: {
    className?: string;
}) {
    const t = useTranslations("homePage");

    const openNativeStore =
        (store: "ios" | "android") =>
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            const native = detectNativeHref(store);
            // Desktop / anything else: let the regular https link open.
            if (!native) return;
            event.preventDefault();
            window.location.href = native;
        };

    return (
        <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}
        >
            <a
                href={APP_STORE.web}
                onClick={openNativeStore("ios")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("downloadOnThe")} App Store`}
                className="gold-reveal-btn flex items-center justify-center px-6 py-3 w-[220px]"
            >
                <span className="flex items-center gap-3">
                    <AppleIcon className="h-8 w-8 shrink-0" />
                    <span className="flex flex-col items-start leading-tight text-left">
                        <span className="font-lora text-[10px] uppercase tracking-widest">
                            {t("downloadOnThe")}
                        </span>
                        <span className="font-cormorantGaramond text-xl font-semibold tracking-wide">
                            App Store
                        </span>
                    </span>
                </span>
            </a>

            <a
                href={PLAY_STORE.web}
                onClick={openNativeStore("android")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("getItOn")} Google Play`}
                className="gold-reveal-btn flex items-center justify-center px-6 py-3 w-[220px]"
            >
                <span className="flex items-center gap-3">
                    <GooglePlayIcon className="h-7 w-7 shrink-0" />
                    <span className="flex flex-col items-start leading-tight text-left">
                        <span className="font-lora text-[10px] uppercase tracking-widest">
                            {t("getItOn")}
                        </span>
                        <span className="font-cormorantGaramond text-xl font-semibold tracking-wide">
                            Google Play
                        </span>
                    </span>
                </span>
            </a>
        </div>
    );
}

import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "de", "nl", "fr", "it", "es"] as const;
export type Locale = (typeof locales)[number];

// The locale served without a URL prefix (localePrefix: "as-needed"). Kept here
// so the middleware, navigation, and SEO URL builders share one definition.
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise — await it to get the actual locale from the URL
  let locale = await requestLocale;

  // Validate; fall back to English only if truly invalid/missing
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,

    onError(error) {
      if (error.code === "MISSING_MESSAGE") {
        console.error(`[i18n] Missing translation: ${error.message}`);
      } else {
        throw error;
      }
    },

    getMessageFallback({ namespace, key }) {
      const path = [namespace, key].filter(Boolean).join(".");
      return `[MISSING: ${path}]`;
    },
  };
});
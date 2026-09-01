import { getRequestConfig } from "next-intl/server";

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

  const [baseMessages, diamondDetailMessages, vicenzaoroMessages, jgtdDubaiMessages, inhorgentaMessages, jckLasVegasMessages, hkDiamondGemPearlMessages] = await Promise.all([
    import(`../messages/${locale}.json`),
    import(`../messages/diamond-details/${locale}.json`),
    import(`../messages/vicenzaoro-september-2026/${locale}.json`),
    import(`../messages/jgtd-dubai-2026/${locale}.json`),
    import(`../messages/inhorgenta-munich-2027/${locale}.json`),
    import(`../messages/jck-las-vegas-2027/${locale}.json`),
    import(`../messages/hong-kong-diamond-gem-pearl-show-2027/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...baseMessages.default,
      diamondDetail: diamondDetailMessages.default,
      vicenzaoroSeptemberPage: vicenzaoroMessages.default,
      jgtdDubaiPage: jgtdDubaiMessages.default,
      inhorgentaMunichPage: inhorgentaMessages.default,
      jckLasVegasPage: jckLasVegasMessages.default,
      hkDiamondGemPearlPage: hkDiamondGemPearlMessages.default,
    },

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

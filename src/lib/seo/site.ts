// lib/seo/site.ts
//
// Single source of truth for the site's canonical origin and the
// locale-prefix URL scheme (localePrefix: "as-needed" — the default locale is
// served with no prefix, every other locale under /<locale>/). Both the
// per-page hreflang builder and the sitemap import from here so the URL scheme
// is defined exactly once.

import { locales, defaultLocale } from "@/i18n";

export const SITE_URL = "https://www.uniglodiamonds.com";

/**
 * Build an absolute URL for a page in a given locale.
 * @param locale target locale
 * @param path   unprefixed path with no leading slash, e.g. "blogs/foo" or ""
 *               for the homepage.
 */
export const localizedUrl = (locale: string, path: string): string => {
    const prefix = locale === defaultLocale ? "" : `${locale}/`;
    return `${SITE_URL}/${prefix}${path}`;
};

/**
 * Canonical + hreflang alternates for a localized page. Every language version
 * lists all its siblings (reciprocal) plus x-default → the default locale, so
 * search engines treat them as one page in many languages rather than separate
 * competing pages.
 */
export const localeAlternates = (path: string, locale: string) => {
    const languages: Record<string, string> = {
        "x-default": localizedUrl(defaultLocale, path),
    };
    for (const l of locales) languages[l] = localizedUrl(l, path);

    return {
        canonical: localizedUrl(locale, path),
        languages,
    };
};

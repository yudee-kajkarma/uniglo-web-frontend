// lib/seo/localeAlternates.ts
//
// Thin, stable entry point used by every localized page's generateMetadata.
// The URL scheme lives in ./site so it is defined once and shared with the
// sitemap; this file only preserves the import path the pages already use.

import { localeAlternates } from "./site";

/**
 * @param path Unprefixed page path with no leading slash, e.g. "sell-your-diamonds"
 *   or "" for the homepage.
 * @param locale The current request locale.
 */
export const buildLocaleAlternates = (path: string, locale: string) =>
    localeAlternates(path, locale);

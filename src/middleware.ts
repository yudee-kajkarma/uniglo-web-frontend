import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: "en",

  // Add locale prefix only for included routes
  localePrefix: "as-needed",
  localeDetection: false, 
});

// Match only public-facing paths that need locale routing
// Exclude admin, auth, superadmin, profile, and _next/static etc.
export const config = {
  // Match all pathnames except:
  // - api routes
  // - _next (Next.js internals)
  // - static files (.*)
  // - sitemap.xml, robots.txt
  // - admin, auth, superadmin route groups
  // - profile (account management)
  matcher: [
    "/((?!api|_next|.*\\..*|sitemap.xml|robots.txt|admin|auth|superadmin|profile).*)",
  ],
};
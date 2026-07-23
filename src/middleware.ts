import createMiddleware from "next-intl/middleware";

// Define locales directly here so we don't import i18n.ts and balloon the middleware size
const locales = ["en", "de", "nl", "fr", "it", "es"];

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
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

// Match only public-facing paths that need locale routing.
// The (admin)/(superadmin) route groups don't appear in URLs, so each admin
// route must be excluded by its real path — otherwise next-intl rewrites it
// to /en/<path>, which doesn't exist under [locale], and it 404s.
export const config = {
  // Match all pathnames except:
  // - api routes
  // - _next (Next.js internals)
  // - static files (.*)
  // - sitemap.xml, robots.txt
  // - admin/superadmin pages (English-only, live outside [locale])
  // - profile (account management)
  matcher: [
    "/((?!api|_next|.*\\..*|sitemap.xml|robots.txt|admin-management|members-management|create-customer|enquiry-management|sell-diamonds-form-requests|approve-user|profile).*)",
  ],
};
import { generateSitemaps } from "@/app/sitemap";

const BASE_URL = "https://www.uniglodiamonds.com";

// Compute the index from live inventory counts on every origin hit. The
// previous ISR setup (revalidate=3600) froze at the build-time snapshot in
// production, so new shards never appeared. The CDN still caches the response
// for an hour via Cache-Control below.
export const dynamic = "force-dynamic";

export async function GET() {
    const shards = await generateSitemaps();

    // No <lastmod>: stamping new Date() on every request claims constant
    // change, which search engines detect and then ignore. Omitting it is
    // better than a fake value.
    const entries = shards
        .map(
            ({ id }) =>
                `  <sitemap>\n    <loc>${BASE_URL}/sitemap/${id}.xml</loc>\n  </sitemap>`,
        )
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}

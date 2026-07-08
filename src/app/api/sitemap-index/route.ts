import { generateSitemaps } from "@/app/sitemap";

const BASE_URL = "https://www.uniglodiamonds.com";

export const revalidate = 3600;

export async function GET() {
    const shards = await generateSitemaps();
    const lastModified = new Date().toISOString();

    const entries = shards
        .map(
            ({ id }) =>
                `  <sitemap>\n    <loc>${BASE_URL}/sitemap/${id}.xml</loc>\n    <lastmod>${lastModified}</lastmod>\n  </sitemap>`,
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

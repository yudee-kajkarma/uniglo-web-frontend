import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // Next.js generateSitemaps() serves shards at /sitemap/[id].xml but does
    // not emit a root index at /sitemap.xml — route it to our handler instead.
    async rewrites() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap-index",
            },
        ];
    },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storageassets.ams3.digitaloceanspaces.com",
            },
            {
                protocol: "https",
                hostname: "storageassets.ams3.cdn.digitaloceanspaces.com",
            },
            {
                protocol: "https",
                hostname: "**.diamondservices.co.uk",
            },
        ],
    },
};

export default nextConfig;

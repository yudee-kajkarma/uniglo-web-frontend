import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
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

export default withNextIntl(nextConfig);
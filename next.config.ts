import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storageassets.ams3.digitaloceanspaces.com",
            },
            {
                protocol: "https",
                hostname: "**.diamondservices.co.uk",
            },
            {
                protocol: "https",
                hostname: "**", // Allow all hosts — replace with specific domains for production
            },
        ],
    },
};

export default nextConfig;

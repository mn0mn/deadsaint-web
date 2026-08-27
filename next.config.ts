import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add your CDN / commerce backend's image domain(s) here once known,
    // e.g. Shopify's cdn.shopify.com, a headless CMS, or your own bucket.
    remotePatterns: [],
  },
};

export default nextConfig;

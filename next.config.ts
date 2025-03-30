import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        domains: ["google.com", "www.google.com", "ecsmedia.pl"],
    },
};

export default nextConfig;

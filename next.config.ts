import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2lnlearninginstitute.com",
        pathname: "/home/**",
      },
    ],
  },
};

export default nextConfig;

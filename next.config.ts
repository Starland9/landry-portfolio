import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    // The old /projects pages moved for good; the proxy then adds the language prefix.
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

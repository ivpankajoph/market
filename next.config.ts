import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/usa",
        destination: "/us",
        permanent: true,
      },
      {
        source: "/usa/:path*",
        destination: "/us/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

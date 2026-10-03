import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/us/:path*",
        destination: "/usa/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

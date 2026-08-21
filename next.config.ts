import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/workspace",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/workspace/:path*",
        destination: "/home/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

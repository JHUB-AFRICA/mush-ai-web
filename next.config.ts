import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote images used in the original design. Download them into /public/images
    // and switch to local paths when you can (these generated URLs may expire).
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  async redirects() {
    // Every old address for this page goes straight to /about (no redirect chains).
    return [
      {
        source: "/how-it-works",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/farm-structure",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/the-process",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/process",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
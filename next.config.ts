import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote images used in the original design. Download them into /public/images
    // and switch to local paths when you can (these generated URLs may expire).
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Allows builds even with ESLint errors
  },
};

export default nextConfig;

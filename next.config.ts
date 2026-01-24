import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath:, "/bitmapper",
  images: { unoptimized: true },
};

export default nextConfig;

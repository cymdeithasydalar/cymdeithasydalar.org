import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Small self-contained server bundle for the Raspberry Pi Docker image
  output: "standalone",
  // Pin tracing/workspace root to this project (dev machine has stray lockfiles)
  outputFileTracingRoot: import.meta.dirname,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;

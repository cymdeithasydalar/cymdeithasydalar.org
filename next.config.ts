import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Raspberry Pi Docker image. Disabled
  // for the Cloudflare build (CF_BUILD=1), where OpenNext owns the output.
  output: process.env.CF_BUILD ? undefined : "standalone",
  // Pin tracing/workspace root to this project (dev machine has stray lockfiles)
  outputFileTracingRoot: import.meta.dirname,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;

// Enable Cloudflare bindings (KV, etc.) during `next dev` so the KV store
// backend can be exercised locally via wrangler. No-op in production builds
// (Docker) and silently ignored if the adapter isn't usable here.
if (process.env.NODE_ENV !== "production") {
  void import("@opennextjs/cloudflare")
    .then((m) => m.initOpenNextCloudflareForDev())
    .catch(() => {});
}

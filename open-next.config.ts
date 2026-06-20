import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config: Node.js runtime on Workers via nodejs_compat. No incremental
// cache configured — the site is small and rendered per-request.
export default defineCloudflareConfig();

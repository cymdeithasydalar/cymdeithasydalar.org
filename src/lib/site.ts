// Show the full site only once the invoice is paid. Default off; flip via the
// SITE_LIVE env var (wrangler.jsonc "vars" / dashboard) — no code change needed.
export const SITE_LIVE = process.env.SITE_LIVE === "true";
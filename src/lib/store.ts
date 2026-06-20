import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny store for editable site settings (currently just the gate PIN codes).
 *
 * Two backends, auto-selected at runtime — same API either way:
 *   • Cloudflare Workers  → Workers KV (binding CYD_KV)
 *   • Docker / local node  → JSON file on DATA_DIR (a mounted volume)
 *
 * Either way edits are live with no rebuild/redeploy.
 */

export type GateCodes = { main: string; allotment: string };

const KV_KEY = "gate-codes";

type KvLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

/** Cloudflare KV binding when running on Workers; null on Docker/local node. */
async function kv(): Promise<KvLike | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const env = getCloudflareContext().env as Record<string, unknown>;
    return (env.CYD_KV as KvLike | undefined) ?? null;
  } catch {
    // Not on Cloudflare (or context unavailable) — fall back to the file store.
    return null;
  }
}

function parse(raw: string | null): GateCodes | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<GateCodes>;
    if (typeof p.main === "string" && typeof p.allotment === "string") {
      return { main: p.main, allotment: p.allotment };
    }
  } catch {
    // bad JSON — treat as nothing stored
  }
  return null;
}

// ── File backend (Docker / local) ──────────────────────────────────────────
function dataDir(): string {
  return process.env.DATA_DIR ?? path.join(process.cwd(), "data");
}
function codesFile(): string {
  return path.join(dataDir(), "gate-codes.json");
}

async function readFromFile(): Promise<GateCodes | null> {
  try {
    return parse(await readFile(codesFile(), "utf8"));
  } catch {
    return null; // missing file → env defaults upstream
  }
}

async function writeToFile(codes: GateCodes): Promise<void> {
  await mkdir(dataDir(), { recursive: true });
  const tmp = `${codesFile()}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(codes, null, 2), "utf8");
  await rename(tmp, codesFile()); // atomic replace
}

// ── Public API ──────────────────────────────────────────────────────────────
/** Read stored codes, or null if nothing has been saved yet. */
export async function readCodes(): Promise<GateCodes | null> {
  const ns = await kv();
  if (ns) return parse(await ns.get(KV_KEY));
  return readFromFile();
}

/** Persist codes to whichever backend is active. */
export async function writeCodes(codes: GateCodes): Promise<void> {
  const ns = await kv();
  if (ns) {
    await ns.put(KV_KEY, JSON.stringify(codes));
    return;
  }
  await writeToFile(codes);
}

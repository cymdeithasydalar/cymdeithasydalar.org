import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny store for editable site settings (gate codes + passphrases).
 *
 * Two backends, auto-selected at runtime — same API either way:
 *   • Cloudflare Workers  → Workers KV (binding CYD_KV)
 *   • Docker / local node  → JSON files on DATA_DIR (a mounted volume)
 *
 * Either way edits are live with no rebuild/redeploy.
 */

export type GateCodes = { main: string; allotment: string };
export type Passphrases = { members?: string; admin?: string };

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
    return null;
  }
}

function parseGateCodes(raw: string | null): GateCodes | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<GateCodes>;
    if (typeof p.main === "string" && typeof p.allotment === "string") {
      return { main: p.main, allotment: p.allotment };
    }
  } catch { /* bad JSON */ }
  return null;
}

function parsePassphrases(raw: string | null): Passphrases | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<Passphrases>;
    if (typeof p.members === "string" || typeof p.admin === "string") return p;
  } catch { /* bad JSON */ }
  return null;
}

// ── File backend (Docker / local) ──────────────────────────────────────────
function dataDir(): string {
  return process.env.DATA_DIR ?? path.join(/*turbopackIgnore: true*/ process.cwd(), "data");
}

async function readFile_(name: string): Promise<string | null> {
  try {
    return await readFile(path.join(dataDir(), name), "utf8");
  } catch {
    return null;
  }
}

async function writeFile_(name: string, content: string): Promise<void> {
  const dir = dataDir();
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, name);
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, content, "utf8");
  await rename(tmp, file); // atomic replace
}

// ── Public API ──────────────────────────────────────────────────────────────
export async function readCodes(): Promise<GateCodes | null> {
  const ns = await kv();
  if (ns) return parseGateCodes(await ns.get("gate-codes"));
  return parseGateCodes(await readFile_("gate-codes.json"));
}

export async function writeCodes(codes: GateCodes): Promise<void> {
  const ns = await kv();
  if (ns) { await ns.put("gate-codes", JSON.stringify(codes)); return; }
  await writeFile_("gate-codes.json", JSON.stringify(codes, null, 2));
}

export async function readAvailablePlots(): Promise<string[] | null> {
  const ns = await kv();
  const raw = ns ? await ns.get("available-plots") : await readFile_("available-plots.json");
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (Array.isArray(p) && p.every((x) => typeof x === "string")) return p;
  } catch { /* bad JSON */ }
  return null;
}

export async function writeAvailablePlots(plots: string[]): Promise<void> {
  const ns = await kv();
  if (ns) { await ns.put("available-plots", JSON.stringify(plots)); return; }
  await writeFile_("available-plots.json", JSON.stringify(plots, null, 2));
}

export async function readPassphrases(): Promise<Passphrases | null> {
  const ns = await kv();
  if (ns) return parsePassphrases(await ns.get("passphrases"));
  return parsePassphrases(await readFile_("passphrases.json"));
}

export async function writePassphrases(p: Passphrases): Promise<void> {
  const ns = await kv();
  if (ns) { await ns.put("passphrases", JSON.stringify(p)); return; }
  await writeFile_("passphrases.json", JSON.stringify(p, null, 2));
}

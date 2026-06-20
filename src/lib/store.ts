import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny file-backed store for editable site settings (currently just the gate
 * PIN codes). Lives on a Docker volume so edits survive container restarts and
 * never require a rebuild/redeploy. See docker-compose.yml for the mount.
 */

export type GateCodes = { main: string; allotment: string };

function dataDir(): string {
  return process.env.DATA_DIR ?? path.join(process.cwd(), "data");
}

function codesFile(): string {
  return path.join(dataDir(), "gate-codes.json");
}

/** Read stored codes, or null if nothing has been saved yet. */
export async function readCodes(): Promise<GateCodes | null> {
  try {
    const raw = await readFile(codesFile(), "utf8");
    const parsed = JSON.parse(raw) as Partial<GateCodes>;
    if (typeof parsed.main === "string" && typeof parsed.allotment === "string") {
      return { main: parsed.main, allotment: parsed.allotment };
    }
    return null;
  } catch {
    // Missing file or bad JSON — fall back to env defaults upstream.
    return null;
  }
}

/** Persist codes atomically (write temp then rename). */
export async function writeCodes(codes: GateCodes): Promise<void> {
  await mkdir(dataDir(), { recursive: true });
  const tmp = `${codesFile()}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(codes, null, 2), "utf8");
  await rename(tmp, codesFile());
}

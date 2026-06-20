import "server-only";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { readCodes, readPassphrases } from "@/lib/store";

export const MEMBER_COOKIE = "cyd_member";
export const ADMIN_COOKIE = "cyd_admin";

/**
 * Passphrases: read from the editable store first (set via /admin), then env
 * vars, then insecure dev fallbacks. Store values let the admin change them
 * without a redeploy.
 */
async function membersPassphrase(): Promise<string> {
  const stored = await readPassphrases();
  return stored?.members ?? process.env.MEMBERS_PASSPHRASE ?? "growtogether";
}

async function adminPassphrase(): Promise<string> {
  const stored = await readPassphrases();
  return stored?.admin ?? process.env.ADMIN_PASSPHRASE ?? "letmeedit";
}

function authSecret(): string {
  return process.env.AUTH_SECRET ?? "cyd-dev-secret-change-me";
}

/**
 * Gate PIN codes. Reads the editable store first (set via /admin), falling
 * back to env vars, then dev defaults. Still server-only — codes reach the
 * browser only after a member unlocks.
 */
export async function gateCodes(): Promise<{ main: string; allotment: string }> {
  const stored = await readCodes();
  return {
    main: stored?.main ?? process.env.GATE_CODE ?? "1303",
    allotment: stored?.allotment ?? process.env.ALLOTMENT_GATE_CODE ?? "3254",
  };
}

/** Deterministic, unguessable cookie value derived from a passphrase + secret. */
function expectedToken(scope: string, secretWord: string): string {
  return createHash("sha256")
    .update(`${scope}::${secretWord}::${authSecret()}`)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function checkPassphrase(input: string): Promise<boolean> {
  return safeEqual(input.trim(), await membersPassphrase());
}

export async function checkAdminPassphrase(input: string): Promise<boolean> {
  return safeEqual(input.trim(), await adminPassphrase());
}

/** True if the current request carries a valid member cookie. */
export async function isMember(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(MEMBER_COOKIE)?.value;
  return !!token && safeEqual(token, expectedToken("member", await membersPassphrase()));
}

/** True if the current request carries a valid admin cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return !!token && safeEqual(token, expectedToken("admin", await adminPassphrase()));
}

export async function memberToken(): Promise<string> {
  return expectedToken("member", await membersPassphrase());
}

export async function adminToken(): Promise<string> {
  return expectedToken("admin", await adminPassphrase());
}

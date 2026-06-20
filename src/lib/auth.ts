import "server-only";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { readCodes } from "@/lib/store";

export const MEMBER_COOKIE = "cyd_member";
export const ADMIN_COOKIE = "cyd_admin";

/**
 * Server-only secrets. Set these in the environment (see .env.example).
 * Dev fallbacks are provided so the site runs out of the box, but the
 * PIN codes still never reach the browser until a visitor unlocks.
 */
function passphrase(): string {
  return process.env.MEMBERS_PASSPHRASE ?? "growtogether";
}
function adminPassphrase(): string {
  return process.env.ADMIN_PASSPHRASE ?? "letmeedit";
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

export function checkPassphrase(input: string): boolean {
  return safeEqual(input.trim(), passphrase());
}

export function checkAdminPassphrase(input: string): boolean {
  return safeEqual(input.trim(), adminPassphrase());
}

/** True if the current request carries a valid member cookie. */
export async function isMember(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(MEMBER_COOKIE)?.value;
  return !!token && safeEqual(token, expectedToken("member", passphrase()));
}

/** True if the current request carries a valid admin cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return !!token && safeEqual(token, expectedToken("admin", adminPassphrase()));
}

export function memberToken(): string {
  return expectedToken("member", passphrase());
}

export function adminToken(): string {
  return expectedToken("admin", adminPassphrase());
}

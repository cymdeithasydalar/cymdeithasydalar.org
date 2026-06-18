import "server-only";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

export const MEMBER_COOKIE = "cyd_member";

/**
 * Server-only secrets. Set these in the environment (see .env.example).
 * Dev fallbacks are provided so the site runs out of the box, but the
 * PIN codes still never reach the browser until a visitor unlocks.
 */
function passphrase(): string {
  return process.env.MEMBERS_PASSPHRASE ?? "growtogether";
}
function authSecret(): string {
  return process.env.AUTH_SECRET ?? "cyd-dev-secret-change-me";
}

export function gateCodes() {
  return {
    main: process.env.GATE_CODE ?? "1303",
    allotment: process.env.ALLOTMENT_GATE_CODE ?? "3254",
  };
}

/** Deterministic, unguessable cookie value derived from the passphrase + secret. */
function expectedToken(): string {
  return createHash("sha256")
    .update(`${passphrase()}::${authSecret()}`)
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

/** True if the current request carries a valid member cookie. */
export async function isMember(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(MEMBER_COOKIE)?.value;
  return !!token && safeEqual(token, expectedToken());
}

export function memberToken(): string {
  return expectedToken();
}

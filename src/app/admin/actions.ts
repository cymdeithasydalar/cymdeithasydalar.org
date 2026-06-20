"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminToken,
  checkAdminPassphrase,
  isAdmin,
} from "@/lib/auth";
import { writeCodes } from "@/lib/store";

export type AdminUnlockState = { error?: string };
export type SaveState = { error?: string; saved?: boolean };

export async function adminUnlock(
  _prev: AdminUnlockState,
  formData: FormData,
): Promise<AdminUnlockState> {
  const passphrase = String(formData.get("passphrase") ?? "");

  if (!checkAdminPassphrase(passphrase)) {
    return { error: "incorrect" };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect("/admin");
}

const PIN = /^\d{3,8}$/;

export async function saveCodes(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  // Re-check auth server-side — never trust the page render alone.
  if (!(await isAdmin())) {
    return { error: "unauthorised" };
  }

  const main = String(formData.get("main") ?? "").trim();
  const allotment = String(formData.get("allotment") ?? "").trim();

  if (!PIN.test(main) || !PIN.test(allotment)) {
    return { error: "invalid" };
  }

  await writeCodes({ main, allotment });
  return { saved: true };
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminToken,
  checkAdminPassphrase,
  isAdmin,
} from "@/lib/auth";
import { readPassphrases, writeCodes, writePassphrases, writeAvailablePlots } from "@/lib/store";
import { ALL_PLOTS } from "@/lib/plots";

export type AdminUnlockState = { error?: string };
export type SaveState = { error?: string; saved?: boolean };

export async function adminUnlock(
  _prev: AdminUnlockState,
  formData: FormData,
): Promise<AdminUnlockState> {
  const passphrase = String(formData.get("passphrase") ?? "");

  if (!(await checkAdminPassphrase(passphrase))) {
    return { error: "incorrect" };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await adminToken(), {
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
  if (!(await isAdmin())) return { error: "unauthorised" };

  const main = String(formData.get("main") ?? "").trim();
  const allotment = String(formData.get("allotment") ?? "").trim();

  if (!PIN.test(main) || !PIN.test(allotment)) return { error: "invalid" };

  await writeCodes({ main, allotment });
  return { saved: true };
}

export async function savePassphrases(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!(await isAdmin())) return { error: "unauthorised" };

  const members = String(formData.get("members") ?? "").trim();
  const admin = String(formData.get("admin") ?? "").trim();

  if (!members && !admin) return { saved: true };

  const current = await readPassphrases();
  await writePassphrases({
    members: members || current?.members,
    admin: admin || current?.admin,
  });

  // Re-issue admin cookie so the admin isn't immediately logged out after
  // changing their own passphrase (token is derived from the passphrase).
  if (admin) {
    const store = await cookies();
    store.set(ADMIN_COOKIE, await adminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return { saved: true };
}

export async function savePlotStatus(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!(await isAdmin())) return { error: "unauthorised" };
  const available = ALL_PLOTS.filter((p) => formData.get(`plot_${p}`) === "on");
  await writeAvailablePlots(available);
  return { saved: true };
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

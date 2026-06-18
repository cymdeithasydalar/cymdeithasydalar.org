"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassphrase, memberToken, MEMBER_COOKIE } from "@/lib/auth";

export type UnlockState = { error?: string };

export async function unlock(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const passphrase = String(formData.get("passphrase") ?? "");

  if (!checkPassphrase(passphrase)) {
    return { error: "incorrect" };
  }

  const store = await cookies();
  store.set(MEMBER_COOKIE, memberToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect("/members");
}

export async function logout() {
  const store = await cookies();
  store.delete(MEMBER_COOKIE);
  redirect("/members");
}

import { cookies } from "next/headers";

export type Lang = "en" | "cy";

export const LANG_COOKIE = "cyd_lang";

/** Read the visitor's language from the cookie (server side). Defaults to English. */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "cy" ? "cy" : "en";
}

/** Pick one of a bilingual pair (handy in server components). */
export function pick(lang: Lang, en: string, cy: string): string {
  return lang === "cy" ? cy : en;
}

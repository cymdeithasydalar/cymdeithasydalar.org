import "server-only";

import { readAvailablePlots } from "@/lib/store";

export type PlotStatus = "available" | "taken";

/** Every plot label that exists on the site, in display order. */
export const ALL_PLOTS: string[] = [
  "1","2","3","4","5","6","7","8","9","10","11","12","13","14",
  "15a","15b","16","17","18","19","20","21a","21b","22","23","24","25","26","27","28","29","30",
  "31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48",
  "49","50","51","52","53","54","55","56","57","58","59","60","61","62",
];

export const TOTAL_PLOTS = ALL_PLOTS.length;

/**
 * Hardcoded seed defaults — used as fallback until the admin saves
 * a status list via /admin. Any plot not listed here is "taken".
 */
const SEED_AVAILABLE = new Set(["4","7","12","17","20","23","26","28","30"]);

/** Returns the set of plot labels currently marked available. */
export async function getAvailablePlots(): Promise<Set<string>> {
  const stored = await readAvailablePlots();
  return new Set(stored ?? [...SEED_AVAILABLE]);
}

export async function availableCount(): Promise<number> {
  return (await getAvailablePlots()).size;
}

export type PlotStatus = "available" | "reserved" | "taken";

/**
 * Current allotment plot allocations. Edit these as plots are taken / freed.
 * Values: "available" | "reserved" | "taken"
 */
export const plotStatus: Record<number, PlotStatus> = {
  1: "taken",      2: "taken",      3: "taken",      4: "available",  5: "taken",
  6: "taken",      7: "available",  8: "taken",      9: "taken",     10: "reserved",
  11: "taken",    12: "available", 13: "taken",     14: "taken",     15: "reserved",
  16: "taken",    17: "available", 18: "taken",     19: "taken",     20: "available",
  21: "taken",    22: "taken",     23: "available", 24: "taken",     25: "reserved",
  26: "available",27: "taken",     28: "available", 29: "taken",     30: "available",
};

export const TOTAL_PLOTS = 30;

export function availableCount(): number {
  return Object.values(plotStatus).filter((s) => s === "available").length;
}

/** Geometry for the SVG map. Two columns, grouped 1–14 / 15–22 / 23–30. */
export type PlotCell = { n: number; x: number; y: number };

export function plotCells(): PlotCell[] {
  const cells: PlotCell[] = [];
  const colX = [320, 452]; // left / right column x
  const w = 124;

  const groups: { start: number; end: number; rows: number[] }[] = [
    { start: 1, end: 14, rows: [78, 111, 144, 177, 210, 243, 276] },
    { start: 15, end: 22, rows: [336, 369, 402, 435] },
    { start: 23, end: 30, rows: [495, 528, 561, 594] },
  ];

  for (const g of groups) {
    let n = g.start;
    for (const y of g.rows) {
      for (let c = 0; c < 2 && n <= g.end; c++) {
        cells.push({ n, x: colX[c] + w / 2, y: y + 20 });
        n++;
      }
    }
  }
  return cells;
}

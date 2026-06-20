"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useWaitingList } from "@/components/waiting-list/waiting-list-provider";
import { siteMapSvg } from "@/lib/site-map-svg";
import { useRef } from "react";

const FILL = "#4a7c4e";
const OPACITY_REST = "0.18";
const OPACITY_HOVER = "0.38";

export function InteractiveSiteMap({ availablePlots }: { availablePlots: string[] }) {
  const { open } = useWaitingList();
  const containerRef = useRef<HTMLDivElement>(null);
  const availableSet = useMemo(() => new Set(availablePlots), [availablePlots]);

  // Re-stamp fill styles after every render: dangerouslySetInnerHTML can reset
  // the SVG DOM on re-renders (e.g. when the dialog opens), stripping inline styles.
  // No dep array ensures we always recover.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>("[data-plot]").forEach((el) => {
      const available = availableSet.has(el.dataset.plot ?? "");
      if (available) {
        el.style.fill = FILL;
        el.style.fillOpacity = OPACITY_REST;
        el.style.cursor = "pointer";
      } else {
        el.style.fill = "#000000";
        el.style.fillOpacity = "0";
        el.style.cursor = "default";
      }
    });
  });

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-plot]");
      if (!el || !availableSet.has(el.dataset.plot ?? "")) return;
      el.style.fillOpacity = OPACITY_HOVER;
    },
    [availableSet],
  );

  const handleMouseOut = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-plot]");
      if (!el || !availableSet.has(el.dataset.plot ?? "")) return;
      el.style.fillOpacity = OPACITY_REST;
    },
    [availableSet],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-plot]");
      if (!el) return;
      const plot = el.dataset.plot;
      if (plot && availableSet.has(plot)) open(plot);
    },
    [open, availableSet],
  );

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      suppressHydrationWarning
      className="w-full h-auto rounded-[20px] border-2 border-border shadow-[0_6px_22px_rgba(30,58,30,0.12)] overflow-hidden [&_svg]:w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: siteMapSvg }}
    />
  );
}

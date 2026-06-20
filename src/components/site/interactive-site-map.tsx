"use client";

import { useCallback, useEffect, useRef } from "react";
import { useWaitingList } from "@/components/waiting-list/waiting-list-provider";
import { siteMapSvg } from "@/lib/site-map-svg";

export function InteractiveSiteMap({ availablePlots }: { availablePlots: string[] }) {
  const { open } = useWaitingList();
  const containerRef = useRef<HTMLDivElement>(null);

  // Stamp .plot-available onto elements whose plot label is in the available set.
  // Runs after SVG mounts and whenever the availability list changes.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const available = new Set(availablePlots);
    container.querySelectorAll<HTMLElement>("[data-plot]").forEach((el) => {
      el.classList.toggle("plot-available", available.has(el.dataset.plot ?? ""));
    });
  }, [availablePlots]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = (e.target as Element).closest("[data-plot]");
      if (!target) return;
      const plot = (target as HTMLElement).dataset.plot;
      if (plot) open(plot);
    },
    [open],
  );

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      suppressHydrationWarning
      className="w-full h-auto rounded-[20px] border-2 border-border shadow-[0_6px_22px_rgba(30,58,30,0.12)] overflow-hidden [&_svg]:w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: siteMapSvg }}
    />
  );
}

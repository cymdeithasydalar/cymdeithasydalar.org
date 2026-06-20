"use client";

import { useCallback } from "react";
import { useWaitingList } from "@/components/waiting-list/waiting-list-provider";
import { siteMapSvg } from "@/lib/site-map-svg";

export function InteractiveSiteMap() {
  const { open } = useWaitingList();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = (e.target as Element).closest("[data-plot]");
      if (!target) return;
      const plot = Number((target as HTMLElement).dataset.plot);
      if (plot) open(plot);
    },
    [open],
  );

  return (
    <div
      onClick={handleClick}
      // Suppress hydration warning: dangerouslySetInnerHTML SVG content is static
      suppressHydrationWarning
      className="w-full h-auto rounded-[20px] border-2 border-border shadow-[0_6px_22px_rgba(30,58,30,0.12)] overflow-hidden [&_svg]:w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: siteMapSvg }}
    />
  );
}

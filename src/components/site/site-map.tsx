import Image from "next/image";
import { availableCount, TOTAL_PLOTS } from "@/lib/plots";
import { SectionHeading } from "./section-heading";
import { T } from "@/components/lang/language-provider";

export function SiteMap() {
  return (
    <section id="sitemap" className="bg-card py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          en="Site Map"
          cy="Map y Safle"
          subtitleEn={`${availableCount()} of ${TOTAL_PLOTS} plots available`}
          subtitleCy={`${availableCount()} o ${TOTAL_PLOTS} llain ar gael`}
        />

        <div className="max-w-[461px] mx-auto">
          <Image
            src="/site-map.jpeg"
            alt="Allotment site map showing 30 plots, shed, water point, compost area, parking and facilities"
            width={461}
            height={879}
            className="w-full h-auto rounded-[20px] border-2 border-border shadow-[0_6px_22px_rgba(30,58,30,0.12)]"
            priority={false}
          />
          <p className="text-center text-sm italic text-muted-foreground mt-4">
            <T
              en="To join the waiting list for a plot, use the button below."
              cy="I ymuno â'r rhestr aros am lain, defnyddiwch y botwm isod."
            />
          </p>
        </div>
      </div>
    </section>
  );
}

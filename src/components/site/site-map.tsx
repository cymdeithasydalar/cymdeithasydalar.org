import { getAvailablePlots, TOTAL_PLOTS } from "@/lib/plots";
import { SectionHeading } from "./section-heading";
import { T } from "@/components/lang/language-provider";
import { InteractiveSiteMap } from "./interactive-site-map";

export async function SiteMap() {
  const available = await getAvailablePlots();
  const availableList = [...available];
  return (
    <section id="sitemap" className="bg-card py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          en="Site Map"
          cy="Map y Safle"
          subtitleEn={`${available.size} of ${TOTAL_PLOTS} plots available`}
          subtitleCy={`${available.size} o ${TOTAL_PLOTS} llain ar gael`}
        />

        <div className="max-w-2xl mx-auto">
          <InteractiveSiteMap availablePlots={availableList} />
          <p className="text-center text-sm italic text-muted-foreground mt-4">
            <T
              en="Click any plot to join the waiting list for it."
              cy="Cliciwch ar unrhyw lain i ymuno â'r rhestr aros amdani."
            />
          </p>
        </div>
      </div>
    </section>
  );
}

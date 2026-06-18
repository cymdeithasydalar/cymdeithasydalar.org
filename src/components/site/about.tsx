import { T } from "@/components/lang/language-provider";
import { SectionHeading } from "./section-heading";
import { CalendarDays } from "lucide-react";

export function About() {
  return (
    <section id="about" className="bg-card py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading en="About Our Community" cy="Am Ein Cymuned" />

        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <div className="space-y-5 text-[var(--green-mid)] text-lg">
            <p>
              <T
                en="Our allotments are a friendly, inclusive space where people come together to grow, share, learn and thrive."
                cy="Mae ein rhannir yn le cyfeillgar, cynhwysol lle mae pobl yn dod at ei gilydd i dyfu, rhannu, dysgu a ffynnu."
              />
            </p>
            <p>
              <T
                en="Whether you have a green thumb or you're just starting out, there's something wonderful about getting your hands dirty and watching things grow."
                cy="Pa un ai oes gennych fawd gwyrdd neu'ch bod chi'n dechrau arni, mae rhywbeth rhyfeddol am gael eich dwylo yn y pridd a gwylio pethau'n tyfu."
              />
            </p>
            <p>
              <T
                en="We are committed to organic gardening in a way that protects the soil, encourages wildlife, and produces healthy, chemical-free food."
                cy="Rydym yn ymrwymedig i arddio organig mewn ffordd sy'n amddiffyn y pridd, yn annog bywyd gwyllt, ac yn cynhyrchu bwyd iach heb gemegion."
              />
            </p>
          </div>

          <blockquote className="relative bg-[var(--green-faint)] border-l-4 border-[var(--green-light)] rounded-[0_28px_28px_8px] p-8 pl-10">
            <p className="font-script text-2xl text-[var(--green-dark)] leading-snug mb-4">
              <T
                en="“Community is at the heart of everything we do. Let's look after this space, each other and enjoy the rewards of growing together.”"
                cy="“Mae cymuned wrth galon popeth rydym yn ei wneud. Gadewch i ni ofalu am y lle hwn, am ein gilydd a mwynhau gwobrau tyfu gyda'n gilydd.”"
              />
            </p>
            <cite className="text-sm font-bold text-muted-foreground not-italic">
              <T
                en="Cymdeithas y Dalar — Est. 2023"
                cy="Cymdeithas y Dalar — Sefydlwyd 2023"
              />
            </cite>
          </blockquote>
        </div>

        <div className="bg-[var(--green-dark)] text-white rounded-[24px_8px_24px_8px] px-8 py-6 flex items-center gap-5">
          <CalendarDays className="size-8 shrink-0 text-[#b3e5b3]" />
          <p>
            <T
              en={<>Community catch-ups are held on the <strong className="text-[#b3e5b3]">last Friday of every month</strong> at the allotments. Everyone is welcome!</>}
              cy={<>Cynhelir sesiynau cymunedol ar <strong className="text-[#b3e5b3]">ddydd Gwener olaf pob mis</strong> yn y rhannir. Croeso i bawb!</>}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

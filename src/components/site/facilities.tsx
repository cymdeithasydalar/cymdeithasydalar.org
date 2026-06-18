import { T } from "@/components/lang/language-provider";
import { SectionHeading } from "./section-heading";
import { Card } from "@/components/ui/card";
import {
  Wrench,
  Lock,
  Sprout,
  Recycle,
  ClipboardList,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type Facility = {
  icon: LucideIcon;
  titleEn: string;
  titleCy: string;
  items: { en: ReactNode; cy: ReactNode; warn?: boolean }[];
};

const facilities: Facility[] = [
  {
    icon: Wrench,
    titleEn: "Tools & Equipment",
    titleCy: "Offer ac Adnoddau",
    items: [{ en: "Communal tools & wheelbarrows", cy: "Offer cymunedol a berfa" }],
  },
  {
    icon: Lock,
    titleEn: "Secure Shed",
    titleCy: "Shed Ddiogel",
    items: [{ en: "Available to C.Y.D. members & tenants", cy: "Ar gael i aelodau a thenantiaid C.Y.D." }],
  },
  {
    icon: Sprout,
    titleEn: "Polytunnels",
    titleCy: "Polytwneli",
    items: [
      { en: "2 polytunnels available to members", cy: "2 bolytwnnel ar gael i aelodau" },
      { en: "First come, first served basis", cy: "Y cyntaf i'r felin" },
      { en: "Contact a committee member to arrange", cy: "Cysylltwch ag aelod o'r pwyllgor" },
    ],
  },
  {
    icon: Recycle,
    titleEn: "Compost Area",
    titleCy: "Ardal Gompost",
    items: [{ en: "Communal compost area on site", cy: "Ardal gompost gymunedol ar y safle" }],
  },
  {
    icon: ClipboardList,
    titleEn: "Notice Board",
    titleCy: "Bwrdd Hysbysiadau",
    items: [
      { en: "Information board & notices", cy: "Bwrdd gwybodaeth a hysbysiadau" },
      { en: "Community wants & borrows board", cy: "Bwrdd benthyg a dymuniadau" },
    ],
  },
  {
    icon: Droplets,
    titleEn: "Water Supply",
    titleCy: "Cyflenwad Dŵr",
    items: [
      { en: "Mains water via troughs on site", cy: "Dŵr prif gyfrwng drwy bwcedi ar y safle" },
      { en: "Water harvesting is encouraged", cy: "Casglu dŵr glaw yn cael ei hyrwyddo" },
      { en: "Hosepipes to mains supply are prohibited", cy: "Mae hosepipiau i'r prif gyflenwad yn waharddedig", warn: true },
    ],
  },
];

const radii = ["rounded-[26px_10px_26px_10px]", "rounded-[10px_26px_10px_26px]", "rounded-[22px_22px_8px_22px]"];

export function Facilities() {
  return (
    <section id="facilities" className="bg-[var(--green-faint)] py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading en="Facilities & Resources" cy="Cyfleusterau ac Adnoddau" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={f.titleEn} className={`p-7 border-border ${radii[i % 3]} transition-transform hover:-translate-y-1`}>
                <div className="size-12 rounded-xl bg-secondary border-2 border-[var(--green-light)] flex items-center justify-center mb-1">
                  <Icon className="size-6 text-[var(--green-mid)]" />
                </div>
                <h3 className="font-heading text-xl text-[var(--green-dark)]">
                  <T en={f.titleEn} cy={f.titleCy} />
                </h3>
                <ul className="space-y-1.5 text-sm text-[var(--green-mid)]">
                  {f.items.map((it, j) => (
                    <li key={j} className={`flex gap-2 ${it.warn ? "text-destructive font-semibold" : ""}`}>
                      <span aria-hidden className={it.warn ? "text-destructive" : "text-[var(--green-light)]"}>
                        {it.warn ? "!" : "✓"}
                      </span>
                      <span><T en={it.en} cy={it.cy} /></span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <Card className="rounded-[30px_12px_30px_12px] border-t-4 border-t-[var(--green-mid)] p-10 text-center">
          <h3 className="font-heading text-2xl text-[var(--green-dark)]">
            <T en="Looking After Your Plot" cy="Gofalu am Eich Llain" />
          </h3>
          <p className="text-[var(--green-mid)] max-w-2xl mx-auto text-lg leading-relaxed">
            <T
              en={<>To make the most of your allotment, please read the agreement, visit regularly, keep your plot tidy and weed free — and most importantly, <strong>grow your own produce and harvest your crops.</strong></>}
              cy={<>Er mwyn cael y gorau o'ch rhandir, darllenwch y cytundeb, ymwelwch yn rheolaidd, cadwch eich llain yn daclus ac yn rhydd o chwyn — ac, yn bwysicaf oll, <strong>tyfu'ch cynnyrch eich hun a chynaeafu'ch cnydau.</strong></>}
            />
          </p>
        </Card>
      </div>
    </section>
  );
}

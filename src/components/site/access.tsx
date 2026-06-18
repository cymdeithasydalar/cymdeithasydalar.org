import { T } from "@/components/lang/language-provider";
import { SectionHeading } from "./section-heading";
import { Card } from "@/components/ui/card";
import { Car, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Access() {
  return (
    <section id="access" className="bg-[var(--green-faint)] py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading en="Access & Parking" cy="Mynediad a Pharcio" />

        <Card className="max-w-3xl mx-auto rounded-[12px_32px_12px_32px] p-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="size-16 shrink-0 rounded-2xl bg-secondary border-2 border-[var(--green-light)] flex items-center justify-center">
            <Car className="size-8 text-[var(--green-mid)]" />
          </div>
          <div className="space-y-3">
            <h3 className="font-heading text-2xl text-[var(--green-dark)]">
              <T en="Car Pass" cy="Pas Car" />
            </h3>
            <p className="text-[var(--green-mid)]">
              <T
                en={<>Members of CYD are permitted to park in the <strong>National Trust car park on the left hand side</strong>. Summer use only — for loading and unloading at the allotments.</>}
                cy={<>Mae aelodau CYD yn cael parcio ym <strong>maes parcio'r Ymddiriedolaeth Genedlaethol ar yr ochr chwith</strong>. Defnydd haf yn unig — ar gyfer llwytho a dadlwytho yn y rhannir.</>}
              />
            </p>
            <div className="flex items-start gap-2 rounded-lg bg-secondary border border-[var(--green-light)] p-4 text-sm font-semibold text-[var(--green-dark)]">
              <Lock className="size-4 mt-0.5 shrink-0" />
              <span>
                <T
                  en={<>Gate access codes are kept in the <Link href="/members" className="underline">members area</Link> — not shared publicly. Please don't share codes with non-members.</>}
                  cy={<>Cedwir codau mynediad y giât yn yr <Link href="/members" className="underline">ardal aelodau</Link> — nid eu rhannu'n gyhoeddus. Peidiwch â rhannu codau gyda phobl nad ydynt yn aelodau.</>}
                />
              </span>
            </div>
            <Button asChild variant="outline" className="mt-1">
              <Link href="/members">
                <Lock className="size-4" />
                <T en="Members area" cy="Ardal aelodau" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

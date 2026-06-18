import { T } from "@/components/lang/language-provider";
import { JoinButton } from "@/components/waiting-list/join-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[88vh] flex items-center justify-center text-center">
      <div className="leaf-branch absolute -top-3 -left-3 size-[260px] opacity-50 max-md:size-[130px] max-md:opacity-35" aria-hidden />
      <div className="leaf-branch absolute -top-3 -right-3 size-[260px] opacity-50 -scale-x-100 max-md:size-[130px] max-md:opacity-35" aria-hidden />

      <div className="relative z-10 px-6 py-16 max-w-3xl">
        <p className="uppercase tracking-[0.12em] text-white/80 font-light mb-1">
          <T en="Welcome to Our" cy="Croeso i'n" />
        </p>
        <h1 className="font-heading text-5xl sm:text-7xl text-white leading-[1.05] mb-5 drop-shadow">
          <T en="Allotment Community" cy="Gymuned Rhandir" />
        </h1>
        <p className="font-script text-2xl sm:text-4xl text-[#cdeccd] mb-5">
          <T
            en="Grow Together — Thrive Together"
            cy="Tyfu Gyda'n Gilydd — Ffynnu Gyda'n Gilydd"
          />
        </p>
        <p className="text-white/85 text-lg max-w-xl mx-auto mb-9">
          <T
            en="Experience a slower, more mindful way of life through growing your own."
            cy="Profwch ffordd arafach, fwy ymwybodol o fyw trwy dyfu'ch cynnyrch eich hun."
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <JoinButton
            size="lg"
            className="bg-white text-[var(--green-dark)] hover:bg-[var(--cream)]"
          >
            <T en="Join the Waiting List" cy="Ymuno â'r Rhestr Aros" />
          </JoinButton>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white/70 hover:bg-white/15 hover:text-white"
          >
            <Link href="/#about">
              <T en="Learn More" cy="Dysgu Mwy" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

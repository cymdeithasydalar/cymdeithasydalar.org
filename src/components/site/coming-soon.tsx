import { T } from "@/components/lang/language-provider";

export function ComingSoon() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[88vh] flex items-center justify-center text-center">
      <div className="leaf-branch absolute -top-3 -left-3 size-[260px] opacity-50 max-md:size-[130px] max-md:opacity-35" aria-hidden />
      <div className="leaf-branch absolute -top-3 -right-3 size-[260px] opacity-50 -scale-x-100 max-md:size-[130px] max-md:opacity-35" aria-hidden />

      <div className="relative z-10 px-6 py-16 max-w-2xl">
        <p className="uppercase tracking-[0.12em] text-white/80 font-light mb-1">
          <T en="Cymdeithas y Dalar" cy="Cymdeithas y Dalar" />
        </p>
        <h1 className="font-heading text-5xl sm:text-7xl text-white leading-[1.05] mb-5 drop-shadow">
          <T en="Coming Soon" cy="Yn Dod Cyn Bo Hir" />
        </h1>
        <p className="font-script text-2xl sm:text-4xl text-[#cdeccd] mb-5">
          <T en="Something is growing here" cy="Mae rhywbeth yn tyfu yma" />
        </p>
        <p className="text-white/85 text-lg max-w-xl mx-auto">
          <T
            en="Our new site is taking root. Please check back soon."
            cy="Mae ein gwefan newydd yn cydio gwraidd. Dewch yn ôl cyn hir."
          />
        </p>
      </div>
    </section>
  );
}

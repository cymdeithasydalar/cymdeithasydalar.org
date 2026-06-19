import { T } from "@/components/lang/language-provider";
import { SectionHeading } from "./section-heading";
import { JoinButton } from "@/components/waiting-list/join-button";

export function Contact() {
  return (
    <section id="contact" className="bg-card py-20 scroll-mt-20 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading en="Contact Us" cy="Cysylltu â Ni" />
        <p className="text-muted-foreground text-lg mb-5">
          <T en="Have a question? Get in touch with the team." cy="Oes gennych gwestiwn? Cysylltwch â'r tîm." />
        </p>
        <a
          href="mailto:cydcommittee@gmail.com"
          className="inline-block text-xl font-bold text-[var(--green-mid)] border-b-2 border-[var(--green-light)] pb-0.5 mb-6 hover:text-[var(--green-dark)] transition-colors"
        >
          cydcommittee@gmail.com
        </a>
        <p className="italic text-muted-foreground mb-5">
          <T en="or" cy="neu" />
        </p>
        <JoinButton size="lg">
          <T en="Join the Waiting List" cy="Ymuno â'r Rhestr Aros" />
        </JoinButton>
      </div>
    </section>
  );
}

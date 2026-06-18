import { T } from "@/components/lang/language-provider";
import { JoinButton } from "@/components/waiting-list/join-button";

export function Cta() {
  return (
    <section className="bg-[var(--green-dark)] py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
          <T
            en="Interested in Your Own Allotment Plot?"
            cy="Â Diddordeb mewn Llain Rhandir Eich Hun?"
          />
        </h2>
        <p className="text-white/85 text-lg mb-8">
          <T
            en="Join our waiting list and we'll be in touch as soon as a plot becomes available."
            cy="Ymunwch â'n rhestr aros a byddwn yn cysylltu â chi cyn gynted ag y bydd llain ar gael."
          />
        </p>
        <JoinButton size="lg" className="bg-white text-[var(--green-dark)] hover:bg-[var(--cream)]">
          <T en="Join the Waiting List" cy="Ymuno â'r Rhestr Aros" />
        </JoinButton>
      </div>
    </section>
  );
}

import { T } from "@/components/lang/language-provider";
import type { ReactNode } from "react";

export function SectionHeading({
  en,
  cy,
  subtitleEn,
  subtitleCy,
}: {
  en: ReactNode;
  cy: ReactNode;
  subtitleEn?: ReactNode;
  subtitleCy?: ReactNode;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-heading text-3xl sm:text-4xl text-[var(--green-dark)] leading-tight">
        <T en={en} cy={cy} />
      </h2>
      <div className="leaf-divider mx-auto mt-3" aria-hidden />
      {(subtitleEn || subtitleCy) && (
        <p className="text-muted-foreground">
          <T en={subtitleEn} cy={subtitleCy} />
        </p>
      )}
    </div>
  );
}

import Link from "next/link";
import { T } from "@/components/lang/language-provider";

const links = [
  { href: "/#about", en: "About", cy: "Amdanom" },
  { href: "/#facilities", en: "Facilities", cy: "Cyfleusterau" },
  { href: "/#sitemap", en: "Site Map", cy: "Map y Safle" },
  { href: "/members", en: "Members", cy: "Aelodau" },
  { href: "/#contact", en: "Contact", cy: "Cysylltu" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--green-dark)] text-white/80 pt-14 pb-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-8 pb-8 mb-6 border-b border-white/10">
          <div>
            <p className="font-heading text-xl text-white">Cymdeithas y Dalar</p>
            <p className="font-script text-xl text-white/80">
              <T
                en="Grow Together — Thrive Together"
                cy="Tyfu Gyda'n Gilydd — Ffynnu Gyda'n Gilydd"
              />
            </p>
            <a
              href="mailto:cydcommittee@gmail.com"
              className="text-sm text-white/55 hover:text-white transition-colors"
            >
              cydcommittee@gmail.com
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-semibold text-white/65 hover:text-white">
                <T en={l.en} cy={l.cy} />
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-center text-xs text-white/40">
          <T
            en="© 2026 Cymdeithas y Dalar. Established 2023."
            cy="© 2026 Cymdeithas y Dalar. Sefydlwyd 2023."
          />
        </p>
      </div>
    </footer>
  );
}

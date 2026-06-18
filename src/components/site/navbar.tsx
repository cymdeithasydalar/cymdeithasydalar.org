"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang/language-provider";
import { useWaitingList } from "@/components/waiting-list/waiting-list-provider";
import { Menu, X, Languages } from "lucide-react";

const links = [
  { href: "/#about", en: "About", cy: "Amdanom" },
  { href: "/#facilities", en: "Facilities", cy: "Cyfleusterau" },
  { href: "/#sitemap", en: "Site Map", cy: "Map y Safle" },
  { href: "/members", en: "Members", cy: "Aelodau" },
  { href: "/#contact", en: "Contact", cy: "Cysylltu" },
];

export function Navbar() {
  const { lang, toggle } = useLang();
  const { open } = useWaitingList();
  const [menu, setMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--cream)]/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center gap-3">
        <Link href="/" className="flex flex-col leading-tight shrink-0">
          <span className="font-heading text-xl text-[var(--green-dark)]">Cymdeithas y Dalar</span>
          <span className="text-[0.72rem] font-semibold text-muted-foreground">
            {lang === "cy" ? "Cymuned y Rhandir" : "Community Allotment"}
          </span>
        </Link>

        {/* Desktop */}
        <div className="ml-auto hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[var(--green-mid)] hover:bg-secondary transition-colors"
            >
              {lang === "cy" ? l.cy : l.en}
            </Link>
          ))}
          <Button size="sm" onClick={() => open()} className="ml-1">
            {lang === "cy" ? "Rhestr Aros" : "Join Waiting List"}
          </Button>
          <Button size="sm" variant="outline" onClick={toggle} className="ml-1 gap-1.5">
            <Languages className="size-4" />
            {lang === "cy" ? "English" : "Cymraeg"}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto md:hidden p-2 text-[var(--green-dark)]"
          onClick={() => setMenu((m) => !m)}
          aria-label="Menu"
        >
          {menu ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menu && (
        <div className="md:hidden border-t border-border bg-[var(--cream)] px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className="px-3 py-2.5 rounded-lg font-semibold text-[var(--green-mid)] hover:bg-secondary"
            >
              {lang === "cy" ? l.cy : l.en}
            </Link>
          ))}
          <Button onClick={() => { setMenu(false); open(); }} className="mt-2 w-full">
            {lang === "cy" ? "Ymuno â'r Rhestr Aros" : "Join the Waiting List"}
          </Button>
          <Button variant="outline" onClick={toggle} className="w-full gap-1.5">
            <Languages className="size-4" />
            {lang === "cy" ? "English" : "Cymraeg"}
          </Button>
        </div>
      )}
    </nav>
  );
}

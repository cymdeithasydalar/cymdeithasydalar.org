import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Facilities } from "@/components/site/facilities";
import { SiteMap } from "@/components/site/site-map";
import { Access } from "@/components/site/access";
import { Cta } from "@/components/site/cta";
import { Contact } from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Facilities />
      <SiteMap />
      <Access />
      <Cta />
      <Contact />
    </>
  );
}

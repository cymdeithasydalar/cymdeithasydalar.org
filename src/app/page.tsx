import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Facilities } from "@/components/site/facilities";
import { SiteMap } from "@/components/site/site-map";
import { Access } from "@/components/site/access";
import { Cta } from "@/components/site/cta";
import { Contact } from "@/components/site/contact";
import { ComingSoon } from "@/components/site/coming-soon";

// Flip to true once the invoice is paid and the site can go live.
const SITE_LIVE = true;

export default function Home() {
  if (!SITE_LIVE) return <ComingSoon />;

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

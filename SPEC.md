# Cymdeithas y Dalar — Website Spec

## Site
- URL: https://cymdeithasydalar.org.uk
- Tech: **Next.js 16 (App Router, TS) + Tailwind v4 + shadcn/ui**
- Hosting: **Raspberry Pi via Docker** (Node server — enables server-side members gate)
- Original static prototype kept in `legacy/` (index.html + style.css) for reference

## Architecture (Next.js)
- `src/app/layout.tsx` — fonts, LanguageProvider, WaitingListProvider, Navbar, Footer
- `src/app/page.tsx` — home (Hero, About, Facilities, SiteMap, Access, CTA, Contact)
- `src/app/members/` — gated members area (`page.tsx` + `actions.ts`)
- `src/components/site/*` — section components
- `src/components/lang/language-provider.tsx` — bilingual context + `<T en cy/>`
- `src/components/waiting-list/*` — dialog provider + JoinButton (openable anywhere)
- `src/components/ui/*` — shadcn components (button, dialog, input, label, card, sonner)
- `src/lib/plots.ts` — plot status data + SVG geometry
- `src/lib/auth.ts` — server-only gate logic
- `src/lib/i18n.ts` — server lang cookie read + `pick()`

## Content Source
- Based on physical leaflet (two images, originals in `legacy/` era)

## Language
- Bilingual: Welsh (Cymraeg) / English
- `LanguageProvider` (client context); toggle writes `cyd_lang` cookie (read server-side → no flash)
- Inline `<T en="…" cy="…" />` for client text; `pick(lang, en, cy)` for server components

## Members Area (server-side gate) — the proper bit
- `/members`: enter passphrase → server action `unlock()` validates against
  `MEMBERS_PASSPHRASE`, sets an httpOnly signed cookie (`cyd_member`)
- Gate PIN codes come from env (`GATE_CODE`, `ALLOTMENT_GATE_CODE`) and are read
  **only server-side** — they reach the browser ONLY after a valid unlock
  (verified: codes absent from locked page HTML, present after unlock)
- Cookie value = sha256(passphrase :: AUTH_SECRET); verified with timingSafeEqual
- `noindex` on /members; `logout()` server action clears cookie
- Threat model: low-sensitivity allotment codes; this is real gating, not just JS hiding

## Environment (see `.env.example`)
- `MEMBERS_PASSPHRASE`, `AUTH_SECRET` (openssl rand -hex 32), `GATE_CODE`,
  `ALLOTMENT_GATE_CODE`, `NEXT_PUBLIC_FORMSPREE_ID`
- Code fallbacks exist for dev (passphrase `growtogether`, codes 1303/3254) — **override in prod**

## Deploy (Raspberry Pi)
- `Dockerfile` (multi-stage, `output: standalone`, node:22-alpine) + `docker-compose.yml`
- `cp .env.example .env` → fill real values, then `docker compose up -d --build`
- `NEXT_PUBLIC_FORMSPREE_ID` is build-time (compose passes it as a build arg)
- Point the domain at the Pi (reverse proxy / Cloudflare tunnel recommended for HTTPS;
  cookie `secure` flag is on in production)

## Local dev
- `npm run dev` → http://localhost:3000  (`npm run build` to verify prod build)

## Form — Waiting List
- Provider: **Formspree** (https://formspree.io)
- Fields: Full Name, Email, Phone Number
- Submission: fetch() POST to Formspree endpoint (no page redirect)
- Success: shows inline confirmation in modal
- Auto-reply: configured in Formspree dashboard → Plugins → "Auto Response"
  - Subject: "Thank you for joining our waiting list"  
  - Body: "Thank you for your email and you are now on our allotment waiting list."
- Form submissions notify: **allotmentcommunity@gmail.com**
- **TODO**: Replace `YOUR_FORMSPREE_ID` in `index.html` with real form ID from dashboard

### Formspree Setup Steps
1. Sign up at formspree.io with allotmentcommunity@gmail.com
2. Create new form → copy the form ID (e.g. `xqkrjvwd`)
3. Replace `YOUR_FORMSPREE_ID` in `index.html` (line with fetch URL)
4. Dashboard → Plugins → Add "Auto Response" plugin
5. Set reply subject and body as above

## Sensitive Info — NOT on public site
- Gate code (1303) — members only
- Allotment gate code (3254) — members only
- Note in Access section: "Codes provided to members upon joining"

## Site Map
- Inline **SVG** schematic, closely mirrors leaflet drawing
- Shed across top; 2-column plot grid grouped 1–14 / 15–22 / 23–30 (gaps between groups)
- Dashed site boundary/access path; PATRIA up-arrow direction marker
- Angled entrance plots (unnumbered slanted strip, top-left)
- Water Point box, Compost Area (vertical), two X communal beds
- Parking (dashed bay), Toilets box, Community Area label
- All labels bilingual (EN/CY <text> toggled by body lang class)

### Interactive plots (status)
- Each plot clickable + keyboard-focusable; colour-coded by status
- Statuses: `available` (green) / `reserved` (amber) / `taken` (grey) + legend
- **Maintain statuses** by editing the `plotStatus` object in `index.html` (`<script>`)
  e.g. `12:'available'` → change to `'taken'` when allocated
- Click an **available** plot → popup → "Join the waiting list" opens the modal
  with that plot pre-noted (hidden field `plot_of_interest` → included in Formspree email)
- Popup auto-positions above/below plot, dismiss on outside-click / Esc / scroll
- **Future**: could pull statuses from a JSON file or members-area backend

## Visual Character / Theme (subtle organic — per UI/UX review)
- Fonts: **Patrick Hand** (headings) + **Caveat** (script taglines/quote) + **Nunito** (body)
- Asymmetric/organic border-radii on all cards (varied per card via nth-child)
- Leaf-sprig SVG dividers under every section title (data-URI, green)
- Botanical leaf-branch SVGs in hero top corners (mirrored, faint)
- Green/cream watercolour-inspired palette
- NOTE: chose subtle organic over full hand-drawn (Rough.js/Wired/PaperCSS) for
  speed + readability; revisit if a more illustrated look is wanted later

## Future / Later
- Members area with login (where gate codes could live) — defer
- React/Next.js migration if members area added
- est. 2023 noted in footer

## Contact
- allotmentcommunity@gmail.com

## Key Content (from leaflet)
- Organic gardening commitment — no chemicals
- Community catch-ups: last Friday of the month at the allotments
- Water: mains via troughs; water harvesting encouraged; hosepipes prohibited
- Facilities: communal tools & wheelbarrows, polytunnels (2, first-come-first-served),
  compost area, secure shed (CYD members & tenants), notice board, wants & borrows board
- Parking: National Trust car park, left-hand side, summer only, load/unload
- Plot care: read agreement, visit regularly, keep tidy/weed-free, grow & harvest
- Motto: "Grow Together — Thrive Together" / "Tyfu Gyda'n Gilydd — Ffynnu Gyda'n Gilydd"
- Quote: "Community is at the heart of everything we do."

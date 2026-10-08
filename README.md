# Faith Wanjiru — Civil & Structural Engineering Portfolio

A state-of-the-art graduate engineering portfolio built to the detailed specification in
`FAITH_WANJIRU_CIVIL_STRUCTURAL_PORTFOLIO_SPEC.md`. **MONUMENT edition** — a cinematic,
gallery-grade experience on an engineering-drawing foundation: colossal expanded typography,
buttery Lenis smooth scrolling, a living structural-field canvas, a preloader sequence, custom
cursor physics and a pinned horizontal project gallery.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black) ![React 19](https://img.shields.io/badge/React-19-blue) ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-e64ce6) ![Lenis](https://img.shields.io/badge/Lenis-1.3-23AFAD)

---

## Highlights

**Design system — "MONUMENT"**
- Dark-first cinematic palette: graphite `#0B0D10`, warm paper ink `#EFEBE1`, signal amber
  `#F2A93B`, steel blue `#6FA8FF` — with a refined warm-paper light theme (`#F2EFE7`)
- Typography: **Archivo** variable (width axis, expanded to 118% for the monumental display cut) ·
  **Inter** (body) · **IBM Plex Mono** (technical labels, dimensions, coordinates)
- Every section remains a numbered drawing sheet (`SHT 01…14 · REV A`) with crosshair
  registration marks, hairline rules and drawing-sheet headers

**Elite motion & interaction**
- **Lenis smooth scrolling** — inertia wheel, single rAF loop, anchor interception with nav offset
- **Cinematic preloader** — eased 0→100 counter with cross register, status readout and a
  double-curtain lift with an amber blade edge (once per session; skips for reduced motion)
- **Custom cursor** — instant dot + lagged spring ring (mix-blend-difference), expands over
  interactive elements, amber "OPEN / EXPLORE / EMAIL" label bubbles (fine pointers only)
- **Living structural field** — hero canvas of survey-marker nodes and truss members that spring
  home and repel from the pointer; DPR-capped, pauses offscreen/hidden, static under reduced motion
- **Colossal hero** — masked line reveals orchestrated by the preloader, parallax drawing-frame
  portrait, floating analysis sketch, velocity-skew discipline ticker, animated scroll cue
- **Sticky cinematic featured project** — full-viewport poster that zooms and dims as you scroll
  through it, giant ghost numeral, objectives ledger
- **Pinned horizontal project gallery** (desktop) — scroll-traversed register with live sheet
  counter and amber progress hairline; vertical stack on mobile
- Scroll-scrubbed word-by-word manifesto illumination; clip-reveal parallax imagery; counting
  stat band with spotlight hover; magnetic CTAs with hard-shadow plates
- Nav hides on scroll-down and glides back on scroll-up; chainage readout `CH 0+000 → 0+850`
  plus a live Eldoret (EAT) clock; amber scroll-progress hairline
- Full-screen case-study overlay with spring physics, next-project navigation and Escape-to-close
- `prefers-reduced-motion` respected throughout (spec §54) — Lenis, cursor, canvas, preloader and
  all scroll-linked effects degrade gracefully

**Content architecture (per spec)**
- 14-sheet single-page experience + deep-linkable standalone routes
- 6 complete project case studies (brief → criteria → approach → calculations → results →
  limitations → lessons → improvements)
- Flagship FYP deep-dive: design workflow, load path, analysis output, software-vs-hand
  verification table, serviceability, foundations
- Industrial attachment with Design-Intent / Site-Reality storytelling (spec §51)
- Skill matrix with honest levels — never percentages (spec §16)
- Education with interactive coursework browser; codes & standards with academic-exposure caveat
- Laboratories & fieldwork treated as technical evidence (spec §33–34)
- Recruiter mode (`/recruiter`) and CV (`/cv`) — both print cleanly to A4
- JSON-LD structured data: `ProfilePage`/`Person`/`EducationalOccupationalCredential` (spec §57)
- Honest placeholder policy: `[placeholder]`/`[ph]` markers, "PRELIMINARY ISSUE — SAMPLE DATA"
  stamp, and a publishing checklist below (spec §2, §69)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS 4 (`@theme` design tokens, CSS variables, dark mode via `next-themes`) |
| Animation | Framer Motion 12 + Lenis 1.3 (smooth scroll) |
| Imagery | AI-generated placeholder set (13 images) in `public/images` |
| Fonts | `next/font/google` — Archivo (variable, width axis), Inter, IBM Plex Mono |
| PDF CV | Pre-built at `public/cv/faith-wanjiru-cv.pdf` (regenerate via `scripts/generate-cv.py`) |

## Getting Started

```bash
npm install        # or bun install
npm run dev        # http://localhost:3000
```

> `db:push` is a no-op placeholder kept for the sandbox dev script — this project uses no database.

Production:

```bash
npm run build && npm start
```

## Routes

```
/                    14-sheet immersive portfolio (the main experience)
/projects            project register (full listing)
/projects/[slug]     6 standalone case-study pages (SEO + shareable)
/recruiter           one-page recruiter summary — prints to A4
/cv                  print-optimized CV  (PDF download also available)
/sitemap.xml · /robots.txt · /icon.svg
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # homepage — all 14 sheets
│   ├── projects/[slug]/      # standalone case studies
│   ├── recruiter/  cv/       # print modes
│   ├── layout.tsx            # fonts, theme provider, SEO metadata
│   ├── sitemap.ts  robots.ts icon.svg
├── components/
│   ├── layout/               # Nav (hide/show, chainage, EAT clock) · Footer (title block)
│   ├── hero/                 # Hero (colossal type, canvas, parallax) · NetworkCanvas
│   ├── projects/             # cards, showcase (poster + horizontal gallery),
│   │                         #   case-study overlay
│   ├── structural/           # SVG diagrams: RC frame, BMD/SFD, load path,
│   │                         #   FYP workflow, section headers
│   ├── site/                 # SiteProviders (preloader/cursor/lenis shell),
│   │                         #   SmoothScroll, Preloader, Cursor, snapshot,
│   │                         #   experience, engineering, education, timeline,
│   │                         #   about, contact sections
│   └── ui/motion-primitives.tsx  # Reveal, WordReveal, ParallaxImage, TickerRow,
│                                 #   ScrollCount, Magnetic, Stagger…
├── data/
│   ├── portfolio.ts          # profile, skills, software, education, timeline…
│   ├── projects.ts           # 6 full case studies (typed per spec §61)
│   └── experience.ts         # attachment, labs, fieldwork, teamwork
├── lib/
│   ├── motion.ts             # shared easings, springs, transitions
│   ├── smooth-scroll.ts      # Lenis singleton + ref-counted scroll lock
│   └── seo.ts                # JSON-LD builders
```

## Customization — Publishing Checklist (spec §69)

All content lives in three typed data files — edit them and the entire site updates:

1. `src/data/portfolio.ts` — profile, contact, links, skills, education, timeline
2. `src/data/projects.ts` — case studies
3. `src/data/experience.ts` — attachment, laboratories, fieldwork

**Before publishing, replace:**
- [ ] Portrait (`public/images/portrait.png`, `about-faith.png`) with real photos
- [ ] Email / LinkedIn / phone (`profile` in `portfolio.ts`)
- [ ] Graduation year & classification
- [ ] Attachment organization, dates and department
- [ ] All `[placeholder]` / `[ph]` values (loads, spans, moments, soil parameters…)
- [ ] Project images with real drawings, model screenshots and site photos
- [ ] CV PDF (`scripts/generate-cv.py` → regenerate after edits)
- [ ] Verify software claims and standards exposure
- [ ] Remove the "PRELIMINARY ISSUE" stamp in `Footer.tsx` once data is verified
- [ ] Update `metadataBase` in `app/layout.tsx` to the real domain

## Accessibility & Performance

- Semantic HTML, ARIA labels, keyboard-navigable cards and overlays (Escape closes)
- WCAG AA contrast in both themes; visible focus rings
- `next/image` with priority hero, responsive sizes, lazy loading
- GPU-only transforms for all scroll-linked motion; canvas paused offscreen and when hidden
- Reduced-motion support across every animated component

## Deployment

Deploy to **Vercel** (recommended, per spec §58) — zero config. Set the production domain in
`layout.tsx` (`metadataBase`) and in `src/app/sitemap.ts`.

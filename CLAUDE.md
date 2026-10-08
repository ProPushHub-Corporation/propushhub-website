# PropushHub Website

Marketing site for PropushHub (also searched as "PPH Corporation"). It sells development services: websites, CMS, e-commerce, web apps, mobile, desktop, ERP, APIs, UI/UX, AI and DevOps, and shows past projects in a Firebase-backed showcase.

## Stack
React 19 + TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), `lucide-react` icons, GSAP (lazy, scroll/hover effects only), Firebase Firestore (showcase data), Cloudinary (project images). Fonts are self-hosted: Noto Sans (body) and DM Sans (headings), the closest free match to Miro's Noto Sans + Roobert PRO.
Originally scaffolded from Google AI Studio (see `metadata.json`, `.env.example`).

## Commands
- `npm install` — install deps
- `npm run dev` — dev server on port 3000 (unminified: **do not run Lighthouse against it**)
- `npm run build` — production build to `dist/` (Vite build, then `scripts/prerender.ts`)
- `npm run lint` — type-check only (`tsc --noEmit`)
- `npm run seed:showcase -- --dry-run` — validate/load the portfolio into Firestore (see DATA_TYPES.md)

Run `npm run lint` and `npm run build` before committing code changes.

## Structure
- `src/App.tsx` — layout + route switch (`/`, `/services`, `/services/:slug`, `/showcase`, `/showcase/:slug`, `/contact`, else 404)
- `src/lib/router.tsx` — custom minimal History-API router (no react-router); supports query strings and hashes. Use `Link` / `useRouter().navigate()`
- `src/pages/` — HomePage, ServicesPage, ServicePage, ShowcasePage, ProjectPage, ContactPage, NotFoundPage
- `src/components/` — Navbar, Footer, Splash, `sections.tsx` (ServiceList, ProcessSection, FaqSection, FinalCta), `ui.tsx` (Section, SectionHeader, Breadcrumbs, `anim()`), `SiteImage.tsx`, `reactbits/` (animation components)
- `src/data/services.ts` — the service catalog (copy, SEO title/description, FAQs). Add or edit services here; pages, nav, sitemap and JSON-LD follow automatically
- `src/data/site.ts` — company info, nav links, hero copy, process steps, FAQs, budget options
- `src/data/images.ts` — every image slot with its exact size
- `src/data/showcaseTypes.ts` — TypeScript mirror of **DATA_TYPES.md** (Firestore `projects` collection). Change both together
- `src/data/projects.ts` + `showcaseSeed.ts` — the portfolio bundled with the repo. It seeds Firestore and is the build-time fallback; it is not rendered directly
- `src/lib/firebase.ts` (Firestore lite), `showcase.ts` (fetch), `showcaseStore.ts` (shared snapshot), `cloudinary.ts` (delivery URLs)

## Design system (white background, black text)
- Monochrome only: no accent colour, gradients or glows. Soft shapes: pill buttons, rounded-3xl panels/images, rounded-2xl rows. Primary buttons are black with white text.
- Tokens live in `src/index.css` and are the only place colours are defined: `bg-ink` (white), `bg-surface`, `bg-surface-2`, `text-fg` (black), `text-fg-2`, `text-muted`, `text-dim`, `border-line`, `border-line-strong`. Classes: `btn btn-primary`, `btn btn-secondary`, `field`, `eyebrow`, `container-x`, `spotlight`.
- Headings use `font-display` (DM Sans, weight 500); body is Noto Sans.
- Sections are separated by hairline borders (`<Section>` in `components/ui.tsx`).

## Animation
- **Splash (home only):** a CSS-only "PPH" loading screen on every full load of `/`. The inline script in `index.html` adds `splash` to `<html>` (skipped for reduced motion and crawlers); letters draw in, and once the page has loaded (min ~2s) it adds `splash-exit`: the word zooms to fill the screen and fades. `components/Splash.tsx` is the markup; the timeline is in `index.css`: change `--splash-k` there to speed it up or slow it down (1 = fast, 2 = slow). No JavaScript library is involved.
- **Hero text:** `reactbits/SplitWords.tsx` + `.hero-anim` (CSS). Words rise in sequence at first paint; on the home page they wait for the splash (`html.splash:not(.splash-exit)` hides them). Use `anim(i)` from `ui.tsx` to order elements.
- **GSAP layer (lazy):** `lib/motion.ts` loads GSAP + ScrollTrigger + SplitText only after the first interaction or ~4.5s after load, never for reduced-motion users. Components in `reactbits/` (adapted from React Bits): `Reveal` (scroll fade-up, optional `spotlight`), `SplitText` (headings), `CountUp`, `Magnet`. They only hide content that starts below the fold, after load, so the server-rendered HTML is always fully visible.
- Don't hide content until JavaScript runs; don't start new animations at load that delay the LCP element.

## Performance rules (Lighthouse mobile is 92-99 on the production build)
- Measure on `npm run build` output served with compression, never the dev server. A cold browser profile per run gives honest numbers.
- Do **not** add `text-rendering: optimizeLegibility`, `text-wrap: pretty` or `backdrop-filter` blur: together they cost ~15 Lighthouse points here (Style & Layout 2.2s to 0.4s without them).
- Keep GSAP, Firebase and anything heavy behind dynamic `import()`; the two latin fonts are preloaded by `scripts/prerender.ts`.

## Images
Every image is declared in `src/data/images.ts` (or a service's `image`). Without a `src`, `SiteImage` renders a "W × H" placeholder at the exact size. To use a real image: save it at the slot's `path` (under `public/`) and set `src` to its public URL. Showcase images are Cloudinary URLs stored in Firestore (see DATA_TYPES.md). Always keep meaningful `alt` text. OG image is `public/og-image.png` (1200 × 630).

## SEO
- Route metadata lives in `src/lib/seo.ts` (titles, descriptions, canonical, OG, JSON-LD: Organization with `alternateName` "PPH Corporation", WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, ContactPage, CollectionPage/ItemList, CreativeWork per project). `SITE_URL` there must be changed when a custom domain is connected.
- The home and contact titles/descriptions deliberately include "PPH Corporation (PropushHub)" and "contact form" so brand searches land on them.
- `npm run build` runs `scripts/prerender.ts`: it reads the showcase from Firestore (falls back to the bundled seed data with a warning), server-renders every route with `react-dom/server` into `dist/<route>/index.html` (including one page per project), embeds the showcase JSON for hydration, and writes `404.html`, `sitemap.xml`, `robots.txt` and `llms.txt`. `src/main.tsx` hydrates that HTML. `vercel.json` has no catch-all rewrite, so unknown URLs get a real 404.
- New Firestore project => redeploy (or use a Vercel Deploy Hook) to get its static, indexable page. Until then `/showcase/<slug>` still loads on demand in the browser (404.html is re-rendered, not hydrated).
- `src/lib/useSeo.ts` updates the head on client-side navigation (and skips the first render of a prerendered page).
- Keep one `<h1>` per page, titles under about 60 characters, descriptions under 160. Use `Link` (real `<a href>`) for internal navigation, never `onClick` buttons.
- Anything that touches `window`/`document` must run in an effect, otherwise the prerender step breaks.

## Conventions
- Match existing style: functional components, `React.FC`, Tailwind utility classes inline.
- Content changes go in `src/data/`, not hard-coded in components.
- `vite.config.ts` HMR/watch settings are for AI Studio — do not modify.
- Never commit `.env*` (only `.env.example`) or a Firebase service-account key. The Firebase *web* config in `src/lib/firebase.ts` is public by design; Firestore rules are the protection.

## Git workflow
- Branch: `main`. Remote: `ProPushHub-Corporation/propushhub-website`.
- Commit after every small, self-contained task (one logical change per commit).
- Commit messages: short imperative subject (e.g. "Add pricing section to HomePage").
- Push after commits when asked.

# PropushHub Website

Marketing site for PropushHub. It sells development services: websites, CMS, e-commerce, web apps, mobile, desktop, ERP, APIs, UI/UX, AI and DevOps.

## Stack
React 19 + TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), `lucide-react` icons, self-hosted Arimo font (`@fontsource-variable/arimo`) for everything.
Originally scaffolded from Google AI Studio (see `metadata.json`, `.env.example`).

## Commands
- `npm install` — install deps
- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/` (Vite build, then `scripts/prerender.ts`)
- `npm run lint` — type-check only (`tsc --noEmit`)

Run `npm run lint` and `npm run build` before committing code changes.

## Structure
- `src/App.tsx` — layout + route switch (`/`, `/services`, `/services/:slug`, `/contact`, else 404)
- `src/lib/router.tsx` — custom minimal History-API router (no react-router); supports query strings and hashes. Use `Link` / `useRouter().navigate()`
- `src/pages/` — HomePage, ServicesPage, ServicePage, ContactPage, NotFoundPage
- `src/components/` — Navbar, Footer, `sections.tsx` (ServiceList, ProcessSection, FaqSection, FinalCta), `ui.tsx` (Section, SectionHeader, Breadcrumbs), `SiteImage.tsx`
- `src/data/services.ts` — the service catalog (copy, SEO title/description, FAQs). Add or edit services here; pages, nav, sitemap and JSON-LD follow automatically
- `src/data/site.ts` — company info, nav links, hero copy, process steps, FAQs, budget options
- `src/data/images.ts` — every image slot with its exact size
- `src/data/projects.ts` — portfolio/case-study data. **Not rendered right now** (the Work pages were removed on purpose); the old `WorkPage`/`CaseStudyPage` are in git history if they come back

## Design system (black and white only)
- No accent colour, gradients, glass, glows or looping animation. Keep it monochrome and sharp (no rounded corners).
- Tokens live in `src/index.css`: `bg-ink`, `bg-surface`, `bg-surface-2`, `text-fg`, `text-fg-2`, `text-muted`, `text-dim`, `border-line`, `border-line-strong`. Classes: `btn btn-primary`, `btn btn-secondary`, `field`, `eyebrow`, `container-x`.
- Wrap a block in `.light` (or `<Section tone="light">`) to flip the same tokens to a white surface. Alternate dark and light sections down each page.
- Don't hide content until JavaScript runs (no opacity-0 initial states): pages are prerendered. The only entrance animation is the CSS `animate-rise` on hero text.

## Images
Every image is declared in `src/data/images.ts` (or a service's `image`). Without a `src`, `SiteImage` renders a "W × H" placeholder at the exact size. To use a real image: save it at the slot's `path` (under `public/`) and set `src` to its public URL. Always keep meaningful `alt` text. OG image is `public/og-image.png` (1200 × 630).

## SEO
- Route metadata lives in `src/lib/seo.ts` (titles, descriptions, canonical, OG, JSON-LD: Organization, WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, ContactPage). `SITE_URL` there must be changed when a custom domain is connected.
- `npm run build` runs `scripts/prerender.ts`: it server-renders every route with `react-dom/server` into `dist/<route>/index.html` (full content + head tags), and writes `404.html`, `sitemap.xml`, `robots.txt` and `llms.txt`. `src/main.tsx` hydrates that HTML. `vercel.json` has no catch-all rewrite, so unknown URLs get a real 404.
- `src/lib/useSeo.ts` updates the head on client-side navigation.
- Keep one `<h1>` per page, titles under 60 characters, descriptions under 160. Use `Link` (real `<a href>`) for internal navigation, never `onClick` buttons.
- Anything that touches `window`/`document` must run in an effect, otherwise the prerender step breaks.

## Conventions
- Match existing style: functional components, `React.FC`, Tailwind utility classes inline.
- Content changes go in `src/data/`, not hard-coded in components.
- `vite.config.ts` HMR/watch settings are for AI Studio — do not modify.
- Never commit `.env*` (only `.env.example`). No secrets in client code.

## Git workflow
- Branch: `main`. Remote: `ProPushHub-Corporation/propushhub-website`.
- Commit after every small, self-contained task (one logical change per commit).
- Commit messages: short imperative subject (e.g. "Add pricing section to HomePage").
- Push after commits when asked.

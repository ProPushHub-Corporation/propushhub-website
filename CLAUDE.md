# PropushHub Website

Marketing/portfolio site for PropushHub (custom software, ERP, web & mobile engineering).

## Stack
React 19 + TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), `motion` for animation, `lucide-react` icons.
Originally scaffolded from Google AI Studio (see `metadata.json`, `.env.example`).

## Commands
- `npm install` — install deps
- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run lint` — type-check only (`tsc --noEmit`)

Run `npm run lint` and `npm run build` before committing code changes.

## Structure
- `src/App.tsx` — layout + route switch (`/`, `/work`, `/work/:slug`)
- `src/lib/router.tsx` — custom minimal History-API router (no react-router); use `useRouter().navigate()`
- `src/pages/` — HomePage, WorkPage, CaseStudyPage
- `src/components/` — Navbar, Footer, ProjectCard, ConversionSections (inquiry modal, CTAs)
- `src/data/projects.ts` — all project/case-study content and types; add new projects here
- `public/projects/<slug>/*.svg` — project screenshots (placeholders; `replacementPathHint` in data says where real ones go)

## Conventions
- Match existing style: functional components, `React.FC`, Tailwind utility classes inline.
- Palette: background `#F7F7F4`, text `#0F172A`.
- Content changes go in `src/data/`, not hard-coded in components.
- `vite.config.ts` HMR/watch settings are for AI Studio — do not modify.
- Never commit `.env*` (only `.env.example`). No secrets in client code.

## Git workflow
- Branch: `main`. Remote: `ProPushHub-Corporation/propushhub-website`.
- Commit after every small, self-contained task (one logical change per commit).
- Commit messages: short imperative subject (e.g. "Add pricing section to HomePage").
- Push after commits when asked.

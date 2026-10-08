# PropushHub Corporation (PPH) — Website

Official website of **PropushHub Corporation (PPH)**, a software development company that builds websites, CMS, e-commerce, web and mobile apps, desktop software, custom ERP, APIs, UI/UX, AI automation and DevOps.

**Live site:** [pphcorporation.vercel.app](https://pphcorporation.vercel.app)

## Highlights

- **11 service pages** with their own copy, FAQs and structured data, driven by one data file.
- **Project showcase** backed by Firebase Firestore, with a static, indexable page for every project.
- **Company pages:** About, Team, Jobs, Collaboration, Help and Contact (form, WhatsApp, email).
- **SEO built in:** every route is prerendered to static HTML with canonical URLs, Open Graph and Twitter tags, JSON-LD, `sitemap.xml`, `robots.txt` and `llms.txt`.
- **Fast:** self-hosted fonts, a small client bundle, and Firebase and GSAP loaded only when needed.
- **Monochrome design system:** white background, black text, pill buttons, soft rounded shapes.

## Tech stack

| Area            | Choice                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------- |
| UI              | React 19, TypeScript                                                                         |
| Build           | Vite 8, Tailwind CSS v4                                                                      |
| Routing         | Small custom History-API router (`src/lib/router.tsx`)                                       |
| Data            | Firebase Firestore (lite SDK) for projects, team, partners, jobs and the home partner ribbon |
| Images          | Cloudinary delivery URLs                                                                     |
| Motion          | CSS splash and hero text, plus lazy-loaded GSAP (scroll and hover only)                      |
| Icons and fonts | `lucide-react`, self-hosted Noto Sans and DM Sans                                            |
| Hosting         | Vercel                                                                                       |

## Getting started

**Requirements:** Node.js 20.19 or newer (or 22.12+) and npm.

```bash
git clone https://github.com/ProPushHub-Corporation/propushhub-website.git
cd propushhub-website
npm install
npm run dev
```

The dev server runs at <http://localhost:3000>. It is unminified, so do not use it for performance measurements.

### Scripts

| Command                                       | What it does                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`                                 | Start the dev server on port 3000                                              |
| `npm run build`                               | Production build, then prerender every route into `dist/`                      |
| `npm run preview`                             | Serve the built `dist/` locally                                                |
| `npm run lint`                                | Type-check with `tsc --noEmit`                                                 |
| `npm run seed -- --dry-run`                   | Validate the Firestore seed data without writing anything                      |
| `npm run seed`                                | Write the portfolio and sample data to Firestore (needs a service-account key) |
| `npm run seed -- --clear-samples`             | Remove the sample documents again                                              |
| `npm run seed:data -- <collection> file.json` | Load your own JSON into `projects`, `team`, `partners` or `jobs`               |

Run `npm run lint` and `npm run build` before committing.

## Project structure

```text
src/
  App.tsx            Layout and route switch
  pages/             One component per page
  components/        Navbar, Footer, Splash, shared sections and UI, reactbits/ (animation)
  data/              Content: services, site copy, company links, images, Firestore type mirrors
  lib/               Router, SEO, Firebase, data hooks, Cloudinary helpers
scripts/             Prerender step and Firestore seeding
public/              Icons, OG image, web manifest
seed.ts              One-command Firestore seeding
```

Content lives in `src/data/`, not inside components:

- **Services:** edit `src/data/services.ts`. Pages, navigation, sitemap and JSON-LD update automatically.
- **Company info and copy:** `src/data/site.ts` and `src/data/company.ts`.
- **Images:** every slot is declared in `src/data/images.ts` with its exact size. Without a `src`, a placeholder is shown.
- **Projects, team, partners, jobs:** stored in Firestore. The schemas are in [DATA_TYPES.md](DATA_TYPES.md).

## How the data flows

1. At build time, `scripts/prerender.ts` reads Firestore and renders each route to `dist/<route>/index.html`, embedding the data for hydration. If the showcase cannot be read, it falls back to the bundled seed data.
2. In the browser, React hydrates that HTML and then refreshes the data from Firestore, so edits in Firebase appear without a redeploy.
3. A **new** project gets its static, indexable page on the next build. Until then its URL still works in the browser. To rebuild automatically, call a Vercel Deploy Hook when content changes.

## SEO

- Route metadata, canonical URLs and JSON-LD are defined in `src/lib/seo.ts`.
- The canonical origin is `SITE_URL` in the same file. **Change it when a custom domain is connected.**
- Official name: _PropushHub Corporation (PPH)_. Also searched as "PropushHub" and "PPH Corporation"; these are listed as alternate names in the structured data.
- Keep one `<h1>` per page, titles under about 60 characters and descriptions under 160.
- Anything that touches `window` or `document` must run inside an effect, otherwise the prerender step breaks.

## Deployment

The site deploys to Vercel from `main`. `vercel.json` sets the build command, output directory, security headers and cache rules, and has no catch-all rewrite, so unknown URLs return a real 404.

1. Import the repository in Vercel (framework preset: Vite).
2. Use the default build command, `npm run build`, and output directory, `dist`.
3. Optionally create a Deploy Hook so new Firestore projects trigger a rebuild.

## Firebase and secrets

- The Firebase **web** config in `src/lib/firebase.ts` is public by design. Access is controlled by the Firestore security rules in [DATA_TYPES.md](DATA_TYPES.md#firestore-security-rules).
- Seeding uses the Firebase Admin SDK and needs a service-account key. Keep the key outside the repository and point `GOOGLE_APPLICATION_CREDENTIALS` at it. Key files are git-ignored.
- Never commit `.env*` files (only `.env.example`).

## Before launch checklist

- [ ] Run `npm run seed -- --clear-samples` to remove sample team, partner, job and ribbon documents.
- [ ] Add real photos, logos and project screenshots (see `src/data/images.ts` and DATA_TYPES.md).
- [ ] Confirm `SITE_URL` in `src/lib/seo.ts` matches the live domain.
- [ ] Submit `/sitemap.xml` in Google Search Console.
- [ ] Run Lighthouse against the production build, not the dev server.

## Contributing

Work on small, self-contained commits with short imperative messages (for example, "Add pricing section to HomePage"). See [CLAUDE.md](CLAUDE.md) for the design system, animation rules, performance rules and conventions.

## License

Copyright © PropushHub Corporation (PPH). All rights reserved.

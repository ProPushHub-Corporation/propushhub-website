/**
 * Post-build SEO step. For every route this writes a static HTML file containing the
 * fully rendered page (so crawlers and AI bots that don't run JavaScript see real
 * content), the route's <head> tags and JSON-LD. It also writes 404.html, sitemap.xml,
 * robots.txt and llms.txt into dist/.
 *
 * The /showcase page is data-driven: its projects are read from Firestore here (see
 * DATA_TYPES.md), rendered into the HTML and embedded as JSON so the browser can hydrate
 * with identical data. If Firestore is unreachable the bundled seed data is used instead.
 *
 * Run via `npm run build` (after `vite build`).
 */
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import App from '../src/App';
import { SERVICES } from '../src/data/services';
import { COMPANY_INFO } from '../src/data/site';
import { seedShowcaseProjects } from '../src/data/showcaseSeed';
import type { ShowcaseProject } from '../src/data/showcaseTypes';
import { SITE_URL, getAllIndexablePaths, getRouteSeo, renderHeadTags } from '../src/lib/seo';
import { fetchShowcaseProjects } from '../src/lib/showcase';
import { SHOWCASE_DATA_ELEMENT_ID, setShowcaseSnapshot } from '../src/lib/showcaseStore';

const DIST = join(process.cwd(), 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const HEAD_RE = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/;

// Preload the two fonts every page needs so they arrive with the CSS instead of after it is parsed.
const preloadTags = readdirSync(join(DIST, 'assets'))
  .filter((file) => /^(dm-sans|noto-sans)-latin-wght-normal-.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`timed out after ${ms / 1000}s`)), ms)),
  ]);

const loadShowcase = async (): Promise<ShowcaseProject[]> => {
  try {
    const projects = await withTimeout(fetchShowcaseProjects(), 12000);
    if (projects.length === 0) throw new Error('no published documents in the "projects" collection (not seeded yet?)');
    console.log(`Showcase: ${projects.length} projects read from Firestore`);
    return projects;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`\n⚠  Showcase: could not use Firestore (${reason}).\n   Falling back to the bundled seed data in src/data/projects.ts.\n`);
    return seedShowcaseProjects();
  }
};

const showcase = await loadShowcase();

const render = (path: string) => {
  const isShowcase = path === '/showcase' || path.startsWith('/showcase/');
  setShowcaseSnapshot(isShowcase ? showcase : null);
  const seo = getRouteSeo(path, isShowcase ? showcase : null);
  const body = renderToString(createElement(App, { initialPath: path }));
  const data = isShowcase
    ? `<script id="${SHOWCASE_DATA_ELEMENT_ID}" type="application/json">${JSON.stringify(showcase).replace(/</g, '\\u003c')}</script>`
    : '';
  return template
    .replace(HEAD_RE, () => `<!--seo-head-start-->\n    ${renderHeadTags(seo)}\n    <!--seo-head-end-->`)
    .replace('<!--seo-preload-->', () => preloadTags)
    .replace('<!--seo-root-->', () => body)
    .replace('<!--seo-data-->', () => data);
};

const write = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const paths = getAllIndexablePaths(showcase);
const lastModified = (path: string): string | undefined =>
  showcase.find((p) => path === `/showcase/${p.slug}`)?.updatedAt?.slice(0, 10);
for (const path of paths) {
  write(path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html'), render(path));
}

// Unknown URLs get a real 404 status (Vercel serves 404.html) instead of a soft-404 page.
write(join(DIST, '404.html'), render('/404'));

const today = new Date().toISOString().slice(0, 10);
write(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>
    <lastmod>${lastModified(p) ?? today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`
);

write(
  join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

write(
  join(DIST, 'llms.txt'),
  `# ${COMPANY_INFO.name}

> Software development company. Websites, CMS, e-commerce, web and mobile apps, desktop software, custom ERP, APIs, UI/UX design, AI automation and DevOps from one team.

## Services
${SERVICES.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.summary}`).join('\n')}

## Showcase
- [All projects](${SITE_URL}/showcase)
${showcase.map((p) => `- [${p.title}](${SITE_URL}/showcase/${p.slug}): ${p.shortDescription}`).join('\n')}

## Contact
- [Contact page](${SITE_URL}/contact)
- Email: ${COMPANY_INFO.email}
- WhatsApp: ${COMPANY_INFO.whatsappNumberDisplay}
`
);

console.log(`SEO prerender: ${paths.length} routes + 404.html, sitemap.xml, robots.txt, llms.txt`);
// Firebase can keep sockets alive; the build is done, so exit explicitly.
process.exit(0);

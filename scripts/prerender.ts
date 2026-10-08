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
import { COMPANY_LINKS } from '../src/data/company';
import { SITE_URL, getAllIndexablePaths, getRouteSeo, renderHeadTags } from '../src/lib/seo';
import { fetchShowcaseProjects } from '../src/lib/showcase';
import { SHOWCASE_DATA_ELEMENT_ID, setShowcaseSnapshot } from '../src/lib/showcaseStore';
import type { RemoteCollection, RemoteDoc } from '../src/lib/collection';
import type { HomePartnersData } from '../src/data/homePartnerTypes';
import {
  HOME_PARTNERS_ELEMENT_ID,
  fetchHomePartners,
  setHomePartnersSnapshot,
} from '../src/lib/homePartners';
import { jobData, partnerData, teamData } from '../src/lib/remote';

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

/** Reads a data-driven page's Firestore collection. An unreadable collection becomes an empty list. */
const loadRemote = async <T extends RemoteDoc>(label: string, source: RemoteCollection<T>): Promise<T[]> => {
  try {
    const items = await withTimeout(source.fetch(), 12000);
    console.log(`${label}: ${items.length} published documents read from Firestore`);
    return items;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`\n⚠  ${label}: could not use Firestore (${reason}).\n   The page will show its empty state until the "${source.name}" collection can be read.\n`);
    return [];
  }
};

/** The home page ribbon: the `roles` switch plus its logos. Unreadable or switched off means no section. */
const loadHomePartners = async (): Promise<HomePartnersData> => {
  try {
    const data = await withTimeout(fetchHomePartners(), 12000);
    console.log(`Home partners: ${data.enabled ? `${data.items.length} logos (role enabled)` : 'switched off or empty'}`);
    return data;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`\n⚠  Home partners: could not use Firestore (${reason}).\n   The ribbon stays hidden until roles/home_collaboration_partner and its collection can be read.\n`);
    return { enabled: false, items: [] };
  }
};

const showcase = await loadShowcase();
const team = await loadRemote('Team', teamData);
const partners = await loadRemote('Partners', partnerData);
const jobs = await loadRemote('Jobs', jobData);
const homePartners = await loadHomePartners();

// Pages whose content comes from a Firestore collection: the data is rendered into the HTML and embedded as
// JSON so the browser can hydrate with exactly the same data.
const REMOTE_PAGES: Record<string, { source: RemoteCollection<RemoteDoc>; items: RemoteDoc[] }> = {
  '/team': { source: teamData as unknown as RemoteCollection<RemoteDoc>, items: team },
  '/collaboration': { source: partnerData as unknown as RemoteCollection<RemoteDoc>, items: partners },
  '/jobs': { source: jobData as unknown as RemoteCollection<RemoteDoc>, items: jobs },
};

const render = (path: string) => {
  const isShowcase = path === '/showcase' || path.startsWith('/showcase/');
  const remote = REMOTE_PAGES[path];
  setShowcaseSnapshot(isShowcase ? showcase : null);
  setHomePartnersSnapshot(path === '/' ? homePartners : null);
  for (const page of Object.values(REMOTE_PAGES)) page.source.setSnapshot(page === remote ? page.items : null);
  const seo = getRouteSeo(path, {
    showcase: isShowcase ? showcase : null,
    team: path === '/team' ? team : null,
    partners: path === '/collaboration' ? partners : null,
    jobs: path === '/jobs' ? jobs : null,
  });
  const body = renderToString(createElement(App, { initialPath: path }));
  const embedded = (id: string, value: unknown) =>
    `<script id="${id}" type="application/json">${JSON.stringify(value).replace(/</g, '\\u003c')}</script>`;
  const data = isShowcase
    ? embedded(SHOWCASE_DATA_ELEMENT_ID, showcase)
    : remote
      ? embedded(remote.source.elementId, remote.items)
      : path === '/'
        ? embedded(HOME_PARTNERS_ELEMENT_ID, homePartners)
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

## Company
${COMPANY_LINKS.map((link) => `- [${link.label}](${SITE_URL}${link.to}): ${link.description}`).join('\n')}

## Contact
- [Contact page](${SITE_URL}/contact)
- Email: ${COMPANY_INFO.email}
- WhatsApp: ${COMPANY_INFO.whatsappNumberDisplay}
`
);

console.log(`SEO prerender: ${paths.length} routes + 404.html, sitemap.xml, robots.txt, llms.txt`);
// Firebase can keep sockets alive; the build is done, so exit explicitly.
process.exit(0);

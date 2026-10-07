/**
 * Post-build SEO step: writes per-route static HTML (title, meta, JSON-LD and
 * crawlable fallback content), sitemap.xml and robots.txt into dist/.
 * Run via `npm run build` (after `vite build`).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PROJECTS } from '../src/data/projects';
import {
  SITE_URL,
  getAllIndexablePaths,
  getRouteSeo,
  renderHeadTags,
} from '../src/lib/seo';

const DIST = join(process.cwd(), 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const HEAD_RE = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/;
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const rootFallback = (path: string, heading: string, summary: string) => `
      <main>
        <h1>${esc(heading)}</h1>
        <p>${esc(summary)}</p>
        <nav aria-label="Primary">
          <a href="/">Home</a> <a href="/work">Our Work</a>
        </nav>
        ${
          path === '/' || path === '/work'
            ? `<ul>${PROJECTS.map(
                (p) =>
                  `<li><a href="/work/${p.slug}">${esc(p.title)}</a> — ${esc(p.shortDescription)}</li>`
              ).join('')}</ul>`
            : ''
        }
      </main>`;

const render = (path: string) => {
  const seo = getRouteSeo(path);
  return template
    .replace(HEAD_RE, `<!--seo-head-start-->\n    ${renderHeadTags(seo)}\n    <!--seo-head-end-->`)
    .replace('<!--seo-root-->', rootFallback(path, seo.heading, seo.summary));
};

const write = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const paths = getAllIndexablePaths();
for (const path of paths) {
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html');
  write(file, render(path));
}

const today = new Date().toISOString().slice(0, 10);
const priority = (p: string) => (p === '/' ? '1.0' : p === '/work' ? '0.9' : '0.8');
write(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(p)}</priority>
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

console.log(`SEO prerender: ${paths.length} routes, sitemap.xml, robots.txt`);

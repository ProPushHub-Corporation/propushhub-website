/**
 * Post-build SEO step. For every route this writes a static HTML file containing the
 * fully rendered page (so crawlers and AI bots that don't run JavaScript see real
 * content), the route's <head> tags and JSON-LD. It also writes 404.html, sitemap.xml,
 * robots.txt and llms.txt into dist/.
 * Run via `npm run build` (after `vite build`).
 */
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import App from '../src/App';
import { SERVICES } from '../src/data/services';
import { COMPANY_INFO } from '../src/data/site';
import { SITE_URL, getAllIndexablePaths, getRouteSeo, renderHeadTags } from '../src/lib/seo';

const DIST = join(process.cwd(), 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const HEAD_RE = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/;

const render = (path: string) => {
  const seo = getRouteSeo(path);
  const body = renderToString(createElement(App, { initialPath: path }));
  return template
    .replace(HEAD_RE, () => `<!--seo-head-start-->\n    ${renderHeadTags(seo)}\n    <!--seo-head-end-->`)
    .replace('<!--seo-root-->', () => body);
};

const write = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const paths = getAllIndexablePaths();
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
    <lastmod>${today}</lastmod>
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

## Contact
- [Contact page](${SITE_URL}/contact)
- Email: ${COMPANY_INFO.email}
- WhatsApp: ${COMPANY_INFO.whatsappNumberDisplay}
`
);

console.log(`SEO prerender: ${paths.length} routes + 404.html, sitemap.xml, robots.txt, llms.txt`);

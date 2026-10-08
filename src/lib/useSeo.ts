import { useEffect, useRef } from 'react';
import { ROBOTS_INDEX, ROBOTS_NOINDEX, getRouteSeo } from './seo';
import type { RouteSeo } from './seo';
import { getShowcaseSnapshot } from './showcaseStore';
import { jobData, partnerData, teamData } from './remote';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Writes <title>, meta tags, canonical and JSON-LD for a route into the document head. */
export const applySeo = (seo: RouteSeo) => {
  document.title = seo.title;
  setMeta('meta[name="description"]', 'name', 'description', seo.description);
  setMeta('meta[name="robots"]', 'name', 'robots', seo.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;

  setMeta('meta[property="og:type"]', 'property', 'og:type', seo.type);
  setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
  setMeta('meta[property="og:image"]', 'property', 'og:image', seo.image);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.image);

  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());
  seo.jsonLd.forEach((ld) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
  });
};

/** Keeps the head in sync with the current route. */
export const useSeo = (pathname: string) => {
  const first = useRef(true);

  useEffect(() => {
    // On the first render of a prerendered page the head is already correct (including data-driven
    // JSON-LD), so leave it alone. Only client-side navigations and `vite dev` need to write it.
    const isFirst = first.current;
    first.current = false;
    if (isFirst && document.head.querySelector('link[rel="canonical"]')) return;
    applySeo(
      getRouteSeo(pathname, {
        showcase: getShowcaseSnapshot(),
        team: teamData.getSnapshot(),
        partners: partnerData.getSnapshot(),
        jobs: jobData.getSnapshot(),
      })
    );
  }, [pathname]);
};

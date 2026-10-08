import { useEffect } from 'react';
import { ROBOTS_INDEX, ROBOTS_NOINDEX, getRouteSeo } from './seo';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Keeps <title>, meta tags, canonical and JSON-LD in sync with the current route. */
export const useSeo = (pathname: string) => {
  useEffect(() => {
    const seo = getRouteSeo(pathname);

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

    document.head
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((node) => node.remove());
    seo.jsonLd.forEach((ld) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
    });
  }, [pathname]);
};

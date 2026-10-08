import { SERVICES, getServiceBySlug } from '../data/services';
import type { Service, ServiceFaq } from '../data/services';
import type { ShowcaseProject } from '../data/showcaseTypes';
import { COMPANY_INFO, HOME_FAQS } from '../data/site';
import { cloudinaryOgImage } from './cloudinary';

/** Canonical origin. Change this when a custom domain is connected. */
export const SITE_URL = 'https://pphcorporation.vercel.app';
export const SITE_NAME = 'PropushHub';
/** Other names people search for. Used in schema.org `alternateName` and a few headings. */
export const BRAND_ALIASES = ['PPH Corporation', 'PropushHub Corporation', 'PPH'];
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = 'PropushHub: websites, CMS, mobile, desktop and ERP software development';

export interface RouteSeo {
  title: string;
  description: string;
  path: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
}

const absolute = (path: string) => `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

const ORG_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: BRAND_ALIASES,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  image: DEFAULT_OG_IMAGE,
  description:
    'Software development company building websites, CMS, e-commerce, web and mobile apps, desktop software and custom ERP.',
  email: COMPANY_INFO.email,
  telephone: COMPANY_INFO.phone,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    availableLanguage: ['English', 'Urdu'],
  },
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: BRAND_ALIASES,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

const faqPage = (faqs: ServiceFaq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const serviceLd = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absolute(`/services/${service.slug}`)}#service`,
  name: service.name,
  serviceType: service.name,
  description: service.metaDescription,
  url: absolute(`/services/${service.slug}`),
  provider: { '@id': ORG_ID },
  keywords: service.keywords.join(', '),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.name}: what is included`,
    itemListElement: service.deliverables.map((d) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: d.title, description: d.detail },
    })),
  },
});

const HOME: RouteSeo = {
  title: 'PPH Corporation (PropushHub) — Custom Software Development',
  description:
    'PPH Corporation (PropushHub) builds websites, CMS, mobile apps, desktop software and custom ERP. One team from design to launch and support. Free quote.',
  path: '/',
  canonical: absolute('/'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    ORGANIZATION_LD,
    WEBSITE_LD,
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: DEFAULT_OG_IMAGE,
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      parentOrganization: { '@id': ORG_ID },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software development services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, url: absolute(`/services/${s.slug}`) },
        })),
      },
    },
    faqPage(HOME_FAQS),
  ],
};

const SERVICES_INDEX: RouteSeo = {
  title: 'Software Development Services | PropushHub',
  description:
    'Website, CMS, e-commerce, web app, mobile app, desktop, ERP, API, UI/UX, AI and DevOps services from one development team. Explore what PropushHub builds.',
  path: '/services',
  canonical: absolute('/services'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropushHub software development services',
      url: absolute('/services'),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absolute(`/services/${s.slug}`),
          name: s.name,
        })),
      },
    },
  ],
};

const serviceSeo = (slug: string): RouteSeo | null => {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  const path = `/services/${service.slug}`;
  return {
    title: `${service.seoTitle} | ${SITE_NAME}`,
    description: service.metaDescription,
    path,
    canonical: absolute(path),
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    jsonLd: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.name, path },
      ]),
      serviceLd(service),
      faqPage(service.faqs),
    ],
  };
};

const showcaseSeo = (projects: ShowcaseProject[] = []): RouteSeo => ({
  title: 'Project Showcase: Web, Mobile & ERP Software | PropushHub',
  description:
    'Browse software built by PropushHub: ERP and inventory systems, web and mobile apps, SaaS dashboards and AI tools, with live demos and source code.',
  path: '/showcase',
  canonical: absolute('/showcase'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Showcase', path: '/showcase' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropushHub project showcase',
      url: absolute('/showcase'),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(projects.length
        ? {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: projects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'CreativeWork',
                  name: p.title,
                  description: p.shortDescription,
                  url: absolute(`/showcase/${p.slug}`),
                  keywords: p.allTechnologies.join(', '),
                  creator: { '@id': ORG_ID },
                  ...(p.images.find((i) => i.url)?.url ? { image: cloudinaryOgImage(p.images.find((i) => i.url)!.url as string) } : {}),
                },
              })),
            },
          }
        : {}),
    },
  ],
});

const clip = (text: string, max = 158): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const projectSeo = (slug: string, projects: ShowcaseProject[]): RouteSeo | null => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const path = `/showcase/${project.slug}`;
  const firstImage = project.images.find((i) => i.url)?.url;
  const image = firstImage ? cloudinaryOgImage(firstImage) : DEFAULT_OG_IMAGE;
  return {
    // Long names (e.g. "CoreStock — Inventory & Warehouse Management Platform") keep just the brand part so the title fits.
    title: `${project.title.length + 26 > 62 ? project.title.split(' — ')[0] : project.title} — Case Study | ${SITE_NAME}`,
    description: clip(project.shortDescription),
    path,
    canonical: absolute(path),
    image,
    type: 'article',
    jsonLd: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Showcase', path: '/showcase' },
        { name: project.title, path },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${absolute(path)}#project`,
        name: project.title,
        headline: `${project.title}: ${project.type}`,
        description: clip(project.shortDescription),
        url: absolute(path),
        genre: project.category,
        keywords: project.allTechnologies.join(', '),
        image,
        creator: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@type': 'CollectionPage', '@id': `${absolute('/showcase')}`, name: 'PropushHub project showcase' },
        ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
        sameAs: [project.liveUrl, project.githubUrl, project.secondaryLiveUrl?.url, project.secondaryGithubUrl?.url].filter(Boolean),
      },
    ],
  };
};

const CONTACT: RouteSeo = {
  title: 'Contact PPH Corporation (PropushHub) — Contact Form',
  description:
    'Contact form for PPH Corporation (PropushHub): tell us about your website, app or software project and get a written quote. Or reach us on WhatsApp or email.',
  path: '/contact',
  canonical: absolute('/contact'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact PPH Corporation (PropushHub)',
      description: 'Contact form, WhatsApp and email for PPH Corporation (PropushHub).',
      url: absolute('/contact'),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
    },
  ],
};

const NOT_FOUND: RouteSeo = {
  title: 'Page not found | PropushHub',
  description: 'The page you are looking for could not be found.',
  path: '/404',
  canonical: absolute('/'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  noindex: true,
  jsonLd: [],
};

export const getRouteSeo = (pathname: string, showcase?: ShowcaseProject[] | null): RouteSeo => {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return HOME;
  if (path === '/services') return SERVICES_INDEX;
  if (path.startsWith('/services/')) return serviceSeo(path.slice('/services/'.length)) ?? NOT_FOUND;
  if (path === '/showcase') return showcaseSeo(showcase ?? []);
  if (path.startsWith('/showcase/')) return projectSeo(path.slice('/showcase/'.length), showcase ?? []) ?? NOT_FOUND;
  if (path === '/contact') return CONTACT;
  return NOT_FOUND;
};

export const getAllIndexablePaths = (showcase: ShowcaseProject[] = []): string[] => [
  '/',
  '/services',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  '/showcase',
  ...showcase.map((p) => `/showcase/${p.slug}`),
  '/contact',
];

export const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const ROBOTS_NOINDEX = 'noindex, nofollow';

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Builds the <head> SEO tags as an HTML string (used at build time). */
export const renderHeadTags = (seo: RouteSeo): string => {
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    ...seo.jsonLd.map(
      (ld) => `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`
    ),
  ];
  return tags.join('\n    ');
};

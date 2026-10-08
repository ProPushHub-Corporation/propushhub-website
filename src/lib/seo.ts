import { SERVICES, getServiceBySlug } from '../data/services';
import type { Service, ServiceFaq } from '../data/services';
import { COMPANY_INFO, HOME_FAQS } from '../data/site';

/** Canonical origin. Change this when a custom domain is connected. */
export const SITE_URL = 'https://pphcorporation.vercel.app';
export const SITE_NAME = 'PropushHub';
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
  title: 'PropushHub — Web, Mobile & Custom Software Development',
  description:
    'PropushHub builds websites, CMS, e-commerce, mobile apps, desktop software and custom ERP. One team from design to launch and support. Get a free quote.',
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

const CONTACT: RouteSeo = {
  title: 'Contact PropushHub — Get a Free Project Quote',
  description:
    'Tell PropushHub about your website, app or software project and get a clear scope and written quote. Reach us by form, WhatsApp or email.',
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
      name: 'Contact PropushHub',
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

export const getRouteSeo = (pathname: string): RouteSeo => {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return HOME;
  if (path === '/services') return SERVICES_INDEX;
  if (path.startsWith('/services/')) return serviceSeo(path.slice('/services/'.length)) ?? NOT_FOUND;
  if (path === '/contact') return CONTACT;
  return NOT_FOUND;
};

export const getAllIndexablePaths = (): string[] => [
  '/',
  '/services',
  ...SERVICES.map((s) => `/services/${s.slug}`),
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

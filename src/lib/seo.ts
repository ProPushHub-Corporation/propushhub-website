import { COMPANY_INFO, PROJECTS, getProjectBySlug } from '../data/projects';

/** Canonical origin. Change this when a custom domain is connected. */
export const SITE_URL = 'https://pphcorporation.vercel.app';
export const SITE_NAME = 'PropushHub';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface RouteSeo {
  title: string;
  description: string;
  path: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
  /** Crawlable fallback content injected into #root at build time. */
  heading: string;
  summary: string;
}

const trim = (text: string, max = 158): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const absolute = (path: string) => `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_OG_IMAGE,
  email: COMPANY_INFO.email,
  telephone: '+923190586822',
  sameAs: [COMPANY_INFO.githubProfile, COMPANY_INFO.linkedinUrl],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: COMPANY_INFO.email,
    telephone: '+923190586822',
    availableLanguage: ['English', 'Urdu'],
  },
};

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
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

const HOME: RouteSeo = {
  title: 'PropushHub — Custom ERP, Web & Mobile App Development Company',
  description:
    'PropushHub builds custom ERP systems, inventory & warehouse platforms, web and React Native mobile apps, and AI-integrated business software. See real, production-deployed projects.',
  path: '/',
  canonical: absolute('/'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  heading: 'We don’t just build landing pages. We build complete digital products.',
  summary:
    'PropushHub designs, engineers, and deploys custom ERP platforms, multi-site warehouse systems, synchronized web and React Native mobile applications, and AI-powered business software.',
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
      description:
        'Custom software development: ERP systems, inventory and warehouse platforms, web applications, React Native mobile apps and AI-integrated workflows.',
      email: COMPANY_INFO.email,
      telephone: '+923190586822',
      priceRange: '$$',
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software development services',
        itemListElement: [
          'Custom ERP & Business Software',
          'Inventory & Warehouse Systems',
          'Web Application Development',
          'Mobile App Development (React Native)',
          'AI-Integrated Applications',
          'Website Development',
        ].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
  ],
};

const WORK: RouteSeo = {
  title: 'Our Work — ERP, Web, Mobile & AI Projects | PropushHub',
  description: trim(
    `Browse ${PROJECTS.length} real software projects by PropushHub: ERP and inventory systems, web and mobile apps, SaaS dashboards and AI tools, each with a detailed case study.`
  ),
  path: '/work',
  canonical: absolute('/work'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  heading: 'Our Work — Projects Built by PropushHub',
  summary:
    'Case studies of production software: ERP, inventory, web, mobile, SaaS and AI-integrated platforms.',
  jsonLd: [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Our Work', path: '/work' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropushHub Projects',
      url: absolute('/work'),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absolute(`/work/${p.slug}`),
          name: p.title,
        })),
      },
    },
  ],
};

const projectSeo = (slug: string): RouteSeo | null => {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const path = `/work/${project.slug}`;
  const description = trim(project.shortDescription);
  return {
    title: `${project.title} — ${project.category} Case Study | PropushHub`,
    description,
    path,
    canonical: absolute(path),
    image: DEFAULT_OG_IMAGE,
    type: 'article',
    heading: `${project.title} — Case Study`,
    summary: project.longDescription || project.description,
    jsonLd: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Our Work', path: '/work' },
        { name: project.title, path },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: `${project.title} — ${project.category}`,
        description,
        url: absolute(path),
        about: project.category,
        keywords: project.allTechnologies.join(', '),
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
      },
    ],
  };
};

const NOT_FOUND: RouteSeo = {
  title: 'Page not found | PropushHub',
  description: 'The page you are looking for could not be found.',
  path: '/404',
  canonical: absolute('/'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  noindex: true,
  heading: 'Page not found',
  summary: 'The page you are looking for could not be found.',
  jsonLd: [],
};

export const getRouteSeo = (pathname: string): RouteSeo => {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return HOME;
  if (path === '/work') return WORK;
  if (path.startsWith('/work/')) return projectSeo(path.slice('/work/'.length)) ?? NOT_FOUND;
  return NOT_FOUND;
};

export const getAllIndexablePaths = (): string[] => [
  '/',
  '/work',
  ...PROJECTS.map((p) => `/work/${p.slug}`),
];

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Builds the <head> SEO tags as an HTML string (used at build time). */
export const renderHeadTags = (seo: RouteSeo): string => {
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
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
    `<meta property="og:image:alt" content="${SITE_NAME} — custom ERP, web, mobile and AI software" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    ...seo.jsonLd.map(
      (ld) => `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`
    ),
  ];
  return tags.join('\n    ');
};

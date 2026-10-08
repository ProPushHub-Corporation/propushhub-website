import { SERVICES, getServiceBySlug } from '../data/services';
import type { Service, ServiceFaq } from '../data/services';
import type { ShowcaseProject } from '../data/showcaseTypes';
import type { TeamMember } from '../data/teamTypes';
import { ALL_HELP_FAQS, COMPANY_LINKS } from '../data/company';
import type { Job } from '../data/jobTypes';
import type { Partner } from '../data/partnerTypes';
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

/* ----------------------------------------------------------- company pages */

export interface SeoData {
  showcase?: ShowcaseProject[] | null;
  team?: TeamMember[] | null;
  partners?: Partner[] | null;
  jobs?: Job[] | null;
}

const pageLd = (type: string, name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url: absolute(path),
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': ORG_ID },
});

const crumbs = (name: string, path: string) =>
  breadcrumb([
    { name: 'Home', path: '/' },
    { name, path },
  ]);

const ABOUT_DESC =
  'Learn about PPH Corporation (PropushHub): a software development company building websites, apps and ERP, with one team from first call to launch and support.';
const ABOUT: RouteSeo = {
  title: 'About PPH Corporation (PropushHub) | Software Company',
  description: ABOUT_DESC,
  path: '/about',
  canonical: absolute('/about'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [crumbs('About us', '/about'), pageLd('AboutPage', 'About PPH Corporation (PropushHub)', ABOUT_DESC, '/about')],
};

const TEAM_DESC =
  'Meet the founders and team behind PropushHub (PPH Corporation): the engineers and designers who build and support your software.';
const teamSeo = (members: TeamMember[] = []): RouteSeo => ({
  title: 'Our Team and Founders | PropushHub (PPH Corporation)',
  description: TEAM_DESC,
  path: '/team',
  canonical: absolute('/team'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    crumbs('Our team', '/team'),
    {
      ...pageLd('CollectionPage', 'PropushHub founders and team', TEAM_DESC, '/team'),
      ...(members.length
        ? {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: members.map((m, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Person',
                  name: m.name,
                  jobTitle: m.role,
                  worksFor: { '@id': ORG_ID },
                  ...(m.bio ? { description: m.bio } : {}),
                  ...(m.photo?.url ? { image: m.photo.url } : {}),
                  ...(m.links?.length ? { sameAs: m.links.map((l) => l.url) } : {}),
                },
              })),
            },
          }
        : {}),
    },
  ],
});

const EMPLOYMENT: Record<Job['type'], string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Internship: 'INTERN',
};

const jobPosting = (job: Job) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: [job.summary, ...job.responsibilities, ...job.requirements].join('\n'),
  datePosted: job.postedAt,
  ...(job.validThrough ? { validThrough: job.validThrough } : {}),
  employmentType: EMPLOYMENT[job.type],
  hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: `${SITE_URL}/` },
  directApply: false,
  url: `${absolute('/jobs')}#${job.slug}`,
  ...(job.remote
    ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: job.location } }
    : {
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: job.location },
        },
      }),
});

const JOBS_DESC =
  'Jobs and careers at PropushHub (PPH Corporation). See open positions or send us your CV and a link to your work.';
const jobsSeo = (jobs: Job[] = []): RouteSeo => ({
  title: 'Jobs & Careers at PropushHub (PPH Corporation)',
  description: JOBS_DESC,
  path: '/jobs',
  canonical: absolute('/jobs'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [crumbs('Jobs', '/jobs'), pageLd('WebPage', 'Jobs at PropushHub', JOBS_DESC, '/jobs'), ...jobs.map(jobPosting)],
});

const COLLAB_DESC =
  'Partner with PropushHub (PPH Corporation): white-label development for agencies, technology and integration partners, referrals and specialists.';
const collabSeo = (partners: Partner[] = []): RouteSeo => ({
  title: 'Collaborate With PropushHub | Agency & Tech Partners',
  description: COLLAB_DESC,
  path: '/collaboration',
  canonical: absolute('/collaboration'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [
    crumbs('Collaboration', '/collaboration'),
    {
      ...pageLd('WebPage', 'Collaborate with PropushHub', COLLAB_DESC, '/collaboration'),
      ...(partners.length
        ? {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: partners.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Organization',
                  name: p.name,
                  ...(p.url ? { url: p.url } : {}),
                  ...(p.description ? { description: p.description } : {}),
                  ...(p.logo?.url ? { logo: p.logo.url } : {}),
                },
              })),
            },
          }
        : {}),
    },
  ],
});

const HELP_DESC =
  'Help center for PropushHub (PPH Corporation): how to start a project, pricing and timelines, working together and support after launch.';
const HELP: RouteSeo = {
  title: 'Help Center — FAQ & Support | PropushHub',
  description: HELP_DESC,
  path: '/help',
  canonical: absolute('/help'),
  image: DEFAULT_OG_IMAGE,
  type: 'website',
  jsonLd: [crumbs('Help', '/help'), pageLd('WebPage', 'PropushHub help center', HELP_DESC, '/help'), faqPage(ALL_HELP_FAQS)],
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

export const getRouteSeo = (pathname: string, data: SeoData = {}): RouteSeo => {
  const path = pathname.replace(/\/+$/, '') || '/';
  const showcase = data.showcase;
  if (path === '/') return HOME;
  if (path === '/services') return SERVICES_INDEX;
  if (path.startsWith('/services/')) return serviceSeo(path.slice('/services/'.length)) ?? NOT_FOUND;
  if (path === '/showcase') return showcaseSeo(showcase ?? []);
  if (path.startsWith('/showcase/')) return projectSeo(path.slice('/showcase/'.length), showcase ?? []) ?? NOT_FOUND;
  if (path === '/about') return ABOUT;
  if (path === '/team') return teamSeo(data.team ?? []);
  if (path === '/jobs') return jobsSeo(data.jobs ?? []);
  if (path === '/collaboration') return collabSeo(data.partners ?? []);
  if (path === '/help') return HELP;
  if (path === '/contact') return CONTACT;
  return NOT_FOUND;
};

export const getAllIndexablePaths = (showcase: ShowcaseProject[] = []): string[] => [
  '/',
  '/services',
  ...SERVICES.map((s) => `/services/${s.slug}`),
  '/showcase',
  ...showcase.map((p) => `/showcase/${p.slug}`),
  ...COMPANY_LINKS.map((link) => link.to),
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

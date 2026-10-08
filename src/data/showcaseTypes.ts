/**
 * Types for the Firestore `projects` collection that powers the /showcase page.
 * The source of truth for these definitions is DATA_TYPES.md in the repo root:
 * change both together.
 */

export type ShowcaseFilter =
  | 'ERP & Business'
  | 'Web Applications'
  | 'Mobile Apps'
  | 'AI & SaaS'
  | 'Management Systems';

export const SHOWCASE_FILTERS: ShowcaseFilter[] = [
  'ERP & Business',
  'Web Applications',
  'Mobile Apps',
  'AI & SaaS',
  'Management Systems',
];

export interface ShowcaseImage {
  /** Stable key within the project, e.g. "dashboard". */
  id: string;
  /** Short label, e.g. "Admin dashboard". */
  label: string;
  /** Accessible description of the image. */
  alt: string;
  caption?: string;
  /** Cloudinary delivery URL. Omit until the image is uploaded: a placeholder is shown. */
  url?: string;
}

export interface ShowcaseLink {
  label: string;
  url: string;
}

export interface ShowcaseCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: { title: string; detail: string }[];
  architectureSummary: string;
  workflowSteps: { step: string; title: string; description: string }[];
  techStackByLayer: { layer: string; items: string[] }[];
  challenges: { challenge: string; resolution: string }[];
  /** Shown prominently when set, e.g. "Hackathon project". */
  disclaimer?: string;
}

export interface ShowcaseProject {
  /** Same as the Firestore document id. */
  slug: string;
  title: string;
  category: string;
  /** One or two sentences for cards and meta descriptions. */
  shortDescription: string;
  longDescription: string;
  type: string;
  status: string;
  /** 4 to 7 headline technologies shown on cards. */
  technologies: string[];
  allTechnologies: string[];
  features: string[];
  filterCategories: ShowcaseFilter[];
  /** First image is the card image. */
  images: ShowcaseImage[];
  liveUrl?: string;
  secondaryLiveUrl?: ShowcaseLink;
  githubUrl?: string;
  secondaryGithubUrl?: ShowcaseLink;
  featured: boolean;
  /** Only documents with `published: true` are readable by the website. */
  published: boolean;
  /** Ascending sort order on the page. */
  order: number;
  caseStudy?: ShowcaseCaseStudy;
  /** ISO 8601 timestamp, e.g. 2026-10-08T12:00:00.000Z. */
  updatedAt?: string;
}

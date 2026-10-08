# Data types

Data contracts for the website. Today there is one Firestore collection, `projects`, which feeds the
`/showcase` page. The TypeScript mirror of everything below lives in
[`src/data/showcaseTypes.ts`](src/data/showcaseTypes.ts). **Change both together.**

- Firebase project: `propushhub` (config in [`src/lib/firebase.ts`](src/lib/firebase.ts))
- Database: Cloud Firestore, collection `projects`, one document per project, **document id = `slug`**
- Images: hosted on Cloudinary. Documents store the delivery URL only; no image bytes live in Firebase

## Pages generated from this data

| URL | Content |
| --- | --- |
| `/showcase` | Card grid of every published project, with category filters |
| `/showcase/<slug>` | One page per project: overview, problem, solution, features, workflow, technology, challenges, gallery, related services |

Each project page gets its own `<title>` (`<title> — Case Study | PropushHub`), meta description (from `shortDescription`),
canonical URL, Open Graph image (first Cloudinary image, cropped to 1200 x 630), `CreativeWork` + breadcrumb JSON-LD and a
`sitemap.xml` entry, so a search for the project name can land on its page. Related services are the services in
[`src/data/services.ts`](src/data/services.ts) whose `relatedProjects` list contains the project's slug.

## How the data flows

1. `npm run build` reads `projects` from Firestore ([`scripts/prerender.ts`](scripts/prerender.ts)) and writes the
   showcase page as static HTML with the data embedded, so crawlers and no-JS visitors see every project.
   If Firestore can't be reached, the build falls back to the bundled seed data in
   [`src/data/projects.ts`](src/data/projects.ts) and prints a warning.
2. In the browser, the page renders that embedded data immediately, then re-reads Firestore and updates itself.
   Editing a document in Firebase therefore shows up for visitors without a redeploy; a redeploy is only needed
   to refresh the prerendered HTML that search engines see.
3. A **new** document gets its static, indexable `/showcase/<slug>` page on the next build. Until then the URL still works
   for visitors: the generic 404 page is re-rendered in the browser, which loads that one document from Firestore. To
   rebuild automatically, create a Vercel Deploy Hook and call it when a project is added or changed (for example from a
   Cloud Function or a Zapier/Make step).

## `projects/{slug}`

```ts
type ShowcaseFilter =
  | 'ERP & Business'
  | 'Web Applications'
  | 'Mobile Apps'
  | 'AI & SaaS'
  | 'Management Systems';

interface ShowcaseImage {
  id: string;        // stable key within the project, e.g. "dashboard"
  label: string;     // short label, e.g. "Admin dashboard"
  alt: string;       // accessible description
  caption?: string;
  url?: string;      // Cloudinary delivery URL; omit until uploaded (a placeholder is shown)
}

interface ShowcaseLink {
  label: string;
  url: string;       // absolute https URL
}

interface ShowcaseCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: { title: string; detail: string }[];
  architectureSummary: string;
  workflowSteps: { step: string; title: string; description: string }[];
  techStackByLayer: { layer: string; items: string[] }[];
  challenges: { challenge: string; resolution: string }[];
  disclaimer?: string;
}

interface ShowcaseProject {
  slug: string;                 // = document id
  title: string;
  category: string;             // e.g. "ERP / Business Management / SaaS"
  shortDescription: string;     // 1-2 sentences, used on cards and in meta tags
  longDescription: string;
  type: string;                 // e.g. "Full-Stack Enterprise ERP Application"
  status: string;               // e.g. "Live Production Deployment"
  technologies: string[];       // 4-7 headline technologies shown on cards
  allTechnologies: string[];
  features: string[];
  filterCategories: ShowcaseFilter[];
  images: ShowcaseImage[];      // first image is the card image
  liveUrl?: string;
  secondaryLiveUrl?: ShowcaseLink;
  githubUrl?: string;
  secondaryGithubUrl?: ShowcaseLink;
  featured: boolean;
  published: boolean;           // only `true` documents are readable by the website
  order: number;                // ascending sort order on the page
  caseStudy?: ShowcaseCaseStudy;
  updatedAt?: string;           // ISO 8601, e.g. "2026-10-08T12:00:00.000Z"
}
```

### Field reference

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `slug` | string | yes | Lowercase, hyphenated; must equal the document id |
| `title` | string | yes | |
| `category` | string | yes | Free text label shown above the title |
| `shortDescription` | string | yes | Keep under about 160 characters |
| `longDescription` | string | yes | |
| `type` | string | yes | |
| `status` | string | yes | |
| `technologies` | string[] | yes | 4-7 items |
| `allTechnologies` | string[] | yes | Superset of `technologies` |
| `features` | string[] | yes | |
| `filterCategories` | ShowcaseFilter[] | yes | Drives the filter chips; at least one |
| `images` | ShowcaseImage[] | yes | May be empty; the card then shows a placeholder |
| `liveUrl` | string | no | |
| `secondaryLiveUrl` | ShowcaseLink | no | E.g. the admin app next to a user app |
| `githubUrl` | string | no | |
| `secondaryGithubUrl` | ShowcaseLink | no | |
| `featured` | boolean | yes | |
| `published` | boolean | yes | Set `false` to hide a project |
| `order` | number | yes | Lower numbers come first |
| `caseStudy` | ShowcaseCaseStudy | no | Powers the "Project details" panel |
| `updatedAt` | string | no | |

## Cloudinary image URLs

Store the plain delivery URL of the uploaded image:

```
https://res.cloudinary.com/<cloud_name>/image/upload/<optional version>/<public_id>.<ext>
```

- Use `image/upload` delivery URLs. The site inserts its own transformations after `/upload/`
  (`f_auto,q_auto,c_fill,g_north,ar_16:10,w_<width>`) to serve right-sized WebP/AVIF, so do not bake a crop into the stored URL.
- Upload screenshots at **1600 x 1000 px (16:10)** or larger. That is the size of the placeholder the page shows until an image exists.
- Any non-Cloudinary `https` URL also works; it is used as-is without transformations.
- Always fill in `alt`. It is used for the `<img alt>` and by screen readers.

## Example document (`projects/barakah-erp`)

```json
{
  "slug": "barakah-erp",
  "title": "Barakah ERP",
  "category": "ERP / Business Management / SaaS",
  "shortDescription": "A complete business management and ERP platform for inventory, sales, purchases, reporting and role-based workflows.",
  "longDescription": "Barakah ERP unifies core commercial operations into a single production-oriented web application...",
  "type": "Full-Stack Enterprise ERP Application",
  "status": "Live Production Deployment",
  "technologies": ["Next.js", "React", "Node.js", "MongoDB / PostgreSQL", "Tailwind CSS", "Redux Toolkit"],
  "allTechnologies": ["Next.js", "React", "TypeScript", "Node.js", "MongoDB / PostgreSQL", "Tailwind CSS", "Redux Toolkit"],
  "features": ["Inventory management with bulk bill OCR", "Sales management and PDF invoice export"],
  "filterCategories": ["ERP & Business", "Web Applications"],
  "images": [
    {
      "id": "dashboard",
      "label": "ERP operations dashboard",
      "alt": "Barakah ERP dashboard showing inventory, sales and reports",
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1730000000/propushhub/barakah-erp/dashboard.png"
    }
  ],
  "liveUrl": "https://barakah-erp.vercel.app/",
  "githubUrl": "https://github.com/syedmuhammadali-dev/Barakah-ERP-Frontend",
  "featured": true,
  "published": true,
  "order": 1
}
```

## Firestore security rules

The website only ever **reads** published projects with the public web SDK. Writes happen from the seed script
(Admin SDK, bypasses rules) or the Firebase console. Recommended rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Rules are not filters: the site queries `where('published', '==', true)`, which these rules allow. A query without that
filter would be rejected.

## Loading the initial data

[`scripts/seed-showcase.ts`](scripts/seed-showcase.ts) converts the existing projects in `src/data/projects.ts` into
`ShowcaseProject` documents and writes them to Firestore. It needs a Firebase service-account key, which is a secret:
keep it out of the repo.

```bash
npm run seed:showcase -- --dry-run     # print what would be written, touches nothing
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json npm run seed:showcase
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json npm run seed:showcase -- --force   # overwrite existing docs
```

Existing documents are skipped unless `--force` is passed, so Cloudinary URLs you added by hand are not overwritten.
Seeded documents have no image `url` yet: upload screenshots to Cloudinary, then paste each delivery URL into the
matching `images[].url` field in the Firebase console.

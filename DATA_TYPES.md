# Data types

Data contracts for the website. These Firestore collections feed pages:

| Collection | Feeds | TypeScript mirror |
| --- | --- | --- |
| [`projects`](#projectsslug) | `/showcase` and `/showcase/<slug>` | [`src/data/showcaseTypes.ts`](src/data/showcaseTypes.ts) |
| [`team`](#teamslug) | `/team` (Founders and Our team sections) | [`src/data/teamTypes.ts`](src/data/teamTypes.ts) |
| [`partners`](#partnersslug) | `/collaboration` (partnerships, ownership, sponsors) | [`src/data/partnerTypes.ts`](src/data/partnerTypes.ts) |
| [`jobs`](#jobsslug) | `/jobs` (open roles + `JobPosting` structured data) | [`src/data/jobTypes.ts`](src/data/jobTypes.ts) |
| [`roles`](#roleshome_collaboration_partner) + [`home_collaboration_partner`](#home_collaboration_partnerslug) | The logo ribbon above the home page footer | [`src/data/homePartnerTypes.ts`](src/data/homePartnerTypes.ts) |

**Change the Markdown and the TypeScript mirror together.** All four work the same way: one document per item,
**document id = `slug`**, readable by the website only while `published` is `true`, sorted by `order`.

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

1. `npm run build` reads `projects`, `team`, `partners`, `jobs` and the home ribbon (`roles` switch + logos) from Firestore ([`scripts/prerender.ts`](scripts/prerender.ts)) and writes the
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

## `team/{slug}`

One document per person, **document id = `slug`**. The `/team` page shows `group: "founders"` people in the Founders
section and `group: "team"` people in the Our team section, each sorted by `order`. Photos are Cloudinary URLs.

```ts
type TeamGroup = 'founders' | 'team';

interface TeamPhoto {
  url?: string;            // Cloudinary delivery URL (portrait, 4:5); omit until uploaded (a placeholder is shown)
  alt?: string;            // accessible description; defaults to "<name>, <role>"
}

interface TeamLink {
  label: string;           // e.g. "LinkedIn"
  url: string;             // absolute https URL
}

interface TeamMember {
  slug: string;            // = document id
  name: string;
  role: string;            // e.g. "Co-founder & CEO"
  group: TeamGroup;
  bio?: string;
  photo?: TeamPhoto;
  links?: TeamLink[];
  order: number;           // ascending, within the group
  published: boolean;      // only `true` documents are readable by the website
  updatedAt?: string;      // ISO 8601
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `slug` | string | yes | Lowercase, hyphenated; must equal the document id |
| `name` | string | yes | |
| `role` | string | yes | |
| `group` | `"founders"` or `"team"` | yes | Decides the section |
| `bio` | string | no | One or two sentences |
| `photo.url` | string | no | Cloudinary URL. Upload at **600 x 750 px** (4:5) or larger; the site crops to 4:5 around the face |
| `photo.alt` | string | when `photo.url` is set | |
| `links` | TeamLink[] | no | |
| `order` | number | yes | Lower numbers come first |
| `published` | boolean | yes | Set `false` to hide a person |
| `updatedAt` | string | no | |

Example (`team/jane-doe`):

```json
{
  "slug": "jane-doe",
  "name": "Jane Doe",
  "role": "Co-founder & CEO",
  "group": "founders",
  "bio": "Leads strategy and client relationships.",
  "photo": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1730000000/propushhub/team/jane-doe.jpg",
    "alt": "Jane Doe, Co-founder and CEO of PropushHub"
  },
  "links": [{ "label": "LinkedIn", "url": "https://www.linkedin.com/in/jane-doe/" }],
  "order": 1,
  "published": true
}
```

The `/team` page is prerendered at build time from this collection (people appear in the static HTML and in
`Person` structured data), then refreshed in the browser. If the collection is empty or unreadable, each section shows a
"profiles will appear here soon" message. Add people with the Firebase console, or in bulk with
`npm run seed:data -- team people.json` or the sample data with `npm run seed` (see [Loading the initial data](#loading-the-initial-data)).

## `partners/{slug}`

Companies on the `/collaboration` page, grouped by `kind`. A group only appears once it has at least one published
document. Logos are Cloudinary URLs.

```ts
type PartnerKind = 'partner' | 'owner' | 'sponsor';

interface PartnerLogo {
  url?: string;            // Cloudinary delivery URL (2:1); omit until uploaded (a 320 x 160 placeholder is shown)
  alt?: string;
}

interface Partner {
  slug: string;            // = document id
  name: string;            // company name
  kind: PartnerKind;       // which section it appears in
  description?: string;    // one or two sentences about the relationship
  url?: string;            // company website, absolute https URL
  logo?: PartnerLogo;
  order: number;           // ascending, within the group
  published: boolean;
  updatedAt?: string;      // ISO 8601
}
```

| `kind` | Section on the page | Use it for |
| --- | --- | --- |
| `partner` | Our partners | Partnerships and collaborations |
| `owner` | Ownership | Parent companies and owners |
| `sponsor` | Sponsors | Organisations that support us |

To add a new kind (for example `investor`), add it to `PartnerKind` and `PARTNER_GROUPS` in
[`src/data/partnerTypes.ts`](src/data/partnerTypes.ts) and to this table; the page picks it up automatically.

Logos: upload at **320 x 160 px** or larger (2:1). They are shown uncropped on a white tile, so transparent or white
backgrounds work best. `logo.alt` is required when `logo.url` is set.

Example (`partners/acme-labs`):

```json
{
  "slug": "acme-labs",
  "name": "Acme Labs",
  "kind": "partner",
  "description": "Technology partner for cloud infrastructure.",
  "url": "https://acme.example",
  "logo": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1730000000/propushhub/partners/acme-labs.png",
    "alt": "Acme Labs logo"
  },
  "order": 1,
  "published": true
}
```

## `jobs/{slug}`

Open roles on `/jobs`. Each published document appears in the list and in `JobPosting` structured data, so roles can
show up in job search. The slug is also the role's `#anchor` on the page.

```ts
type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

interface Job {
  slug: string;              // = document id
  title: string;
  department: string;
  location: string;          // city and country; for remote roles, the country candidates may work from
  type: JobType;
  remote: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;          // ISO date, e.g. "2026-10-08" (JobPosting.datePosted)
  validThrough?: string;     // ISO date (JobPosting.validThrough)
  applyUrl?: string;         // defaults to an email to the company address
  order: number;             // ascending
  published: boolean;        // set false to take a role down
  updatedAt?: string;        // ISO 8601
}
```

Example (`jobs/senior-react-developer`):

```json
{
  "slug": "senior-react-developer",
  "title": "Senior React Developer",
  "department": "Engineering",
  "location": "Pakistan",
  "type": "Full-time",
  "remote": true,
  "summary": "Build web applications for our clients, from first prototype to production.",
  "responsibilities": ["Build and review features", "Estimate and plan work with the team"],
  "requirements": ["Strong React and TypeScript", "Clear written communication"],
  "postedAt": "2026-10-08",
  "order": 1,
  "published": true
}
```

When no job is published, the page shows "No open positions right now" with a way to send a CV.

## `roles/home_collaboration_partner`

A switch that decides whether the home page logo ribbon may appear. The ribbon is shown only when this document
exists **and** `enabled` is exactly `true` **and** the logo collection below has at least one published logo.

```ts
interface RoleFlag {
  enabled: boolean;        // true = the section may appear; false, missing or unreadable = hidden
  updatedAt?: string;      // ISO 8601
}
```

```json
{ "enabled": true }
```

Flip `enabled` in the Firebase console to hide or show the section. The change reaches visitors on their next page
view (the site re-reads the switch in the browser), and the prerendered HTML follows on the next build. Other
sections can get their own switch the same way: a document in `roles` with the section's id.

## `home_collaboration_partner/{slug}`

The company logos that slide across the ribbon, from right to left, in an endless loop. Only published documents with a
logo are used, in `order` (left to right in the first loop). Logos are Cloudinary URLs.

```ts
interface HomePartnerLogo {
  url: string;             // Cloudinary delivery URL; shown uncropped in a 120 x 120 px box; required
  alt: string;             // required
}

interface HomePartner {
  slug: string;            // = document id
  name: string;            // company name
  url?: string;            // company website; the logo links to it when set
  logo: HomePartnerLogo;
  order: number;           // ascending
  published: boolean;
  updatedAt?: string;      // ISO 8601
}
```

Each logo is shown in a **120 x 120 px** box, centred and never cropped, so any shape works. Upload at **240 x 240 px** or
larger so it stays sharp on high-density screens. Logos are grey and turn to colour on hover; the ribbon pauses while the
pointer is over it. A short list is repeated so the ribbon always fills the screen. If a logo URL cannot be loaded (for
example a site that blocks other websites from displaying its images), the company name is shown instead; hosting the
logo on Cloudinary avoids that.

Example (`home_collaboration_partner/acme-labs`):

```json
{
  "slug": "acme-labs",
  "name": "Acme Labs",
  "url": "https://acme.example",
  "logo": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1730000000/propushhub/ribbon/acme-labs.png",
    "alt": "Acme Labs logo"
  },
  "order": 1,
  "published": true
}
```

This collection is separate from [`partners`](#partnersslug), which feeds the `/collaboration` page: a company can be in
both, or only in one.

## Firestore security rules

The website only ever **reads** published documents with the public web SDK. Writes happen from the seed script
(Admin SDK, bypasses rules) or the Firebase console. Recommended rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /team/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /partners/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /jobs/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /home_collaboration_partner/{slug} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    // Section switches. They hold only { enabled: boolean }, so they can be public.
    match /roles/{id} {
      allow read: if true;
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

Prerequisites (once): create the Firestore database in the Firebase console, paste the security rules above, and create
a service-account key (Project settings > Service accounts > Generate new private key). The key is a secret: keep it
outside the repo and point `GOOGLE_APPLICATION_CREDENTIALS` at it.

### One command, everything: [`seed.ts`](seed.ts)

For testing. It fills all four collections in one go:

| Collection | What is written |
| --- | --- |
| `projects` | Your real portfolio from `src/data/projects.ts` (9 projects, no images yet) |
| `team` | **Sample** people: 2 founders and 6 team members (two with Cloudinary demo photos, the rest show the placeholder) |
| `partners` | **Sample** companies: 3 partners, 1 owner, 1 sponsor (some with Cloudinary demo logos) |
| `jobs` | **Sample** roles (remote, on-site, internship) that expire after 14 days |
| `home_collaboration_partner` + `roles` | **Sample** logos for the home page ribbon (6 Cloudinary demo images) and the switch `roles/home_collaboration_partner = { enabled: true }` |

```bash
npm run seed -- --dry-run          # validate and list everything; writes nothing, needs no credentials
npm run seed                       # write everything (Windows PowerShell: $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\keys\propushhub.json")
npm run seed -- --only=team,jobs   # only some collections
npm run seed -- --force            # overwrite documents that already exist (default: skip them)
npm run seed -- --hidden           # write samples with published: false, so they are not shown on the site
npm run seed -- --clear-samples    # delete every "sample-*" document again (and switch the home ribbon off)
```

Then run `npm run build` (or open the site in development) to see the pages filled in.

**Sample data is public once written.** Every sample document has a slug starting with `sample-` and "Sample" in its
name, and `--clear-samples` removes exactly those (real documents and projects are never touched). Run it before launch:
sample jobs would otherwise be sent to search engines as real job postings.

### Your own content: [`scripts/seed-data.ts`](scripts/seed-data.ts)

Put your real documents in a JSON file (an array of objects as in the examples above) and run
`npm run seed:data -- team people.json --dry-run` (or `partners` / `jobs` / `projects`). It validates every document and
prints what it would write; run it again with `GOOGLE_APPLICATION_CREDENTIALS` set and without `--dry-run` to write them.
Adding documents by hand in the Firebase console works just as well.

Existing documents are skipped unless `--force` is passed, so Cloudinary URLs you added by hand are not overwritten.
Seeded projects have no image `url` yet: upload screenshots to Cloudinary, then paste each delivery URL into the
matching `images[].url` field in the Firebase console.

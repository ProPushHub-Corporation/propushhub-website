/**
 * One-command seed for testing the Firestore-driven pages.
 *
 *   npm run seed -- --dry-run              validate and list everything, write nothing (no credentials needed)
 *   npm run seed                           fill Firestore: projects, team, partners and jobs
 *   npm run seed -- --only=team,jobs       fill only some collections (projects, team, partners, jobs)
 *   npm run seed -- --force                overwrite documents that already exist (default: skip them)
 *   npm run seed -- --hidden               write the sample documents with published: false (not shown on the site)
 *   npm run seed -- --clear-samples        delete every "sample-*" document again
 *
 * Writing needs a service-account key, which is a secret (keep it outside the repo):
 *   Windows (PowerShell)   $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\keys\propushhub.json"; npm run seed
 *   macOS / Linux          GOOGLE_APPLICATION_CREDENTIALS=~/keys/propushhub.json npm run seed
 *
 * What it writes
 *   projects   your real portfolio (src/data/projects.ts), 9 projects, no images yet
 *   team       SAMPLE people (2 founders, 6 team) - 2 with Cloudinary demo photos, the rest show the placeholder
 *   partners   SAMPLE companies (partner, owner, sponsor) - some with Cloudinary demo logos
 *   jobs       SAMPLE roles that expire after 14 days
 *   home_collaboration_partner   SAMPLE logos for the home page ribbon, plus the switch
 *              roles/home_collaboration_partner = { enabled: true } that allows the ribbon to appear
 * Every sample document has a slug starting with "sample-" and "Sample" in its name.
 *
 * IMPORTANT: documents are public as soon as they are written. They appear on the live site on its next
 * build or page refresh, and sample jobs would be sent to search engines as job postings. Run
 * `npm run seed -- --clear-samples` once you have finished testing, before launch.
 */
import { HOME_PARTNERS_ROLE } from './src/data/homePartnerTypes';
import { seedShowcaseProjects } from './src/data/showcaseSeed';
import {
  COLLECTIONS,
  SAMPLE_PREFIX,
  connect,
  deleteSamples,
  labelOf,
  roleExists,
  setRole,
  validate,
  writeDocs,
} from './scripts/seed-core';
import type { CollectionName, Doc } from './scripts/seed-core';

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length).split(',').map((s) => s.trim());
const dryRun = flag('dry-run');
const force = flag('force');
const hidden = flag('hidden');
const clear = flag('clear-samples');

if (only) {
  const unknown = only.filter((name) => !COLLECTIONS.includes(name as CollectionName));
  if (unknown.length) {
    console.error(`Unknown collection(s): ${unknown.join(', ')}. Choose from: ${COLLECTIONS.join(', ')}`);
    process.exit(1);
  }
}
const selected = COLLECTIONS.filter((name) => !only || only.includes(name));

/* ------------------------------------------------------------ sample data */

const day = 24 * 60 * 60 * 1000;
const isoDate = (offsetDays = 0) => new Date(Date.now() + offsetDays * day).toISOString().slice(0, 10);
const now = new Date().toISOString();
const published = !hidden;

/** Cloudinary's public demo account: lets you test the image pipeline without uploading anything. */
const DEMO = 'https://res.cloudinary.com/demo/image/upload';

const team: Doc[] = [
  {
    slug: `${SAMPLE_PREFIX}founder-1`,
    name: 'Sample Founder One',
    role: 'Co-founder & CEO',
    group: 'founders',
    bio: 'Sample profile for testing the Founders section, with a Cloudinary photo.',
    photo: { url: `${DEMO}/docs/models.jpg`, alt: 'Sample portrait photo' },
    links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/' }],
    order: 1,
  },
  {
    slug: `${SAMPLE_PREFIX}founder-2`,
    name: 'Sample Founder Two',
    role: 'Co-founder & CTO',
    group: 'founders',
    bio: 'Sample profile without a photo, so the 600 x 750 placeholder is shown.',
    order: 2,
  },
  {
    slug: `${SAMPLE_PREFIX}team-1`,
    name: 'Sample Engineer',
    role: 'Senior Full-stack Engineer',
    group: 'team',
    photo: { url: `${DEMO}/docs/models.jpg`, alt: 'Sample portrait photo' },
    order: 1,
  },
  { slug: `${SAMPLE_PREFIX}team-2`, name: 'Sample Mobile Developer', role: 'Mobile Engineer', group: 'team', order: 2 },
  { slug: `${SAMPLE_PREFIX}team-3`, name: 'Sample Designer', role: 'UI/UX Designer', group: 'team', order: 3 },
  { slug: `${SAMPLE_PREFIX}team-4`, name: 'Sample Tester', role: 'QA Engineer', group: 'team', order: 4 },
  { slug: `${SAMPLE_PREFIX}team-5`, name: 'Sample DevOps Engineer', role: 'DevOps Engineer', group: 'team', order: 5 },
  { slug: `${SAMPLE_PREFIX}team-6`, name: 'Sample Project Manager', role: 'Project Manager', group: 'team', order: 6 },
];

const partners: Doc[] = [
  {
    slug: `${SAMPLE_PREFIX}partner-cloud`,
    name: 'Sample Cloud Co',
    kind: 'partner',
    description: 'Sample technology partner, shown with a Cloudinary logo.',
    url: 'https://example.com',
    logo: { url: `${DEMO}/cld-sample-2.jpg`, alt: 'Sample Cloud Co logo' },
    order: 1,
  },
  {
    slug: `${SAMPLE_PREFIX}partner-design`,
    name: 'Sample Design Studio',
    kind: 'partner',
    description: 'Sample partner without a logo, so the 320 x 160 placeholder is shown.',
    order: 2,
  },
  {
    slug: `${SAMPLE_PREFIX}partner-integrations`,
    name: 'Sample Integrations Ltd',
    kind: 'partner',
    description: 'Sample integration partner.',
    url: 'https://example.com',
    logo: { url: `${DEMO}/cld-sample-3.jpg`, alt: 'Sample Integrations Ltd logo' },
    order: 3,
  },
  {
    slug: `${SAMPLE_PREFIX}owner-holdings`,
    name: 'Sample Holdings Group',
    kind: 'owner',
    description: 'Sample entry for the Ownership section.',
    order: 1,
  },
  {
    slug: `${SAMPLE_PREFIX}sponsor-1`,
    name: 'Sample Sponsor Inc',
    kind: 'sponsor',
    description: 'Sample entry for the Sponsors section.',
    url: 'https://example.com',
    logo: { url: `${DEMO}/cld-sample.jpg`, alt: 'Sample Sponsor Inc logo' },
    order: 1,
  },
];

const jobs: Doc[] = [
  {
    slug: `${SAMPLE_PREFIX}senior-react-developer`,
    title: 'Senior React Developer (sample)',
    department: 'Engineering',
    location: 'Pakistan',
    type: 'Full-time',
    remote: true,
    summary: 'Sample remote role for testing the Jobs page and its JobPosting structured data.',
    responsibilities: ['Build and review features for client projects', 'Plan and estimate work with the team'],
    requirements: ['Strong React and TypeScript', 'Clear written communication'],
    postedAt: isoDate(0),
    validThrough: isoDate(14),
    order: 1,
  },
  {
    slug: `${SAMPLE_PREFIX}ui-ux-designer`,
    title: 'UI/UX Designer (sample)',
    department: 'Design',
    location: 'Lahore, Pakistan',
    type: 'Contract',
    remote: false,
    summary: 'Sample on-site contract role.',
    responsibilities: ['Design flows and screens in Figma', 'Hand designs over to developers'],
    requirements: ['Portfolio of product design work', 'Experience with design systems'],
    postedAt: isoDate(0),
    validThrough: isoDate(14),
    order: 2,
  },
  {
    slug: `${SAMPLE_PREFIX}qa-intern`,
    title: 'QA Intern (sample)',
    department: 'Quality',
    location: 'Pakistan',
    type: 'Internship',
    remote: true,
    summary: 'Sample internship.',
    responsibilities: ['Test new releases', 'Write clear bug reports'],
    requirements: ['Attention to detail', 'Interest in software quality'],
    postedAt: isoDate(0),
    validThrough: isoDate(14),
    order: 3,
  },
];

const homePartners: Doc[] = [
  ['cloud', 'Sample Cloud Co', 'cld-sample-2.jpg'],
  ['design', 'Sample Design Studio', 'cld-sample-3.jpg'],
  ['integrations', 'Sample Integrations Ltd', 'cld-sample.jpg'],
  ['labs', 'Sample Labs', 'sample.jpg'],
  ['studio', 'Sample Studio', 'kitten.jpg'],
  ['agency', 'Sample Agency', 'docs/models.jpg'],
].map(([id, name, file], i) => ({
  slug: `${SAMPLE_PREFIX}ribbon-${id}`,
  name,
  url: 'https://example.com',
  logo: { url: `${DEMO}/${file}`, alt: `${name} logo` },
  order: i + 1,
}));

const stamp = (docs: Doc[]): Doc[] => docs.map((d) => ({ ...d, published, updatedAt: now }));

const data: Record<CollectionName, Doc[]> = {
  projects: seedShowcaseProjects().map((p) => ({ ...p, updatedAt: now })) as unknown as Doc[],
  team: stamp(team),
  partners: stamp(partners),
  jobs: stamp(jobs),
  home_collaboration_partner: stamp(homePartners),
};

/* ------------------------------------------------------------------- run */

if (clear) {
  const db = await connect();
  let total = 0;
  for (const name of selected) {
    if (name === 'projects') continue; // real portfolio data: never deleted by this script
    total += await deleteSamples(db, name);
  }
  // The ribbon has no logos left to show, so switch it off until real ones are added.
  if (selected.includes('home_collaboration_partner')) await setRole(db, HOME_PARTNERS_ROLE, false);
  console.log(`\nRemoved ${total} sample documents.`);
  process.exit(0);
}

const problems = selected.flatMap((name) => validate(name, data[name]));
if (problems.length) {
  console.error('Validation failed:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}

for (const name of selected) {
  console.log(`\n${name} (${data[name].length})`);
  for (const d of data[name]) console.log(`  ${String(d.order).padStart(2)}  ${String(d.slug).padEnd(34)} ${labelOf(d)}`);
}

if (dryRun) {
  console.log('\nDry run: everything is valid and nothing was written.');
  process.exit(0);
}

const db = await connect();
let written = 0;
let skipped = 0;
console.log('');
for (const name of selected) {
  const result = await writeDocs(db, name, data[name], force);
  written += result.written;
  skipped += result.skipped;
}
// The switch that lets the home page ribbon appear (kept if it already exists, unless --force).
if (selected.includes('home_collaboration_partner') && (force || !(await roleExists(db, HOME_PARTNERS_ROLE)))) {
  await setRole(db, HOME_PARTNERS_ROLE, published);
}

console.log(`\nDone: ${written} written, ${skipped} skipped.`);
if (!hidden && selected.some((name) => name !== 'projects')) {
  console.log('Sample data is now public. Run `npm run seed -- --clear-samples` when you have finished testing.');
}
process.exit(0);

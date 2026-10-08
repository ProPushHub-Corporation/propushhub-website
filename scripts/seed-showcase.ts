/**
 * Loads the bundled portfolio (src/data/projects.ts) into Firestore as `projects/{slug}` documents,
 * in the shape described by DATA_TYPES.md.
 *
 *   npm run seed:showcase -- --dry-run     validate and print what would be written (no network)
 *   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json npm run seed:showcase
 *   ... npm run seed:showcase -- --force   also overwrite documents that already exist
 *
 * Existing documents are skipped by default so Cloudinary image URLs added by hand are never lost.
 * The service-account key is a secret: keep it outside the repo.
 */
import { seedShowcaseProjects } from '../src/data/showcaseSeed';
import { SHOWCASE_FILTERS } from '../src/data/showcaseTypes';
import type { ShowcaseProject } from '../src/data/showcaseTypes';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const force = args.has('--force');

const updatedAt = new Date().toISOString();
const projects: ShowcaseProject[] = seedShowcaseProjects().map((p) => ({ ...p, updatedAt }));

// Basic validation against DATA_TYPES.md before anything is written.
const problems: string[] = [];
const seen = new Set<string>();
for (const p of projects) {
  if (seen.has(p.slug)) problems.push(`${p.slug}: duplicate slug`);
  seen.add(p.slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) problems.push(`${p.slug}: slug must be lowercase and hyphenated`);
  if (p.technologies.length < 1) problems.push(`${p.slug}: technologies is empty`);
  if (p.filterCategories.length < 1) problems.push(`${p.slug}: needs at least one filter category`);
  for (const f of p.filterCategories) if (!SHOWCASE_FILTERS.includes(f)) problems.push(`${p.slug}: unknown filter "${f}"`);
  for (const image of p.images) if (!image.alt) problems.push(`${p.slug}/${image.id}: missing alt text`);
}
if (problems.length) {
  console.error('Validation failed:\n' + problems.map((x) => `  - ${x}`).join('\n'));
  process.exit(1);
}

console.log(`${projects.length} projects ready:\n`);
for (const p of projects) {
  const withUrl = p.images.filter((i) => i.url).length;
  console.log(`  ${String(p.order).padStart(2)}  ${p.slug.padEnd(24)} images with Cloudinary URL: ${withUrl}/${p.images.length}`);
}

if (dryRun) {
  console.log('\nDry run: nothing was written.');
  process.exit(0);
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('\nSet GOOGLE_APPLICATION_CREDENTIALS to the path of a Firebase service-account JSON key.');
  process.exit(1);
}

const { initializeApp, applicationDefault } = await import('firebase-admin/app');
const { getFirestore } = await import('firebase-admin/firestore');

initializeApp({ credential: applicationDefault(), projectId: 'propushhub' });
const db = getFirestore();

let written = 0;
let skipped = 0;
for (const p of projects) {
  const ref = db.collection('projects').doc(p.slug);
  if (!force && (await ref.get()).exists) {
    skipped++;
    console.log(`  skip   ${p.slug} (already exists, use --force to overwrite)`);
    continue;
  }
  await ref.set(p);
  written++;
  console.log(`  wrote  ${p.slug}`);
}
console.log(`\nDone: ${written} written, ${skipped} skipped.`);
process.exit(0);

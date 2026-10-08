/**
 * Loads your own documents from a JSON file into Firestore, in the shape described by DATA_TYPES.md.
 * Use this for real content; use `npm run seed` (root seed.ts) for ready-made sample data.
 *
 *   npm run seed:data -- team people.json --dry-run        validate and list (no network, no credentials)
 *   npm run seed:data -- partners partners.json
 *   npm run seed:data -- jobs jobs.json --force            also overwrite documents that already exist
 *
 * The file is an array of documents; `slug` becomes the document id. Writing needs a service-account key
 * (GOOGLE_APPLICATION_CREDENTIALS), which is a secret: keep it outside the repo. You can also add documents
 * by hand in the Firebase console.
 */
import { readFileSync } from 'node:fs';
import { COLLECTIONS, connect, labelOf, validate, writeDocs } from './seed-core';
import type { CollectionName, Doc } from './seed-core';

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith('--'));
const [collection, file] = positional as [CollectionName | undefined, string | undefined];
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');

if (!collection || !COLLECTIONS.includes(collection) || !file) {
  console.error(`Usage: npm run seed:data -- <${COLLECTIONS.join('|')}> <file.json> [--dry-run] [--force]`);
  process.exit(1);
}

const input: unknown = JSON.parse(readFileSync(file, 'utf-8'));
if (!Array.isArray(input)) {
  console.error('The JSON file must contain an array of documents.');
  process.exit(1);
}

const updatedAt = new Date().toISOString();
const docs = (input as Doc[]).map((d) => ({ published: true, ...d, updatedAt })) as Doc[];

const problems = validate(collection, docs);
if (problems.length) {
  console.error('Validation failed:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}

console.log(`${docs.length} ${collection} documents ready:\n`);
for (const d of docs) console.log(`  ${String(d.order).padStart(3)}  ${String(d.slug).padEnd(28)} ${labelOf(d)}`);

if (dryRun) {
  console.log('\nDry run: nothing was written.');
  process.exit(0);
}

const db = await connect();
const { written, skipped } = await writeDocs(db, collection, docs, force);
console.log(`\nDone: ${written} written, ${skipped} skipped.`);
process.exit(0);

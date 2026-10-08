/**
 * Shared by `seed.ts` (one-command sample data) and `scripts/seed-data.ts` (load your own JSON):
 * validation against DATA_TYPES.md and the Firestore (Admin SDK) read/write helpers.
 */
import type { Firestore } from 'firebase-admin/firestore';
import { JOB_TYPES } from '../src/data/jobTypes';
import { PARTNER_GROUPS } from '../src/data/partnerTypes';
import { SHOWCASE_FILTERS } from '../src/data/showcaseTypes';
import { TEAM_GROUPS } from '../src/data/teamTypes';

export const COLLECTIONS = ['projects', 'team', 'partners', 'jobs'] as const;
export type CollectionName = (typeof COLLECTIONS)[number];
export type Doc = Record<string, unknown> & { slug?: string };

/** Slug prefix that marks test data, so `--clear-samples` can remove exactly that and nothing else. */
export const SAMPLE_PREFIX = 'sample-';

const isString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.length > 0 && v.every(isString);
const isIsoDate = (v: unknown): boolean => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v) && !Number.isNaN(Date.parse(v));

export const labelOf = (d: Doc): string => String(d.title ?? d.name ?? d.slug);

/** Returns a list of human-readable problems; empty means the documents are valid. */
export const validate = (collection: CollectionName, docs: Doc[]): string[] => {
  const problems: string[] = [];
  const seen = new Set<string>();

  docs.forEach((d, i) => {
    const label = isString(d.slug) ? d.slug : `#${i + 1}`;
    const bad = (message: string) => problems.push(`${collection}/${label}: ${message}`);

    if (!isString(d.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug)) bad('slug must be lowercase and hyphenated');
    else if (seen.has(d.slug)) bad('duplicate slug');
    else seen.add(d.slug);
    if (typeof d.order !== 'number') bad('order must be a number');

    if (collection === 'projects') {
      for (const key of ['title', 'category', 'shortDescription', 'longDescription', 'type', 'status'] as const) {
        if (!isString(d[key])) bad(`${key} is required`);
      }
      if (!Array.isArray(d.technologies) || d.technologies.length < 1) bad('technologies must not be empty');
      const filters = d.filterCategories;
      if (!Array.isArray(filters) || filters.length < 1) bad('needs at least one filter category');
      else for (const f of filters) if (!SHOWCASE_FILTERS.includes(f as never)) bad(`unknown filter "${String(f)}"`);
      for (const image of (d.images as { id?: string; alt?: string }[] | undefined) ?? []) {
        if (!isString(image.alt)) bad(`image ${image.id ?? ''} needs alt text`);
      }
    }

    if (collection === 'team') {
      if (!isString(d.name)) bad('name is required');
      if (!isString(d.role)) bad('role is required');
      if (!TEAM_GROUPS.some((g) => g.id === d.group)) bad('group must be "founders" or "team"');
      const photo = d.photo as { url?: string; alt?: string } | undefined;
      if (photo?.url && !photo.alt) bad('photo.alt is required when photo.url is set');
    }

    if (collection === 'partners') {
      if (!isString(d.name)) bad('name is required');
      if (!PARTNER_GROUPS.some((g) => g.kind === d.kind)) bad(`kind must be one of: ${PARTNER_GROUPS.map((g) => g.kind).join(', ')}`);
      const logo = d.logo as { url?: string; alt?: string } | undefined;
      if (logo?.url && !logo.alt) bad('logo.alt is required when logo.url is set');
    }

    if (collection === 'jobs') {
      for (const key of ['title', 'department', 'location', 'summary'] as const) if (!isString(d[key])) bad(`${key} is required`);
      if (!JOB_TYPES.includes(d.type as never)) bad(`type must be one of: ${JOB_TYPES.join(', ')}`);
      if (typeof d.remote !== 'boolean') bad('remote must be true or false');
      if (!isStringArray(d.responsibilities)) bad('responsibilities must be a non-empty list of text');
      if (!isStringArray(d.requirements)) bad('requirements must be a non-empty list of text');
      if (!isIsoDate(d.postedAt)) bad('postedAt must be an ISO date like 2026-10-08');
      if (d.validThrough !== undefined && !isIsoDate(d.validThrough)) bad('validThrough must be an ISO date');
    }
  });

  return problems;
};

/** Connects with the Admin SDK. Needs a service-account key (a secret: keep it outside the repo). */
export const connect = async (): Promise<Firestore> => {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('\nSet GOOGLE_APPLICATION_CREDENTIALS to the path of a Firebase service-account JSON key.');
    console.error('Firebase console > Project settings > Service accounts > Generate new private key.');
    process.exit(1);
  }
  const { initializeApp, applicationDefault } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  initializeApp({ credential: applicationDefault(), projectId: 'propushhub' });
  return getFirestore();
};

export const writeDocs = async (db: Firestore, collection: CollectionName, docs: Doc[], force: boolean) => {
  let written = 0;
  let skipped = 0;
  for (const d of docs) {
    const ref = db.collection(collection).doc(d.slug as string);
    if (!force && (await ref.get()).exists) {
      skipped++;
      console.log(`  skip   ${collection}/${d.slug} (already exists, use --force to overwrite)`);
      continue;
    }
    // Firestore rejects `undefined`; a JSON round trip drops it.
    await ref.set(JSON.parse(JSON.stringify(d)));
    written++;
    console.log(`  wrote  ${collection}/${d.slug}`);
  }
  return { written, skipped };
};

/** Deletes only documents whose id starts with SAMPLE_PREFIX. Real documents are never touched. */
export const deleteSamples = async (db: Firestore, collection: CollectionName): Promise<number> => {
  const snapshot = await db.collection(collection).get();
  let removed = 0;
  for (const doc of snapshot.docs) {
    if (!doc.id.startsWith(SAMPLE_PREFIX)) continue;
    await doc.ref.delete();
    removed++;
    console.log(`  deleted ${collection}/${doc.id}`);
  }
  return removed;
};

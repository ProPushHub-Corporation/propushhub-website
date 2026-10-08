/**
 * Types for the Firestore `jobs` collection that powers the /jobs page.
 * The source of truth for these definitions is DATA_TYPES.md in the repo root:
 * change both together.
 */

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export const JOB_TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export interface Job {
  /** Same as the Firestore document id; also the #anchor of the role on /jobs. */
  slug: string;
  title: string;
  department: string;
  /** City and country, or for remote roles the country candidates may work from. */
  location: string;
  type: JobType;
  remote: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** ISO date, e.g. 2026-10-08. Used for the JobPosting structured data. */
  postedAt: string;
  /** ISO date after which the role is closed. Set `published: false` to take a role down. */
  validThrough?: string;
  /** Where to apply. Defaults to an email to the company address. */
  applyUrl?: string;
  /** Ascending sort order. */
  order: number;
  /** Only documents with `published: true` are readable by the website. */
  published: boolean;
  /** ISO 8601 timestamp. */
  updatedAt?: string;
}

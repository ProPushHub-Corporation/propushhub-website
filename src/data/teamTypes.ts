/**
 * Types for the Firestore `team` collection that powers the /team page.
 * The source of truth for these definitions is DATA_TYPES.md in the repo root:
 * change both together.
 */

export type TeamGroup = 'founders' | 'team';

export const TEAM_GROUPS: { id: TeamGroup; title: string; eyebrow: string }[] = [
  { id: 'founders', title: 'Founders', eyebrow: 'Leadership' },
  { id: 'team', title: 'Our team', eyebrow: 'The people' },
];

export interface TeamPhoto {
  /** Cloudinary delivery URL (portrait, 4:5). Omit until uploaded: a placeholder is shown. */
  url?: string;
  alt?: string;
}

export interface TeamLink {
  /** e.g. "LinkedIn" or "GitHub". */
  label: string;
  url: string;
}

export interface TeamMember {
  /** Same as the Firestore document id. */
  slug: string;
  name: string;
  /** Job title, e.g. "Co-founder & CEO". */
  role: string;
  /** `founders` appear in the Founders section, `team` in Our team. */
  group: TeamGroup;
  bio?: string;
  photo?: TeamPhoto;
  links?: TeamLink[];
  /** Ascending sort order within the group. */
  order: number;
  /** Only documents with `published: true` are readable by the website. */
  published: boolean;
  /** ISO 8601 timestamp. */
  updatedAt?: string;
}

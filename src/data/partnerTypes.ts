/**
 * Types for the Firestore `partners` collection that powers the /collaboration page.
 * The source of truth for these definitions is DATA_TYPES.md in the repo root:
 * change both together.
 */

/**
 * What kind of relationship a company has with PropushHub. To add a new kind (for example "investor"),
 * add it here and to PARTNER_GROUPS; the page picks it up automatically.
 */
export type PartnerKind = 'partner' | 'owner' | 'sponsor';

export const PARTNER_GROUPS: { kind: PartnerKind; eyebrow: string; title: string; intro: string }[] = [
  { kind: 'partner', eyebrow: 'Partnerships', title: 'Our partners', intro: 'Companies we build and grow with.' },
  { kind: 'owner', eyebrow: 'Ownership', title: 'Ownership', intro: 'The companies and people behind PropushHub.' },
  { kind: 'sponsor', eyebrow: 'Sponsors', title: 'Sponsors', intro: 'Organisations that support our work.' },
];

export interface PartnerLogo {
  /** Cloudinary delivery URL (320 x 160 or larger, 2:1, transparent or white background works best). */
  url?: string;
  alt?: string;
}

export interface Partner {
  /** Same as the Firestore document id. */
  slug: string;
  /** Company name. */
  name: string;
  kind: PartnerKind;
  /** One or two sentences about the relationship. */
  description?: string;
  /** Company website, absolute https URL. */
  url?: string;
  logo?: PartnerLogo;
  /** Ascending sort order within the group. */
  order: number;
  /** Only documents with `published: true` are readable by the website. */
  published: boolean;
  /** ISO 8601 timestamp. */
  updatedAt?: string;
}

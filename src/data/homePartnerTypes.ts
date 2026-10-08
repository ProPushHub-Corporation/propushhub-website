/**
 * Types for the home page "partners and collaborations" logo ribbon.
 * The source of truth for these definitions is DATA_TYPES.md in the repo root:
 * change both together.
 *
 * Two Firestore pieces work together:
 *  - `roles/home_collaboration_partner`      a switch ({ enabled: true }) that allows the ribbon to appear
 *  - `home_collaboration_partner/{slug}`     the company logos shown in it
 */

/** Document id in the `roles` collection that switches the ribbon on or off. */
export const HOME_PARTNERS_ROLE = 'home_collaboration_partner';

/** Firestore collection that holds the logos. */
export const HOME_PARTNERS_COLLECTION = 'home_collaboration_partner';

export interface RoleFlag {
  /** `true` lets the section appear. Anything else (or a missing document) keeps it hidden. */
  enabled: boolean;
  /** ISO 8601 timestamp. */
  updatedAt?: string;
}

export interface HomePartnerLogo {
  /** Cloudinary delivery URL. Shown uncropped, centred in a 60 x 60 px box: upload at 120 x 120 px or larger. */
  url: string;
  alt: string;
}

export interface HomePartner {
  /** Same as the Firestore document id. */
  slug: string;
  /** Company name. */
  name: string;
  /** Company website, absolute https URL. The logo links to it when set. */
  url?: string;
  logo: HomePartnerLogo;
  /** Ascending sort order (left to right). */
  order: number;
  /** Only documents with `published: true` are readable by the website. */
  published: boolean;
  /** ISO 8601 timestamp. */
  updatedAt?: string;
}

/** What the home page works with: the switch and the logos (empty unless the switch is on). */
export interface HomePartnersData {
  enabled: boolean;
  items: HomePartner[];
}

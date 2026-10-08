/**
 * Image slots. Every image the site needs is declared here with its exact size.
 * Until a real file exists, the UI renders a "W × H" placeholder of the same size.
 *
 * To swap in a real image: save the file at `path` (inside /public) and set `src`
 * to the public URL (e.g. '/images/home-hero.webp'). Nothing else needs to change.
 */
export interface ImageSlot {
  width: number;
  height: number;
  alt: string;
  /** Public URL of the real image. Leave undefined to show the size placeholder. */
  src?: string;
  /** Where the real file should be saved in the repo. */
  path: string;
}

export const HERO_SIZE = { width: 1600, height: 900 };
export const SERVICE_SIZE = { width: 1600, height: 800 };
export const PROJECT_SIZE = { width: 1600, height: 1000 };
export const OG_SIZE = { width: 1200, height: 630 };
/** Team portraits (4:5). */
export const MEMBER_SIZE = { width: 600, height: 750 };

export const HOME_HERO_IMAGE: ImageSlot = {
  ...HERO_SIZE,
  alt: 'PropushHub team building websites, mobile apps and custom software',
  path: 'public/images/home-hero.webp',
};

export const serviceImage = (slug: string, name: string): ImageSlot => ({
  ...SERVICE_SIZE,
  alt: `${name} by PropushHub`,
  path: `public/images/services/${slug}.webp`,
});

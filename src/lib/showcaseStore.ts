import type { ShowcaseProject } from '../data/showcaseTypes';

/**
 * In-memory snapshot of the showcase projects, shared between the prerender step (which fills it
 * before rendering), the hydration entry point (which reads the data embedded in the HTML) and the
 * page itself. Keeps the first client render identical to the prerendered HTML.
 */
let snapshot: ShowcaseProject[] | null = null;

export const SHOWCASE_DATA_ELEMENT_ID = 'showcase-data';

export const getShowcaseSnapshot = (): ShowcaseProject[] | null => snapshot;

export const setShowcaseSnapshot = (projects: ShowcaseProject[] | null) => {
  snapshot = projects;
};

/** Reads the JSON the prerender step embedded in the page, if any. Browser only. */
export const readEmbeddedShowcase = (): ShowcaseProject[] | null => {
  try {
    const raw = document.getElementById(SHOWCASE_DATA_ELEMENT_ID)?.textContent;
    return raw ? (JSON.parse(raw) as ShowcaseProject[]) : null;
  } catch {
    return null;
  }
};

export const sortProjects = (projects: ShowcaseProject[]): ShowcaseProject[] =>
  [...projects].filter((p) => p.published !== false).sort((a, b) => a.order - b.order);

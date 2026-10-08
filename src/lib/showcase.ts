import type { ShowcaseProject } from '../data/showcaseTypes';
import { sortProjects } from './showcaseStore';

/**
 * Reads the published projects from Firestore (collection `projects`, see DATA_TYPES.md).
 * Firebase is imported on demand so it only downloads when the showcase page needs it,
 * and the same function runs in the browser and in the Node prerender step.
 */
export const fetchShowcaseProjects = async (): Promise<ShowcaseProject[]> => {
  const [{ db }, { collection, getDocs, query, where }] = await Promise.all([
    import('./firebase'),
    import('firebase/firestore/lite'),
  ]);
  // The `published == true` filter is required by the security rules (rules are not filters).
  const snapshot = await getDocs(query(collection(db, 'projects'), where('published', '==', true)));
  return sortProjects(
    snapshot.docs.map((doc) => ({ ...(doc.data() as Omit<ShowcaseProject, 'slug'>), slug: doc.id }))
  );
};

/**
 * Reads one published project by slug. Used for projects added to Firestore after the last build, which
 * have no prerendered page yet. Resolves to `null` when it doesn't exist or isn't published.
 */
export const fetchShowcaseProject = async (slug: string): Promise<ShowcaseProject | null> => {
  const [{ db }, { doc, getDoc }] = await Promise.all([import('./firebase'), import('firebase/firestore/lite')]);
  try {
    const snapshot = await getDoc(doc(db, 'projects', slug));
    if (!snapshot.exists()) return null;
    const project = { ...(snapshot.data() as Omit<ShowcaseProject, 'slug'>), slug: snapshot.id };
    return project.published === false ? null : project;
  } catch {
    // Unpublished documents are rejected by the security rules; treat that the same as "not found".
    return null;
  }
};

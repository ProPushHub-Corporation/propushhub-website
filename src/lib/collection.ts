/**
 * A Firestore collection that feeds a page (team, partners, jobs). One definition covers all of them:
 *
 *  - `fetch()` reads the published documents (Firebase is imported on demand, and the same code runs in the
 *    browser and in the Node prerender step),
 *  - a shared in-memory snapshot lets the prerender step, the hydration entry point and the page agree on
 *    the data, so the first client render matches the prerendered HTML,
 *  - `readEmbedded()` reads the JSON the prerender step embedded in the page (`<script id=elementId>`).
 *
 * See DATA_TYPES.md for each collection's fields.
 */
export interface RemoteDoc {
  slug: string;
  order: number;
  published: boolean;
}

export interface RemoteCollection<T extends RemoteDoc> {
  /** Firestore collection name. */
  name: string;
  /** id of the embedded <script type="application/json"> element. */
  elementId: string;
  fetch: () => Promise<T[]>;
  getSnapshot: () => T[] | null;
  setSnapshot: (items: T[] | null) => void;
  readEmbedded: () => T[] | null;
}

export const createCollection = <T extends RemoteDoc>(name: string, elementId: string): RemoteCollection<T> => {
  let snapshot: T[] | null = null;

  const publishedInOrder = (items: T[]): T[] =>
    [...items].filter((item) => item.published !== false).sort((a, b) => a.order - b.order);

  return {
    name,
    elementId,
    getSnapshot: () => snapshot,
    setSnapshot: (items) => {
      snapshot = items;
    },
    readEmbedded: () => {
      try {
        const raw = document.getElementById(elementId)?.textContent;
        return raw ? (JSON.parse(raw) as T[]) : null;
      } catch {
        return null;
      }
    },
    fetch: async () => {
      const [{ db }, { collection, getDocs, query, where }] = await Promise.all([
        import('./firebase'),
        import('firebase/firestore/lite'),
      ]);
      // The `published == true` filter is required by the security rules (rules are not filters).
      const result = await getDocs(query(collection(db, name), where('published', '==', true)));
      return publishedInOrder(
        result.docs.map((doc) => ({ ...(doc.data() as Omit<T, 'slug'>), slug: doc.id }) as T)
      );
    },
  };
};

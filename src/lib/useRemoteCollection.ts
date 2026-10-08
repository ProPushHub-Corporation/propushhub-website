import { useEffect, useState } from 'react';
import type { RemoteCollection, RemoteDoc } from './collection';
import { whenIdle } from './motion';

/**
 * Items of a Firestore collection for a page. Starts from the prerendered/embedded snapshot so the first
 * render matches the HTML, then refreshes from Firestore once the visitor interacts or the page has settled
 * (immediately when there is no snapshot at all, e.g. in `vite dev`).
 */
export const useRemoteCollection = <T extends RemoteDoc>(source: RemoteCollection<T>) => {
  const [items, setItems] = useState<T[]>(() => source.getSnapshot() ?? []);
  const [loading, setLoading] = useState(() => source.getSnapshot() === null);

  useEffect(() => {
    let cancelled = false;
    // A snapshot (even an empty one) means the page was prerendered with the current data, so the refresh can wait.
    (!loading ? whenIdle() : Promise.resolve())
      .then(() => (cancelled ? null : source.fetch()))
      .then((fresh) => {
        if (cancelled || !fresh) return;
        source.setSnapshot(fresh);
        setItems(fresh);
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.warn(`[${source.name}] could not read Firestore:`, error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
};

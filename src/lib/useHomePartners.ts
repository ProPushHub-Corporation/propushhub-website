import { useEffect, useState } from 'react';
import type { HomePartnersData } from '../data/homePartnerTypes';
import { fetchHomePartners, getHomePartnersSnapshot, setHomePartnersSnapshot } from './homePartners';
import { whenIdle } from './motion';

const NONE: HomePartnersData = { enabled: false, items: [] };

/**
 * Whether the home page ribbon is allowed and which logos it shows. Starts from the prerendered snapshot, then
 * re-reads Firestore once the visitor interacts or the page has settled, so switching the role on or off in
 * Firebase takes effect without a redeploy.
 */
export const useHomePartners = (): HomePartnersData => {
  const [data, setData] = useState<HomePartnersData>(() => getHomePartnersSnapshot() ?? NONE);

  useEffect(() => {
    let cancelled = false;
    (getHomePartnersSnapshot() !== null ? whenIdle() : Promise.resolve())
      .then(() => (cancelled ? null : fetchHomePartners()))
      .then((fresh) => {
        if (cancelled || !fresh) return;
        setHomePartnersSnapshot(fresh);
        setData(fresh);
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.warn('[home partners] could not read Firestore:', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
};

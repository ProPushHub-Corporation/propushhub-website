import {
  HOME_PARTNERS_COLLECTION,
  HOME_PARTNERS_ROLE,
} from '../data/homePartnerTypes';
import type { HomePartner, HomePartnersData } from '../data/homePartnerTypes';
import { createCollection } from './collection';

export const HOME_PARTNERS_ELEMENT_ID = 'home-partners-data';

/** The logos collection (published documents, in order). */
export const homePartnerLogos = createCollection<HomePartner>(HOME_PARTNERS_COLLECTION, HOME_PARTNERS_ELEMENT_ID);

/**
 * Reads the ribbon's data: first the `roles/home_collaboration_partner` switch, and only when it is on the
 * logos. Anything unreadable or switched off means "do not show the section".
 */
export const fetchHomePartners = async (): Promise<HomePartnersData> => {
  const [{ db }, { doc, getDoc }] = await Promise.all([import('./firebase'), import('firebase/firestore/lite')]);
  const role = await getDoc(doc(db, 'roles', HOME_PARTNERS_ROLE));
  if (!role.exists() || role.data().enabled !== true) return { enabled: false, items: [] };
  const items = (await homePartnerLogos.fetch()).filter((p) => Boolean(p.logo?.url));
  return { enabled: items.length > 0, items };
};

/* Shared snapshot, same idea as the other data-driven pages: the prerender step fills it, the browser reads the
 * JSON embedded in the page, and the component starts from it so the first render matches the HTML. */
let snapshot: HomePartnersData | null = null;

export const getHomePartnersSnapshot = (): HomePartnersData | null => snapshot;
export const setHomePartnersSnapshot = (data: HomePartnersData | null) => {
  snapshot = data;
};

export const readEmbeddedHomePartners = (): HomePartnersData | null => {
  try {
    const raw = document.getElementById(HOME_PARTNERS_ELEMENT_ID)?.textContent;
    return raw ? (JSON.parse(raw) as HomePartnersData) : null;
  } catch {
    return null;
  }
};

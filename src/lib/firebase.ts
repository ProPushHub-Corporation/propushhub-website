import { getApp, getApps, initializeApp, setLogLevel } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Firebase web config. These values identify the project and are safe to ship in client code;
// access is controlled by the Firestore security rules (see DATA_TYPES.md), not by hiding this.
export const firebaseConfig = {
  apiKey: 'AIzaSyDt1OcMKWwBjFDsZPGNgJZ7wRqfgKB8eAw',
  authDomain: 'propushhub.firebaseapp.com',
  projectId: 'propushhub',
  storageBucket: 'propushhub.firebasestorage.app',
  messagingSenderId: '98927886620',
  appId: '1:98927886620:web:d3b0fe7f14e4a54d55fad9',
  measurementId: 'G-1CPQEJZCHP',
};

// Failed reads are handled by the callers (the page keeps its data, the build falls back to seed data),
// so keep the SDK's own verbose error logging out of the console.
setLogLevel('silent');

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/** Firestore "lite" build: no realtime listeners, a fraction of the full SDK's size. Works in the browser and in Node. */
export const db = getFirestore(app);

/**
 * Firebase Analytics. Browser only and loaded on demand so it never blocks rendering or the
 * server-side prerender. It is not called anywhere yet; call it once consent handling is decided.
 */
export const initAnalytics = async () => {
  if (typeof window === 'undefined') return null;
  const { getAnalytics, isSupported } = await import('firebase/analytics');
  return (await isSupported()) ? getAnalytics(app) : null;
};

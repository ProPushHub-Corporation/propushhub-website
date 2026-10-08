import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { readEmbeddedShowcase, setShowcaseSnapshot } from './lib/showcaseStore';
import { remoteCollections } from './lib/remote';

const root = document.getElementById('root')!;

// The showcase page is prerendered with its Firestore data embedded; use it so hydration matches the HTML.
setShowcaseSnapshot(readEmbeddedShowcase());
// Same for the data-driven company pages.
for (const source of remoteCollections) source.setSnapshot(source.readEmbedded());

// Production HTML is prerendered (see scripts/prerender.ts), so hydrate it. Render from scratch when the root
// is empty (`vite dev`) or holds the generic 404.html: that file is served for any URL without a prerendered
// page, including projects added to Firestore after the last build, so the client decides what to show.
if (root.firstElementChild && !root.querySelector('[data-not-found]')) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

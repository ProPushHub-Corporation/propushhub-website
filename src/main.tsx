import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;

// Production HTML is prerendered (see scripts/prerender.ts), so hydrate it.
// In `vite dev` the root is empty, so render from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// index.html ships the phone layout prerendered. Phones hydrate it;
// wider screens drop it and render their own layout.
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.hasAttribute('data-ssr') && document.documentElement.clientWidth < 768) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
root.removeAttribute('data-ssr');

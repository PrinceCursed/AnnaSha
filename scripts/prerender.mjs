// Post-build: puts the prerendered phone layout into dist/index.html,
// inlines the stylesheet and preloads the fonts used above the fold.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = 'dist';
const ssrDir = 'dist-ssr';
const { render } = await import(pathToFileURL(path.resolve(ssrDir, 'entry-server.js')).href);

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

html = html.replace('<div id="root"></div>', `<div id="root" data-ssr>${render()}</div>`);

// Inline CSS (small, saves a render-blocking request).
html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/, (_, href) => {
  const file = path.join(dist, href.replace(/^\/AnnaSha\//, ''));
  const css = fs.readFileSync(file, 'utf8');
  return `<style>${css}</style>`;
});

// Preload the cyrillic faces of the hero: Oswald 700, Manrope 500/600.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const preload = ['oswald-cyrillic-700', 'manrope-cyrillic-500', 'manrope-cyrillic-600']
  .map(k => assets.find(f => f.startsWith(k) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map(f => `<link rel="preload" href="/AnnaSha/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ');
html = html.replace('</title>', `</title>\n    ${preload}`);

// Wide screens render their own layout; don't flash the phone one.
html = html.replace('</head>', '  <style>@media (min-width: 768px) { #root[data-ssr] { visibility: hidden } }</style>\n  </head>');

fs.writeFileSync(path.join(dist, 'index.html'), html);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('prerendered dist/index.html', (html.length / 1024).toFixed(0) + ' KB');

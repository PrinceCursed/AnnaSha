// Renders public/og.jpg (1200×630) from the live hero. Needs `npm run preview` running.
import { chromium } from 'playwright';
import sharp from 'sharp';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:4173/AnnaSha/', { waitUntil: 'networkidle' });
// Keep the preview clean: nothing half-cut at the bottom edge.
await page.addStyleTag({ content: '#s-top .row-start-2 > :not(:first-child) { visibility: hidden }' });
await page.waitForTimeout(2600);
const png = await page.screenshot({ type: 'png' });
await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toFile('public/og.jpg');
await browser.close();
console.log('public/og.jpg');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'weekly' },
  { path: 'services', priority: '0.8', changefreq: 'weekly' },
  { path: 'treatments', priority: '0.8', changefreq: 'weekly' },
  { path: 'conditions', priority: '0.8', changefreq: 'weekly' },
  { path: 'blogs', priority: '0.7', changefreq: 'weekly' },
  { path: 'gallery', priority: '0.7', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'weekly' },
  { path: 'international', priority: '0.7', changefreq: 'weekly' }
];

const baseUrl = 'https://www.endoscopicspinecare.com';
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}/${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully in public/sitemap.xml');

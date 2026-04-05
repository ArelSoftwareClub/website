import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://arelsoftwareclub.github.io';
  const now = new Date();

  const staticRoutes = [
    { url: '/', priority: 1.0 },
    { url: '/hakkimizda', priority: 0.9 },
    { url: '/etkinlikler', priority: 0.9 },
    { url: '/duyurular', priority: 0.9 },
    { url: '/projeler', priority: 0.8 },
    { url: '/ekip', priority: 0.8 },
    { url: '/iletisim', priority: 0.8 },
    { url: '/uyelik', priority: 0.9 },
    { url: '/belgeler', priority: 0.7 },
    { url: '/kariyer', priority: 0.7 },
    { url: '/ari-lab', priority: 0.8 },
    { url: '/kurumsal', priority: 0.7 },
    // New pages
    { url: '/blog', priority: 0.8 },
    { url: '/topluluk', priority: 0.85 },
    { url: '/topluluk/ai', priority: 0.7 },
    { url: '/topluluk/web', priority: 0.7 },
    { url: '/topluluk/cyber', priority: 0.7 },
    { url: '/topluluk/data', priority: 0.7 },
    { url: '/topluluk/mobile', priority: 0.7 },
    { url: '/sponsorlar', priority: 0.75 },
    // Legal
    { url: '/gizlilik', priority: 0.3 },
    { url: '/yonetmelik', priority: 0.3 },
  ];

  return staticRoutes.map(({ url, priority }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority,
  }));
}

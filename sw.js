/* ============================================================
   AREL YAZILIM KULÜBÜ — Service Worker v1.0
   Strategy:
    - HTML pages  → Network-first (fresh content, fallback to cache)
    - CSS/JS/IMG  → Cache-first (fast loads, update in background)
   ============================================================ */

const CACHE_NAME = 'arel-yazilim-v1';
const HTML_CACHE = 'arel-pages-v1';

const STATIC_ASSETS = [
    './style.css',
    './script.js',
    './arel_logo_colored.png',
];

const HTML_PAGES = [
    './',
    './index.html',
    './hakkimizda.html',
    './odak-alanlari.html',
    './etkinlikler.html',
    './ekip.html',
    './iletisim.html',
];

/* ── Install: pre-cache static assets */
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)),
            caches.open(HTML_CACHE).then(c => c.addAll(HTML_PAGES)),
        ])
    );
});

/* ── Activate: clear old caches */
self.addEventListener('activate', (e) => {
    const keep = [CACHE_NAME, HTML_CACHE];
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => !keep.includes(k)).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

/* ── Fetch: custom strategy per resource type */
self.addEventListener('fetch', (e) => {
    const { request } = e;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== self.location.origin) return;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    const isHtml = request.headers.get('accept')?.includes('text/html');
    const isStatic = /\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/.test(url.pathname);

    if (isHtml) {
        // Network-first for HTML — always try to get fresh page
        e.respondWith(
            fetch(request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(HTML_CACHE).then(c => c.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request).then(cached =>
                    cached || caches.match('./index.html')
                ))
        );
    } else if (isStatic) {
        // Cache-first for static assets — serve from cache, update in background
        e.respondWith(
            caches.match(request).then(cached => {
                const networkPromise = fetch(request).then(res => {
                    caches.open(CACHE_NAME).then(c => c.put(request, res.clone()));
                    return res;
                });
                return cached || networkPromise;
            })
        );
    }
});

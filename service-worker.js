const CACHE = 'psychshield-v1';
const ASSETS = [
    '/', '/index.html', '/results.html', '/style.css',
    '/quiz.js', '/cialdini.js', '/generator.js', '/radar.js',
    '/data/questions.json', '/data/attack-library.json',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});

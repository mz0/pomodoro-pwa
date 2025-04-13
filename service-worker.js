const cacheName = 'pomodoro-timer-v1';
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './images/timer192.png',
    './images/stw128.png',
    './images/stw192.png',
    './images/stw256.png',
    './images/stw512.png'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request);
    }));
});

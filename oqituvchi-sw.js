const CACHE_NAME = 'oqituvchi-ilova-v1';
const SHELL_FILES = ['oqituvchi-ilova.html', 'oqituvchi-manifest.json', 'teacher-icon-192.png', 'teacher-icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Tarmoq ustuvor: GPS/QR/kamera uchun har doim jonli sahifa kerak.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

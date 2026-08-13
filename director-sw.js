const CACHE_NAME = 'direktor-ilova-v1';
const SHELL_FILES = ['director-ilova.html', 'director-manifest.json', 'director-icon-192.png', 'director-icon-512.png'];

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

// Tarmoq ustuvor: har doim yangi ma'lumot uchun internetdan urinadi, faqat oflayn bo'lsa keshdan foydalanadi.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

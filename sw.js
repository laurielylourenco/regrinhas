// Este é um service worker básico (placeholder).
// Para uma PWA completa, você precisaria adicionar estratégias de cache aqui.

const CACHE_NAME = 'regrinhas-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache ou faz a requisição à rede
        return response || fetch(event.request);
      })
  );
});

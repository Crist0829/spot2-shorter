importScripts("https://js.pusher.com/beams/service-worker.js");

const CACHE_NAME = 'spot_shorter_v1',
  urlsToCache = [
    './',
  ]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await cache.addAll(urlsToCache);
        return self.skipWaiting();
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
  self.skipWaiting();
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
          }
          })
        )
      })
      .then(() => self.clients.claim())
  )
  self.clients.claim(); 
})


self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res)  return res
        return fetch(e.request)
      })
  )
})
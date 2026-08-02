// Minimal service worker for CROWNFLOWER PWA: enables install + basic offline.
const CACHE = 'crownflower-v1'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return

  // SPA navigations: network first, fall back to cached shell when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('/index.html').then((c) => c || caches.match('/')))
    )
    return
  }

  // Assets: cache first, then network (and cache it)
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req).then((resp) => {
        if (resp.ok && (req.url.startsWith('http'))) {
          const copy = resp.clone()
          caches.open(CACHE).then((c) => c.put(req, copy))
        }
        return resp
      })
    })
  )
})

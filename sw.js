const CACHE_NAME = 'lhasa-verbs-v3';
const AUDIO_CACHE = 'lhasa-verbs-audio-v3';

// Core files to precache (the app shell)
const PRECACHE_URLS = [
  './LhasaVerbs.html',
  './manifest.json',
  './data/colloquial.json',
  './data/classical.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Tibetan:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap'
];

// Install: precache core app files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== AUDIO_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Audio files: cache-on-demand strategy (too large to precache)
  // Covers Lhasa verbs audio AND colloquial Tibetan audio
  if (url.pathname.includes('Tibetan Lhasa Verbs/') ||
      url.pathname.includes('Learning tools from Damien/') ||
      url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Everything else: cache-first, then network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});

// Service worker : garde l’application en mémoire pour qu’elle s’ouvre sans connexion.
// - à l’installation : tous les fichiers de l’application sont mis en mémoire ;
// - la page d’accueil : réseau d’abord (pour recevoir les mises à jour), mémoire en secours ;
// - le reste (scripts, images, polices) : mémoire d’abord, mis à jour en arrière-plan.
// Les deux marqueurs ci-dessous sont remplis à la construction (scripts/build-web.mjs) :
// identifiant de version, et liste de tous les fichiers de l’application.
const BUILD = '__BUILD__';
let PRECACHE = [];
try {
  PRECACHE = JSON.parse('__PRECACHE__');
} catch (e) {
  PRECACHE = [];
}
const CACHE = 'plongee-' + BUILD;
const SHELL = ['./'].concat(PRECACHE);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put('./', copy));
          return response;
        })
        .catch(() => caches.match('./')),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});

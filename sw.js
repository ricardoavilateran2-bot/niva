// NIVA OS - service worker minimo: permite instalar la app; siempre usa la red (nada en cache).
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

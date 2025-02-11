// This is the "Offline copy of pages" service worker

const CACHE = "offline-pwa_EggTimer-";

// Import Workbox library
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Skip waiting and activate new Service Worker immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache all requests with a StaleWhileRevalidate strategy
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);
const CACHE_NAME = "eieruhr-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/script.js",
    "/img/egg.png",
    "/img/menu_btn.png",
    "/img/start_btn.png"
];

// Installations-Event: Dateien werden gecacht
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Aktivierungs-Event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch-Event: Dateien aus dem Cache liefern
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
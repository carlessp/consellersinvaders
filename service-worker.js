const CACHE_NAME = 'space-invaders-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/nau.png',
    '/fadasimo.png',
    '/bargallo.png',
    '/cambray.png',
    '/explosio.png',
    '/SpaceCadence.mp3',
    '/explosio.mp3'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Obertura de la memòria cau amb èxit');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

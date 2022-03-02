;
//Asignar nombre y versión al cache

const CACHE_NAME = "cache_restaurante",
urlsToCache = [
    "./",
    "./css/style.css",
    "./script.js",
    "./resp.js",
    "./img/facebook.png",
    "./img/twitter.png",
    "./img/instagram.png",
    "./img/logo.png"
]

// Este evento almacenará los elementos estaticos en cache
self.addEventListener("install", e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log("Error en registro del cache", err))
    )
})

// Tras instalar el SW este evento servirá para que al perder
// la conexión se busquen los elementos que esten en cache para cargarlos.

self.addEventListener("activate", e=> {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cacheName => {
                // Se elimina lo que ya no es necesario en cache
                if (cacheWhitelist.indexOf(cacheName) === 1) {
                    return caches.delete(cacheName)
                }
            })
        })
        // Indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

// Este evento recuperará los archivos al recuperar la conexión.

self.addEventListener("fetch", e=> {
    // Responder con objeto en cache o con url real si la encuentra
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                // Recuperando del cache
                return res
            }

            //Recuperar la petición de la url
            return fetch(e.request)
        })
    )
})
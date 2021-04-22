//Assign a name and version to the cache
const CACHE_NAME = "v1_calculator",
  urlsToCache = [
    "./",
    "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap",
    "https://fonts.gstatic.com/s/quicksand/v22/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wg.woff2",
    "./css/style.css",
    "./js/app.js",
    "./js/inputs.js",
    "./js/correct-height.js",
    "./js/info.js",
    "./js/switch-theme.js",
    "./assets/favicon.png",
    "./assets/favicon_32.png",
    "./assets/favicon_64.png",
    "./assets/favicon_96.png",
    "./assets/favicon_128.png",
    "./assets/favicon_192.png",
    "./assets/favicon_256.png",
    "./assets/favicon_384.png",
    "./assets/favicon_512.png",
    "./assets/favicon_1024.png",
  ];

//During the installation phase, static assets are generally cached
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Fallo el registro de cache", err))
  );
});

//Once the service worker is installed, it wakes up and searches for resources to make it work offline
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //We remove what is no longer needed in cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      //Tells the service worker to activate the current cache
      .then(() => self.clients.claim())
  );
});

//When the browser retrieves a url
self.addEventListener("fetch", (e) => {
  //Respond either with the cached object or go ahead and find the actual url
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        //Recover from cache
        return res;
      }

      //Retrieve from request to url
      return fetch(e.request);
    })
  );
});

//Asignar un nombre y version al cache
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

//Durante la fase de istalacion, generalmente se almacena en cache los activos estaticos
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

//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

//Cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
  //Responder ya sea con el objeto en cache o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        //Recuperar del cache
        return res;
      }

      //Recuperar de la peticin a la url
      return fetch(e.request);
    })
  );
});

const staticCacheName = 'weather-static-v1'; // for cache shell resources
const dynamicCacheName = 'weather-dynamic-v1'; // for cache app visited pages

// note: for dev css, js files are '/css/mainStyle.css', '/js/all.js'
// note: for production css, js files are '/css/mainStyle.min.css', '/js/all.min.js'

// PWA using shell model approach cache core resources that make UI of the app

// shell assets
const assets = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/pages/fallback.html',
  '/css/mainStyle.css',
  '/js/all.js',
  '/images/logo.png',
  '/webfonts/fa-brands-400.eot',
  '/webfonts/fa-brands-400.svg',
  '/webfonts/fa-brands-400.ttf',
  '/webfonts/fa-brands-400.woff',
  '/webfonts/fa-brands-400.woff2',
  '/webfonts/fa-regular-400.eot',
  '/webfonts/fa-regular-400.svg',
  '/webfonts/fa-regular-400.ttf',
  '/webfonts/fa-regular-400.woff',
  '/webfonts/fa-regular-400.woff2',
  '/webfonts/fa-solid-900.eot',
  '/webfonts/fa-solid-900.svg',
  '/webfonts/fa-solid-900.ttf',
  '/webfonts/fa-solid-900.woff',
  '/webfonts/fa-solid-900.woff2',
  'https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hJFQNcOM.woff2',
  'https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hK1QN.woff2',
  'https://openweathermap.org/img/wn/01d@2x.png',
  'https://openweathermap.org/img/wn/01n@2x.png',
  'https://openweathermap.org/img/wn/02d@2x.png',
  'https://openweathermap.org/img/wn/02n@2x.png',
  'https://openweathermap.org/img/wn/03d@2x.png',
  'https://openweathermap.org/img/wn/03n@2x.png',
  'https://openweathermap.org/img/wn/04d@2x.png',
  'https://openweathermap.org/img/wn/04n@2x.png',
  'https://openweathermap.org/img/wn/09d@2x.png',
  'https://openweathermap.org/img/wn/09n@2x.png',
  'https://openweathermap.org/img/wn/10d@2x.png',
  'https://openweathermap.org/img/wn/10n@2x.png',
  'https://openweathermap.org/img/wn/11d@2x.png',
  'https://openweathermap.org/img/wn/11n@2x.png',
  'https://openweathermap.org/img/wn/13d@2x.png',
  'https://openweathermap.org/img/wn/13n@2x.png',
  'https://openweathermap.org/img/wn/50d@2x.png',
  'https://openweathermap.org/img/wn/50n@2x.png',
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/places.js@1.19.0'
];

// limiting caches size
const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  console.log('sw installed');
  // open a cache to hold pages we want to cache
  // at install of SW
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
      // automate skipWaiting instead of manually click it
      // to help in deleting old caches version
      .then(() => self.skipWaiting())
  );
});

// activate event
self.addEventListener('activate', evt => {
  console.log('sw activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      console.log(keys);
      //keys refers to cache versions
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          // delete old cache to get updated file
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  // intercept fetch requests
  evt.respondWith(
    // check if something in cache match request
    // {ignoreSearch: true} ignore the query string in the URL
    // use it because css and js file have a query string in the url
    // and this prevent sw to cache the url
    // css/mainStyle.css?t=1600288271411
    caches.match(evt.request, { cacheName: staticCacheName, ignoreSearch: true }).then(cacheRes => {
      // fetch(evt.request) is async return a promise
      return (
        cacheRes ||
        fetch(evt.request)
          .then(fetchRes => {
            // caches.open(dynamicCache) is async return a promise
            return caches.open(dynamicCacheName).then(cache => {
              // IMPORTANT: Clone the fetchRes request. Beacuse request is a stream and
              // can only be consumed once. Since we are consuming this
              // once by cache and once by the browser for fetch, we need
              // to clone the response.
              // cache.put(resource url, response) <key, value>
              // like in assets array contain requests
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 6);
              return fetchRes;
            });
          })
          // add offline fallback page for display
          // when user try to visit a page didn't visit when he it online
          .catch(() => {
            if (evt.request.url.includes('.html')) {
              return caches.match('/pages/fallback.html');
            }
          })
      );
    })
  );
});

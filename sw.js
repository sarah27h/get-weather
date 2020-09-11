const staticCacheName = 'weather-static-v1';

// shell assets
const assets = [
  '/',
  '/index.html',
  '/favicon.ico',
  'manifest.json',
  '/pages/sample.html',
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

// install event
self.addEventListener('install', evt => {
  console.log('sw installed');
  // open a cache to hold pages we want to cache
  // at install of SW
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  console.log('sw activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //keys refers to cache versions
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          // delete old cache to get updated file
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  console.log('fetch event', evt);
  // intercept fetch requests
  evt.respondWith(
    // check if something in cache match request
    // {ignoreSearch: true} ignore the query string in the URL
    caches.match(evt.request, { cacheName: staticCacheName, ignoreSearch: true }).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err));
}

// let jsScriptsInPage = document.getElementsByTagName('script');
// for (let i = 0; i < jsScriptsInPage.length; i++) {
//   // parse all scripts
//   let script = jsScriptsInPage[i];
//   if (script.getAttribute('src') == '/js/all.js') {
//     let jsPath = script.getAttribute('src');
//     console.log(jsPath);
//   }
// }

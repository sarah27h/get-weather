import { PLACES_APP_ID, PLACES_API_KEY } from '../../../config/config';
import fetchTempData from './fetchTemp.js';
import showMessage from './showMessages';

// const places = require('places.js');
// import places from 'places.js';

const initAutocomplete = (() => {
  const placesAutocomplete = places({
    appId: PLACES_APP_ID,
    apiKey: PLACES_API_KEY,
    container: document.querySelector('#autocomplete-search')
  }).configure({
    // Restrict the search results to city
    type: 'city'
    // aroundLatLngViaIP: false,
  });
  placesAutocomplete.on('change', e => {
    fetchTempData(e.suggestion.latlng.lat, e.suggestion.latlng.lng);
    // clear search input after submit to improve UX
    placesAutocomplete.setVal('');
    console.log(e.suggestion);
    showMessage(`${e.suggestion.name}, ${e.suggestion.country}`);
  });
  placesAutocomplete.on('error', e => console.log(e.message));
})();

console.log(initAutocomplete);

export default initAutocomplete;

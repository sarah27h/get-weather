import { PLACES_APP_ID, PLACES_API_KEY } from '../../../config/config';
import fetchTempData from './fetchTemp.js';

// const places = require('places.js');
// import places from 'places.js';
// import places from 'places.js';

const initAutocomplete = (() => {
  const placesAutocomplete = places({
    appId: PLACES_APP_ID,
    apiKey: PLACES_API_KEY,
    container: document.querySelector('#autocomplete-search')
  });
  placesAutocomplete.on('change', e =>
    fetchTempData(e.suggestion.latlng.lat, e.suggestion.latlng.lng)
  );
})();

console.log(initAutocomplete);

export default initAutocomplete;

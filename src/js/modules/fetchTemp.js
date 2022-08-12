import { WEATHER_API_KEY } from '../../../config/config';
import showMessage from './showMessages';
import { displayWeatherData, clearWeatherData } from './displayWeatherData';
import { clearOldWeatherData } from './localStorage';

let searchResult = [];

const fetchTempData = (lat, lng, city = 'New York', country = 'United States of America') => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`;
  clearWeatherData();
  try {
    fetch(url)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        console.log(result);

        // add location to result and store in localStorage
        result.location = `${city}, ${country}`;
        if (localStorage.weatherData !== undefined) {
          searchResult = [...JSON.parse(localStorage.weatherData), result];
        } else {
          searchResult.push(result);
          localStorage.dt = JSON.stringify(result.current.dt);
        }
        localStorage.weatherData = JSON.stringify(searchResult);

        let lastResult = searchResult[searchResult.length - 1];
        console.log(searchResult, lastResult.current.dt);
        clearOldWeatherData();
        showMessage(lastResult.location);
        displayWeatherData(lastResult);
        // clear search input after submit to improve UX
        document.getElementById('autocomplete-search').value = '';
      });
  } catch (err) {
    console.log(err);
  }
};

export default fetchTempData;

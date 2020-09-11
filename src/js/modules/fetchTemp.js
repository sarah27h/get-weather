import { WEATHER_API_KEY } from '../../../config/config';
import showMessage from './showMessages';
import { displayWeatherData, clearWeatherData } from './displayWeatherData';
import { clearOldWeatherData } from './localStorage';

let searchResult = [];

const fetchTempData = (lat, lng) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`;
  clearWeatherData();
  try {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result);
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
        showMessage(lastResult.timezone);
        displayWeatherData(lastResult);
        // clear search input after submit to improve UX
        document.getElementById('autocomplete-search').value = '';
      });
  } catch (err) {
    console.log(err);
  }
};

export default fetchTempData;

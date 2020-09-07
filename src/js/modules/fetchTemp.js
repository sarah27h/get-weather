import { WEATHER_API_KEY } from '../../../config/config';
import showMessage from './showMessages';
import { displayWeatherData, clearWeatherData } from './displayWeatherData';

const fetchTempData = async (lat, lng) => {
  clearWeatherData();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    showMessage(data.timezone);
    displayWeatherData(data);
    // clear search input after submit to improve UX
    document.getElementById('autocomplete-search').value = '';
  } catch (err) {
    console.log(err);
  }
};

export default fetchTempData;

import fetchTempData from './fetchTemp.js';
import showMessage from './showMessages';
import { displayWeatherData } from './displayWeatherData';

const options = {
  enableHigh1accuracy: true,
  timeout: 10000,
  maximumAge: 2000
};

const defaultCoords = {
  lat: 40.71,
  lng: -74.01
};

let searchResult;

const getUserLocation = () => {
  // check localStorage not empty
  //  if true display last result from it
  if (localStorage.weatherData !== undefined) {
    searchResult = [...JSON.parse(localStorage.weatherData)];

    // last fetched result
    let lastResult = searchResult[searchResult.length - 1];

    displayWeatherData(lastResult);
    showMessage(lastResult.timezone);

    // if false check for user location if not
    // fetch weather for default location
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          if (position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
            fetchTempData(position.coords.latitude, position.coords.longitude);
          }
        },
        error => {
          console.log(error);
          switch (error.code) {
            case 0: //unknown error
              showMessage(error.message);
              fetchTempData(defaultCoords.lat, defaultCoords.lng);

              console.log(error.message);
              break;

            case 1: // permission denied
              // showMessage(error.message);
              showMessage('Loading....');
              fetchTempData(defaultCoords.lat, defaultCoords.lng);

              console.log(error.message);
              break;

            case 2: // position unavailable
              showMessage(error.message);
              fetchTempData(defaultCoords.lat, defaultCoords.lng);

              console.log(error.message);
              break;

            case 3: // time out
              showMessage(error.message);
              fetchTempData(defaultCoords.lat, defaultCoords.lng);

              console.log(error.message);
              break;
          }
        },
        options
      );
    }
  }
};

export default getUserLocation;

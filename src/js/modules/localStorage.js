const clearOldWeatherData = () => {
  let weatherData = JSON.parse(localStorage.weatherData);

  // last fetched result
  let lastResult = weatherData[weatherData.length - 1];
  let dt = localStorage.dt;
  const DIFFERENCE_BETWEEN_2TODAYS = 86400;

  // last result date is not the same day as date of our first weather data
  if (lastResult.current.dt - dt >= DIFFERENCE_BETWEEN_2TODAYS) {
    localStorage.removeItem('weatherData');
    localStorage.removeItem('dt');
    localStorage.weatherData = JSON.stringify([lastResult]);
    localStorage.dt = JSON.stringify(lastResult.current.dt);
    console.log('remove old results ....');
  }
  console.log(lastResult);
};

// const addToLocalStorage () => {

// }

export { clearOldWeatherData };

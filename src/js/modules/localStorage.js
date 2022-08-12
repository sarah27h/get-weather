const clearOldWeatherData = () => {
  let weatherData = JSON.parse(localStorage.weatherData);

  // last fetched result
  let lastResult = weatherData[weatherData.length - 1];
  let dt = localStorage.dt;
  const DIFFERENCE_BETWEEN_2TODAYS = 86400;
  console.log('remove old results ....', dt, lastResult.daily[0].dt - dt);

  // last result date is not the same day as date of our first weather data
  if (lastResult.daily[0].dt - dt >= DIFFERENCE_BETWEEN_2TODAYS) {
    localStorage.removeItem('weatherData');
    localStorage.removeItem('dt');
    localStorage.weatherData = JSON.stringify([lastResult]);
    localStorage.dt = JSON.stringify(lastResult.current.dt);
    console.log('remove old results ....');
  }
  console.log(lastResult);
};

// let today = new Date().toISOString().slice(0, 10);

// function toDateTime(secs) {
//   const time = new Date(1970, 0, 1); // Epoch
//   time.setSeconds(secs);
//   return time.toISOString().slice(0, 10);
// }

// toDateTime(1600299593)

export { clearOldWeatherData };

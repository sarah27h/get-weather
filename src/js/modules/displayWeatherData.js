// grab days predict elements from DOM
const day = document.getElementsByClassName('day');

// grab today elements from DOM
const todayTemp = document.querySelector('.today__temp');
const todayDescription = document.querySelector('.today__description');
const todayImg = document.querySelector('.today__img');
const dayTemp = document.getElementsByClassName('day__temp');

// const dayConditions = document.getElementsByClassName('condition__data');
const dayConditions = document.getElementsByClassName('condition__text');

const displayWeatherData = data => {
  // display days predict
  const days = data.daily.slice(1, 6);

  days.forEach((dayData, i) => {
    const dayChildern = day[i].children;

    if (i === 0) {
      dayChildern[0].textContent = 'Tomorrow';
    } else {
      dayChildern[0].textContent = getWeekdayFromUTC(dayData.dt);
    }
    dayChildern[1].setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`
    );
    dayTemp[i].textContent = dayData.temp.day.toFixed();
  });

  // display today info
  todayTemp.textContent = parseInt(data.current.temp);
  todayDescription.textContent = data.current.weather[0].main;
  todayImg.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  );

  // display today conditions
  const conditions = [data.current.wind_speed, data.current.humidity, data.current.pressure];
  conditions.forEach((cond, i) => {
    if (i === 0) {
      //convert m/sec into km/hr
      cond = ((cond * 18) / 5).toFixed();
    }

    const condition = dayConditions[i];

    condition.textContent = cond;
  });
};

// helper functions
function getWeekdayFromUTC(UTC) {
  const day = new Date(1970, 0, 1);
  day.setSeconds(UTC);

  // get day number
  day.getUTCDay();

  // format to get weekday from day number
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
  return weekday;
}

// clear ui from old data before fetch new
const clearWeatherData = () => {
  Array.from(day).forEach((item, i) => {
    console.log(day[i].children);
    day[i].children[0].textContent = '';
  });

  // clear today info
  todayTemp.textContent = '';
  todayDescription.textContent = '';
  todayImg.textContent = '';

  // clear today conditions
  Array.from(dayConditions).forEach((item, i) => {
    console.log(dayConditions[i]);
    dayConditions[i].textContent = '';
  });
};

export { displayWeatherData, clearWeatherData };

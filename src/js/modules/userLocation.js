import fetchTempData from './fetchTemp.js';
import showMessage from './showMessages';

const options = {
  enableHigh1accuracy: true,
  timeout: 10000,
  maximumAge: 2000
};

const getUserLocation = () => {
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
            fetchTempData(40.71, -74.01);

            console.log(error.message);
            break;

          case 1: // permission denied
            showMessage(error.message);
            fetchTempData(40.71, -74.01);

            console.log(error.message);
            break;

          case 2: // position unavailable
            showMessage(error.message);
            fetchTempData(40.71, -74.01);

            console.log(error.message);
            break;

          case 3: // time out
            showMessage(error.message);
            fetchTempData(40.71, -74.01);

            console.log(error.message);
            break;
        }
      },
      options
    );
  } else {
    fetchTempData(40.71, -74.01);
  }
};

export default getUserLocation;

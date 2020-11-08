const getCityName = (latitude, longitude) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}
    `,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse.name;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getCurrentWeatherInfos = (latitude, longitude) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const uvNumberToRange = (value) => {
  let indicator = null;

  if (value <= 2) {
    indicator = 'Low';
  } else if (value > 2 && value <= 5) {
    indicator = 'Moderate';
  } else if (value > 5 && value <= 7) {
    indicator = 'High';
  } else if (value > 7 && value <= 10) {
    indicator = 'Very high';
  } else {
    indicator = 'Extreme';
  }

  return `${indicator} (${Math.round(value)})`;
};

export {
  getCityName,
  getCurrentWeatherInfos,
  capitalizeFirstLetter,
  uvNumberToRange,
};

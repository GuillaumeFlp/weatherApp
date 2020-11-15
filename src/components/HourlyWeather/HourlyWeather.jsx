/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './HourlyWeather.css';

import { weather } from 'cli-spinners';
import { getCurrentPosition, getCurrentWeatherInfos } from '../../utils';

const HourlyWeather = () => {
  const [hourlyTab, setHourlyTab] = useState([]);

  useEffect(() => {
    getCurrentPosition().then((response) => {
      const { latitude, longitude } = response;

      getCurrentWeatherInfos(latitude, longitude).then((response) => {
        const { hourly } = response;
        setHourlyTab(hourly);
      });
    });
  }, []);

  return (
    <div className="hourly-list">
      {hourlyTab.map((hour) => (
        <div className="hourly-item" key={hour.dt}>
          <span>{dayjs(hour.dt * 1000).format('h:mm a')}</span>
          <img
            className="hourly-weather-icon"
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt="Weathr icon"
          />
          <span className="hourly-item-temp">{Math.round(hour.temp)}°</span>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeather;

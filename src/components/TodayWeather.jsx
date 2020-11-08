/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import dayjs from 'dayjs';
import './TodayWeather.css';

import {
  getCityName,
  getCurrentWeatherInfos,
  capitalizeFirstLetter,
  uvNumberToRange,
} from '../utils';

import locationIcon from '../assets/images/location-pointer.svg';
import sunsetIcon from '../assets/images/sunset.svg';
import sunriseIcon from '../assets/images/sunrise.svg';
import humidityIcon from '../assets/images/humidity.svg';
import pressureIcon from '../assets/images/pressure.svg';
import windIcon from '../assets/images/wind.svg';
import UVIcon from '../assets/images/uv.svg';

const TodayWeather = () => {
  const [cityName, setCityName] = useState(null);
  const [dayTime, setDayTime] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [description, setDescription] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [wind, setWind] = useState(null);
  const [UV, setUV] = useState(null);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;

      getCityName(latitude, longitude).then((response) => {
        setCityName(response);
      });

      getCurrentWeatherInfos(latitude, longitude).then((response) => {
        setCurrentTemp(Math.round(response.current.temp));
        setDayTime(response.current.dt * 1000);
        setDescription(
          capitalizeFirstLetter(response.current.weather[0].description)
        );
        setFeelsLike(Math.round(response.current.feels_like));
        setSunrise(response.current.sunrise * 1000);
        setSunset(response.current.sunset * 1000);
        setMinTemp(Math.round(response.daily[0].temp.min));
        setMaxTemp(Math.round(response.daily[0].temp.max));
        setHumidity(response.current.humidity);
        setPressure(response.current.pressure);
        setWind(Math.round(response.current.wind_speed * 3.6));
        setUV(uvNumberToRange(response.current.uvi));
      });
    };

    const errorCallback = (error) => {
      console.error(`ERROR (${error.code}): ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className="city-name">
          <img src={locationIcon} alt="location" />
          {cityName}
        </IonCardTitle>
        <IonCardSubtitle>
          {dayjs(dayTime).format('ddd, MMMM DD h:mm a')}
        </IonCardSubtitle>
        <div className="current-temp">
          <div className="main-temp">{currentTemp}°</div>
          <div className="current-infos">
            <span>{description}</span>
            <span className="feels-like">
              {maxTemp}°/{minTemp}°
            </span>
            <span className="feels-like">Feels like {feelsLike}°</span>
          </div>
        </div>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={sunriseIcon} alt="sunrise" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">Sunrise</div>
              <div>{dayjs(sunrise).format('h:mm a')}</div>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={sunsetIcon} alt="sunset" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">Sunset</div>
              <div>{dayjs(sunset).format('h:mm a')}</div>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={humidityIcon} alt="humidity" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">Humidity</div>
              <div>{humidity}%</div>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={pressureIcon} alt="pressure" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">Pressure</div>
              <div>{pressure} hPa</div>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={windIcon} alt="wind" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">Wind</div>
              <div>{wind} km/h</div>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel className="list-icon" slot="start">
              <img src={UVIcon} alt="UV" />
            </IonLabel>
            <IonLabel className="other-info">
              <div className="other-info-name">UV index</div>
              <div>{UV}</div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default TodayWeather;

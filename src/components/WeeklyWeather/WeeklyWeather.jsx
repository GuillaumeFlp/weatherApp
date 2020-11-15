/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import dayjs from 'dayjs';

import {
  getCurrentPosition,
  getCurrentWeatherInfos,
  capitalizeFirstLetter,
} from '../../utils';

import './WeeklyWeather.css';

const WeeklyWeather = () => {
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    getCurrentPosition().then((response) => {
      const { latitude, longitude } = response;

      getCurrentWeatherInfos(latitude, longitude).then((response) => {
        setDaily(response.daily);

        daily.forEach((day) => {
          console.log(dayjs(day.dt * 1000).format('dddd'));
        });
      });
    });
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Weekly summary</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {daily.map((day) => (
            <IonItem key={day.dt}>
              <IonLabel className="daily-weather">
                <div>
                  {dayjs(day.dt * 1000).format('DD') === dayjs().format('DD')
                    ? 'Today'
                    : dayjs(day.dt * 1000).format('dddd')}
                </div>
                <div className="daily-weather-description">
                  {capitalizeFirstLetter(day.weather[0].description)}
                </div>
                <div>
                  {Math.round(day.temp.max)}°/{Math.round(day.temp.min)}°
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default WeeklyWeather;

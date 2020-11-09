import React, { useEffect } from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import TodayWeather from '../components/TodayWeather/TodayWeather';
import WeeklyWeather from '../components/WeeklyWeather/WeeklyWeather';

import './Home.css';

const Home = () => {
  useEffect(() => {}, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonText className="main-title">
          <h1>Weather</h1>
        </IonText>
        <TodayWeather />
        <WeeklyWeather />
      </IonContent>
    </IonPage>
  );
};

export default Home;

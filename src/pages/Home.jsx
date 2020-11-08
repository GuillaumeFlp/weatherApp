import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import TodayWeather from '../components/TodayWeather';

import './Home.css';

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <TodayWeather />
      </IonContent>
    </IonPage>
  );
};

export default Home;

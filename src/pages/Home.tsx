import { IonContent, IonPage, IonToast } from '@ionic/react';
import { Color } from '@ionic/core';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { UserContext } from '../App';

import * as sessionRoutes from '../services/api/session';

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  }
}

const Home: React.FC = () => {
  const location = useLocation<LocationState>();

  const user = useContext(UserContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor)
        setToastMessage(redirectData.toastMessage)
        setShowToast(true)
      }
    }

    const refreshUserToken = async () => {
      await sessionRoutes.refresh().then(response => {
        if (response.status === 'error') {
          // setMessageToast(response.message);
          // setShowToast(true);

          return
        }

        user.setIsLoggedIn(true);
      }).catch(error => {
        // if (!error.response) return

        // se o backend retornou uma mensagem de erro customizada
        // if (error.response.data.message) {
        console.dir('Houve um erro: ', { error })
        alert('Houve um erro')
      })
    }

    refreshUserToken()
  }, [])
  
  return (
    <IonPage>
        <IonContent>
          <IonToast
            position="top"
            color={toastColor}
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={2500}
          />
        </IonContent>
    </IonPage>
  );
};

export default Home;

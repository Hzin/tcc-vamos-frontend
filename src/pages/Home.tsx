import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { UserContext } from '../App';

import * as sessionRoutes from '../services/api/session';

const Home: React.FC = () => {
  const history = useHistory()

  const user = useContext(UserContext);

  useEffect(() => {
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
  })
  
  return (
    <IonPage>
        <IonContent>
            <IonButton onClick={() => { history.push({ pathname: '/usuario/56520ae7-faf8-4444-a82b-7f3990ab02d8' }); }}>Ir para o perfil de outra pessoa</IonButton>
        </IonContent>
    </IonPage>
  );
};

export default Home;

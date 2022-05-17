import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import { IonRow, IonCol } from "@ionic/react";
import { createOutline } from "ionicons/icons";

import * as sessionRoutes from '../services/session';
import * as usersRoutes from '../services/users';

import './Perfil.css'
import LocalStorage from "../LocalStorage";

const Perfil: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast ] = useState('');

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      fullname: '',
      bio: ''
    }
  );

  const history = useHistory();

  const loadUserData = async () => {
    let userId = ''

    await sessionRoutes.refresh().then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      userId = response.userId
    }).catch(error => {
      console.dir('Houve um erro: ', { error })
      alert('Houve um erro')
    })

    await usersRoutes.getById(userId).then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message.data)
        setShowToast(true);

        return
      }

      const userData = response.data

      setInputValues({'fullname': userData.name, 'bio': userData.bio});
    }).catch(error => {
      console.dir('Houve um erro: ', { error })
      alert('Houve um erro')
    })
  }

  useEffect(() => {
    const userToken = LocalStorage.getToken()

    if (!userToken) {
      // TODO, não impede o usuário de retornar a página de login
      history.push({ pathname: '/login' });
      setMessageToast("Por favor, autentique-se!");
      setShowToast(true);
    }

    // const refreshResponse = refreshSession()
    loadUserData()
  }, []);

  const handleEditProfile = () => {
    alert('oi')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seu perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Seu perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <img src="https://static.generated.photos/vue-static/home/feed/adult.png" alt="avatar" className='avatar' id='avatar'/>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>

            <IonCardHeader>
              <IonCardTitle class="ion-text-center">{inputValues.fullname}</IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Biografia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {inputValues.bio ? inputValues.bio : 'Sem biografia.'}
          </IonCardContent>
        </IonCard>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" onClick={handleEditProfile}>
          <IonFabButton>
            <IonIcon icon={createOutline} />
          </IonFabButton>
        </IonFab>

        <IonToast
          color='danger'      
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;

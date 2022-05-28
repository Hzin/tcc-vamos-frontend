import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import { IonRow, IonCol } from "@ionic/react";
import { createOutline } from "ionicons/icons";

import * as sessionRoutes from '../services/api/session';
import * as usersRoutes from '../services/api/users';

import './Perfil.css'
import LocalStorage from "../LocalStorage";
import { refreshSession } from "../services/refreshSession";

const Perfil: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: '',
      lastname: '',
      email: '',
      birth_date: '',
      bio: '',
    }
  );

  const history = useHistory();

  useEffect(() => {
    const redirectUserToLogin = () => {
      // TODO, não impede o usuário de retornar a página de login
      history.push({ pathname: '/login' });
      setMessageToast("Por favor, autentique-se!");
      setShowToast(true);
    }
  
    const loadUserData = async () => {
      let userId = ''

      // verify if user is authenticated
      const refreshSessionRes = await refreshSession()

      if (refreshSessionRes.error) {
        redirectUserToLogin()
        return
      }

      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId
      }
      
      // get user info by ID
      const getByIdRes = await usersRoutes.getById(userId)

      if (getByIdRes.error) {
        setMessageToast(getByIdRes.message.data)
        setShowToast(true)

        return
      }

      const userData = getByIdRes.data

      setInputValues({
        'name': userData.name,
        'lastname': userData.lastname,
        'email': userData.email,
        'birth_date': userData.birth_date,
        'bio': userData.bio
      });
    }

    const userToken = LocalStorage.getToken()

    if (!userToken) {
      redirectUserToLogin()
    }
    
    loadUserData()
  }, [history]);

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
              <IonCardTitle class="ion-text-center">{inputValues.name} {inputValues.lastname}</IonCardTitle>
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

        <IonCard>
          <IonCardContent>
            <IonLabel>Status do perfil</IonLabel>
            <IonChip>
              <IonLabel color="primary">Passageiro</IonLabel>
            </IonChip>
          </IonCardContent>
        </IonCard>

        <IonList>
        <IonListHeader>Dashboard</IonListHeader>
          <IonItem>
            <IonIcon></IonIcon>
            <IonLabel>Confirmar perfil</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Cadastrar Van</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pagamentos</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Avaliações</IonLabel>
          </IonItem>
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push({ pathname: '/perfil/editar', state: { userData: inputValues } })}>
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

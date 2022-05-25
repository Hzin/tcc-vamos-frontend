import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import React, { useEffect, useReducer, useState } from "react";
import { IonRow, IonCol } from "@ionic/react";

import './Perfil.css'
import { useHistory, useLocation } from "react-router";
import { saveOutline } from "ionicons/icons";

import isEqual from 'lodash.isequal';

import * as usersRoutes from '../services/users';

import './Cadastro/Cadastro.css'

interface userData {
  name: string;
  lastname: string;
  email: string;
  birth_date: string;
  bio: string;
}

interface LocationState {
  userData: userData
}

const PerfilEditar: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    birth_date: '',
    bio: '',
  });

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

  useEffect(() => {
    let userData = location.state.userData

    setUserData(location.state.userData)
    setInputValues({
      'name': userData.name,
      'lastname': userData.lastname,
      'email': userData.email,
      'birth_date': userData.birth_date,
      'bio': userData.bio
    });
  }, [userData]);

  const handleUpdateUserData = () => {
    usersRoutes.update(inputValues).then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      console.log(response)
    }).catch((err) => {
      setMessageToast(err);
      setShowToast(true);
    })
  }

  const hasChangedSinceInitialState = () => {
    return isEqual(userData, inputValues)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar perfil</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Editar perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div id='nome-sobrenome'>
                <IonItem>
                  <IonLabel position="stacked"> Nome</IonLabel>
                  <IonInput
                    type="text"
                    value={inputValues.name}
                    onIonChange={(e) => setInputValues({'name': e.detail.value!})}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked"> Sobrenome</IonLabel>
                  <IonInput
                    type="text"
                    value={inputValues.lastname}
                    onIonChange={(e) => setInputValues({'lastname': e.detail.value!})}
                  ></IonInput>
                </IonItem>
              </div>

              <IonItem>
                <IonLabel position="stacked"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={inputValues.email}
                  onIonChange={(e) => setInputValues({'email': e.detail.value!})}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position='stacked'>Data de nascimento</IonLabel>
                <IonInput 
                  type='date'
                  value={inputValues.birth_date}
                  onIonInput={(e: any) => setInputValues({'birth_date': e.detail.value!})}
                >
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked"> Biografia</IonLabel>
                <IonTextarea
                  value={inputValues.bio}
                  onIonChange={(e) => setInputValues({'bio': e.detail.value!})}
                ></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton disabled={hasChangedSinceInitialState()} onClick={handleUpdateUserData}>
            <IonIcon icon={saveOutline} />
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

export default PerfilEditar;

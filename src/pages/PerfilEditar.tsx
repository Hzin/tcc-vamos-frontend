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

import * as usersRoutes from '../services/api/users';

import './Cadastro/Cadastro.css'
import { Color } from "@ionic/core";

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
  const [toastColor, setToastColor] = useState<Color>("primary");

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
    if (!location.state) {
      history.push({ pathname: '/perfil' })
    }

    let userData = location.state.userData

    setUserData(location.state.userData)
    setInputValues({
      'name': userData.name,
      'lastname': userData.lastname,
      'email': userData.email,
      'birth_date': userData.birth_date,
      'bio': userData.bio
    });

    console.log(inputValues)
  }, [userData]);

  const handleUpdateUserData = () => {
    usersRoutes.update(inputValues).then(response => {
      if (response.status === 'error') {
        setToastColor("danger")
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      history.push({ pathname: '/perfil', state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "success",
          toastMessage: response.message,
        },
      }})
    }).catch((err) => {
      setToastColor("danger")
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

      <IonContent>
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
                  onIonChange={(e) => setInputValues({'birth_date': e.detail.value!}) }
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
          color={toastColor}
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

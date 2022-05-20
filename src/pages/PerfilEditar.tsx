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

interface userData {
  name: string;
  bio: string;
  email: string;
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
    bio: '',
    email: ''
  });

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: '',
      bio: '',
      email: ''
    }
  );

  useEffect(() => {
    setUserData(location.state.userData)
    setInputValues({'name': userData.name, 'email': userData.email, 'bio': userData.bio});
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
            <IonBackButton defaultHref="perfil" />
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
            <IonCol>
              <IonItem>
                <IonLabel position="stacked"> Nome completo</IonLabel>
                <IonInput
                  type="text"
                  value={inputValues.name}
                  onIonChange={(e) => setInputValues({'name': e.detail.value!})}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={inputValues.email}
                  onIonChange={(e) => setInputValues({'email': e.detail.value!})}
                ></IonInput>
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

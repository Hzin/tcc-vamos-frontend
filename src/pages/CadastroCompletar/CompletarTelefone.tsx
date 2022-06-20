import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

import { saveOutline } from "ionicons/icons";

import * as usersRoutes from '../../services/api/users';
import { Color } from "@ionic/react/node_modules/@ionic/core";

interface documentTypesInterface {
  label: string;
  name: string;
}

interface userData {
  name: string;
  lastname: string;
  email: string;
  phone_number: string;
  birth_date: string;
  bio: string;
  document_type: string;
  document: string;
}

interface LocationState {
  userData: userData;
}

const CompletarTelefone: React.FC = () => {
  const location = useLocation<LocationState>();

  const [hasChangedSinceInitialState, setHasChangedSinceInitialState] = useState(false);

  const [phone, setPhone] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [toastColor, setToastColor] = useState<Color>("primary");
  
  const history = useHistory();

  const validateform = () => {
    if (isNaN((Number)(phone))) {
      setMessageToast('O telefone pode conter apenas números!')
      setShowToast(true)
      return false
    }

    return true
  }

  const handleUpdateUserDocuments = async () => {
    if (!validateform()) {
      return
    }

    usersRoutes.update({ phone_number: phone }).then(response => {
      if (response.status === 'error') {
        setToastColor("warning")
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      const userDataObj = location.state.userData

      history.push({ pathname: '/perfil', state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "success",
          toastMessage: response.message,
        },
      }})
    }).catch((err) => {
      setMessageToast(err);
      setShowToast(true);
    })
  };

  useEffect(() => {
    if (!location.state.userData) {
      history.push({ pathname: '/perfil', state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "warning",
          toastMessage: "Houve um erro. Por favor, tente novamente.",
        }
      }})      
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completar cadastro</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/perfil/completar" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Completar cadastro</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList lines="full" class="ion-no-margin">
                <IonItem>
                  <IonLabel position="floating"> Telefone</IonLabel>
                  <IonInput
                    type="text"
                    value={phone}
                    maxlength={11}
                    onIonChange={(e: any) => { setPhone(e.target.value); setHasChangedSinceInitialState(true) }}
                  ></IonInput>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton disabled={!hasChangedSinceInitialState} onClick={handleUpdateUserDocuments}>
            <IonIcon icon={saveOutline} />
          </IonFabButton>
        </IonFab>

        <IonToast
          position="top"
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

export default CompletarTelefone;
  

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useState } from "react";
import { IonGrid, IonRow, IonCol, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

import { alarmOutline, bookmarkOutline, documentOutline, idCardOutline } from "ionicons/icons";

const Viagem: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle >Puc - Campinas</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vinculo-van" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Minhas Vans</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" fill="outline" color="Blue" >
                Faltar na proxima viagem
              </IonButton>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonIcon icon={idCardOutline} slot="start" />
            <IonLabel>Motorista: Maria</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={alarmOutline} slot="start" />
            <IonLabel>Horario: 09:45</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={bookmarkOutline} slot="start" />
            <IonLabel>Status: Ativo</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push({ pathname: '/contratos' })}>
            <IonIcon icon={documentOutline} slot="start" />
            <IonLabel>Meu Contrato</IonLabel>
          </IonItem>
        </IonGrid>

        <IonToast
          position="top"
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

export default Viagem;
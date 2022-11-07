
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { IonGrid, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
} from "@ionic/react";

import { checkmarkOutline, closeOutline } from "ionicons/icons";

const Contratos: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de presença</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vinculo-van-editar" />
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
          <IonCardTitle>25/09/2022  16:50</IonCardTitle>
          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Carlos Augusto</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Daniela Candido</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Danielle Rosa</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Dara Silva</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Eric Santos</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Elena Vanda</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Fabio Fernando</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Vera Silva</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Bruna Paz</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Beatriz Santos</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Guilherme Santoro</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Fernando Faria</IonLabel>
            </IonItem>
          </IonCard>
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

export default Contratos;
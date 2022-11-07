
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useState } from "react";
import { IonGrid, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
} from "@ionic/react";

import { bookmarkOutline } from "ionicons/icons";

const ItinerarioContratos: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Escolha seu contrato</IonTitle>
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
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Contrato: Recorrente </IonCardTitle>
              <IonCardSubtitle>Renovação: 22/09/2022 </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              O Contrato Recorrente é o plano mensal de vinculo a van da/o motorista (Nome do motorista)
              portador do CPF (Numero do CPF) junto ao passageiro (Nome do passageiro) no valor pré estabelecido
              R$ (Valor) a ser pago no dia (Numero do dia) e renovado a cada mês até o seu encerramento.
              O pagamento é feito diretamente ao motorista, e o mesmo atualizará o status do contrato da van via App.
            </IonCardContent>
            <IonItem>
              <IonIcon icon={bookmarkOutline} slot="start" />
              <IonLabel>Escolher contrato</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Contrato: Vaga Avulsa </IonCardTitle>
              <IonCardSubtitle>Renovação: 22/09/2022 </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              O Contrato Vaga Avulsa é o plano de uma vaga unica em uma viagem da van da/o motorista (Nome do motorista)
              portador do CPF (Numero do CPF) junto ao passageiro (Nome do passageiro) no valor pré estabelecido
              R$ (Valor) a ser pago no dia (Numero do dia) e ao termino da viagem é encerrado automaticamente, caso necessario uma nova viagem deverá ser feita uma
              nova solicitação pois esse contrato só tem validade para uma unica viagem.
              O pagamento é feito diretamente ao motorista, e o mesmo atualizará o status do contrato da van via App.
            </IonCardContent>
            <IonItem>
              <IonIcon icon={bookmarkOutline} slot="start" />
              <IonLabel>Escolher contrato</IonLabel>
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

export default ItinerarioContratos;
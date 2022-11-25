
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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

import { banOutline, bookmarkOutline, documentTextOutline, layersOutline } from "ionicons/icons";

const Contrato: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meu Contrato</IonTitle>
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
              <IonCardSubtitle>Renovação: dia 01 do próximo mês </IonCardSubtitle>
              <p>
                O Contrato Recorrente é o plano mensal de vinculo a van da/o motorista (Nome do motorista)
                portador do CPF (Numero do CPF) junto ao passageiro (Nome do passageiro) no valor pré estabelecido
                R$ (Valor) a ser pago no dia (Numero do dia) e renovado a cada mês até o seu encerramento.
              </p>
              <p>
                O pagamento é feito diretamente ao motorista, e o mesmo atualizará o status do contrato da van via App.
              </p>
            </IonCardHeader>
          </IonCard>
          {/* <IonCardContent> */}

          <IonItem>
            <IonIcon icon={bookmarkOutline} slot="start" />
            <IonLabel>Status: Ativo</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push({ pathname: '/contratos' })}>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>Imprimir contrato</IonLabel>
          </IonItem>

          <IonItem border-radius button onClick={() => history.push({ pathname: '/solicita-entrada-van' })}>
            <IonIcon icon={layersOutline} slot="start" />
            <IonLabel>Trocar contrato</IonLabel>
          </IonItem>

          <IonItem border-radius button onClick={() => history.push({ pathname: '/#' })}>
            <IonIcon icon={banOutline} slot="start" />
            <IonLabel>Encerrar contrato</IonLabel>
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

export default Contrato;
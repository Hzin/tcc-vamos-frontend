import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";

const ItinerariosMeusMenu: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <PageHeader pageName="Tipos de itinerário" showBackButton />

      <IonContent fullscreen>
        <IonCard button class="cardItem" onClick={() => history.push({ pathname: "/itinerario/meus/motorista" })}>
          <img alt="" src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
          <IonCardHeader>
            <IonCardTitle>Meus itinerários como motorista</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>Clique para ver</IonCardContent>
        </IonCard>

        <IonCard button class="cardItem" onClick={() => history.push({ pathname: "/itinerario/meus/passageiro" })}>
          <img alt="" src="https://img3.stockfresh.com/files/d/dolgachov/m/60/8590463_stock-photo-group-of-happy-passengers-in-travel-bus.jpg" />
          <IonCardHeader>
            <IonCardTitle>Meus itinerários como passageiro</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>Clique para ver</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ItinerariosMeusMenu
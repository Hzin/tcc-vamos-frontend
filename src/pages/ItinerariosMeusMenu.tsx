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
          <img alt="" src="https://aqwra1nnpxg1d7ppd3phnnll-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/pexels-mentatdgt-1399282-1024x683.jpg" />
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
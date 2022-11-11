import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PageHeader } from "../components/PageHeader";

const Buscas: React.FC = () => {
  useEffect(() => {}, []);
  const history = useHistory();

  return (
    <IonPage>
      <PageHeader
        pageName="Buscas"
      ></PageHeader>

      <IonContent fullscreen>
        <IonCard button class="cardItem" onClick={ () => history.push({ pathname: "/buscar/itinerario"}) }>
          <img alt="" src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
          <IonCardHeader>
            <IonCardTitle>Buscar itinerários</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Clique aqui para buscar por itinerários
          </IonCardContent>
        </IonCard>

        <IonCard button class="cardItem" onClick={ () => history.push({ pathname: "/buscar/passageiro"}) }>
          <img alt="" src="https://aqwra1nnpxg1d7ppd3phnnll-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/pexels-mentatdgt-1399282-1024x683.jpg" />
          <IonCardHeader>
            <IonCardTitle>Buscar passageiros</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Clique aqui para buscar por passageiros
          </IonCardContent>
        </IonCard>

        {/* <IonCard button onClick={ () => history.push({ pathname: "/buscar-transporte"}) }>
          <IonCardHeader>
            <IonCardTitle>/buscar-transporte</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Clique aqui para buscar por transportes
          </IonCardContent>
        </IonCard>

        <IonCard button onClick={ () => history.push({ pathname: "/buscar-passageiro"}) }>
          <IonCardHeader>
            <IonCardTitle>/buscar-passageiro</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Clique aqui para buscar por passageiros
          </IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
};

export default Buscas;

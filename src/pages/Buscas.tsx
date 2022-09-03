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
          <img src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
          <IonCardHeader>
            <IonCardTitle>Buscar itinerários</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Clique aqui para buscar por itinerários
          </IonCardContent>
        </IonCard>

        <IonCard button class="cardItem" onClick={ () => history.push({ pathname: "/buscar/passageiro"}) }>
          <img src="https://media.istockphoto.com/photos/male-passenger-using-laptop-during-flight-picture-id926203958?k=20&m=926203958&s=612x612&w=0&h=o52_eychVRRum6U5Q8C3bVxpnyXzcueqo1I52bhI-KA=" />
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

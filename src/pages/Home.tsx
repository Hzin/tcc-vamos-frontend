import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { UserContext } from "../App";

import * as sessionRoutes from "../services/api/session";
import { closeToast, startTime } from "../services/utils";

import { PageHeader } from "../components/PageHeader";

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const Home: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const user = useContext(UserContext);

  const [clock, setClock] = useState<any>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    setClock(startTime());

    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }

    const refreshUserToken = async () => {
      await sessionRoutes
        .refresh()
        .then((response) => {
          if (response.status === "error") {
            // setMessageToast(response.message);
            // setShowToast(true);

            history.push(`/login`);
            return;
          }

          user.setIsLoggedIn(true);
        })
        .catch((error) => {
          // if (!error.response) return

          // se o backend retornou uma mensagem de erro customizada
          // if (error.response.data.message) {
          console.dir("Houve um erro: ", { error });
          // alert('Houve um erro')
          history.push(`/login`);
        });
    };

    refreshUserToken();
  }, [location.state, user, history]);

  return (
    <IonPage>
      <PageHeader pageName="Página inicial" />

      <IonContent>
        <IonCard button class="cardItem" onClick={() => history.push({ pathname: "/feed/meus/motorista" })}>
          <img alt="" src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
          <IonCardHeader>
            <IonCardTitle>Meus itinerários como motorista</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>Clique para ver</IonCardContent>
        </IonCard>

        <IonCard button class="cardItem" onClick={() => history.push({ pathname: "/feed/meus/passageiro" })}>
          <img alt="" src="https://aqwra1nnpxg1d7ppd3phnnll-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/pexels-mentatdgt-1399282-1024x683.jpg" />
          <IonCardHeader>
            <IonCardTitle>Meus itinerários como passageiro</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>Clique para ver</IonCardContent>
        </IonCard>

        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;

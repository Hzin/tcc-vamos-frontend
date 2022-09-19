import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { UserContext } from "../App";

import * as sessionRoutes from "../services/api/session";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const user = useContext(UserContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
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
        alert('Houve um erro')
          history.push(`/login`);
        });
    };

    refreshUserToken();
  }, [location.state, user, history]);

  return (
    <IonPage>
      <IonContent>
        <PageHeader pageName="Home" />

        <div className="m-3">
          <h1 className="mb-3 text-xl">Suas viagens</h1>
        </div>

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

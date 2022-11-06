import {
<<<<<<< HEAD
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
=======
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonList,
>>>>>>> 474ad61afc9f1f5fc1d482768a038b0d2bdbb37f
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

<<<<<<< HEAD
import * as vehiclesRoutes from "../services/api/vehicles";

import sessionsService from "../services/functions/sessionsService";
=======
import * as itinerariesService from "../services/functions/itinerariesService";
>>>>>>> 474ad61afc9f1f5fc1d482768a038b0d2bdbb37f
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const Itinerario: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    loadItineraryData();
  }, []);

  const loadItineraryData = async () => {
    // let itineraryId = "";

    // TODO, necessário
    // if (!props.match.params.id) history.push({ pathname: "/login" });

    const itineraryId = props.match.params.id;

    // get user info by ID
    const res = await itinerariesService.getById(itineraryId);

    console.log(res)
  };

  return (
    <IonPage>
      <PageHeader
        pageName="Itinerário"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonButton onClick={() => { history.push({ pathname: "/itinerario/:id/contratos" }) }}>"/itinerario/:id/contratos"</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={() => { history.push({ pathname: "/viagem/:id" }) }}>"/viagem/:id"</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={() => { history.push({ pathname: "/contrato/:id" }) }}>"/contrato/:id"</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={() => { history.push({ pathname: "/viagem/:id/presenca" }) }}>"/viagem/:id/presenca"</IonButton>
          </IonItem>
        </IonList>

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

export default Itinerario;

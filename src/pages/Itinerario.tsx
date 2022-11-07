import {
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import * as itinerariesService from "../services/functions/itinerariesService";
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

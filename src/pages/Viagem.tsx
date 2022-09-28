import { IonButton, IonContent, IonItemDivider, IonPage, IonToast } from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { closeToast, startTime } from "../services/utils";

import * as tripsService from "../services/functions/tripsService";
import { PageHeader } from "../components/PageHeader";
import { Trip } from "../models/trip.model";
import { IonChipTripStatus } from "../components/TripCard";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const Viagem: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();

  const [tripInfo, setTripInfo] = useState<Trip>();
  const [pageName, setPageName] = useState("carregando");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    let tripId = "";

    if (!props.match.params.id) {
      history.push({
        pathname: "/home",
        state: {
          redirectData: {
            showToastMessage: true,
            toastColor: "warning",
            toastMessage: "A viagem não existe.",
          },
        },
      });
    }

    tripId = props.match.params.id;

    getTrip(tripId);
  }, []);

  const getTrip = async (tripId: string) => {
    await tripsService.getTrip(tripId).then((response) => {
      setTripInfo(response);
      if (tripInfo && tripInfo.nickname) {
        setPageName(tripInfo.nickname);
        return;
      }
      setPageName(startTime());
    });
  };

  return (
    <IonPage>
      <PageHeader pageName={`Viagem - ${pageName}`} backButtonPageUrl="/home" />

      <IonContent>
        {!tripInfo ? (
          <></>
        ) : (
          <>
            <div className="m-3">
              <h1 className="mb-3 text-2xl ion-text-center">Viagem</h1>
              <h1 className="mb-3 text-l">
                Status: <IonChipTripStatus status={tripInfo.status} />
              </h1>
            </div>

            <div className="m-3">
              <IonButton>Lista de presença</IonButton>
            </div>

            <div className="m-3">
              <IonButton>Visualizar rota</IonButton>
            </div>

            <div className="m-3">
              <IonButton>Finalizar viagem</IonButton>
            </div>

            <IonToast
              position="top"
              color={toastColor}
              isOpen={showToast}
              onDidDismiss={() => closeToast(setShowToast)}
              message={toastMessage}
              duration={2500}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Viagem;

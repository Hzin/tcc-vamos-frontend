import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonToast,
} from "@ionic/react";
import { locateOutline, locationOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";
import { useHistory } from "react-router";
import * as tripsService from "../services/functions/tripsService";
import { PassengerWithAttendanceList } from "../models/passengerWithAttendanceList.model";

interface LocationState {
  id_trip: number;
}

export default function Rota() {
  const history = useHistory();

  const [passengers, setPassengers] = useState<PassengerWithAttendanceList[]>([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    // get parameter from url
    if (history.location.state === undefined) {
      history.push({ pathname: "/itinerarios" });
    } else {
      const infos = history.location.state as LocationState;
      tripsService.getAttendanceList(infos.id_trip).then((response) => {
        setPassengers(response.data);
      });
    }
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Lista de Presença"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent fullscreen>
        {passengers.length !== 0 ? (
          passengers.map((passenger, index) => {
            if (passenger.attendance_lists[0].status === "CONFIRMED") {
              return (
                <IonCard key={index}>
                  <IonCardHeader>
                    <IonCardTitle>
                      {passenger.user.name} {passenger.user.lastname}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                      <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
                      {passenger.formatted_address_origin}
                    </div>
                    <div>
                    <IonButton 
                      expand="block" 
                      color='success' 
                      fill="outline"
                      href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${passenger.lat_origin},${passenger.lng_origin}&travelmode=driving`}
                      target="_blank"
                    >
                      <IonIcon icon={locationOutline} />
                      <IonLabel>Buscar passageiro</IonLabel>
                    </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              );
            }
          })
        ) : (
          <>
            <h1 className="m-6 text-xl">
              Parece que ninguém irá hoje. Que tal aproveitar para fazer uma
              grana extra? Veja os locais onde está tendo mais demanda.
            </h1>
            <IonButton
              expand="block"
              className="m-6"
              onClick={() => history.push({ pathname: "/buscar/passageiro" })}
            >
              Visualizar passageiros buscando
              <IonIcon icon={search} className="ml-1"></IonIcon>
            </IonButton>
          </>
        )}

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
}

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonToast,
} from "@ionic/react";
import { locateOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItineraryPassengers } from "../services/api/itineraries";
import { PageHeader } from "../components/PageHeader";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";
import { useHistory } from "react-router";
import { Passenger } from "../models/passenger.model";

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface Destination extends Address {
  is_final?: boolean;
}

interface ItineraryInfo {
  id_itinerary: number;
  vehicle_plate: string;
  days_of_week?: string;
  specific_day?: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  monthly_price: number;
  daily_price?: number;
  accept_daily: boolean;
  itinerary_nickname: string;
  estimated_departure_address: string;
  departure_latitude: number;
  departure_longitude: number;
  neighborhoods_served: Address[];
  destinations: Destination[];
  passengers: Passenger;
}

interface LocationState {
  itinerary: ItineraryInfo;
}

export default function ListaPresenca() {
  const history = useHistory();

  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  // useEffect(() => {
  //   if (history.location.state === undefined) {
  //     history.push({ pathname: "/itinerarios" });
  //   } else {
  //     const infos = history.location.state as LocationState;
  //     getItineraryPassengers(infos.itinerary.id_itinerary).then((response) => {
  //       setPassengers(response.data);
  //     });
  //   }
  // }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Lista de Presença"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent fullscreen>
        {passengers.length !== 0 ? (
          passengers.map((passenger, index) => {
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
                </IonCardContent>
              </IonCard>
            );
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

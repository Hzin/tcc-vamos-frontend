import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonToast,
} from "@ionic/react";
import { add, locateOutline, locationOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItineraries } from "../services/api/itineraries";
import { PageHeader } from "../components/PageHeader";
import { useHistory, useLocation } from "react-router";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";

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
}

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

export default function MeusItinerarios() {
  const [routes, setRoutes] = useState<ItineraryInfo[]>([]);
  
  const location = useLocation<LocationState>();
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }
  }, [location.state, history]);

  useEffect(() => {
    getItineraries().then((response) => {
      setRoutes(response.data);
    });
  }, [])

  return (
    <IonPage>
      <PageHeader
        pageName="Meus Itinerários"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent fullscreen>
        {routes ? (
          routes.map((itinerary, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{itinerary.itinerary_nickname}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                    <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
                    {itinerary.estimated_departure_address}
                  </div>
                  <div className="ml-[0.33rem] mb-[0.4rem]">
                    | 
                  </div>
                  <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                    <IonIcon icon={locationOutline} className="mr-1"></IonIcon>
                    {itinerary.destinations.map((destination, index) => {
                      if (destination.is_final) {
                        return ( 
                          <div key={index}>
                            {destination.formatted_address}
                          </div>
                        )
                      }
                    })}
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })
        ) : (
          <h1 className="m-6">
            Você ainda não possui nenhum itinerário cadastrado!
          </h1>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small" href="/cadastrar-itinerario">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

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

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
} from "@ionic/react";
import { add, locateOutline, locationOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItineraries } from "../services/api/itineraries";
import { PageHeader } from "../components/PageHeader";

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

export default function MeusItinerarios() {
  const [routes, setRoutes] = useState<ItineraryInfo[]>([]);

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
                    {itinerary.destinations.map((destination) => {
                      if (destination.is_final) {
                        return ( 
                          <>
                            {destination.formatted_address}
                          </>
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
      </IonContent>
    </IonPage>
  );
}

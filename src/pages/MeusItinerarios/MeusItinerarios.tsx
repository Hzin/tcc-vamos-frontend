import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, locateOutline, locationOutline } from "ionicons/icons";
import { useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import "./MeusItinerarios.css";

interface ItineraryInfo {
  id_itinerary: number;
  van_plate: string;
  days_of_week: number;
  specific_day: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  available_seats: number;
  price: number;
  itinerary_nickname: string;
}

export default function MeusItinerarios() {
  const [routes, setRoutes] = useState<ItineraryInfo[]>(
    [
    {
      id_itinerary: 1,
      van_plate: 'FSS1918',
      days_of_week: 3,
      specific_day: '24/08/2022',
      estimated_departure_time: '10:00',
      estimated_arrival_time: '12:00',
      available_seats: 20,
      price: 108.20,
      itinerary_nickname: 'Itinerário teste',
    },
    {
      id_itinerary: 1,
      van_plate: 'FSS1918',
      days_of_week: 3,
      specific_day: '24/08/2022',
      estimated_departure_time: '10:00',
      estimated_arrival_time: '12:00',
      available_seats: 20,
      price: 108.20,
      itinerary_nickname: 'Itinerário teste 2',
    },
    {
      id_itinerary: 1,
      van_plate: 'FSS1918',
      days_of_week: 3,
      specific_day: '24/08/2022',
      estimated_departure_time: '10:00',
      estimated_arrival_time: '12:00',
      available_seats: 20,
      price: 108.20,
      itinerary_nickname: 'Itinerário teste',
    },
    {
      id_itinerary: 1,
      van_plate: 'FSS1918',
      days_of_week: 3,
      specific_day: '24/08/2022',
      estimated_departure_time: '10:00',
      estimated_arrival_time: '12:00',
      available_seats: 20,
      price: 108.20,
      itinerary_nickname: 'Itinerário teste',
    },
    {
      id_itinerary: 1,
      van_plate: 'FSS1918',
      days_of_week: 3,
      specific_day: '24/08/2022',
      estimated_departure_time: '10:00',
      estimated_arrival_time: '12:00',
      available_seats: 20,
      price: 108.20,
      itinerary_nickname: 'Itinerário teste',
    },
  ]
  );

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
                  <div className="addresses-itinerary">
                    <IonIcon icon={locateOutline}></IonIcon>
                    Rua Francisco Glicerio, nº 100, Vila Novam aaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </div>
                  <div className="icons-location-divider">
                    | 
                  </div>
                  <div className="addresses-itinerary">
                    <IonIcon icon={locationOutline}></IonIcon>
                    PUC Campinas H15 Campus 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })
        ) : (
          <h1 className="msg-not-found">
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

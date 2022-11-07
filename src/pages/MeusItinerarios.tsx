import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { add, closeOutline, locateOutline, locationOutline, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getItineraries } from "../services/api/itineraries";
import { PageHeader } from "../components/PageHeader";
import { useHistory, useLocation } from "react-router";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";
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
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

export default function MeusItinerarios() {
  const [itineraries, setItineraries] = useState<ItineraryInfo[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryInfo>();
  
  const location = useLocation<LocationState>();
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [showModalEditItinerary, setShowModalEditItinerary] = useState(false);
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
      setItineraries(response.data);
    });
  }, [])

  function editItinerary(itinerary: ItineraryInfo) {
    history.push("/editar-itinerario", { itinerary });
  }
  
  function seeAttendanceList(itinerary: ItineraryInfo) {
    history.push("/itinerario/passageiros", { itinerary });
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Meus Itinerários"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent fullscreen>
        {itineraries ? (
          itineraries.map((itinerary, index) => {
            return (
              <IonCard key={index} >
                <IonCardHeader onClick={() => editItinerary(itinerary)}>
                  <IonCardTitle>{itinerary.itinerary_nickname} <IonIcon size="small" icon={pencil} /></IonCardTitle>
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
                          <label key={index}>
                            {destination.formatted_address}
                          </label>
                        )
                      }
                    })}
                  </div>
                  <div className="mt-2">
                    <IonButton
                      color="primary"
                      fill="outline"
                      size="small"
                      onClick={() => seeAttendanceList(itinerary)}
                    >
                      Passageiros
                    </IonButton>
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

        <IonModal isOpen={showModalEditItinerary}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>{selectedItinerary ? selectedItinerary.itinerary_nickname : ''}</IonTitle>
              <IonButtons slot="start">
                <IonIcon
                  size="large"
                  icon={closeOutline}
                  onClick={() => setShowModalEditItinerary(false)}
                />
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            {selectedItinerary ? (
              <div>
                <h1>{selectedItinerary.itinerary_nickname}</h1>
                <h1>{selectedItinerary.estimated_departure_address}</h1>
                <h1>{selectedItinerary.estimated_arrival_time}</h1>
              </div>
            ) : (
              <h1>Carregando...</h1>
            )}
          </IonContent>

          <IonFooter>
            <IonButton expand="block">
              Salvar alterações
            </IonButton>
          </IonFooter>
        </IonModal>

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
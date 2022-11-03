import {
  IonButton,
  IonButtons,
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
import { add, closeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useHistory, useLocation } from "react-router";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";

import * as itinerariesService from "../services/functions/itinerariesService";
import * as sessionsService from "../services/functions/sessionsService";

import { Itinerary } from "../models/itinerary.model";
import { CardItinerary } from "../components/CardItinerary";

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

const ItinerariosMeusMotorista: React.FC = () => {
  // const [itineraries, setItineraries] = useState<ItineraryInfo[]>([]);
  // const [selectedItinerary, setSelectedItinerary] = useState<ItineraryInfo>();

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary>();

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
    getUserItineraries()
  }, [])

  const getUserItineraries = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId) return

    const itineraries = await itinerariesService.getByDriverUserId(userId)
    setItineraries(itineraries)
  }

  // function editItinerary(itinerary: ItineraryInfo) {
  function editItinerary(itinerary: Itinerary) {
    // setSelectedItinerary(itinerary);
    // setShowModalEditItinerary(true);
    history.push(`/itinerario/id/${itinerary.id_itinerary}/editar`, { itinerary });
  }

  return (
    <IonPage>
      <PageHeader pageName="Meus itinerários (motorista)" showBackButton />

      <IonContent fullscreen>
        {itineraries ? (
          itineraries.map((itinerary, index) => {
            return (
              <CardItinerary
                key={index}
                itinerary={itinerary}

                visualizeButton={
                  { onClick: () => { history.push(`/itinerario/id/${itinerary.id_itinerary}`); } }
                }

                editButton={
                  { onClick: () => { editItinerary(itinerary) } }
                }
              />


              // return (
              //   <IonCard key={index} onClick={() => editItinerary(itinerary)}>
              //     <IonCardHeader>
              //       <IonCardTitle>{itinerary.itinerary_nickname}</IonCardTitle>
              //     </IonCardHeader>
              //     <IonCardContent>
              //       <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
              //         <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
              //         {itinerary.estimated_departure_address}
              //       </div>
              //       <div className="ml-[0.33rem] mb-[0.4rem]">
              //         |
              //       </div>
              //       <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
              //         <IonIcon icon={locationOutline} className="mr-1"></IonIcon>
              //         {itinerary.destinations.map((destination, index) => {
              //           if (destination.is_final) {
              //             return (
              //               <label key={index}>
              //                 {destination.formatted_address}
              //               </label>
              //             )
              //           }
              //         })}
              //       </div>
              //     </IonCardContent>
              //   </IonCard>
              // );

            )
          })
        ) : (
          <h1 className="m-6">
            Você ainda não possui nenhum itinerário cadastrado!
          </h1>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small" onClick={() => { history.push("/cadastrar-itinerario") }}>
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

export default ItinerariosMeusMotorista
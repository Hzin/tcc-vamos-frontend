import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useHistory, useLocation } from "react-router";
import { Color } from "@ionic/core";

import * as itinerariesService from "../services/functions/itinerariesService";
import * as sessionsService from "../services/functions/sessionsService";

import { Itinerary } from "../models/itinerary.model";
import { CardItinerary } from "../components/CardItinerary";


interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const ItinerariosMeusPassageiro: React.FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const history = useHistory();

  useEffect(() => {
    getPassengerItineraries()
  }, [])

  const getPassengerItineraries = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId) return

    const itineraries = await itinerariesService.getByPassengerUserId(userId)
    setItineraries(itineraries)
  }

  return (
    <IonPage>
      <PageHeader pageName="Meus itinerários (passageiro)" showBackButton />

      <IonContent fullscreen>
        {(itineraries && itineraries.length !== 0) ? (
          itineraries.map((itinerary, index) => {
            return (
              <CardItinerary
                key={index}
                itinerary={itinerary}

                visualizeButton={
                  { onClick: () => { history.push(`/itinerario/id/${itinerary.id_itinerary}`); } }
                }
              />
            )
          })
        ) : (
          <h1 className="m-6">
            Você ainda não é passageiro de nenhum itinerário!
          </h1>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ItinerariosMeusPassageiro
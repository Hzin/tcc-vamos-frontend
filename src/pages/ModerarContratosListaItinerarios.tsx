import { IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";

import * as sessionsService from "../services/functions/sessionsService";
import * as itinerariesService from "../services/functions/itinerariesService";
import { Itinerary } from "../models/itinerary.model";
import { CardInfoBasic } from "../components/CardInfoBasic";
import { CardItinerary } from "../components/CardItinerary";

const ModerarContratosListaItinerarios: React.FC = () => {
  const history = useHistory();

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const [hasPassengerRequests, setHasPassengerRequests] = useState(false)

  useEffect(() => {
    getDriverItineraries()
  }, []);

  const getDriverItineraries = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId) return

    const itineraries = await itinerariesService.getByDriverUserId(userId)
    setItineraries(itineraries)
  }

  const checkRequests = (id_itinerary: string) => {
    history.push(`/itinerario/meus/motorista/contratos/moderar/itinerario/id/${id_itinerary}`)
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Solicitações de contrato (itinerários)"
        backButtonPageUrl="/perfil"
      />

      <IonContent>
        <IonList>
          <CardInfoBasic size="small" message="Um itinerário esmaecido não contém pedidos de contrato." />
          {itineraries && itineraries.length !== 0 ? (
            itineraries.map((itinerary, index) => (
              <CardItinerary
                key={index}
                disabled={!(itinerary.passengerRequests && itinerary.passengerRequests.length !== 0)}
                itinerary={itinerary}

                visualizeButton={
                  { label: 'Ver requisições', onClick: () => checkRequests("" + itinerary.id_itinerary) }
                }

                badge={(itinerary.passengerRequests && itinerary.passengerRequests.length !== 0) ? itinerary.passengerRequests.length : undefined}
              />
            ))
          ) : (
            <div className="ion-padding">
              Você não possui itinerários!
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ModerarContratosListaItinerarios;

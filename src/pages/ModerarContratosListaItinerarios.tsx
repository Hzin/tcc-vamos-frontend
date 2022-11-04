import { IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";

import * as sessionsService from "../services/functions/sessionsService";
import * as itinerariesService from "../services/functions/itinerariesService";
import { CardItineraryRequestContractModerar } from "../components/CardItineraryRequestContractModerar";
import { Itinerary } from "../models/itinerary.model";
import { CardInfoBasic } from "../components/CardInfoBasic";

const ModerarContratosListaItinerarios: React.FC = () => {
  const history = useHistory();

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    getDriverItineraries()
  }, []);

  const getDriverItineraries = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId) return

    const itineraries = await itinerariesService.getByDriverUserId(userId)
    setItineraries(itineraries)
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Solicitações de contrato"
        backButtonPageUrl="/perfil"
      />

      <IonContent>
        <IonList>
          <CardInfoBasic size="small" message="Um itinerário esmaecido não contém pedidos de contrato." />


          {itineraries && itineraries.length !== 0 ? (
            itineraries.map((itinerary, index) => <CardItineraryRequestContractModerar key={index} itinerary={itinerary} />)
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

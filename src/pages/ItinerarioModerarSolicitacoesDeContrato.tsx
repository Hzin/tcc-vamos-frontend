import { IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";

import * as sessionsService from "../services/functions/sessionsService";
import * as itinerariesService from "../services/functions/itinerariesService";
import PassengerRequest from "../models/passengerRequest.model";
import { CardPassengerRequestContract } from "../components/CardPassengerRequestContract";


const ItinerarioModerarSolicitacoesDeContrato: React.FC = () => {
  const history = useHistory();

  const [contracts, setContracts] = useState<PassengerRequest[]>([]);

  useEffect(() => {
    getDriverItinerariesPendingContracts()
  }, []);

  const getDriverItinerariesPendingContracts = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId) return

    let passengerRequests: PassengerRequest[] = []

    const itineraries = await itinerariesService.getByDriverUserId(userId)
    itineraries.forEach(async (itinerary) => {
      const itineraryPendingContractRequests = await itinerariesService.getPendingContractRequests("" + itinerary.id_itinerary)
      passengerRequests = passengerRequests.concat(itineraryPendingContractRequests)
    })

    setContracts(passengerRequests)
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Moderar solicitações de contrato"
        backButtonPageUrl="/perfil"
      />

      <IonContent>
        <IonList>
          {contracts && contracts.length !== 0 ? (
            contracts.map((contract, index) => {
              return (
                <CardPassengerRequestContract key={index} contract={contract} />
              )
            })
          ) : (
            <div className="ion-padding">
              Não há solicitações de contrato para moderar!
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ItinerarioModerarSolicitacoesDeContrato;

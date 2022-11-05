import { IonButton, IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";

import * as itinerariesService from "../services/functions/itinerariesService";
import * as passengersRequestsService from "../services/functions/passengersRequestsService";

import { PassengerRequest } from "../models/passengerRequest.model";

import { PageHeader } from "../components/PageHeader";
import { CardContract } from "../components/CardContract";

import ContratoResumo from "./ContratoResumo";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { User } from "../models/user.model";
import { Itinerary } from "../models/itinerary.model";
import { ShowContratoResumoPageAsModal } from "../components/ShowPageAsModal/ShowContratoResumoPageAsModal";

import { SearchData, ContractData } from "../constants/InterfaceContractInfo";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ModerarContratosListaContratos: React.FC<ScanNewProps> = (props) => {
  const [contracts, setContracts] = useState<PassengerRequest[]>([]);

  const [paramIdPassengerRequest, setParamIdPassengerRequest] = useState('')

  useEffect(() => {
    if (!(props.match && props.match.params.id)) return

    getItineraryPendingContracts(props.match.params.id)
  }, []);

  const getItineraryPendingContracts = async (itineraryId: string) => {
    const itineraries = await itinerariesService.getPendingContractRequests(itineraryId)
    setContracts(itineraries)
  }

  const seeContract = async (id_passenger_request: number) => {
    setParamIdPassengerRequest("" + id_passenger_request)
    document.getElementById(`modal-contrato-${paramIdPassengerRequest}`)?.click()
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Solicitações de contrato"
        backButtonPageUrl="/perfil"
      />

      <IonContent>
        <IonList>
          {contracts && contracts.length !== 0 ? (
            contracts.map((contract, index) => <CardContract key={index} contract={contract} onClickFunction={() => seeContract(contract.id_passenger_request)} />)
          ) : (
            <div className="ion-padding">
              Esse itinerário não tem requisições de contrato pendentes!
            </div>
          )}
        </IonList>

        <ShowContratoResumoPageAsModal
          trigger={`modal-contrato-${paramIdPassengerRequest}`}

          id_passenger_request={paramIdPassengerRequest}

          noHeaderBackButton
          showContractModerateButton
        />
      </IonContent>
    </IonPage>
  );
};

export default ModerarContratosListaContratos;

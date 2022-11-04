import { IonButton, IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";

import * as itinerariesService from "../services/functions/itinerariesService";
import { PassengerRequest } from "../models/passengerRequest.model";

import { getUserFullName } from "../services/utils";

import { PageHeader } from "../components/PageHeader";
import { CardContract } from "../components/CardContract";
import { ShowPageAsModal } from "../components/ShowPageAsModal";

import ContratoResumo, { LocationState } from "./ContratoResumo";
import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ModerarContratosListaContratos: React.FC<ScanNewProps> = (props) => {
  const [contracts, setContracts] = useState<PassengerRequest[]>([]);

  const [modalOpen, setModalOpen] = useState(false)
  const [modalParamId, setModalParamId] = useState('')

  const [searchData, setSearchData] = useState<InterfaceItinerarySearchData>()
  const [contractData, setContractData] = useState<{ type: itineraryContractTypes }>()
  const [passengerName, setPassengerName] = useState('')

  useEffect(() => {
    if (!(props.match && props.match.params.id)) return

    getItineraryPendingContracts(props.match.params.id)
  }, []);

  const getItineraryPendingContracts = async (itineraryId: string) => {
    const itineraries = await itinerariesService.getPendingContractRequests(itineraryId)
    setContracts(itineraries)
  }

  const seeContract = (id_passenger_request: number) => {
    // pega o tipo do contrato pelo id_passenger_request
    let contractFound: PassengerRequest | undefined
    contracts.forEach((contract) => {
      if (contract.id_passenger_request === id_passenger_request) contractFound = contract
    })

    if (!contractFound) return

    setModalParamId(contractFound.itinerary_id)

    setSearchData({
      period: contractFound.period,
      lat_origin: contractFound.lat_origin,
      lng_origin: contractFound.lng_origin,
      formatted_address_origin: contractFound.formatted_address_origin,
      lat_destination: contractFound.lat_destination,
      lng_destination: contractFound.lng_destination,
      formatted_address_destination: contractFound.formatted_address_destination,
    })

    setContractData({
      type: contractFound.contract_type
    })

    setPassengerName(getUserFullName(contractFound.user))

    document.getElementById('modal-contrato')?.click()
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

        {/* como passar itineraryId em paramId? e também preciso passar contractData */}
        <ShowPageAsModal
          trigger="modal-contrato"

          page={ContratoResumo}
          paramId={modalParamId}
          searchData={searchData}
          contractData={contractData}
          passengerName={passengerName}

          noHeaderBackButton
        />

        <IonButton className="invisible" id='modal-contrato' />
      </IonContent>
    </IonPage>
  );
};

export default ModerarContratosListaContratos;

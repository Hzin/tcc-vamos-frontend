import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

import type { JSX } from '@ionic/core/components';

import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";

interface ComponentProps extends JSX.IonModal {
  page: React.FC<any>,
  // id: string;

  noHeaderBackButton?: boolean

  paramId?: string
  fileUrl?: string

  searchData?: InterfaceItinerarySearchData,
  contractData?: {
    type: itineraryContractTypes;
  };
  passengerName?: string;
}

export const ShowPageAsModal = (props: ComponentProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const {
    page,

    noHeaderBackButton,

    paramId,
    fileUrl,

    searchData,
    contractData,
    passengerName,

    ...otherProps
  } = props

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <IonModal ref={modal} {...otherProps}>
      <props.page
        // itinerary_id
        paramId={props.paramId}

        // mostra arquivo em Meu Veículo
        fileUrl={props.fileUrl}

        // mostra conteúdos em ContratoResumo
        searchData={props.searchData}
        contractData={props.contractData}
        passengerName={props.passengerName}

        noHeaderBackButton
      />

      <IonFooter>
        <IonToolbar>
          <IonButton onClick={handleDismissModal} expand="full">Voltar</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  )
}
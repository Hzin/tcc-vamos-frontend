import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

import type { JSX } from '@ionic/core/components';

import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { User } from "../models/user.model";
import { Itinerary } from "../models/itinerary.model";

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

  passenger?: User;
  itinerary?: Itinerary;

  showContractModerateButton?: boolean
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

    passenger,
    itinerary,

    showContractModerateButton,

    ...otherProps
  } = props

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <IonModal ref={modal} {...otherProps}>
      <props.page
        noHeaderBackButton

        // itinerary_id
        paramId={props.paramId}

        // mostra arquivo em Meu Veículo
        fileUrl={props.fileUrl}

        // mostra conteúdos em ContratoResumo
        searchData={props.searchData}
        contractData={props.contractData}

        passenger={props.passenger}
        itinerary={props.itinerary}

        // mostra botões de aprovar e recusar requisição de contrato em ContratoResumo
        showContractModerateButton
      />

      <IonFooter>
        <IonToolbar>
          <IonButton onClick={handleDismissModal} expand="full">Voltar</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  )
}
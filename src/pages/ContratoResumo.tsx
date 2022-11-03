
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Color } from "@ionic/core"

import { PageHeader } from "../components/PageHeader";

import { getUserFullName, convertNumberToPrice, formatTimeField, convertDaysOfWeekToObject } from "../services/utils";

import * as itinerariesService from "../services/functions/itinerariesService";
import { Itinerary } from "../models/itinerary.model";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { calendarClearOutline, calendarNumberOutline, cashOutline, cashSharp, documentTextOutline, locateOutline, navigateOutline, personOutline, timeOutline, timeSharp } from "ionicons/icons";
import { ChipsItineraryDaysOfWeek } from "../components/ChipsItineraryDaysOfWeek";
import { ModalInfoEntendi } from "../components/ModalInfoEntendi";
import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";

interface ContractDetailSumaryItemProps {
  label: string;
  value: string;
  icon?: string;
  noAboveSpacing?: boolean
  fontColor?: Color;
}

const ContractDetailSumaryItem = (props: ContractDetailSumaryItemProps) => {
  return (
    <>
      <IonItem className={props.noAboveSpacing ? '' : 'mt-1'}>
        {/* {props.icon && (<IonIcon icon={documentTextOutline} />)} */}
        <IonIcon className={props.icon ? 'visible' : 'invisible'} icon={props.icon} />

        <IonLabel className="ml-2">{props.label}</IonLabel>
        {/* <IonLabel slot='end'>{props.value}</IonLabel> */}
        <IonText slot='end' color={props.fontColor ? props.fontColor : 'primary'}>{props.value}</IonText>
      </IonItem>
    </>
  );
};

interface LocationState {
  searchData: InterfaceItinerarySearchData,
  contractData: {
    type: itineraryContractTypes;
  };
}

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ContratoResumo: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [presentAlertConfirmation] = useIonAlert();

  const [itinerary, setItinerary] = useState<Itinerary>()
  const [contractType, setContractType] = useState('')

  const [modalInfoShow, setModalInfoShow] = useState(false)
  const [modalInfoHeader, setModalInfoHeader] = useState('')
  const [modalInfoMessages, setModalInfoMessages] = useState<string[]>([])

  useEffect(() => {
    loadItineraryData()

    switch (location.state.contractData.type) {
      case itineraryContractTypes.recurring:
        setContractType('Recorrente')
        break;
      case itineraryContractTypes.avulse:
        setContractType('Avulso')
        break;
    }
  }, [])

  const loadItineraryData = async () => {
    const itineraryId = props.match.params.id;
    const itinerary = await itinerariesService.getById(itineraryId)
    setItinerary(itinerary)
  };

  const showConfirmAlert = async () => {
    const message = "Confirmar envio do contrato?";

    presentAlertConfirmation({
      header: message,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirmAction",
        },
      ],

      onDidDismiss: async (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return

        if (!itinerary) return

        const body: itinerariesService.CreateContractRequestRequest = {
          id_itinerary: itinerary.id_itinerary,
          contract_type: location.state.contractData.type,
          lat_origin: location.state.searchData.lat_origin, // number;
          lng_origin: location.state.searchData.lng_origin, // number;
          formatted_address_origin: location.state.searchData.formatted_address_origin, // string;
          lat_destination: location.state.searchData.lat_destination, // number;
          lng_destination: location.state.searchData.lng_destination, // number;
          formatted_address_destination: location.state.searchData.formatted_address_destination, // string;
        }

        const response = await itinerariesService.createContractRequest(body)

        setModalInfoShow(true)
        setModalInfoHeader(response.message)
        setModalInfoMessages([
          'Sua solicitação de contrato foi enviada ao motorista, será analisada e você será notificado com o resultado da solicitação.',
        ])
      },
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Resumo do contrato" showBackButton />

      <IonContent>
        {itinerary &&
          <>
            <IonList>
              <IonListHeader>Detalhes gerais</IonListHeader>

              <ContractDetailSumaryItem
                label="Tipo de contrato"
                value={contractType}
                icon={documentTextOutline}
                noAboveSpacing
              />

              <ContractDetailSumaryItem
                label="Passageiro"
                value='Nome da pessoa'
                icon={personOutline}
              />

              <ContractDetailSumaryItem
                label="Motorista"
                value={getUserFullName(itinerary.user)}
                icon={personOutline}
              />

              <IonListHeader className="mt-4">Preços</IonListHeader>

              {
                location.state.contractData.type === itineraryContractTypes.recurring &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço mensal" icon={cashSharp} value={convertNumberToPrice(itinerary.monthly_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Dia 01 de cada mês' />
                  </>
                )
              }

              {
                location.state.contractData.type === itineraryContractTypes.avulse &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço da vaga avulsa" icon={cashOutline} value={convertNumberToPrice(itinerary.daily_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Não há' fontColor='danger' />
                  </>
                )
              }

              <IonListHeader className="mt-4">Itinerário</IonListHeader>
              {location.state.contractData.type === itineraryContractTypes.recurring ?
                (
                  <>
                    <ChipsItineraryDaysOfWeek showCalendarIcon itineraryDaysOfWeek={convertDaysOfWeekToObject(itinerary.days_of_week)} />
                  </>
                ) :
                (
                  <>
                    <ContractDetailSumaryItem label="Data da viagem" icon={calendarNumberOutline} value='INSERIR' />
                  </>
                )
              }

              <ContractDetailSumaryItem label="Origem" icon={locateOutline} value='INSERIR' />
              <ContractDetailSumaryItem label="Destino" icon={navigateOutline} value='INSERIR' />
              <ContractDetailSumaryItem label='Horário de estimado saída' icon={timeOutline} value={formatTimeField(itinerary.estimated_departure_time)} />
              <ContractDetailSumaryItem label='Horário de estimado chegada' icon={timeSharp} value={formatTimeField(itinerary.estimated_arrival_time)} />
            </IonList>
          </>
        }
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className="flex justify-between">
            <div>
              <IonButton fill='outline' onClick={history.goBack}>Cancelar</IonButton>
            </div>
            <div>
              <IonButton className="mr-1" color='success' onClick={showConfirmAlert}>Confirmar</IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonFooter>

      <ModalInfoEntendi isOpen={modalInfoShow} header={modalInfoHeader} messages={modalInfoMessages} />
    </IonPage>
  );
};

export default ContratoResumo;
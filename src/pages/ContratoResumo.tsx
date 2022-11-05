
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
import { useHistory } from "react-router-dom";

import { Color } from "@ionic/core"

import { PageHeader } from "../components/PageHeader";

import { getUserFullName, convertNumberToPrice, formatTimeField, convertDaysOfWeekToObject } from "../services/utils";

import * as itinerariesService from "../services/functions/itinerariesService";
import * as sessionsService from "../services/functions/sessionsService";
import * as usersService from "../services/functions/usersService";
import * as passengersRequestsService from "../services/functions/passengersRequestsService";

import { Itinerary } from "../models/itinerary.model";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { calendarClearOutline, calendarNumberOutline, cashOutline, cashSharp, documentTextOutline, locateOutline, navigateOutline, personOutline, timeOutline, timeSharp } from "ionicons/icons";
import { ChipsItineraryDaysOfWeek } from "../components/ChipsItineraryDaysOfWeek";
import { ModalInfoEntendi, RedirectData } from "../components/ModalInfoEntendi";
import { User } from "../models/user.model";
import { PassengerRequestStatusTypes } from "../constants/enumPassengerRequestStatusTypes";
import EnumUtils from "../services/EnumUtils";

import { SearchData, ContractData } from "../constants/InterfaceContractInfo";

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

const ContractPlaceDetailSumaryItem = (props: ContractDetailSumaryItemProps) => {
  return (
    <>
      <IonItem lines='none' className={props.noAboveSpacing ? '' : 'mt-1'}>
        <IonIcon className={props.icon ? 'visible' : 'invisible'} icon={props.icon} />

        <IonLabel className="ml-2">{props.label}</IonLabel>
      </IonItem>
      <IonItem>
        <IonText color={props.fontColor ? props.fontColor : 'primary'}>{props.value}</IonText>
      </IonItem>
    </>
  );
};

export interface ContratoResumoProps {
  id_itinerary?: string;
  id_passenger_request?: string

  searchData?: SearchData,

  passenger?: User;
  itinerary?: Itinerary;

  noHeaderBackButton?: boolean
  showContractButton?: boolean,
  showContractModerateButton?: boolean,
}

const ContratoResumo: React.FC<ContratoResumoProps> = (props) => {
  const history = useHistory();

  const [presentAlertConfirmation] = useIonAlert();

  // location contract info
  const [itinerary, setItinerary] = useState<Itinerary>()
  const [searchData, setSearchData] = useState<SearchData>()
  const [contractData, setContractData] = useState<ContractData>()
  const [passenger, setPassenger] = useState<User>()
  const [driver, setDriver] = useState<User>()

  const [modalInfoShow, setModalInfoShow] = useState(false)
  const [modalInfoHeader, setModalInfoHeader] = useState('')
  const [modalInfoMessages, setModalInfoMessages] = useState<string[]>([])
  const [modalInfoRedirectData, setModalInfoRedirectData] = useState<RedirectData>()

  useEffect(() => {
    loadData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    let itineraryId = ''

    if (props.id_itinerary) {
      const itinerary = await itinerariesService.getById(itineraryId)
      if (itinerary) setItinerary(itinerary)
    }

    if (props.id_passenger_request) {
      const response = await passengersRequestsService.getPassengerRequestInfoForContractSummary(+props.id_passenger_request)
      if (response) {
        setSearchData({
          period: response.searchData.period,
          lat_origin: response.searchData.lat_origin,
          lng_origin: response.searchData.lng_origin,
          formatted_address_origin: response.searchData.formatted_address_origin,
          lat_destination: response.searchData.lat_destination,
          lng_destination: response.searchData.lng_destination,
          formatted_address_destination: response.searchData.formatted_address_destination,
        })

        setContractData({
          type: response.contractData.type,
        })

        setPassenger(response.passenger)
        setDriver(response.itinerary.user)

        setItinerary(response.itinerary)
      }
    }

    // if (props.passenger) setPassengerName(getUserFullName(props.passenger))
    // else {
    //   const refreshSessionInfo = await sessionsService.refreshSession()
    //   if (!refreshSessionInfo.userId) return
    //   const user = await usersService.getById(refreshSessionInfo.userId)
    //   setPassengerName(`${getUserFullName(user)} (você)`)
    // }
  };

  const showConfirmRequestContractAlert = async () => {
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

        if (!itinerary || !searchData || !contractData) return

        const body = {
          period: searchData.period,
          contract_type: contractData.type,
          lat_origin: searchData.lat_origin,
          lng_origin: searchData.lng_origin,
          formatted_address_origin: searchData.formatted_address_origin,
          lat_destination: searchData.lat_destination,
          lng_destination: searchData.lng_destination,
          formatted_address_destination: searchData.formatted_address_destination,
        }

        const response = await itinerariesService.createContractRequest({ id_itinerary: itinerary.id_itinerary, body })

        setModalInfoHeader(response.message)
        setModalInfoMessages([
          'Sua solicitação de contrato foi enviada ao motorista.',
          'Agora ela será analisada e você será notificado assim que o motorista decidir a aprovação.'
        ])
        setModalInfoRedirectData({
          url: '/home'
        })

        setModalInfoShow(true)
      },
    });
  };

  const showConfirmUpdateContractStatusAlert = async (action: 'approve' | 'reject') => {
    let message = ''

    switch (action) {
      case 'approve':
        message = 'Confirma APROVAÇÃO do contrato?'
        break;
      case 'reject':
        message = 'Confirma REJEIÇÃO do contrato?'
        break;
      default:
        break;
    }

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

        if (!passenger || !itinerary) return

        switch (action) {
          case 'approve':
            const responseApproved = await itinerariesService.updateContractStatus({ id_itinerary: "" + itinerary.id_itinerary, id_user: passenger.id_user, status: PassengerRequestStatusTypes.accepted })

            setModalInfoHeader(responseApproved.message)
            setModalInfoMessages([
              `Agora ${getUserFullName(passenger)} é um passageiro do seu itinerário!`,
              `Ele(a) será notificado(a) sobre a aprovação e em breve vocês iniciarão a sua viagem.`
            ])
            break;
          case 'reject':
            const responseRejected = await itinerariesService.updateContractStatus({ id_itinerary: "" + itinerary.id_itinerary, id_user: passenger.id_user, status: PassengerRequestStatusTypes.rejected })

            setModalInfoHeader(responseRejected.message)
            setModalInfoMessages([
              `A requisição de contrato de ${getUserFullName(passenger)} foi rejeitada.`,
              `Ele(a) será notificado(a) sobre a rejeição do contrato.`
            ])


            setModalInfoShow(true)
            break
        }

        setModalInfoRedirectData({
          url: `/itinerario/meus/motorista/contratos/moderar/itinerario/id/${itinerary.id_itinerary}`
        })

        setModalInfoShow(true)
      },
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Resumo do contrato" showBackButton={!props.noHeaderBackButton} />

      <IonContent>
        {(itinerary && searchData && contractData) && (
          <>
            <IonList>
              <IonListHeader>Detalhes gerais</IonListHeader>

              <ContractDetailSumaryItem
                label="Tipo de contrato"
                value={EnumUtils.getContractTypeEnumFormatted(contractData.type)}
                icon={documentTextOutline}
                noAboveSpacing
              />

              {passenger && (
                <ContractDetailSumaryItem
                  label="Passageiro"
                  value={getUserFullName(passenger)}
                  icon={personOutline}
                />
              )}

              {driver && (
                <ContractDetailSumaryItem
                  label="Motorista"
                  value={getUserFullName(driver)}
                  icon={personOutline}
                />
              )}

              <IonListHeader className="mt-4">Preços</IonListHeader>

              {contractData.type === itineraryContractTypes.recurring &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço mensal" icon={cashSharp} value={convertNumberToPrice(itinerary.monthly_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Dia 01 de cada mês' />
                  </>
                )
              }

              {contractData.type === itineraryContractTypes.avulse &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço da vaga avulsa" icon={cashOutline} value={convertNumberToPrice(itinerary.daily_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Não há' fontColor='danger' />
                  </>
                )
              }

              <IonListHeader className="mt-4">Itinerário</IonListHeader>
              {contractData.type === itineraryContractTypes.recurring ?
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

              {searchData && (
                <>
                  <ContractPlaceDetailSumaryItem label="Origem" icon={locateOutline} value={searchData.formatted_address_origin} />
                  <ContractPlaceDetailSumaryItem label="Destino" icon={navigateOutline} value={searchData.formatted_address_destination} />
                  <ContractDetailSumaryItem label='Período' icon={timeOutline} value={EnumUtils.getSchoolPeriodEnumFormatted(searchData.period)} />
                </>
              )}

              {itinerary && (
                <>
                  <ContractDetailSumaryItem label='Horário de estimado saída' icon={timeOutline} value={formatTimeField(itinerary.estimated_departure_time)} />
                  <ContractDetailSumaryItem label='Horário de estimado chegada' icon={timeSharp} value={formatTimeField(itinerary.estimated_arrival_time)} />
                </>
              )}
            </IonList>
          </>
        )}
      </IonContent>

      {(props.showContractButton || props.showContractModerateButton) && (
        <>
          {/* botões do passageiro contratar o motorista */}
          <IonFooter>
            {props.showContractButton && (
              <>
                <IonToolbar>
                  <div className="flex justify-between">
                    <div>
                      <IonButton fill='outline' onClick={history.goBack}>Cancelar</IonButton>
                    </div>
                    <div>
                      <IonButton className="mr-1" color='success' onClick={showConfirmRequestContractAlert}>Confirmar</IonButton>
                    </div>
                  </div>
                </IonToolbar>
              </>
            )}

            {/* botões do motorista aceitar ou recusar o contrato do passageiro */}
            {props.showContractModerateButton && (
              <>
                <IonToolbar>
                  <div className="flex justify-between">
                    <div>
                      <IonButton expand="block" fill='outline' color='danger' onClick={() => { showConfirmUpdateContractStatusAlert('reject') }}>Recusar</IonButton>
                    </div>
                    <div>
                      <IonButton expand="block" className="mr-1" color='success' onClick={() => { showConfirmUpdateContractStatusAlert('approve') }}>Aprovar</IonButton>
                    </div>
                  </div>
                </IonToolbar>
              </>
            )}
          </IonFooter>
        </>
      )}

      <ModalInfoEntendi
        isOpen={modalInfoShow}
        header={modalInfoHeader}
        messages={modalInfoMessages}
        redirectData={modalInfoRedirectData}
      />
    </IonPage>
  );
};

export default ContratoResumo;
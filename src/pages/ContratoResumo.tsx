
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
import * as sessionsService from "../services/functions/sessionsService";
import * as usersService from "../services/functions/usersService";

import { Itinerary } from "../models/itinerary.model";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { calendarClearOutline, calendarNumberOutline, cashOutline, cashSharp, contract, documentTextOutline, locateOutline, navigateOutline, personOutline, school, schoolSharp, timeOutline, timeSharp } from "ionicons/icons";
import { ChipsItineraryDaysOfWeek } from "../components/ChipsItineraryDaysOfWeek";
import { ModalInfoEntendi, RedirectData } from "../components/ModalInfoEntendi";
import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";
import { User } from "../models/user.model";
import { PassengerRequestStatusTypes } from "../constants/enumPassengerRequestStatusTypes";
import EnumUtils from "../services/EnumUtils";

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

export interface LocationState {
  searchData?: InterfaceItinerarySearchData,
  contractData?: {
    type: itineraryContractTypes;
  };
}

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };

  paramId?: string

  searchData?: InterfaceItinerarySearchData,
  contractData?: {
    type: itineraryContractTypes;
  };

  passenger?: User;
  itinerary?: Itinerary;

  showContractButton?: boolean,
  showContractModerateButton?: boolean,

  noHeaderBackButton?: boolean
}

const ContratoResumo: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [presentAlertConfirmation] = useIonAlert();

  const [itinerary, setItinerary] = useState<Itinerary>()
  const [contractType, setContractType] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [periodName, setPeriodName] = useState('')

  const [searchData, setSearchData] = useState<InterfaceItinerarySearchData>()
  const [contractData, setContractData] = useState<{ type: itineraryContractTypes }>()

  const [modalInfoShow, setModalInfoShow] = useState(false)
  const [modalInfoHeader, setModalInfoHeader] = useState('')
  const [modalInfoMessages, setModalInfoMessages] = useState<string[]>([])
  const [modalInfoRedirectData, setModalInfoRedirectData] = useState<RedirectData>()

  useEffect(() => {
    loadItineraryData()

    if (location.state) {
      if (location.state.searchData) {
        setSearchData(location.state.searchData)
        setPeriodName(EnumUtils.getSchoolPeriodEnumFormatted(location.state.searchData.period))
      }
      if (location.state.contractData) {
        setContractData(location.state.contractData)
        setContractType(EnumUtils.getContractTypeEnumFormatted(location.state.contractData.type))
      }
    }

    if (props.searchData) {
      setSearchData(props.searchData)
      setPeriodName(EnumUtils.getSchoolPeriodEnumFormatted(props.searchData.period))
    }

    if (props.contractData) {
      setContractData(props.contractData)
      setContractType(EnumUtils.getContractTypeEnumFormatted(props.contractData.type))
    }

    loadPassengerData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadItineraryData = async () => {
    let itineraryId = ''

    if (props.paramId) itineraryId = props.paramId
    else if (props.match && props.match.params.id) itineraryId = props.match.params.id
    else history.goBack()

    const itinerary = await itinerariesService.getById(itineraryId)
    setItinerary(itinerary)
  };

  const loadPassengerData = async () => {
    const refreshSessionInfo = await sessionsService.refreshSession()
    if (!refreshSessionInfo.userId) return

    const user = await usersService.getById(refreshSessionInfo.userId)

    if (props.passenger) setPassengerName(getUserFullName(props.passenger))
    else setPassengerName(`${getUserFullName(user)} (você)`)
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
          url: ''
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

        if (!props.passenger || !props.itinerary) return

        switch (action) {
          case 'approve':
            const responseApproved = await itinerariesService.updateContractStatus({ id_itinerary: "" + props.itinerary.id_itinerary, id_user: props.passenger.id_user, status: PassengerRequestStatusTypes.accepted })

            setModalInfoHeader(responseApproved.message)
            setModalInfoMessages([
              `Agora ${getUserFullName(props.passenger)} é um passageiro do seu itinerário!`,
              `Ele(a) será notificado(a) sobre a aprovação e em breve vocês iniciarão a sua viagem.`
            ])
            break;
          case 'reject':
            const responseRejected = await itinerariesService.updateContractStatus({ id_itinerary: "" + props.itinerary.id_itinerary, id_user: props.passenger.id_user, status: PassengerRequestStatusTypes.rejected })

            setModalInfoHeader(responseRejected.message)
            setModalInfoMessages([
              `A requisição de contrato de ${getUserFullName(props.passenger)} foi rejeitada.`,
              `Ele(a) será notificado(a) sobre a rejeição do contrato.`
            ])


            setModalInfoShow(true)
            break
        }

        setModalInfoRedirectData({
          url: `/itinerario/meus/motorista/contratos/moderar/itinerario/id/${props.itinerary.id_itinerary}`
        })

        setModalInfoShow(true)
      },
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Resumo do contrato" showBackButton={!props.noHeaderBackButton} />

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
                value={passengerName}
                icon={personOutline}
              />

              <ContractDetailSumaryItem
                label="Motorista"
                value={getUserFullName(itinerary.user)}
                icon={personOutline}
              />

              <IonListHeader className="mt-4">Preços</IonListHeader>

              {
                contractData && contractData.type === itineraryContractTypes.recurring &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço mensal" icon={cashSharp} value={convertNumberToPrice(itinerary.monthly_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Dia 01 de cada mês' />
                  </>
                )
              }

              {
                contractData && contractData.type === itineraryContractTypes.avulse &&
                (
                  <>
                    <ContractDetailSumaryItem label="Preço da vaga avulsa" icon={cashOutline} value={convertNumberToPrice(itinerary.daily_price)} />
                    <ContractDetailSumaryItem label="Data de renovação" icon={calendarClearOutline} value='Não há' fontColor='danger' />
                  </>
                )
              }

              <IonListHeader className="mt-4">Itinerário</IonListHeader>
              {contractData && contractData.type === itineraryContractTypes.recurring ?
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

              {searchData && (<ContractPlaceDetailSumaryItem label="Origem" icon={locateOutline} value={searchData.formatted_address_origin} />)}
              {searchData && (<ContractPlaceDetailSumaryItem label="Destino" icon={navigateOutline} value={searchData.formatted_address_destination} />)}
              <ContractDetailSumaryItem label='Período' icon={timeOutline} value={periodName} />
              <ContractDetailSumaryItem label='Horário de estimado saída' icon={timeOutline} value={formatTimeField(itinerary.estimated_departure_time)} />
              <ContractDetailSumaryItem label='Horário de estimado chegada' icon={timeSharp} value={formatTimeField(itinerary.estimated_arrival_time)} />
            </IonList>
          </>
        }
      </IonContent>

      {(props.showContractButton || props.showContractModerateButton) && (
        <>
          {/* botões de contratar */}
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
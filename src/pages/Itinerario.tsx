// TODO, tentar usar IonAccordion

import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { Color } from "@ionic/core";

import Perfil from "./Perfil";

import * as itinerariesService from "../services/functions/itinerariesService";
import { convertDaysOfWeekToObject, convertNumberToPrice, DaysOfWeekObject, formatTimeField, getFormatedAddresses } from "../services/utils";
import { PageHeader } from "../components/PageHeader";
import { Itinerary } from "../models/itinerary.model";
import { cashOutline, cashSharp, eyeOutline, personOutline, timeOutline, timeSharp } from "ionicons/icons";
import { NeighborhoodServed } from "../models/NeighborhoodServed.model";
import { Destination } from "../models/destination.model";
import { CardInfoBasicIntoAlertInfo } from "../components/CardInfoBasicIntoAlertInfo";
import { ShowPageAsModal } from "../components/ShowPageAsModal";
import { CardItinerary } from "../components/CardItinerary";
import { ChipsItineraryDaysOfWeek } from "../components/ChipsItineraryDaysOfWeek";
import { InterfaceItinerarySearchData } from "../constants/InterfaceItinerarySearchData";

interface ItineraryDetailItemProps {
  label: string;
  icon?: string;
  value: string;
  secondValue?: string;
  color?: Color
}

const ItineraryDetailItem = (props: ItineraryDetailItemProps) => {
  return (
    <>
      <IonItem>
        <IonLabel>{props.label}</IonLabel>

        {props.secondValue && (
          <>
            <IonChip className="min-w-[80px]" color={props.color}>
              <IonLabel className="text-center w-full">{props.secondValue}</IonLabel>
            </IonChip>
          </>
        )}

        <IonChip className="min-w-[80px]">
          <IonIcon icon={props.icon} />
          <IonLabel className="text-center w-full">{props.value}</IonLabel>
        </IonChip>
      </IonItem>
    </>
  );
};

interface ItineraryDetailItemVerProps {
  label: string;
  icon?: string;
  infoString?: string | string[]
  infoObject?: NeighborhoodServed[] | Destination[]
  // infoUser?: User
}

const ItineraryDetailItemVer = (props: ItineraryDetailItemVerProps) => {
  const [presentAlert] = useIonAlert();

  const [info, setInfo] = useState('')

  useEffect(() => {
    // if (!props.infoString && !props.infoObject && !props.infoUser) {
    if (!props.infoString && !props.infoObject) {
      setInfo('Sem informações.')
      return
    }

    if (props.infoString) Array.isArray(props.infoString) ? setInfo(props.infoString.join('\n')) : setInfo(props.infoString)
    if (props.infoObject) setInfo(getFormatedAddresses(props.infoObject).join('\n'))
    // if (props.infoUser) setInfo(convertObjectToString(props.infoUser).join('\n'))
  }, [props])

  const handleShowAlert = (header: string, info: string) => {
    presentAlert({
      header: header,
      message: info,
      buttons: ['Ok'],
    },
    );
  };

  return (
    <>
      <IonItem onClick={() => { handleShowAlert(props.label, info) }}>
        <IonLabel>{props.label}</IonLabel>
        <IonChip color='secondary'>
          <IonIcon icon={eyeOutline} />
          <IonLabel>Ver</IonLabel>
        </IonChip>
      </IonItem>
    </>
  );
};

interface LocationState {
  searchData: InterfaceItinerarySearchData
}

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const Itinerario: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showPageModal, setShowPageModal] = useState(false);

  const [itinerary, setItinerary] = useState<Itinerary>()
  const [itineraryDaysOfWeek, setItineraryDaysOfWeek] = useState<DaysOfWeekObject>()

  useEffect(() => {
    loadItineraryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItineraryData = async () => {
    // let itineraryId = "";

    // TODO, necessário
    // if (!props.match.params.id) history.push({ pathname: "/login" });

    const itineraryId = props.match.params.id;
    const itinerary = await itinerariesService.getById(itineraryId)
    setItinerary(itinerary)

    if (!itinerary) return

    setItineraryDaysOfWeek(convertDaysOfWeekToObject(itinerary.days_of_week))
  };

  return (
    <IonPage>
      <PageHeader
        pageName="Itinerário"
        showBackButton
      ></PageHeader>

      <IonContent>
        {itinerary && (
          <>
            <CardItinerary itinerary={itinerary} onlyHeader />

            <CardInfoBasicIntoAlertInfo
              size="small"
              alertMessage={`${location.state.searchData.formatted_address_origin} -> ${location.state.searchData.formatted_address_destination}`}
              message="Informações de pesquisa atuais"
            />

            <IonList>
              <IonItem onClick={() => { setShowPageModal(true) }}>
                <IonLabel>Motorista</IonLabel>
                <IonChip color='secondary'>
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>Ver perfil</IonLabel>
                </IonChip>
              </IonItem>

              <ItineraryDetailItem label="Preço mensal" icon={cashSharp} value={convertNumberToPrice(itinerary.monthly_price)} />

              <ItineraryDetailItem label='Vaga avulsa' color={itinerary.accept_daily ? "success" : "danger"} icon={cashOutline} value={convertNumberToPrice(itinerary.daily_price)} secondValue={itinerary.accept_daily ? "Aceita" : "Não aceita"} />
              <CardInfoBasicIntoAlertInfo alertMessage="Vagas avulsas são viagens que você usa em um dia específico ao invés de pagar um contrato mensal." message="O que são vagas avulsas?" size="small" />
            </IonList>

            <IonList>
              {/* <IonButton expand="block" color='success'>
                <IonLabel>Contratar</IonLabel>
              </IonButton> */}

              <IonAccordionGroup value="locais">
                <IonAccordion>
                  <IonItem slot="header" color="primary">
                    <IonLabel>Locais</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    {/* <IonListHeader className="mt-4">Locais</IonListHeader> */}
                    <ItineraryDetailItemVer label="Locais atendidos" infoObject={itinerary.neighborhoods_served} />
                    <ItineraryDetailItemVer label="Destinos" infoObject={itinerary.destinations} />
                    <ItineraryDetailItemVer label="Endereço de saída estimado" infoString={itinerary.estimated_departure_address} />
                  </div>
                </IonAccordion>
              </IonAccordionGroup>

              <IonAccordionGroup value="detalhes-gerais" className="mt-1">
                <IonAccordion>
                  {/* <IonListHeader className="mt-4">Detalhes gerais</IonListHeader> */}
                  <IonItem slot="header" color="primary">
                    <IonLabel>Detalhes gerais</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    {/* <IonItem onClick={() => { history.push({ pathname: `/usuario/${itinerary.user.id_user}` }) }}> */}
                    <ItineraryDetailItem label="Lugares disponíveis" icon={personOutline} value={"" + itinerary.available_seats} />


                    {itineraryDaysOfWeek && (
                      <>
                        <ChipsItineraryDaysOfWeek itineraryDaysOfWeek={itineraryDaysOfWeek} />
                      </>
                    )}

                    {itinerary.specific_day && (<ItineraryDetailItem label="Dia específico" value={itinerary.specific_day.toString()} />)}
                  </div>
                </IonAccordion>
              </IonAccordionGroup>

              <IonAccordionGroup value="horarios" className="mt-1">
                <IonAccordion>
                  {/* <IonListHeader className="mt-4">Horários</IonListHeader> */}
                  <IonItem slot="header" color="primary">
                    <IonLabel>Horários</IonLabel>
                  </IonItem>

                  <div className="ion-padding" slot="content">
                    <ItineraryDetailItem label='Horário de estimado saída' icon={timeOutline} value={formatTimeField(itinerary.estimated_departure_time)} />
                    <ItineraryDetailItem label='Horário de estimado chegada' icon={timeSharp} value={formatTimeField(itinerary.estimated_arrival_time)} />
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            </IonList>
          </>
        )
        }

        <IonAccordionGroup value="debug" className="mt-1">
          {/* <IonListHeader className="mt-4">Debug</IonListHeader> */}
          <IonAccordion>
            <IonItem slot="header" color="primary">
              <IonLabel>Debug</IonLabel>
            </IonItem>

            <div className="ion-padding" slot="content">
              <IonItem>
                <IonButton onClick={() => { history.push({ pathname: "/itinerario/:id/contratos" }) }}>"/itinerario/:id/contratos"</IonButton>
              </IonItem>

              <IonItem>
                <IonButton onClick={() => { history.push({ pathname: "/viagem/:id" }) }}>"/viagem/:id"</IonButton>
              </IonItem>

              <IonItem>
                <IonButton onClick={() => { history.push({ pathname: "/contrato/:id" }) }}>"/contrato/:id"</IonButton>
              </IonItem>

              <IonItem className="">
                <IonButton onClick={() => { history.push({ pathname: "/viagem/:id/presenca" }) }}>"/viagem/:id/presenca"</IonButton>
              </IonItem>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <ShowPageAsModal page={Perfil} paramId={itinerary?.user.id_user} isOpen={showPageModal} />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          {itinerary && (
            <>
              <IonButtons className="flex justify-between">
                <div>
                  <IonButton href={`tel:${itinerary.user.phone_number}`} fill='solid' color='success'>Ligar para motorista</IonButton>
                </div>
                <div>
                  <IonButton
                    onClick={() => {
                      history.push({
                        pathname: `/itinerario/${itinerary.id_itinerary}/contratos`,
                        state: {
                          searchData: location.state.searchData
                        }
                      })
                    }}
                    fill='solid'
                    color='success'
                  >Contratar</IonButton>
                </div>
              </IonButtons>
            </>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default Itinerario;

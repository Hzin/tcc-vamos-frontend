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
  IonListHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import * as itinerariesService from "../services/functions/itinerariesService";
import { convertDaysOfWeekToObject, convertNumberToPrice, DaysOfWeekObject, formatTimeField } from "../services/utils";
import { PageHeader } from "../components/PageHeader";
import { Itinerary } from "../models/itinerary.model";
import { cashOutline, cashSharp, eyeOutline, personOutline, timeOutline, timeSharp } from "ionicons/icons";
import { CardInfoBasicIntoAlertInfo } from "../components/CardInfoBasicIntoAlertInfo";
import { CardItinerary } from "../components/CardItinerary";
import { ChipsItineraryDaysOfWeek } from "../components/ChipsItineraryDaysOfWeek";
import { ItemItineraryDetail } from "../components/ItemItineraryDetail";
import { ItemItineraryDetailVer } from "../components/ItemItineraryDetailVer";

import { SearchData, ContractData } from "../constants/InterfaceContractInfo";
import { ShowItinerarioPassageirosPageAsModal } from "../components/ShowPageAsModal/ShowItinerarioPassageirosPageAsModal";
import { ShowItinerarioViagensPageAsModal } from "../components/ShowPageAsModal/ShowItinerarioViagensPageAsModal";
import { ShowPerfilPageAsModal } from "../components/ShowPageAsModal/ShowPerfilPageAsModal";

interface LocationState {
  searchData?: SearchData
  contractData?: ContractData
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
    if (!itinerary.days_of_week) return

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

            {(location.state && location.state.searchData) && (
              <>
                <IonListHeader>Sobre sua pesquisa de itinerário</IonListHeader>
                <ItemItineraryDetailVer
                  label="Informações de pesquisa atuais"
                  infoString={
                    [
                      `Origem: ${location.state.searchData.formatted_address_origin}`,
                      `Destino: ${location.state.searchData.formatted_address_destination}`,
                    ]
                  }
                />
              </>
            )}

            <IonListHeader>Informações básicas</IonListHeader>
            <IonList>
              <IonItem onClick={() => { setShowPageModal(true) }}>
                <IonLabel>Motorista</IonLabel>
                <IonChip color='secondary' id='modal-driver'>
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>Ver perfil</IonLabel>
                </IonChip>
              </IonItem>

              <ItemItineraryDetail label="Preço mensal" icon={cashSharp} value={convertNumberToPrice(itinerary.monthly_price)} />

              <ItemItineraryDetail label='Vaga avulsa' color={itinerary.accept_daily ? "success" : "danger"} icon={cashOutline} value={convertNumberToPrice(itinerary.daily_price)} secondValue={itinerary.accept_daily ? "Aceita" : "Não aceita"} />
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
                    <ItemItineraryDetailVer label="Locais atendidos" infoPlacesObject={itinerary.neighborhoods_served} />
                    <ItemItineraryDetailVer label="Destinos" infoPlacesObject={itinerary.destinations} />
                    <ItemItineraryDetailVer label="Endereço de saída estimado" infoString={itinerary.estimated_departure_address} />
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
                    <ItemItineraryDetail label="Lugares disponíveis" icon={personOutline} value={"" + itinerary.available_seats} />


                    {itineraryDaysOfWeek && (
                      <>
                        <ChipsItineraryDaysOfWeek itineraryDaysOfWeek={itineraryDaysOfWeek} />
                      </>
                    )}

                    {itinerary.specific_day && (<ItemItineraryDetail label="Dia específico" value={itinerary.specific_day.toString()} />)}
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
                    <ItemItineraryDetail label='Horário de estimado saída' icon={timeOutline} value={formatTimeField(itinerary.estimated_departure_time)} />
                    <ItemItineraryDetail label='Horário de estimado chegada' icon={timeSharp} value={formatTimeField(itinerary.estimated_arrival_time)} />
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

        {itinerary && (
          <>
            <ShowPerfilPageAsModal id_user={itinerary.user.id_user} trigger='modal-driver' />
            <ShowItinerarioPassageirosPageAsModal id_itinerary={"" + itinerary.id_itinerary} trigger='modal-passageiros' hasButtonAlready />
            <ShowItinerarioViagensPageAsModal id_itinerary={"" + itinerary.id_itinerary} trigger='modal-viagens' hasButtonAlready />
          </>
        )}

      </IonContent>

      <IonFooter>
        <IonToolbar>
          {(location.state && location.state.searchData) ? (
            <>

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
                            pathname: `/itinerario/id/${itinerary.id_itinerary}/contratos`,
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

            </>
          ) : (
            <>
              <IonButton id='modal-passageiros' expand='full' fill='solid' color='tertiary'>Ver passageiros</IonButton>
              <IonButton id='modal-viagens' expand='full' fill='solid' color='success'>Ver viagens</IonButton>
              {/* <IonButton onClick={history.goBack} expand='full' fill='solid' color='light'>Voltar</IonButton> */}
            </>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default Itinerario;

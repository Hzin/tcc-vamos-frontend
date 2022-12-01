
import {
  IonContent,
  IonPage,
  IonIcon,
  IonListHeader,
  useIonAlert,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Color } from "@ionic/core";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

import { bookmarkOutline, bookOutline, callOutline, checkmarkCircleOutline, checkmarkOutline, closeOutline, documentOutline, documentTextOutline, idCardOutline, locationOutline, pinOutline, thumbsUpOutline, timeOutline, timeSharp, trashBinOutline } from "ionicons/icons";

import * as tripsService from "../services/functions/tripsService";
import * as sessionsService from "../services/functions/sessionsService";
import * as passengersRequestsService from "../services/functions/passengersRequestsService";
import * as attendanceListsService from "../services/functions/attendanceListsService";

import { PageHeader } from "../components/PageHeader";
import { CardItinerary } from "../components/CardItinerary";
import { Trip } from "../models/trip.model";
import { ShowContratoResumoPageAsModal } from "../components/ShowPageAsModal/ShowContratoResumoPageAsModal";
import { ItemItineraryDetail } from "../components/ItemItineraryDetail";
import { tripStatus } from "../constants/tripStatus";
import { tripStatusUpdateActions } from "../constants/tripStatusUpdateActions";
import { ShowViagemHistoricoStatusPageAsModal } from "../components/ShowPageAsModal/ShowViagemHistoricoStatusPageAsModal";
import { ChipInfo } from "../components/ChipInfo";
import { TripType } from "../models/tripType.models";

import { formatTimeField, getUserFullName } from "../services/utils";
import EnumUtils from "../services/EnumUtils";
import { useAuth } from "../contexts/auth";
import { AttendanceListStatus } from "../constants/enumAttendanceListStatus";

export interface ViagemProps {
  match?: {
    params: {
      id: string;
    };
  };

  id_trip?: string
  tripType?: TripType
  isReturnTripCreated?: boolean

  noHeaderBackButton?: boolean
}

const Viagem: React.FC<ViagemProps> = (props) => {
  const history = useHistory();
  const location = useLocation<ViagemProps>();

  const { user } = useAuth();

  const [presentAlert] = useIonAlert();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [trip, setTrip] = useState<Trip>();

  const [paramIdTrip, setParamIdTrip] = useState('');

  const [paramIdPassengerRequest, setParamIdPassengerRequest] = useState('');
  const [isPassenger, setIsPassenger] = useState(false);

  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');

  const [areOptionsAvailable, setAreOptionsAvailable] = useState(false)
  const [optionsButtonsCss, setOptionsButtonsCss] = useState('')

  const [tripType, setTripType] = useState<TripType>()
  const [isReturnTripCreated, setIsReturnTripCreated] = useState(false)

  const [currentAttendanceStatus, setCurrentAttendanceStatus] = useState<AttendanceListStatus>()

  useEffect(() => {
    if (location.state.tripType) setTripType(location.state.tripType)
    if (location.state.isReturnTripCreated) setIsReturnTripCreated(location.state.isReturnTripCreated)

    if (props.tripType) setTripType(props.tripType)
    if (props.isReturnTripCreated) setIsReturnTripCreated(props.isReturnTripCreated)
    loadPageInfo()

    if (tripType === TripType.going && isReturnTripCreated) {
      setAreOptionsAvailable(false)
      setOptionsButtonsCss('line-through')
    }
  }, [])

  const loadPageInfo = () => {
    if (props.id_trip) getTripInfo(props.id_trip)
    else if (props.match) getTripInfo(props.match.params.id)
    else history.goBack()
  }

  const getTripInfo = async (id_trip: string) => {
    setParamIdTrip(id_trip) // usado pelo modal de histórico de viagem
    const trip = await tripsService.getTrip(id_trip)

    setTrip(trip)
    getContractInfo(trip)
    updateAvailableOptions(trip.status)
    updateAvailableOptionsAsPassenger()

    if (trip.itinerary) setDriverPhoneNumber(trip.itinerary.user.phone_number)
  }

  const updateAvailableOptionsAsPassenger = async () => {
    const { userId } = await sessionsService.refreshSession()
    if (!userId || !trip) return

    const currentAttendanceStatus = await attendanceListsService.getUserStatusInTrip({ id_trip: "" + trip.id_trip, id_user: userId })
    setCurrentAttendanceStatus(currentAttendanceStatus)
  }

  const getContractInfo = async (trip: Trip) => {
    const user = await sessionsService.refreshSession()

    if (!user.userId) return

    const passengerRequest = await passengersRequestsService.searchByIdUserAndIdItinerary(user.userId, "" + trip.itinerary_id)

    if (!passengerRequest) return

    setParamIdPassengerRequest("" + passengerRequest.id_passenger_request)
    setIsPassenger(true)
  }

  const handleShowAlert = (message: string, title?: string) => {
    presentAlert({
      header: title ? title : "Informação",
      message: message,
      buttons: ['Entendi'],
    },
    );
  };

  const [availableOptions, setAvailableOptions] = useState<tripStatusUpdateActions[]>([]);
  const updateAvailableOptions = (currentTripStatus: tripStatus) => {
    switch (currentTripStatus) {
      case tripStatus.pending:
      case tripStatus.finished:
        setAvailableOptions([])
        setOptionsButtonsCss('line-through')
        break;
      case tripStatus.confirmed:
        setAvailableOptions([tripStatusUpdateActions.start, tripStatusUpdateActions.cancel])
        break;
      case tripStatus.canceled:
        setAvailableOptions([tripStatusUpdateActions.undoCancel])
        break;
      case tripStatus.inProgress:
        setAvailableOptions([tripStatusUpdateActions.cancel, tripStatusUpdateActions.finish])
        break;
    }
  }

  const updateTripStatus = async ({
    tripId,
    newStatus,
    description,
  }: tripsService.UpdateTripStatusProps) => {
    await tripsService
      .updateTripStatus({
        tripId,
        newStatus,
        description,
      })
      .then((response) => {
        setMessageToast(response)
        setShowToast(true)

        loadPageInfo()
      });
  };

  async function confirmarIda() {
    let res = await tripsService.updatePresence(user!.id_user, trip!.id_trip, "CONFIRMED");
    if (res) {
      setMessageToast('Presença confirmada com sucesso!');
      setToastColor('success');
      setShowToast(true);

      updateAvailableOptionsAsPassenger()
    }
  }

  async function faltar() {
    let res = await tripsService.updatePresence(user!.id_user, trip!.id_trip, "CANCELED");
    if (res) {
      setMessageToast('Falta confirmada com sucesso!');
      setToastColor('success');
      setShowToast(true);

      updateAvailableOptionsAsPassenger()
    }
  }

  return (
    <IonPage>
      <PageHeader pageName={`Viagem de ${tripType ? EnumUtils.getTripTypeEnumFormatted(tripType) : 'Carregando...'}`} showBackButton />

      <IonContent fullscreen>
        {trip && (
          <>
            {trip.itinerary && (<CardItinerary itinerary={trip.itinerary} onlyHeader />)}

            <IonGrid>
              <IonListHeader>Informações da viagem</IonListHeader>

              {trip.itinerary && (
                <>
                  <IonItem>
                    <IonIcon icon={idCardOutline} slot="start" />
                    <IonLabel>Motorista</IonLabel>
                    <IonLabel slot='end'>{getUserFullName(trip.itinerary.user)}</IonLabel>
                  </IonItem>
                </>
              )}

              <IonItem>
                <IonIcon icon={bookmarkOutline} slot="start" />
                <IonLabel>Status</IonLabel>
                <IonLabel slot='end' color={EnumUtils.getTripStatusEnumColor(trip.status)}>{EnumUtils.getTripStatusEnumFormatted(trip.status)}</IonLabel>
              </IonItem>

              {trip.itinerary && (
                <>
                  <IonListHeader className="mt-2">Horários</IonListHeader>

                  <ItemItineraryDetail label='Horário de estimado saída' leftIcon={timeOutline} icon={timeOutline} value={formatTimeField(trip.itinerary.estimated_departure_time)} />
                  <ItemItineraryDetail label='Horário de estimado chegada' leftIcon={timeSharp} icon={timeSharp} value={formatTimeField(trip.itinerary.estimated_arrival_time)} />
                </>
              )}

              {isPassenger && (
                <>
                  <IonListHeader className="mt-2">Minhas informações</IonListHeader>

                  {/* <IonItem button onClick={() => { document.getElementById('modal-contrato')?.click() }}>
                    <IonIcon icon={documentOutline} slot="start" />
                    <IonLabel>Meu Contrato</IonLabel>
                  </IonItem> */}

                  <IonItem>
                    <IonIcon icon={bookOutline} slot="start" />
                    <IonLabel>Meu contrato</IonLabel>
                    <IonLabel slot='end' color='primary' onClick={() => { document.getElementById('modal-contrato')?.click() }}>Ver</IonLabel>
                  </IonItem>
                </>
              )}

              {isPassenger ?
                <>
                  <IonListHeader className="mt-2">Presença</IonListHeader>

                  <IonItem>
                    <IonIcon icon={bookmarkOutline} slot="start" />
                    <IonLabel>Status</IonLabel>
                    <IonLabel slot='end' color={EnumUtils.getAttendanceListStatusEnumColor(currentAttendanceStatus)}>{EnumUtils.getAttendanceListStatusEnumFormatted(currentAttendanceStatus)}</IonLabel>
                  </IonItem>

                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" onClick={() => confirmarIda()} fill="outline" color="success" disabled={currentAttendanceStatus === AttendanceListStatus.confirmed}>
                        <IonIcon icon={checkmarkCircleOutline} />
                        <IonLabel className="ml-2">Confirmar ida</IonLabel>
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton expand="block" onClick={() => faltar()} fill="outline" color="Blue" disabled={currentAttendanceStatus === AttendanceListStatus.canceled}>
                        <IonIcon icon={trashBinOutline} />
                        <IonLabel className="ml-2">Faltar</IonLabel>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </>
                : (
                  <>
                    <IonListHeader className="mt-4">Opções</IonListHeader>

                    <ChipInfo infoString={
                      [
                        'Lembre-se de que você não poderá usar as opções da viagem de ida se a viagem for finalizada.',
                        'Você também não poderá usar as opções se criar a viagem de volta.'
                      ]
                    } />

                    <IonRow>
                      <IonCol>
                        <IonButton expand="block" color='success' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.start) && !areOptionsAvailable} onClick={() => { updateTripStatus({ tripId: "" + trip.id_trip, newStatus: 'inProgress', description: 'Início de viagem' }) }}>
                          <IonIcon icon={checkmarkOutline} />
                          <IonLabel className={`ml-1 ${optionsButtonsCss}`}>Iniciar viagem</IonLabel>
                        </IonButton>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol>
                        <IonButton expand="block" color='primary' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.finish) && !areOptionsAvailable} onClick={() => { updateTripStatus({ tripId: "" + trip.id_trip, newStatus: 'finished', description: 'Fim de viagem' }) }}>
                          <IonIcon icon={thumbsUpOutline} />
                          <IonLabel className={`ml-1 ${optionsButtonsCss}`}>Finalizar viagem</IonLabel>
                        </IonButton>
                      </IonCol>
                    </IonRow>

                    {
                      availableOptions.includes(tripStatusUpdateActions.cancel) && (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonButton expand="block" color='warning' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.cancel) && !areOptionsAvailable} onClick={() => { updateTripStatus({ tripId: "" + trip.id_trip, newStatus: 'canceled', description: 'Viagem cancelada' }) }}>
                                <IonIcon icon={closeOutline} />
                                <IonLabel className={`ml-1 ${optionsButtonsCss}`}>Cancelar viagem</IonLabel>
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      )
                    }

                    {
                      availableOptions.includes(tripStatusUpdateActions.undoCancel) && (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonButton expand="block" color='primary' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.undoCancel) && !areOptionsAvailable} onClick={() => {
                                tripsService.undoLastStatusChange({ tripId: "" + trip.id_trip }).then((response) => {
                                  setMessageToast(response.message)
                                  setShowToast(true)

                                  loadPageInfo()
                                })
                              }}>
                                <IonIcon icon={documentTextOutline} />
                                <IonLabel className={`ml-1 ${optionsButtonsCss}`}>Reverter cancelamento da viagem</IonLabel>
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      )
                    }
                  </>
                )}
            </IonGrid >
          </>
        )}

        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />

        <ShowContratoResumoPageAsModal trigger="modal-contrato" id_passenger_request={paramIdPassengerRequest} noHeaderBackButton />
        <ShowViagemHistoricoStatusPageAsModal trigger='modal-historico-viagem' id_trip={paramIdTrip} noHeaderBackButton />
      </IonContent >

      <IonFooter>
        <IonToolbar>
          {trip && !isPassenger &&
            <>
              <IonButton
                expand="block"
                color='primary'
                fill="outline"
                onClick={() => {
                  history.push({
                    pathname: `/viagem/${trip.id_trip}/presenca`,
                    state: {
                      id_trip: trip.id_trip,
                    },
                  });
                }}>
                <IonIcon icon={documentTextOutline} />
                <IonLabel className="ml-1">Lista de presença</IonLabel>
              </IonButton>

              <IonButton
                expand="block"
                color='primary'
                fill="outline"
                onClick={() => {
                  history.push({
                    pathname: `/viagem/${trip.id_trip}/rota`,
                    state: {
                      id_trip: trip.id_trip,
                    },
                  });
                }}
              >
                <IonIcon icon={pinOutline} />
                <IonLabel className="ml-1">Rota de viagem</IonLabel>
              </IonButton>

              <IonButton expand="block" color='primary' fill="outline" disabled={!!!paramIdTrip} onClick={() => { document.getElementById('modal-historico-viagem')?.click() }}>
                <IonIcon icon={timeOutline} />
                <IonLabel className="ml-1">Histórico de status da viagem</IonLabel>
              </IonButton>
            </>
          }

          {isPassenger && (
            <>
              {trip && trip.itinerary && (
                <IonRow>
                  <IonCol
                    onClick={() => {
                      if (!driverPhoneNumber) {
                        handleShowAlert('O motorista dessa viagem não está com o telefone celular configurado.', 'Aviso')
                      }
                    }}>
                    <IonButton expand="block" color='success' fill="outline" disabled={!driverPhoneNumber} href={`tel:${driverPhoneNumber}`}>
                      <IonIcon icon={callOutline} />
                      <IonLabel>Ligar para o motorista</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}
            </>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default Viagem;
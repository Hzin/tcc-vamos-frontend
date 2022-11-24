
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
import { useHistory } from "react-router-dom";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

import { bookmarkOutline, callOutline, documentOutline, documentTextOutline, idCardOutline, timeOutline, timeSharp, trashBinOutline } from "ionicons/icons";

import * as tripsService from "../services/functions/tripsService";
import * as sessionsService from "../services/functions/sessionsService";
import * as passengersRequestsService from "../services/functions/passengersRequestsService";

import { PageHeader } from "../components/PageHeader";
import { CardItinerary } from "../components/CardItinerary";
import { Trip } from "../models/trip.model";
import { ShowContratoResumoPageAsModal } from "../components/ShowPageAsModal/ShowContratoResumoPageAsModal";
import EnumUtils from "../services/EnumUtils";
import { ItemItineraryDetail } from "../components/ItemItineraryDetail";
import { formatTimeField, getUserFullName } from "../services/utils";
import { tripStatus } from "../constants/tripStatus";
import { tripStatusUpdateActions } from "../constants/tripStatusUpdateActions";
import { Separator } from "../components/Separator";

export interface ViagemProps {
  match?: {
    params: {
      id: string;
    };
  };

  id_trip?: string

  noHeaderBackButton?: boolean
}

const Viagem: React.FC<ViagemProps> = (props) => {
  const [presentAlert] = useIonAlert();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [trip, setTrip] = useState<Trip>();

  const [paramIdPassengerRequest, setParamIdPassengerRequest] = useState('');
  const [isPassenger, setIsPassenger] = useState(false);

  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (props.id_trip) getTripInfo(props.id_trip)
    else if (props.match) getTripInfo(props.match.params.id)
    else history.goBack()
  }, [])

  const getTripInfo = async (id_trip: string) => {
    const trip = await tripsService.getTrip(id_trip)
    // console.log(trip)

    setTrip(trip)
    getContractInfo(trip)
    updateAvailableOptions(trip.status)

    if (trip.itinerary) setDriverPhoneNumber(trip.itinerary.user.phone_number)
  }

  const getContractInfo = async (trip: Trip) => {
    const user = await sessionsService.refreshSession()

    if (!user.userId) return

    const passengerRequest = await passengersRequestsService.searchByIdUserAndIdItinerary(user.userId, "" + trip.itinerary_id)

    if (!passengerRequest) return

    setParamIdPassengerRequest("" + passengerRequest.id_passenger_request)
    setIsPassenger(true)
  }

  const showContract = () => {
    document.getElementById('modal-contrato')?.click()
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
        break;
      case tripStatus.confirmed:
        setAvailableOptions([tripStatusUpdateActions.start, tripStatusUpdateActions.cancel])
        break;
      case tripStatus.canceled:
        setAvailableOptions([tripStatusUpdateActions.reconfirm])
        break;
      case tripStatus.inProgress:
        setAvailableOptions([tripStatusUpdateActions.cancel, tripStatusUpdateActions.finish])
        break;
    }
  }

  // useEffect(() => console.log(availableOptions), [availableOptions])

  return (
    <IonPage>
      <PageHeader pageName="Viagem" showBackButton={!props.noHeaderBackButton} />

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

                  <ItemItineraryDetail label='Horário de estimado saída' leftIcon={timeOutline} icon={timeOutline} value={formatTimeField(trip.itinerary.estimated_departure_time_going)} />
                  <ItemItineraryDetail label='Horário de estimado chegada' leftIcon={timeSharp} icon={timeSharp} value={formatTimeField(trip.itinerary.estimated_arrival_time_going)} />
                </>
              )}

              {isPassenger && (
                <>
                  <IonItem button onClick={showContract}>
                    <IonIcon icon={documentOutline} slot="start" />
                    <IonLabel>Meu Contrato</IonLabel>
                  </IonItem>
                </>
              )}

              <IonListHeader className="mt-4">Opções</IonListHeader>

              <IonRow>
                <IonCol>
                  <IonButton expand="block" color='success' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.start)}>
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel className="ml-1">Iniciar viagem</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButton expand="block" color='primary' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.finish)}>
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel className="ml-1">Finalizar viagem</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButton expand="block" color='warning' fill="outline" disabled={!availableOptions.includes(tripStatusUpdateActions.cancel)}>
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel className="ml-1">Cancelar viagem</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}

        <IonToast
          position="top"
          color='danger'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />

        <ShowContratoResumoPageAsModal trigger="modal-contrato" id_passenger_request={paramIdPassengerRequest} noHeaderBackButton />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" color='primary' fill="outline">
            <IonIcon icon={documentTextOutline} />
            <IonLabel>ver lista de presença (WIP)</IonLabel>
          </IonButton>

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

              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={() => { }} fill="outline" color="Blue" >
                    <IonIcon icon={trashBinOutline} />
                    <IonLabel>Faltar na proxima viagem</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default Viagem;